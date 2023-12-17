# 一、基本概念

Goroutine 可以理解为一种 Go 语言的协程（轻量级线程），是 Go 支持高并发的基础，属于用户态的线程，由 Go runtime 管理而不是操作系统。

# 二、底层数据结构

```
type g struct {
	goid 	int64 // 唯一的goroutine的ID
	sched gobuf // goroutine切换时，用于保存g的上下文
	stack stack // 栈
  gopc        // pc of go statement that created this goroutine
	startpc    uintptr // pc of goroutine function
	...
}

type gobuf struct {
	sp   uintptr // 栈指针位置
	pc   uintptr // 运行到的程序位置
	g    guintptr // 指向 goroutine
	ret  uintptr  // 保存系统调用的返回值
	...
}

type stack struct {
	lo uintptr // 栈的下界内存地址
	hi uintptr // 栈的上界内存地址
}
```

最终有一个 runtime.g 对象放入调度队列

![](https://static.xiaobot.net/file/2023-08-19/263968/08cae890c48fa9ce9ff8065a63333b8c.png)

![](https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/5.2.goroutine_state.jpg#id=ssLk4&originHeight=251&originWidth=403&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## 一）创建

通过 go 关键字调用底层函数 runtime.newproc() 创建一个 goroutine

当调用该函数之后，goroutine 会被设置成 runnable 状态

```
func main() {
 go func() {
  fmt.Println("func routine")
 }()
 fmt.Println("main goroutine")
}
```

创建好的这个 goroutine 会新建一个自己的栈空间，同时在 G 的 sched 中维护栈地址与程序计数器这些信息。

每个 G 在被创建之后，都会被优先放入到本地队列中，如果本地队列已经满了，就会被放入到全局队列中。

## 二） 运行

goroutine 本身只是一个数据结构，真正让 goroutine 运行起来的是**调度器**。Go 实现了一个用户态的调度器（GMP 模型），这个调度器充分利用现代计算机的多核特性，同时让多个 goroutine 运行，同时 goroutine 设计的很轻量级，调度和上下文切换的代价都比较小。

![](https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/image-20220406201146142.png#id=x0ptN&originHeight=283&originWidth=618&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## 三）调度时机

1、新起一个协程和协程执行完毕

2、会阻塞的系统调用，比如文件 io、网络 io

3、channel、mutex 等阻塞操作

4、time.sleep

5、垃圾回收之后

6、主动调用 runtime.Gosched()

7、运行过久或系统调用过久等等

每个 M 开始执行 P 的本地队列中的 G 时，goroutine 会被设置成 running 状态

如果某个 M 把本地队列中的 G 都执行完成之后，然后就会去全局队列中拿 G，这里需要注意，每次去全局队列拿 G 的时候，都需要上锁，避免同样的任务被多次拿。

如果全局队列都被拿完了，而当前 M 也没有更多的 G 可以执行的时候，它就会去其他 P 的本地队列中拿任务，这个机制被称之为 work stealing 机制，每次会拿走一半的任务，向下取整，比如另一个 P 中有 3 个任务，那一半就是一个任务。

当全局队列为空，M 也没办法从其他的 P 中拿任务的时候，就会让自身进入自选状态，等待有新的 G 进来。最多只会有 GOMAXPROCS 个 M 在自旋状态，过多 M 的自旋会浪费 CPU 资源。

## 四）阻塞

channel 的读写操作、等待锁、等待网络数据、系统调用等都有可能发生阻塞，会调用底层函数 runtime.gopark()，会让出 CPU 时间片，让调度器安排其它等待的任务运行，并在下次某个时候从该位置恢复执行。

当调用该函数之后，goroutine 会被设置成 waiting 状态

## 五）唤醒

处于 waiting 状态的 goroutine，在调用 runtime.goready() 函数之后会被唤醒，唤醒的 goroutine 会被重新放到 M 对应的上下文 P 对应的 runqueue 中，等待被调度。

当调用该函数之后，goroutine 会被设置成 runnable 状态

## 六）退出

当 goroutine 执行完成后，会调用底层函数 runtime.Goexit()

当调用该函数之后，goroutine 会被设置成 dead 状态
