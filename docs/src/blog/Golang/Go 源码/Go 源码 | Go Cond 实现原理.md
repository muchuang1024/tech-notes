# 一、概念

Go 标准库提供了`Cond`原语，`sync.Cond`（条件变量）是一个用于在多个 goroutine 之间进行同步和通信的重要工具，可以让 Goroutine 在满足特定条件时被阻塞和唤醒

# 二、底层数据结构

```
type Cond struct {
    noCopy noCopy

    // L is held while observing or changing the condition
    L Locker

    notify  notifyList
    checker copyChecker
}

type notifyList struct {
    wait   uint32
    notify uint32
    lock   uintptr // key field of the mutex
    head   unsafe.Pointer
    tail   unsafe.Pointer
}
```

主要有`4`个字段：

- `nocopy` ： golang 源码中检测禁止拷贝的技术。如果程序中有 WaitGroup 的赋值行为，使用 `go vet` 检查程序时，就会发现有报错，但需要注意的是，noCopy 不会影响程序正常的编译和运行
- `checker`：用于禁止运行期间发生拷贝，双重检查(`Double check`)
- `L`：可以传入一个读写锁或互斥锁，当修改条件或者调用`Wait`方法时需要加锁
- `notify`：通知链表，调用`Wait()`方法的`Goroutine`会放到这个链表中，从这里获取需被唤醒的 Goroutine 列表

# 三、使用方法

在 Cond 里主要有 3 个方法：

- `sync.NewCond(l Locker)`: 新建一个 sync.Cond 变量，注意该函数需要一个 Locker 作为必填参数，这是因为在 `cond.Wait()` 中底层会涉及到 Locker 的锁操作
- `Cond.Wait()`: 阻塞等待被唤醒，调用 Wait 函数前**需要先加锁**；并且由于 Wait 函数被唤醒时存在虚假唤醒等情况，导致唤醒后发现，条件依旧不成立，因此需要使用 for 语句来循环地进行等待，直到条件成立为止
- `Cond.Signal()`: 只唤醒一个最先 Wait 的 goroutine，可以不用加锁
- `Cond.Broadcast()`: 唤醒所有 Wait 的 goroutine，可以不用加锁

```
package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	var mu sync.Mutex
	cond := sync.NewCond(&mu)
	done := make(chan bool)

	// 启动一个goroutine等待条件
	go func() {
		mu.Lock()
		defer mu.Unlock()
		fmt.Println("Waiting for condition...")
		cond.Wait() // 等待条件变量被唤醒
		// Wait 内部会先调用 c.L.Unlock()，来先释放锁，如果调用方不先加锁的话，会报错
		fmt.Println("Condition received!")
		done <- true
	}()

	// 模拟一些耗时的工作
	time.Sleep(2 * time.Second)

	// 在主goroutine中发送Signal信号，唤醒等待的goroutine
	fmt.Println("Sending signal...")
	cond.Signal() // 唤醒一个等待的goroutine

	// 等待goroutine完成
	<-done
	fmt.Println("Done")
}
```

输出：

```
Waiting for condition...
Sending signal...
Condition received!
Done
```

在上述示例中，我们创建了一个互斥锁 mu 和一个 sync.Cond 变量 cond。然后，我们启动一个 goroutine 等待条件变量被唤醒，并在主 goroutine 中模拟一些耗时的工作后，通过 cond.Signal() 方法发送信号，唤醒等待的 goroutine。

一旦条件变量被唤醒，等待的 goroutine 会继续执行。当你运行这个示例时，你会看到输出中的等待和唤醒消息，以及最后的"Done"表示成功完成。

请注意，在使用 Signal 方法时，通常需要在互斥锁的保护下调用，以确保对条件变量的访问是线程安全的。
