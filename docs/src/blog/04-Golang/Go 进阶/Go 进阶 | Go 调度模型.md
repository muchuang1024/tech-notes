Go 语言的并发性能的关键组成部分在于其调度原理，Go 使用一种称为 M:N 调度的模型，其中 M 代表操作系统的内核态线程，而 N 代表 用户态线程 Goroutines（ Go 语言的轻量级线程）

实质上，Goroutine 调度是将 Goroutine（G）按照特定算法分派到 CPU 上执行的过程。由于 CPU 无法感知 Goroutines，只能感知内核线程，因此需要 Go 调度器将 Goroutines 调度到内核线程 M 上，然后由操作系统调度器将内核线程 M 放入 CPU 上执行。M 实际上是对内核级线程的封装，因此 Go 调度器的核心任务是 Goroutines 分配给 M

Go 调度器的实现经历了多次演化，包括从最初的 GM 模型 到 GMP 模型，从不支持抢占到支持协作式抢占，再到支持基于信号的异步抢占。这个演化过程经历了不断的优化与打磨，以提高 Go 语言的并发性能

# 一、GMP 模型概念

在 Go 语言中，并发处理的基本单位是 Goroutines，它们是轻量级的线程，由 Go 运行时调度和管理。这一调度系统的核心是 GMP 模型，包括三个主要组件：

G（Goroutines）：用户线程：通过 go 关键字创建
M（Machine）：操作系统线程
P（Processor）：调度上下文，维护了一组 Goroutine 队列

其中 Goroutines 相对于传统线程占用内存更低，它们的创建和销毁成本非常低，因此可以轻松创建成千上万个 Goroutines，而不会导致大量的资源消耗。这一特性在高并发应用中非常有用，例如我们需要编写一个网络服务器，每个客户端连接都需要一个独立的 Goroutine 来处理请求。在传统的线程模型下，为每个连接创建线程可能会导致资源耗尽，但在 Go 中，可以轻松创建成千上万个 Goroutines 来同时处理客户端请求，而不会带来明显的性能问题。

# 二、GMP 模型设计思想

## 利用并行

多个协程绑定不同的操作系统线程，可以利用多核 CPU

## 线程复用

work stealing 机制 ：线程 M ⽆可运⾏的 G 时，尝试从其他 M 绑定的 P 偷取 G，减少空转
hand off 机制：线程 M 因为 G 系统调用阻塞时，将 P 转交给其他空闲的 M 执行，M 执行 P 的剩余 G

## 抢占调度

避免某些 Goroutine 长时间占用线程，造成其它 Goroutine 饥饿，解决公平性问题

# 三、GMP 模型原理

## 谁来调度

Go 调度器负责调度 G 给 M， Go 调度器是属于 Go 运行时中的一部分，Go 运行时 、负责实现 Go 的并发调度、垃圾回收、内存堆栈管理等关键功能

## 被调度对象

G 的来源

> P 的 runnext（只有 1 个 G，局部性原理，永远会被最先调度执行）
> P 的本地队列（数组，最多 256 个 G）
> 全局 G 队列（链表，无限制）
> 网络轮询器*network poller*（存放网络调用被阻塞的 G)

P 的来源

> 全局 P 队列（数组，GOMAXPROCS 个 P）

M 的来源

> 休眠线程队列（未绑定 P，长时间休眠会等待 GC 回收销毁）
> 运行线程（绑定 P，指向 P 中的 G）
> 自旋线程（绑定 P，指向 M 的 G0）

|          | G                      | M                                                                 | P                                                            |
| -------- | ---------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------ |
| 数量限制 | 无限制，受机器内存影响 | 有限制，默认最多 10000                                            | 有限制，最多 GOMAXPROCS 个                                   |
| 创建时机 | go func                | 当没有足够的 M 来关联 P 并运行其中的可运行的 G 时会请求创建新的 M | 在确定了 P 的最大数量 n 后，运行时系统会根据这个数量创建个 P |

## 调度时机

在以下情形下，会切换正在执行的 goroutine

- 抢占式调度
  - sysmon 检测到协程运行过久（比如 sleep，死循环）
    - 切换到 g0，进入调度循环
- 主动调度
  - 新起一个协程和协程执行完毕
    - 触发调度循环
  - 主动调用 runtime.Gosched()
    - 切换到 g0，进入调度循环
  - 垃圾回收之后
    - stw 之后，会重新选择 g 开始执行
- 被动调度
  - 系统调用阻塞（同步）
    - 阻塞 G 和 M，P 与 M 分离，将 P 交给其它 M 绑定，其它 M 执行 P 的剩余 G
  - 网络 IO 调用阻塞（异步）
    - 阻塞 G，G 移动到 NetPoller，M 执行 P 的剩余 G
  - atomic/mutex/channel 等阻塞（异步）
    - 阻塞 G，G 移动到 channel 的等待队列中，M 执行 P 的剩余 G

## 调度流程

协程的调度采用了生产者-消费者模型，实现了用户任务与调度器的解耦
![image.png](https://cdn.nlark.com/yuque/0/2023/png/12455685/1681569433397-a74032a6-f5cc-4b9c-a910-7e886040e40e.png#averageHue=%23f6f6f5&clientId=uc5d2eedf-7087-4&from=paste&id=u17804c17&originHeight=538&originWidth=916&originalType=url&ratio=2&rotation=0&showTitle=false&size=181652&status=done&style=none&taskId=u4a185e61-668d-4c69-b4f0-50c0818004d&title=)
![](https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/webp#id=oq8JE&originHeight=542&originWidth=964&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
生产端我们开启的每个协程都是一个计算任务，这些任务会被提交给 go 的 runtime。如果计算任务非常多，有成千上万个，那么这些任务是不可能同时被立刻执行的，所以这个计算任务一定会被先暂存起来，一般的做法是放到内存的队列中等待被执行。
G 的生命周期：G 从创建、保存、被获取、调度和执行、阻塞、销毁，步骤如下：

### 步骤 1：创建 G

> 执行 go func 的时候，主线程 M0 会调用 newproc()生成一个 G 结构体

### 步骤 2：保存 G

创建的 G 优先保存到本地队列 P，如果 P 满了，则会平衡部分 P 到全局队列中

> 每个协程 G 都会被尝试先放到 P 中的 runnext，若 runnext 为空则放到 runnext 中，生产结束
> 若 runnext 满，则将原来 runnext 中的 G 踢到本地队列中，将当前 G 放到 runnext 中，生产结束
> 若本地队列也满了，则将本地队列中的 G 拿出一半，放到全局队列中，生产结束

### 步骤 3：唤醒或者新建 M

> 找到一个 M 进入调度循环：重复步骤 4、5、6

### 步骤 4：M 获取 G

> 具体见下面的调度策略

### 步骤 5：M 调度和执行 G

> M 调用 G.func() 函数执行 G

- 如果 M 在执行 G 的过程发生**系统调用阻塞**（同步），会阻塞 G 和 M（操作系统限制），此时 P 会和当前 M 解绑，并寻找新的 M，如果没有空闲的 M 就会新建一个 M ，接管正在阻塞 G 所属的 P，接着继续执行 P 中其余的 G，这种阻塞后释放 P 的方式称之为 hand off。当**系统调用结束**后，这个 G 会尝试获取一个空闲的 P 执行，优先获取之前绑定的 P，并放入到这个 P 的本地队列，如果获取不到 P，那么这个线程 M 变成休眠状态，加入到空闲线程中，然后这个 G 会被放入到全局队列中。
- 如果 M 在执行 G 的过程发生网络 IO 等操作阻塞时（异步），阻塞 G，**不会阻塞 M**。M 会寻找 P 中其它可执行的 G 继续执行，G 会被网络轮询器 network poller 接手，当阻塞的 G 恢复后，从 network poller 被移回到 P 的本地队列中，重新进入可执行状态。异步情况下，通过调度，Go scheduler 成功地将 I/O 的任务转变成了 CPU 任务，或者说将内核级别的线程切换转变成了用户级别的 goroutine 切换，大大提高了效率。

### 步骤 6：清理现场

> M 执行完 G 后清理现场,重新进入调度循环（将 M 上运⾏的 goroutine 切换为 G0，G0 负责调度时协程的切换）

## 调度策略

**使用什么策略来挑选下一个 goroutine 执行：**
由于 P 中的 G 分布在 runnext、本地队列、全局队列、网络轮询器中，则需要挨个判断是否有可执行的 G，大体逻辑如下：

- 每执行 61 次调度循环，从全局队列获取 G，若有则直接返回（主要避免全局队列中的 G 饿死）
- 从 P 上的 runnext 看一下是否有 G，若有则直接返回
- 从 P 上的 本地队列 看一下是否有 G，若有则直接返回
- 上面都没查找到时，则去全局队列、网络轮询器查找或者从其他 P 中窃取，**一直阻塞**直到获取到一个可用的 G 为止

源码实现如下：

```
func schedule() {
    _g_ := getg()
    var gp *g
    var inheritTime bool
    ...
    if gp == nil {
        // 每执行61次调度循环会看一下全局队列。为了保证公平，避免全局队列一直无法得到执行的情况，当全局运行队列中有待执行的G时，通过schedtick保证有一定几率会从全局的运行队列中查找对应的Goroutine；
        if _g_.m.p.ptr().schedtick%61 == 0 && sched.runqsize > 0 {
            lock(&sched.lock)
            gp = globrunqget(_g_.m.p.ptr(), 1)
            unlock(&sched.lock)
        }
    }
    if gp == nil {
        // 先尝试从P的runnext和本地队列查找G
        gp, inheritTime = runqget(_g_.m.p.ptr())
    }
    if gp == nil {
        // 仍找不到，去全局队列中查找。还找不到，要去网络轮询器中查找是否有G等待运行；仍找不到，则尝试从其他P中窃取G来执行。
        gp, inheritTime = findrunnable() // blocks until work is available
        // 这个函数是阻塞的，执行到这里一定会获取到一个可执行的G
    }
    ...
    // 调用execute，继续调度循环
    execute(gp, inheritTime)
}
```

# 四、总结

在实际应用中，Go 已经证明了其在高并发环境中的优越性能，例如，高并发的 Web 服务器、分布式系统和并行计算都受益于 GMP 模型。了解和利用 GMP 模型将使你的程序更具竞争力，并能够有效地处理大规模并发。
