并发模型说的是系统中的线程如何协作完成并发任务，不同的并发模型，线程以不同的方式进行**通信**和协作。

# 一、线程间通信方式

线程间通信方式有两种：共享内存和消息传递，无论是哪种通信模型，线程或者协程最终都会从内存中获取数据，所以更为准确的说法是直接共享内存、发送消息的方式来同步信息

下面是一个表格，对比了共享内存和发送消息（如 Go 语言中的 CSP 模型）两种并发模型的不同属性：

| 特性     | 共享内存                                         | 发送消息                                            |
| -------- | ------------------------------------------------ | --------------------------------------------------- |
| 抽象层级 | 低（适用于对性能要求极高或需要细粒度控制的场景） | 高（提供良好的封装和与领域相关的设计）              |
| 耦合     | 高（线程间直接操作共享数据）                     | 低（基于生产者-消费者模型，线程间通过消息传递交互） |
| 线程竞争 | 需要互斥锁来避免                                 | 通过 channel 保证资源同一时间只由一个线程访问       |

这个表格简要地说明了两种并发模型在抽象层级、耦合度以及线程竞争处理上的主要区别。在 Go 语言中，CSP 模型通过 channel 来实现线程间的通信，而共享内存模型则需要显式地使用互斥锁来控制对共享资源的访问。

Go 语言中实现了两种并发模型，一种是共享内存并发模型，另一种则是 CSP 模型。

# 二、共享内存并发模型

通过直接共享内存 + 锁的方式同步信息，传统多线程并发

![](https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/image-20220514161804822.png#id=iVBNH&originHeight=298&originWidth=613&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

# 三、CSP 并发模型

通过发送消息的方式来同步信息，Go 语言推荐使用的*通信顺序进程*（communicating sequential processes）并发模型，通过 goroutine 和 channel 来实现

1、`goroutine` 是 Go 语言中并发的执行单位，可以理解为”线程“

2、`channel`是 Go 语言中各个并发结构体(`goroutine`)之前的通信机制。 通俗的讲，就是各个`goroutine`之间通信的”管道“，类似于 Linux 中的管道

![](https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/image-20220514161841437.png#id=WAvrC&originHeight=277&originWidth=607&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
