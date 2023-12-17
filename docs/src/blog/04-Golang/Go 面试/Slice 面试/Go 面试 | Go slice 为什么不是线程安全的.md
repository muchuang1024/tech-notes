1、先看下线程安全的定义

多个线程访问同一个对象时，调用这个对象的行为都可以获得正确的结果，那么这个对象就是线程安全的。

若有多个线程同时执行写操作，一般都需要考虑线程同步，否则的话就可能影响线程安全。

2、Go 语言实现线程安全常用的几种方式

- 互斥锁
- 读写锁
- 原子操作
- sync.once
- sync.atomic
- channel

3、slice 底层结构并没有使用加锁等方式，不支持并发读写，所以并不是线程安全的

使用多个 goroutine 对类型为 slice 的变量进行操作，每次输出的值大概率都不会一样，与预期值不一致; slice 在并发执行中不会报错，但是数据会丢失

```
func TestSliceConcurrencySafe(t *testing.T) {
 a := make([]int, 0)
 var wg sync.WaitGroup
 for i := 0; i < 10000; i++ {
  wg.Add(1)
  go func(i int) {
 &nbsp; a = append(a, i)
 &nbsp; wg.Done()
  }(i)
 }
 wg.Wait()
 t.Log(len(a))
}
```

输出结果不等于 10000
