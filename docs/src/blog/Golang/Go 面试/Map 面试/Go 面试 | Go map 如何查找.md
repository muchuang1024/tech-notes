Go 语言中读取 map 有两种语法：带 comma 和 不带 comma。当要查询的 key 不在 map 里，带 comma 的用法会返回一个 bool 型变量提示 key 是否在 map 中；而不带 comma 的语句则会返回一个 value 类型的零值。如果 value 是 int 型就会返回 0，如果 value 是 string 类型，就会返回空字符串。

```
// 不带 comma 用法
value := m["name"]
fmt.Printf("value:%s", value)

// 带 comma 用法
value, ok := m["name"]
if ok {
    fmt.Printf("value:%s", value)
}
```

map 的查找通过生成汇编码可以知道，根据 key 的不同类型/返回参数，编译器会将查找函数用更具体的函数替换，以优化效率：

| 类型   | 查找                                                                       |
| ------ | -------------------------------------------------------------------------- |
| uint32 | mapaccess1*fast32(t \_maptype, h* hmap, key uint32) unsafe.Pointer         |
| uint32 | mapaccess2*fast32(t \_maptype, h* hmap, key uint32) (unsafe.Pointer, bool) |
| uint64 | mapaccess1*fast64(t \_maptype, h* hmap, key uint64) unsafe.Pointer         |
| uint64 | mapaccess2*fast64(t \_maptype, h* hmap, key uint64) (unsafe.Pointer, bool) |
| string | mapaccess1*faststr(t \_maptype, h* hmap, ky string) unsafe.Pointer         |
| string | mapaccess2*faststr(t \_maptype, h* hmap, ky string) (unsafe.Pointer, bool) |

# 一、查找流程

![](https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/image-20220117201006909.png#id=GD2UW&originHeight=781&originWidth=340&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## 一）写保护监测

函数首先会检查 map 的标志位 flags。如果 flags 的写标志位此时被置 1 了，说明有其他协程在执行“写”操作，进而导致程序 panic，这也说明了 map 不是线程安全的

```
if h.flags&hashWriting != 0 {
	throw("concurrent map read and map write")
}
```

## 二）计算 hash 值

```
hash := t.hasher(key, uintptr(h.hash0))
```

key 经过哈希函数计算后，得到的哈希值如下（主流 64 位机下共 64 个 bit 位）， 不同类型的 key 会有不同的 hash 函数

```
 10010111 | 000011110110110010001111001010100010010110010101010 │ 01010
```

## 三）找到 hash 对应的 bucket

bucket 定位：**哈希值的低 B 个 bit 位**，用来定位 key 所存放的 bucket

如果当前正在扩容中，并且定位到的旧 bucket 数据还未完成迁移，则使用旧的 bucket（扩容前的 bucket）

```
hash := t.hasher(key, uintptr(h.hash0))
// 桶的个数m-1，即 1<<B-1,B=5时，则有0~31号桶
m := bucketMask(h.B)
// 计算哈希值对应的bucket
// t.bucketsize为一个bmap的大小，通过对哈希值和桶个数取模得到桶编号，通过对桶编号和buckets起始地址进行运算，获取哈希值对应的bucket
b := (*bmap)(add(h.buckets, (hash&m)*uintptr(t.bucketsize)))
// 是否在扩容
if c := h.oldbuckets; c != nil {
  // 桶个数已经发生增长一倍，则旧bucket的桶个数为当前桶个数的一半
	if !h.sameSizeGrow() {
		// There used to be half as many buckets; mask down one more power of two.
		m >>= 1
	}
	// 计算哈希值对应的旧bucket
	oldb := (*bmap)(add(c, (hash&m)*uintptr(t.bucketsize)))
	// 如果旧bucket的数据没有完成迁移，则使用旧bucket查找
	if !evacuated(oldb) {
		b = oldb
	}
}
```

## 四）遍历 bucket 查找

tophash 值定位：**哈希值的高 8 个 bit 位**，用来快速判断 key 是否已在当前 bucket 中（如果不在的话，需要去 bucket 的 overflow 中查找）

用步骤 2 中的 hash 值，得到高 8 个 bit 位，也就是`10010111`，转化为十进制，也就是**151**

```
top := tophash(hash)
func tophash(hash uintptr) uint8 {
	top := uint8(hash >> (goarch.PtrSize*8 - 8))
	if top < minTopHash {
		top += minTopHash
	}
	return top
}
```

上面函数中 hash 是 64 位的，sys.PtrSize 值是 8，所以`top := uint8(hash >> (sys.PtrSize*8 - 8))`等效`top = uint8(hash >> 56)`，最后 top 取出来的值就是 hash 的高 8 位值

在 bucket 及 bucket 的 overflow 中寻找\*\*tophash 值（HOB hash）为 151* 的 槽位*，即为 key 所在位置，找到了空槽位或者 2 号槽位，这样整个查找过程就结束了，其中找到空槽位代表没找到。

```
for ; b != nil; b = b.overflow(t) {
		for i := uintptr(0); i < bucketCnt; i++ {
			if b.tophash[i] != top {
			  // 未被使用的槽位，插入
				if b.tophash[i] == emptyRest {
					break bucketloop
				}
				continue
			}
			// 找到tophash值对应的的key
			k := add(unsafe.Pointer(b), dataOffset+i*uintptr(t.keysize))
			if t.key.equal(key, k) {
				e := add(unsafe.Pointer(b), dataOffset+bucketCnt*uintptr(t.keysize)+i*uintptr(t.elemsize))
				return e
			}
		}
	}
```

![](https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/f39e10e1474fda593cbca86eb0c517e2.png#id=FxLKr&originHeight=2248&originWidth=1766&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## 五）返回 key 对应的指针

如果通过上面的步骤找到了 key 对应的槽位下标 i，我们再详细分析下 key/value 值是如何获取的：

```go
// keys的偏移量
dataOffset = unsafe.Offsetof(struct{
  b bmap
  v int64
}{}.v)

// 一个bucket的元素个数
bucketCnt = 8

// key 定位公式
k :=add(unsafe.Pointer(b),dataOffset+i*uintptr(t.keysize))

// value 定位公式
v:= add(unsafe.Pointer(b),dataOffset+bucketCnt*uintptr(t.keysize)+i*uintptr(t.valuesize))
```

bucket 里 keys 的起始地址就是 unsafe.Pointer(b)+dataOffset

第 i 个下标 key 的地址就要在此基础上跨过 i 个 key 的大小；

而我们又知道，value 的地址是在所有 key 之后，因此第 i 个下标 value 的地址还需要加上所有 key 的偏移。
