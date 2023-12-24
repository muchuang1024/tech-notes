# 一、什么是 goroutine 泄露

在 Go 中，goroutine 泄露是指创建的 goroutine 没有被正确地关闭或管理，导致它们在程序运行过程中无法被回收，最终导致资源浪费和潜在的性能问题。以下是一些常见的导致 goroutine 泄露的场景

常见泄露原因如下：

- Goroutine 内进行 channel/mutex 等读写操作被一直阻塞。
- Goroutine 内的业务逻辑进入死循环，资源一直无法释放。
- Goroutine 内的业务逻辑进入长时间等待，有不断新增的 Goroutine 进入等待

# 二、泄露场景

如果输出的 goroutines 数量是在不断增加的，就说明存在泄漏

## nil channel

channel 如果忘记初始化，那么无论你是读，还是写操作，都会造成阻塞。

```
func block1() {
	var ch chan int
	for i := 0; i < 10; i++ {
		go func() {
			<-ch
		}()
	}
}

func main() {
	fmt.Println("before goroutines: ", runtime.NumGoroutine())
	block1()
	time.Sleep(time.Second * 1)
	fmt.Println("after goroutines: ", runtime.NumGoroutine())
}
```

输出结果：

```
before goroutines:  1
after goroutines:  11
```

## channel 发送未接收

channel 发送数量 超过 channel 接收数量，就会造成阻塞

```
func block2() {
	ch := make(chan int)
	for i := 0; i < 10; i++ {
		go func() {
			ch <- 1
		}()
	}
}

func main() {
	fmt.Println("before goroutines: ", runtime.NumGoroutine())
	block2()
	time.Sleep(time.Second * 1)
	fmt.Println("after goroutines: ", runtime.NumGoroutine())
}
```

输出结果：

```
before goroutines:  1
after goroutines:  11
```

## channel 接收未发送

channel 接收数量 超过 channel 发送数量，也会造成阻塞

```
func block3() {
	ch := make(chan int)
	for i := 0; i < 10; i++ {
		go func() {
			<-ch
		}()
	}
}

func main() {
	fmt.Println("before goroutines: ", runtime.NumGoroutine())
	block3()
	time.Sleep(time.Second * 1)
	fmt.Println("after goroutines: ", runtime.NumGoroutine())
}
```

输出结果：

```
before goroutines:  1
after goroutines:  11
```

## 资源连接未关闭

比如文件打开或 http 连接未正常关闭，比如 http 未调用`resp.Body.Close()` ，goroutine 不会退出

```
func requestWithNoClose() {
	_, err := http.Get("https://www.baidu.com")
	if err != nil {
		fmt.Println("error occurred while fetching page, error: %s", err.Error())
	}
}

func requestWithClose() {
	resp, err := http.Get("https://www.baidu.com")
	if err != nil {
		fmt.Println("error occurred while fetching page, error: %s", err.Error())
		return
	}
	defer resp.Body.Close()
}

func block4() {
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func() {
				defer wg.Done()
				requestWithNoClose()
		}()
	}
}

var wg = sync.WaitGroup{}

func main() {
	fmt.Println("before goroutines: ", runtime.NumGoroutine())
	block4()
	wg.Wait()
	fmt.Println("after goroutines: ", runtime.NumGoroutine())
}
```

输出结果：

```
before goroutines:  1
after goroutines:  21
```

一般发起 http 请求时，需要确保关闭 body

```go
defer resp.Body.Close()
```

## 互斥锁忘记解锁

第一个协程获取 `sync.Mutex` 加锁了，但是他可能在处理业务逻辑，又或是忘记 `Unlock` 了。
因此导致后面的协程想加锁，却因锁未释放被阻塞了

```
package main

import (
	"fmt"
	"runtime"
	"sync"
	"time"
)

func block5() {
	var mutex sync.Mutex
	for i := 0; i < 10; i++ {
		go func() {
			mutex.Lock()
		}()
	}
}

func main() {
	fmt.Println("before goroutines: ", runtime.NumGoroutine())
	block5()
	time.Sleep(1 * time.Second)
	fmt.Println("after goroutines: ", runtime.NumGoroutine())
}

```

输出结果：

```
before goroutines:  1
after goroutines:  11
```

## sync.WaitGroup 使用不当

由于 `wg.Add` 的数量与 `wg.Done` 数量并不匹配，因此在调用 `wg.Wait` 方法后，触发死锁检测器并导致程序崩溃

```
package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup

	wg.Add(1) // 增加计数器
	go func() {
		// 注意：没有调用 wg.Done()
		fmt.Println("Goroutine executed")
	}()

	// 主程序等待，但计数器没有被适当减少，触发死锁检测
	wg.Wait()

	fmt.Println("Main function exiting")
}
```

在这个示例中，Add 增加了计数器，但在 goroutine 中没有调用 Done 减少计数器，因此计数器永远不会减少到零，这会触发死锁检测器并导致程序崩溃。

为了避免这种情况，确保在每个启动的 goroutine 中都使用 Done 减少计数器，以便计数器最终减少到零，并允许程序正常退出。这是一种良好的并发编程实践。

## 无限循环

如果一个 goroutine 进入无限循环而没有退出的机制，它会一直运行下去，直到程序结束。

```
func block7() {
	for i := 0; i < 10; i++ {
		go func() {
			for {
				// 无限循环
			}
		}()
	}
}

func main() {
	fmt.Println("before goroutines: ", runtime.NumGoroutine())
	block7()
	time.Sleep(1 * time.Second)
	fmt.Println("after goroutines: ", runtime.NumGoroutine())
}


```

输出结果:

```
before goroutines:  1
after goroutines:  11
```

# 三、如何排查

单个函数：调用 `runtime.NumGoroutine` 方法来打印 执行代码前后 Goroutine 的运行数量，进行前后比较，就能知道有没有泄露了。

生产/测试环境：使用`PProf`实时监测 Goroutine 的数量
