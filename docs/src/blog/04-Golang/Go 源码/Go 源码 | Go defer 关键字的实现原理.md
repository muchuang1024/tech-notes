# 一、基本概念

defer 能够让我们推迟执行某些函数调用，推迟到当前函数返回前才实际执行。defer 与 panic 和 recover 结合，形成了 Go 语言风格的异常与捕获机制。

使用场景：defer 语句经常被用于处理成对的操作，如文件句柄关闭、连接关闭、释放锁

优点：方便开发者使用

缺点：有性能损耗

# 二、实现原理

在 Go 语言中，defer 的先进后出（后进先出）的执行顺序是由编译器实现的，它通过在函数退出点插入 defer 语句的调用代码，确保这些语句按照与它们被添加到栈的相反顺序执行。

源代码：

```
func A(i int) {
    defer A1(i, 2\*i)
    if(i > 1) {
        defer A2("Hello", "eggo")
    }
    // 其它 code
    return
}
```

编译后（伪代码）：

```
func A(i int) {
    // 其它 code
    if(i > 1){
        A2("Hello", "eggo")
    }
    A1(i, 2\*i)
}
```

# 三、代码示例

1、函数退出前，按照先进后出的顺序，执行 defer 函数

```

package main
​
import "fmt"
​
// defer：延迟函数执行，先进后出
func main() {
    defer fmt.Println("defer1")
    defer fmt.Println("defer2")
    defer fmt.Println("defer3")
    defer fmt.Println("defer4")
    fmt.Println("11111")
}
```

输出:

```
11111
defer4
defer3
defer2
defer1
```

2、panic 后的 defer 函数不会被执行（遇到 panic，如果没有捕获错误，函数会立刻终止）

```
package main
​
import "fmt"
​
// panic 后的 defer 函数不会被执行
func main() {
    defer fmt.Println("panic before")
    panic("发生 panic")
    defer func() {
    fmt.Println("panic after")
    }()
}
```

输出：

```
panic before
panic: 发生 panic
```

3、panic 没有被 recover 时，抛出的 panic 到当前 goroutine 最上层函数时，最上层程序直接异常终止

```
package main
​
import "fmt"
​
func F() {
    defer func() {
        fmt.Println("b")
    }()
    panic("a")
}

// 子函数抛出的 panic 没有 recover 时，上层函数时，程序直接异常终止
func main() {
    defer func() {
        fmt.Println("c")
    }()
    F()
    fmt.Println("继续执行")
}
```

​
输出：

```
b
c
panic: a
```

4、panic 有被 recover 时，当前 goroutine 最上层函数正常执行

```
package main
​
import "fmt"
​
func F() {
    defer func() {
        if err := recover(); err != nil {
            fmt.Println("捕获异常:", err)
        }
        fmt.Println("b")
    }()
    panic("a")
}
​
func main() {
    defer func() {
        fmt.Println("c")
    }()
    F()
    fmt.Println("继续执行")
}
```

输出：

```
捕获异常: a
b
继续执行
c
```
