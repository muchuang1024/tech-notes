在函数中，如果参数是非引用类型（int、string、struct 等这些），这样就在函数中就无法修改原内容数据；

如果参数是引用类型（指针、map、slice、chan 等这些），这样就可以修改原内容数据。

是否可以修改原内容数据，和传值、传引用没有必然的关系。在 C++中，传引用肯定是可以修改原内容数据的，在 Go 语言里，虽然只有传值，但是我们也可以修改原内容数据，因为参数是引用类型

先说下结论：**Go 语言中所有的传参都是值传递（传值），都是一个副本，一个拷贝。**

| 类型     | 传递方式 | 说明                                                                |
| -------- | -------- | ------------------------------------------------------------------- |
| 基本类型 | 值传递   | 如 int、float、bool，传递的是数据的副本。                           |
| 数组     | 值传递   | 传递数组时，会复制整个数组。                                        |
| 结构体   | 值传递   | 传递结构体时，会复制整个结构体。                                    |
| 切片     | 值传递   | 切片本身是通过值传递的，但实际上传递的是对底层数组的引用。          |
| 映射     | 值传递   | 映射（map）同样是引用类型，通过值传递映射时，传递的是对映射的引用。 |
| 通道     | 值传递   | 通道（channel）是引用类型，传递的是对通道的引用。                   |
| 接口     | 值传递   | 接口类型本身是通过值传递的，但接口可能持有的是其他引用类型的引用。  |
| 函数     | 值传递   | 函数类型是引用类型，传递的是函数的引用。                            |
| 指针     | 值传递   | 指针传递的是指针的副本，但副本指向的是同一个内存地址。              |

# 一、什么是值传递？

将实参的值传递给形参，形参是实参的一份拷贝，实参和形参的内存地址不同。函数内对形参值内容的修改，是否会影响实参的值内容，取决于参数是否是引用类型

# 二、什么是引用传递？

将实参的地址传递给形参，函数内对形参值内容的修改，将会影响实参的值内容。Go 语言是没有引用传递的，在 C++中，函数参数的传递方式有引用传递。

下面分别针对 Go 的值类型（int、struct 等）、引用类型（指针、slice、map、channel），验证是否是值传递，以及函数内对形参的修改是否会修改原内容数据

# 三、各类型参数传递

## int 类型

形参和实际参数内存地址不一样，证明是值传递；参数是值类型，所以函数内对形参的修改，不会修改原内容数据

```
package main

import "fmt"

func main() {
	var i int64 = 1
	fmt.Printf("原始int内存地址是 %p\n", &i)
	modifyInt(i) // args就是实际参数
	fmt.Printf("改动后的值是: %v\n", i)
}

func modifyInt(i int64) { //这里定义的args就是形式参数
	fmt.Printf("函数里接收到int的内存地址是：%p\n", &i)
	i = 10
}

原始int内存地址是 0xc0000180b8
函数里接收到int的内存地址是：0xc0000180c0
改动后的值是: 1
```

## 指针类型

形参和实际参数内存地址不一样，证明是值传递，由于形参和实参是指针，指向同一个变量。函数内对指针指向变量的修改，会修改原内容数据

```
package main

import "fmt"

func main() {
	var args int64 = 1                  // int类型变量
	p := &args                          // 指针类型变量
	fmt.Printf("原始指针的内存地址是 %p\n", &p)   // 存放指针类型变量
	fmt.Printf("原始指针指向变量的内存地址 %p\n", p) // 存放int变量
	modifyPointer(p)                    // args就是实际参数
	fmt.Printf("改动后的值是: %v\n", *p)
}

func modifyPointer(p *int64) { //这里定义的args就是形式参数
	fmt.Printf("函数里接收到指针的内存地址是 %p \n", &p)
	fmt.Printf("函数里接收到指针指向变量的内存地址 %p\n", p)
	*p = 10
}

原始指针的内存地址是 0xc000110018
原始指针指向变量的内存地址 0xc00010c008
函数里接收到指针的内存地址是 0xc000110028
函数里接收到指针指向变量的内存地址 0xc00010c008
改动后的值是: 10
```

## slice 类型

形参和实际参数内存地址一样，不代表是引用类型；下面进行详细说明 slice 还是值传递，传递的是指针

```
package main

import "fmt"

func main() {
	var s = []int64{1, 2, 3}
	// &操作符打印出的地址是无效的，是fmt函数作了特殊处理
	fmt.Printf("直接对原始切片取地址%v \n", &s)
	// 打印slice的内存地址是可以直接通过%p打印的,不用使用&取地址符转换
	fmt.Printf("原始切片的内存地址： %p \n", s)
	fmt.Printf("原始切片第一个元素的内存地址： %p \n", &s[0])
	modifySlice(s)
	fmt.Printf("改动后的值是: %v\n", s)
}

func modifySlice(s []int64) {
	// &操作符打印出的地址是无效的，是fmt函数作了特殊处理
	fmt.Printf("直接对函数里接收到切片取地址%v\n", &s)
	// 打印slice的内存地址是可以直接通过%p打印的,不用使用&取地址符转换
	fmt.Printf("函数里接收到切片的内存地址是 %p \n", s)
	fmt.Printf("函数里接收到切片第一个元素的内存地址： %p \n", &s[0])
	s[0] = 10
}

直接对原始切片取地址&[1 2 3]
原始切片的内存地址： 0xc0000b8000
原始切片第一个元素的内存地址： 0xc0000b8000
直接对函数里接收到切片取地址&[1 2 3]
函数里接收到切片的内存地址是 0xc0000b8000
函数里接收到切片第一个元素的内存地址： 0xc0000b8000
改动后的值是: [10 2 3]
```

`slice`是一个结构体，他的第一个元素是一个指针类型，这个指针指向的是**底层数组的第一个元素**。当参数是`slice`类型的时候，fmt.printf 通过%p 打印的 slice 变量的地址其实就是内部存储数组元素的地址，所以打印出来形参和实参内存地址一样。

```
type slice struct {
    array unsafe.Pointer // 指针
    len   int
    cap   int
}
```

因为 slice 作为参数时本质是传递的指针，上面证明了指针也是值传递，所以参数为 slice 也是值传递，指针指向的是同一个变量，函数内对形参的修改，会修改原内容数据

单纯的从 slice 这个结构体看，我们可以通过 modify 修改存储元素的内容，但是永远修改不了 len 和 cap，因为他们只是一个拷贝，如果要修改，那就要传递&slice 作为参数才可以。

## map 类型

形参和实际参数内存地址不一样，证明是值传递

```
package main

import "fmt"

func main() {
	m := make(map[string]int)
	m["age"] = 8

	fmt.Printf("原始map的内存地址是：%p\n", &m)
	modifyMap(m)
	fmt.Printf("改动后的值是: %v\n", m)
}

func modifyMap(m map[string]int) {
	fmt.Printf("函数里接收到map的内存地址是：%p\n", &m)
	m["age"] = 9
}

原始map的内存地址是：0xc00000e028
函数里接收到map的内存地址是：0xc00000e038
改动后的值是: map[age:9]
```

通过 make 函数创建的 map 变量本质是一个`hmap`类型的指针`*hmap`，所以函数内对形参的修改，会修改原内容数据

```
//src/runtime/map.go
func makemap(t *maptype, hint int, h *hmap) *hmap {
    mem, overflow := math.MulUintptr(uintptr(hint), t.bucket.size)
    if overflow || mem > maxAlloc {
        hint = 0
    }

    // initialize Hmap
    if h == nil {
        h = new(hmap)
    }
    h.hash0 = fastrand()
}
```

## channel 类型

形参和实际参数内存地址不一样，证明是值传递

```
package main

import (
	"fmt"
	"time"
)

func main() {
	p := make(chan bool)
	fmt.Printf("原始chan的内存地址是：%p\n", &p)
	go func(p chan bool) {
		fmt.Printf("函数里接收到chan的内存地址是：%p\n", &p)
		//模拟耗时
		time.Sleep(2 * time.Second)
		p <- true
	}(p)

	select {
	case l := <-p:
		fmt.Printf("接收到的值是: %v\n", l)
	}
}

原始chan的内存地址是：0xc00000e028
函数里接收到chan的内存地址是：0xc00000e038
接收到的值是: true
```

通过 make 函数创建的 chan 变量本质是一个`hchan`类型的指针`*hchan`，所以函数内对形参的修改，会修改原内容数据

```
// src/runtime/chan.go
func makechan(t *chantype, size int) *hchan {
    elem := t.elem

    // compiler checks this but be safe.
    if elem.size >= 1<<16 {
        throw("makechan: invalid channel element type")
    }
    if hchanSize%maxAlign != 0 || elem.align > maxAlign {
        throw("makechan: bad alignment")
    }

    mem, overflow := math.MulUintptr(elem.size, uintptr(size))
    if overflow || mem > maxAlloc-hchanSize || size < 0 {
        panic(plainError("makechan: size out of range"))
    }
}
```

## struct 类型

形参和实际参数内存地址不一样，证明是值传递。形参不是引用类型或者指针类型，所以函数内对形参的修改，不会修改原内容数据

```
package main

import "fmt"

type Person struct {
	Name string
	Age  int
}

func main() {
	per := Person{
		Name: "test",
		Age:  8,
	}
	fmt.Printf("原始struct的内存地址是：%p\n", &per)
	modifyStruct(per)
	fmt.Printf("改动后的值是: %v\n", per)
}

func modifyStruct(per Person) {
	fmt.Printf("函数里接收到struct的内存地址是：%p\n", &per)
	per.Age = 10
}

原始struct的内存地址是：0xc0000a6018
函数里接收到struct的内存地址是：0xc0000a6030
改动后的值是: {test 8}
```
