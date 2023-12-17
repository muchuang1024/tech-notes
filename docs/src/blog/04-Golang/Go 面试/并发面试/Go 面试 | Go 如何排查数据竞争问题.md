1、概念

只要有两个以上的 goroutine 并发访问同一变量，且至少其中的一个是写操作的时候就会发生数据竞争；全是读的情况下是不存在数据竞争的。

2、排查方式

```
package main
​
import "fmt"
​
func main() {
  i := 0
​
  go func() {
     i++; // write i
  }()
​
  fmt.Println(i) // read i
}
```

go 命令行有个参数 race 可以帮助检测代码中的数据竞争

```
$ go run -race main.go
​
WARNING: DATA RACE
Write at 0x00c0000ba008 by goroutine 7:
exit status 66
```
