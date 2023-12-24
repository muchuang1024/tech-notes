map 默认是并发不安全的，同时对 map 进行并发读写时，程序会 panic，原因如下：

Go 官方在经过了长时间的讨论后，认为 Go map 更应适配典型使用场景（不需要从多个 goroutine 中进行安全访问），而不是为了小部分情况（并发访问），导致大部分程序付出加锁代价（性能），决定了不支持。

2 个协程同时读和写，以下程序会出现致命错误：fatal error: concurrent map writes

```
package main

import (
	"fmt"
	"time"
)

func main() {
	s := make(map[int]int)
	for i := 0; i < 100; i++ {
		go func(i int) {
			s[i] = i
		}(i)
	}
	for i := 0; i < 100; i++ {
		go func(i int) {
			fmt.Printf("map第%d个元素值是%d\n", i, s[i])
		}(i)
	}
	time.Sleep(1 * time.Second)
}
```

如果想实现 map 线程安全，有两种方式：

**1、使用读写锁 `map` + `sync.RWMutex`**

```
package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	var lock sync.RWMutex
	s := make(map[int]int)
	for i := 0; i < 100; i++ {
		go func(i int) {
			lock.Lock()
			s[i] = i
			lock.Unlock()
		}(i)
	}
	for i := 0; i < 100; i++ {
		go func(i int) {
			lock.RLock()
			fmt.Printf("map第%d个元素值是%d\n", i, s[i])
			lock.RUnlock()
		}(i)
	}
	time.Sleep(1 * time.Second)
}
```

**2、使用 Go 提供的 `sync.Map`**

```
package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	var m sync.Map
	for i := 0; i < 100; i++ {
		go func(i int) {
			m.Store(i, i)
		}(i)
	}
	for i := 0; i < 100; i++ {
		go func(i int) {
			v, ok := m.Load(i)
			fmt.Printf("Load: %v, %v\n", v, ok)
		}(i)
	}
	time.Sleep(1 * time.Second)
}
```

##
