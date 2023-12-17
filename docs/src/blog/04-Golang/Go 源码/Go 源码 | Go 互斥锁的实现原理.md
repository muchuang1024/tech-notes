# 一、什么是互斥锁

Go 语言中的互斥锁（Mutex）是一种关键的并发控制机制，用于保护共享资源免受多个 Goroutine 的并发访问。

互斥锁的主要目标是确保一次只有一个 Goroutine 可以访问被锁定的共享资源。在 Go 语言中，互斥锁由`sync`包提供，并且具有`sync.Mutex`类型。互斥锁的基本操作包括加锁（Lock）和解锁（Unlock）。

```go
var mu sync.Mutex

func main() {
    mu.Lock()
    // 访问共享资源
    mu.Unlock()
}
```

使用场景：

多个线程同时访问临界区，为保证数据的安全，锁住一些共享资源， 以防止并发访问这些共享数据时可能导致的数据不一致问题。

获取锁的线程可以正常访问临界区，未获取到锁的线程等待锁释放后可以尝试获取锁

![image.png](https://cdn.nlark.com/yuque/0/2023/png/12455685/1695553783489-e0a484ea-bb6f-4822-95d2-25d3064ec8cc.png#averageHue=%23f3f3ec&clientId=u4649c3b5-5e65-4&id=OC2Pc&originHeight=549&originWidth=732&originalType=binary&ratio=1&rotation=0&showTitle=false&size=143165&status=done&style=none&taskId=u9cf4dac7-d4f9-41e4-b183-09a652d7254&title=)

# 二、互斥锁的实现原理

Go 语言的互斥锁的实现原理可以简单概括为：

1.  互斥锁的零值是未加锁状态，即初始状态下没有任何 Goroutine 拥有锁。
2.  当一个 Goroutine 尝试获取锁时，如果锁处于未加锁状态，它会立即获得锁，将锁状态置为已加锁，并继续执行。
3.  如果锁已经被其他 Goroutine 持有，那么当前 Goroutine 将被阻塞，直到锁被释放。
4.  当一个 Goroutine 释放锁时，锁的状态将被设置为未加锁，此时等待的 Goroutine 中的一个将被唤醒并获得锁。

## 一）底层实现结构

互斥锁对应的是底层结构是 sync.Mutex 结构体，，位于 src/sync/mutex.go 中

```
type Mutex struct {
	 state int32
	 sema  uint32
 }
```

state 表示锁的状态，有锁定、被唤醒、饥饿模式等，并且是用 state 的二进制位来标识的，不同模式下会有不同的处理方式

![image.png](https://cdn.nlark.com/yuque/0/2023/png/12455685/1695553822987-30630fbe-14a3-48d4-9cdb-1e78c3bb887e.png#averageHue=%23f2f0f0&clientId=u4649c3b5-5e65-4&id=t7xM0&originHeight=346&originWidth=685&originalType=binary&ratio=1&rotation=0&showTitle=false&size=51339&status=done&style=none&taskId=u9dc41ecf-ef73-4d32-90ae-13d7a933f1c&title=)

sema 表示信号量，mutex 阻塞队列的定位是通过这个变量来实现的，从而实现 goroutine 的阻塞和唤醒

![image.png](https://cdn.nlark.com/yuque/0/2023/png/12455685/1695553822949-4987d145-a4d0-41e2-92ca-866edbc11ed6.png#averageHue=%23f6f6f6&clientId=u4649c3b5-5e65-4&id=GLg99&originHeight=420&originWidth=645&originalType=binary&ratio=1&rotation=0&showTitle=false&size=38454&status=done&style=none&taskId=u95408ebd-ce31-4be1-b279-5822b2c5dc1&title=)

```
addr = &sema
func semroot(addr *uint32) *semaRoot {
   return &semtable[(uintptr(unsafe.Pointer(addr))>>3)%semTabSize].root
}
root := semroot(addr)
root.queue(addr, s, lifo)
root.dequeue(addr)

var semtable [251]struct {
   root semaRoot
   ...
}

type semaRoot struct {
  lock  mutex
  treap *sudog // root of balanced tree of unique waiters.
  nwait uint32 // Number of waiters. Read w/o the lock.
}

type sudog struct {
	g *g
	next *sudog
	prev *sudog
	elem unsafe.Pointer // 指向sema变量
	waitlink *sudog // g.waiting list or semaRoot
	waittail *sudog // semaRoot
	...
}
```

## 二）加锁

通过原子操作 cas 加锁，如果加锁不成功，根据不同的场景选择自旋重试加锁或者阻塞等待被唤醒后加锁

![image.png](https://cdn.nlark.com/yuque/0/2023/png/12455685/1695553822816-2aaa04f9-6f52-413b-9aa2-9c841526da1c.png#averageHue=%23f8f8f7&clientId=u4649c3b5-5e65-4&id=O8ufq&originHeight=310&originWidth=1342&originalType=binary&ratio=1&rotation=0&showTitle=false&size=55935&status=done&style=none&taskId=u75b4faac-2198-4bc9-91da-e522795423f&title=)

```
func (m *Mutex) Lock() {
	// Fast path: 幸运之路，一下就获取到了锁
	if atomic.CompareAndSwapInt32(&m.state, 0, mutexLocked) {
		return
	}
	// Slow path：缓慢之路，尝试自旋或阻塞获取锁
	m.lockSlow()
}
```

## 三）解锁

通过原子操作 add 解锁，如果仍有 goroutine 在等待，唤醒等待的 goroutine

![image.png](https://cdn.nlark.com/yuque/0/2023/png/12455685/1695553822983-8f122e47-3c2b-4a84-9683-3364a27ce9ce.png#averageHue=%23f7f7f6&clientId=u4649c3b5-5e65-4&id=jkszt&originHeight=238&originWidth=1024&originalType=binary&ratio=1&rotation=0&showTitle=false&size=41005&status=done&style=none&taskId=ue122c36e-1fc1-4c9e-8669-9b386c37d29&title=)

```
func (m *Mutex) Unlock() {
   // Fast path: 幸运之路，解锁
   new := atomic.AddInt32(&m.state, -mutexLocked)
   if new != 0 {
 			// Slow path：如果有等待的goroutine，唤醒等待的goroutine
			m.unlockSlow()
   }
}
```

这种实现原理保证了只有一个 Goroutine 能够同时访问临界区，从而确保了并发访问的安全性。

# 三、互斥锁的注意事项

1、在高度竞争的情况下，多个 Goroutine 争夺锁可能导致性能下降。为了提高性能，可以考虑使用更轻量级的同步原语，如读写锁（`sync.RWMutex`）或通道（`chan`），以根据需求进行读或写的并发控制。

2、在 Lock() 之前使用 Unlock() 会导致 panic 异常

3、使用 Lock() 加锁后，再次 Lock() 会导致死锁（不支持重入），需 Unlock()解锁后才能再加锁

4、锁定状态与 goroutine 没有关联，一个 goroutine 可以 Lock，另一个 goroutine 可以 Unlock
