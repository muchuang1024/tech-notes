# 一、什么是抢占式调度

在 1.2 版本之前，Go 的调度器仍然不支持抢占式调度，程序只能依靠 Goroutine 主动让出 CPU 资源才能触发切换调度，会导致下面的问题：

一旦 Goroutine 出现死循环的代码逻辑，那么 G 将永久占用分配给它的 P 和 M，而位于同一个 P 中的其他 G 将得不到调度，出现“饿死”的情况

当只有一个 P（GOMAXPROCS=1）时，整个 Go 程序中的其他 G 都将“饿死”

为解决上面的问题：

Go 1.2 中实现了基于协作的“抢占式”调度

Go 1.14 中实现了基于信号的“抢占式”调度

# 二、基于协作的抢占式调度

协作式：大家都按事先定义好的规则来，比如：一个 Goroutine 执行完后让出 P，然后下一个 Goroutine 被调度到 P 上运行。这样做的缺点就在于是否让出 P 的决定权在 Goroutine 自身。一旦某个 G 不主动让出 P 或执行时间较长，那么后面的 Goroutine 只能等着，没有方法让前者让出 P，导致延迟甚至饿死。

基于协作的抢占式调度流程：

编译器会在调用函数前插入 runtime.morestack，让运行时有机会在这段代码中检查是否需要执行抢占调度

Go 语言运行时会在垃圾回收暂停程序、系统监控发现 Goroutine 运行超过 10ms，那么会在这个协程设置一个抢占标记

当发生函数调用时，可能会执行编译器插入的 runtime.morestack，它调用的 runtime.newstack 会检查抢占标记，如果有抢占标记就会触发抢占让出 CPU，切到调度主协程里

这种解决方案只能说局部解决了“饿死”问题，只在有函数调用的地方才能插入“抢占”代码（埋点），对于没有函数调用而是纯算法循环计算的 G，Go 调度器依然无法抢占。

比如，死循环等并没有给编译器插入抢占代码的机会，以下程序在 Go 1.14 之前的 Go 版本中，运行后会一直卡住，而不会打印 I got scheduled!

```
package main

import (
    "fmt"
    "runtime"
    "time"
)

func main() {
    runtime.GOMAXPROCS(1)
    go func() {
        for {
        }
    }()

    time.Sleep(time.Second) // 等待 G 创建完成
    fmt.Println("I got scheduled!")
}
```

为了解决这些问题，Go 在 1.14 版本中增加了对非协作的抢占式调度的支持，这种抢占式调度是基于系统信号的，也就是通过向线程发送信号的方式来抢占正在运行的 Goroutine

# 三、基于信号的抢占式调度

非协作式：就是由 Go runtime 来决定一个 Goroutine 运行多长时间，如果你不主动让出，对不起，我有手段可以抢占你，把你踢出去，让后面的 Goroutine 进来运行。

真正的抢占式调度是基于信号完成的，所以也称为“异步抢占”。不管协程有没有意愿主动让出 CPU 运行权，只要某个协程执行时间过长，就会发送信号强行夺取 CPU 运行权。

基于信号的抢占式调度流程：

1、M 注册一个 SIGURG 信号的处理函数：sighandler

2、sysmon 启动后会间隔性的进行监控，最长间隔 10ms，最短间隔 20us。如果发现某协程独占 P 超过 10ms，会给 M 发送抢占信号

3、M 收到信号后，内核执行 sighandler 函数把当前协程的状态从 Grunning 正在执行改成 Grunnable 可执行，把抢占的协程放到全局队列里，M 继续寻找其他 Goroutine 来运行

4、被抢占的 G 再次调度过来执行时，会继续原来的执行流
