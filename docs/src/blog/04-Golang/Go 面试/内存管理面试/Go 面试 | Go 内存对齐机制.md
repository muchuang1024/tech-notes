# 一、什么是内存对齐

Go 语言内存对齐机制是为了优化内存访问和提高性能而设计的。为了能让 CPU 可以更快的存取到各个字段，Go 编译器会帮你把 struct 结构体做数据的对齐。所谓的数据对齐，是指内存地址是所存储数据大小（按字节为单位）的整数倍，以便 CPU 可以一次将该数据从内存中读取出来。 编译器通过在结构体的各个字段之间填充一些空白已达到对齐的目的。

# 二、内存对齐系数

不同硬件平台占用的大小和对齐值都可能是不一样的，每个特定平台上的编译器都有自己的默认"对齐系数"，32 位系统对齐系数是 4，64 位系统对齐系数是 8

不同类型的对齐系数也可能不一样，使用`Go`语言中的`unsafe.Alignof`函数可以返回相应类型的对齐系数，对齐系数都符合`2^n`这个规律，最大也不会超过 8

```
package main

import (
	"fmt"
	"unsafe"
)

func main() {
	fmt.Printf("bool alignof is %d\n", unsafe.Alignof(bool(true)))
	fmt.Printf("string alignof is %d\n", unsafe.Alignof(string("a")))
	fmt.Printf("int alignof is %d\n", unsafe.Alignof(int(0)))
	fmt.Printf("float alignof is %d\n", unsafe.Alignof(float64(0)))
	fmt.Printf("int32 alignof is %d\n", unsafe.Alignof(int32(0)))
	fmt.Printf("float32 alignof is %d\n", unsafe.Alignof(float32(0)))
}
```

可以查看到各种类型在 Mac 64 位上的对齐系数如下：

```
bool alignof is 1
string alignof is 8
int alignof is 8
int32 alignof is 4
float32 alignof is 4
float alignof is 8
```

# 三、内存对齐的优点

1、提高可移植性，有些`CPU`可以访问任意地址上的任意数据，而有些`CPU`只能在特定地址访问数据，因此不同硬件平台具有差异性，这样的代码就不具有移植性，如果在编译时，将分配的内存进行对齐，这就具有平台可以移植性了

2、提高内存的访问效率，32 位 CPU 下一次可以从内存中读取 32 位（4 个字节）的数据，64 位 CPU 下一次可以从内存中读取 64 位（8 个字节）的数据，这个长度也称为 CPU 的字长。CPU 一次可以读取 1 个字长的数据到内存中，如果所需要读取的数据正好跨了 1 个字长，那就得花两个 CPU 周期的时间去读取了。因此在内存中存放数据时进行对齐，可以提高内存访问效率。

# 四、内存对齐的缺点

1、存在内存空间的浪费，实际上是空间换时间

# 五、内存对齐原则

1、结构体变量中成员的偏移量必须是成员大小的整数倍

2、整个结构体的地址必须是最大字节的整数倍（结构体的内存占用是 1/4/8/16byte...)

```
package main

import (
	"fmt"
	"runtime"
	"unsafe"
)

type T1 struct {
	bool bool  // 1 byte
	i16  int16 // 2 byte
}

type T2 struct {
	i8  int8  // 1 byte
	i64 int64 // 8 byte
	i32 int32 // 4 byte
}

type T3 struct {
	i8  int8  // 1 byte
	i32 int32 // 4 byte
	i64 int64 // 8 byte
}

func main() {
	fmt.Println(runtime.GOARCH) // amd64

	t1 := T1{}
	fmt.Println(unsafe.Sizeof(t1)) // 4 bytes

	t2 := T2{}
	fmt.Println(unsafe.Sizeof(t2)) // 24 bytes

	t3 := T3{}
	fmt.Println(unsafe.Sizeof(t3)) // 16 bytes
}
```

以 T1 结构体为例，实际存储数据的只有 3 字节，但实际用了 4 字节，浪费了 1 个字节：

i16 并没有直接放在 bool 的后面，而是在 bool 中填充了一个空白后，放到了偏移量为 2 的位置上。如果 i16 从偏移量为 1 的位置开始占用 2 个字节，就不满足对齐原则 1，所以 i16 从偏移量为 2 的位置开始

![](https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/image-20220502132935164.png#id=CTOUy&originHeight=162&originWidth=527&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

以 T2 结构体为例，实际存储数据的只有 13 字节，但实际用了 24 字节，浪费了 11 个字节：

![](https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/image-20220502133003644.png#id=PiD9s&originHeight=168&originWidth=1105&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

以 T3 结构体为例，实际存储数据的只有 13 字节，但实际用了 16 字节，浪费了 3 个字节：

![](https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/image-20220502133303337.png#id=euMr8&originHeight=175&originWidth=824&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
