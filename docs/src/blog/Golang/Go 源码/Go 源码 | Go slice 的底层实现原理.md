# 一、基本概念

切片是基于数组实现的，它的底层是数组，可以理解为对 底层数组的抽象，源码包中 src/runtime/slice.go 定义了 slice 的数据结构

```
type slice struct {
  array unsafe.Pointer
  len  int
  cap int
}
```

slice 占用 24 个字节

array: 指向底层数组的指针，占用 8 个字节

len: 切片的长度，占用 8 个字节

cap: 切片的容量，cap 总是大于等于 len 的，占用 8 个字节

# 二、使用方式

slice 有 4 种初始化方式

初始化方式 1：直接声明

```
var slice1 []int
```

初始化方式 2：使用字面量

```
slice2 := []int{1, 2, 3, 4}
```

初始化方式 3：使用 make 创建 slice

```
slice3 := make([]int, 3, 5)
```

初始化方式 4: 从切片或数组“截取”

```
slcie4 := arr[1:3]
```

# 三、底层实现

通过一个简单程序，看下 slice 初始化调用的底层函数

```
package main
​
import "fmt"
​
func main() {
  slice := make([]int, 0)
  slice = append(slice, 1)
  fmt.Println(slice, len(slice), cap(slice))
}
```

通过 go tool compile -S test.go | grep CALL 得到汇编代码

```
0x0042 00066 (test.go:6)        CALL    runtime.makeslice(SB)
0x006d 00109 (test.go:7)        CALL    runtime.growslice(SB)
0x00a4 00164 (test.go:8)        CALL    runtime.convTslice(SB)
0x00c0 00192 (test.go:8)        CALL    runtime.convT64(SB)
0x00d8 00216 (test.go:8)        CALL    runtime.convT64(SB)
0x0166 00358 ($GOROOT/src/fmt/print.go:274)     CALL    fmt.Fprintln(SB)
0x0180 00384 (test.go:5)        CALL    runtime.morestack_noctxt(SB)
0x0079 00121 (<autogenerated>:1)        CALL    runtime.efaceeq(SB)
0x00a0 00160 (<autogenerated>:1)        CALL    runtime.morestack_noctxt(SB)
```

初始化 slice 调用的是 runtime.makeslice，makeslice 函数的工作主要就是计算 slice 所需内存大小，然后调用 mallocgc 进行内存的分配，所需内存大小 = 切片中元素大小 \* 切片的容量

```
func makeslice(et *_type, len, cap int) unsafe.Pointer {
  mem, overflow := math.MulUintptr(et.size, uintptr(cap))
  if overflow || mem > maxAlloc || len < 0 || len > cap {
    mem, overflow := math.MulUintptr(et.size, uintptr(len))
    if overflow || mem > maxAlloc || len < 0 {
      panicmakeslicelen()
    }
    panicmakeslicecap()
  }
​
  return mallocgc(mem, et, true)
}
```
