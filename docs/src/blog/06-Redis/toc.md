# Redis

TODO

获取锁失败处理（自旋）

删除别人的锁（只删除自己的锁）
锁续期（redission）
主从切换锁丢失（zk）

redlock（超过半数 redis 节点加锁成功）

分段锁

lock := redisson.lock(id)
lock.Lock()
try {
// do  
} catch {
lock.Unlock()
}

### 缓存击穿



### 缓存雪崩

百万并发，redis坑不住，导致应用挂掉

解决方案：

- 多级缓存（本地内存缓存） > redis缓存

### 缓存数据库双写不一致

更新和查询带来的不一致，停顿等原因导致线程3，过了一会儿才更新缓存

解决方案：

- 过期时间（接受短期不一致）
- 延迟双删（接受短期不一致）
- 分布式锁（串行化）
- 读写锁（读多写少，性能优化）
- 强制读主库



![](https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/image-20230607205820037.png)



