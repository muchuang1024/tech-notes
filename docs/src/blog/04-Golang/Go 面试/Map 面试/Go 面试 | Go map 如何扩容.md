# 一、扩容时机

在向 map 插入新 key 的时候，会进行条件检测，符合下面这 2 个条件，就会触发扩容

```
if !h.growing() && (overLoadFactor(h.count+1, h.B) || tooManyOverflowBuckets(h.noverflow, h.B)) {
  hashGrow(t, h)
  goto again // Growing the table invalidates everything, so try again
}
​
// 判断是否在扩容
func (h *hmap) growing() bool {
  return h.oldbuckets != nil
}
```

# 二、扩容条件

**1、超过负载**

map 元素个数 > 6.5 \* 桶个数

```
func overLoadFactor(count int, B uint8) bool {
   return count > bucketCnt && uintptr(count) > loadFactor*bucketShift(B)
}
```

bucketCnt = 8，一个桶可以装的最大元素个数

loadFactor = 6.5，负载因子，平均每个桶的元素个数

bucketShift(B): 桶的个数

**2、溢出桶太多**

当桶总数 < 2 ^ 15 时，如果溢出桶总数 >= 桶总数，则认为溢出桶过多。

当桶总数 >= 2 ^ 15 时，直接与 2 ^ 15 比较，当溢出桶总数 >= 2 ^ 15 时，即认为溢出桶太多了。

```
func tooManyOverflowBuckets(noverflow uint16, B uint8) bool {
  if B > 15 {
    B = 15
  }
  // The compiler doesn't see here that B < 16; mask B to generate shorter shift code.
  return noverflow >= uint16(1)<<(B&15)
}
```

对于条件 2，其实算是对条件 1 的补充。因为在负载因子比较小的情况下，有可能 map 的查找和插入效率也很低，而第 1 点识别不出来这种情况。

表面现象就是负载因子比较小比较小，即 map 里元素总数少，但是桶数量多（真实分配的桶数量多，包括大量的溢出桶）。比如不断的增删，这样会造成 overflow 的 bucket 数量增多，但负载因子又不高，达不到第 1 点的临界值，就不能触发扩容来缓解这种情况。

这样会造成桶的使用率不高，值存储得比较稀疏，查找插入效率会变得非常低，因此有了第 2 扩容条件。

# 三、扩容机制

**1、双倍扩容**

针对条件 1，新建一个 buckets 数组，新的 buckets 大小是原来的 2 倍，然后旧 buckets 数据搬迁到新的 buckets。该方法我们称之为双倍扩容

**2、等量扩容**

针对条件 2，并不扩大容量，buckets 数量维持不变，重新做一遍类似双倍扩容的搬迁动作，把松散的键值对重新排列一次，使得同一个 bucket 中的 key 排列地更紧密，节省空间，提高 bucket 利用率，进而保证更快的存取。该方法我们称之为等量扩容。

**3、扩容函数**

上面说的 hashGrow() 函数实际上并没有真正地“搬迁”，它只是分配好了新的 buckets，并将老的 buckets 挂到了 oldbuckets 字段上。真正搬迁 buckets 的动作在 growWork() 函数中，而调用 growWork() 函数的动作是在 mapassign 和 mapdelete 函数中。

也就是插入或修改、删除 key 的时候，都会尝试进行搬迁 buckets 的工作。先检查 oldbuckets 是否搬迁完毕，具体来说就是检查 oldbuckets 是否为 nil

```
 1	func hashGrow(t *maptype, h *hmap) {
 2  // 如果达到条件 1，那么将B值加1，相当于是原来的2倍
 3  // 否则对应条件 2，进行等量扩容，所以 B 不变
 4    bigger := uint8(1)
 5    if !overLoadFactor(h.count+1, h.B) {
 6        bigger = 0
 7        h.flags |= sameSizeGrow
 8    }
 9  // 记录老的buckets
10    oldbuckets := h.buckets
11  // 申请新的buckets空间
12    newbuckets, nextOverflow := makeBucketArray(t, h.B+bigger, nil)
13  // 注意&^ 运算符，这块代码的逻辑是转移标志位
14    flags := h.flags &^ (iterator | oldIterator)
15    if h.flags&iterator != 0 {
16        flags |= oldIterator
17    }
18    // 提交grow (atomic wrt gc)
19    h.B += bigger
20    h.flags = flags
21    h.oldbuckets = oldbuckets
22    h.buckets = newbuckets
23  // 搬迁进度为0
24    h.nevacuate = 0
25  // overflow buckets 数为0
26    h.noverflow = 0
27
28  // 如果发现hmap是通过extra字段 来存储 overflow buckets时
29    if h.extra != nil && h.extra.overflow != nil {
30        if h.extra.oldoverflow != nil {
31            throw("oldoverflow is not nil")
32        }
33        h.extra.oldoverflow = h.extra.overflow
34        h.extra.overflow = nil
35    }
36    if nextOverflow != nil {
37        if h.extra == nil {
38            h.extra = new(mapextra)
39        }
40        h.extra.nextOverflow = nextOverflow
41    }
42}
```

由于 map 扩容需要将原有的 key/value 重新搬迁到新的内存地址，如果 map 存储了数以亿计的 key-value，一次性搬迁将会造成比较大的延时。

因此 Go map 的扩容采取了一种称为“渐进式”的方式，原有的 key 并不会一次性搬迁完毕，每次最多只会搬迁 2 个 bucket。

```
func growWork(t *maptype, h *hmap, bucket uintptr) {
  // 为了确认搬迁的 bucket 是我们正在使用的 bucket
  // 即如果当前key映射到老的bucket1，那么就搬迁该bucket1。
  evacuate(t, h, bucket&h.oldbucketmask())
  // 如果还未完成扩容工作，则再搬迁一个bucket。
  if h.growing() {
    evacuate(t, h, h.nevacuate)
  }
}
```
