使用 range 多次遍历 map 时输出的 key 和 value 的顺序可能不同，这是 Go 语言的设计者们有意为之，旨在提示开发者们，Go 底层实现并不保证 map 遍历顺序稳定，请大家不要依赖 range 遍历结果顺序

**1、主要原因如下**

map 在遍历时，并不是从固定的 0 号 bucket 开始遍历的，每次遍历，都会从一个随机值序号的 bucket，再从其中随机的 cell 开始遍历

map 遍历时，是按序遍历 bucket，同时按需遍历 bucket 中和其 overflow bucket 中的 cell。但是 map 在扩容后，会发生 key 的搬迁，这造成原来落在一个 bucket 中的 key，搬迁后，有可能会落到其他 bucket 中了，从这个角度看，遍历 map 的结果就不可能是按照原来的顺序了

**2、如何有序遍历 map**

map 本身是无序的，且遍历时顺序还会被随机化，如果想顺序遍历 map，需要对 map key 先排序，再按照 key 的顺序遍历 map。

```
func TestMapRange(t *testing.T) {
  m := map[int]string{1: "a", 2: "b", 3: "c"}
  t.Log("first range:")
  for i, v := range m {
    t.Logf("m[%v]=%v ", i, v)
  }
  t.Log("\nsecond range:")
  for i, v := range m {
    t.Logf("m[%v]=%v ", i, v)
  }
​
  // 实现有序遍历
  var sl []int
  // 把 key 单独取出放到切片
  for k := range m {
    sl = append(sl, k)
  }
  // 排序切片
  sort.Ints(sl)
  // 以切片中的 key 顺序遍历 map 就是有序的了
  for _, k := range sl {
    t.Log(k, m[k])
  }
}
```
