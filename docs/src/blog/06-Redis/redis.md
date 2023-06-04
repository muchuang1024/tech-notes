## redis 底层数据结构
https://juejin.im/post/5d71d3bee51d453b5f1a04f1#heading-18
https://www.cnblogs.com/ysocean/p/9080942.html

* SDS (简单动态字符串,底层用字节数组实现)
```
struct sdshdr{
     //记录buf数组中已使用字节的数量
     //等于 SDS 保存字符串的长度
     int len;
     //记录 buf 数组中未使用字节的数量
     int free;
     //字节数组，用于保存字符串
     char buf[];
}
```

* 链表 (用无环双端链表实现)
```
typedef  struct listNode{
       //前置节点
       struct listNode *prev;
       //后置节点
       struct listNode *next;
       //节点的值
       void *value;  
}listNode

typedef struct list{
     //表头节点
     listNode *head;
     //表尾节点
     listNode *tail;
     //链表所包含的节点数量
     unsigned long len;
     //节点值复制函数
     void (*free) (void *ptr);
     //节点值释放函数
     void (*free) (void *ptr);
     //节点值对比函数
     int (*match) (void *ptr,void *key);
}list;
```

* 字典（用哈希table,链地址法实现，字典里面next指针指向下一个具有相同索引值的哈希表节点）
```
typedef struct dictht{
     //哈希表数组
     dictEntry **table;
     //哈希表大小
     unsigned long size;
     //哈希表大小掩码，用于计算索引值
     //总是等于 size-1
     unsigned long sizemask;
     //该哈希表已有节点的数量
     unsigned long used;
 
}dictht

typedef struct dictEntry{
     //键
     void *key;
     //值
     union{
          void *val;
          uint64_tu64;
          int64_ts64;
     }v;
 
     //指向下一个哈希表节点，形成链表
     struct dictEntry *next;
}dictEntry
```

* 跳跃表 (多层链表结构组成)
```
typedef struct zskiplistNode {
     //层
     struct zskiplistLevel{
           //前进指针
           struct zskiplistNode *forward;
           //跨度
           unsigned int span;
     }level[];
 
     //后退指针
     struct zskiplistNode *backward;
     //分值
     double score;
     //成员对象
     robj *obj;
 
} zskiplistNode

typedef struct zskiplist{
     //表头节点和表尾节点
     structz skiplistNode *header, *tail;
     //表中节点的数量
     unsigned long length;
     //表中层数最大的节点的层数
     int level;
 
}zskiplist;
```

* 整数集合 (支持多种类型的整数值)
```
typedef struct intset{
     //编码方式
     uint32_t encoding;
     //集合包含的元素数量
     uint32_t length;
     //保存元素的数组
     int8_t contents[];
 
}intset;
```

* 压缩列表 （压缩列表并不是对数据利用某种算法进行压缩，而是将数据按照一定规则编码在一块连续的内存区域，目的是节省内存）
①、previous_entry_ength：记录压缩列表前一个字节的长度。previous_entry_ength的长度可能是1个字节或者是5个字节，如果上一个节点的长度小于254，则该节点只需要一个字节就可以表示前一个节点的长度了，如果前一个节点的长度大于等于254，则previous length的第一个字节为254，后面用四个字节表示当前节点前一个节点的长度。利用此原理即当前节点位置减去上一个节点的长度即得到上一个节点的起始位置，压缩列表可以从尾部向头部遍历。这么做很有效地减少了内存的浪费。
②、encoding：节点的encoding保存的是节点的content的内容类型以及长度，encoding类型一共有两种，一种字节数组一种是整数，encoding区域长度为1字节、2字节或者5字节长。
③、content：content区域用于保存节点的内容，节点内容类型和长度由encoding决定。


## redis 持久化
https://juejin.im/post/5d09a9ff51882577eb133aa9#heading-9
* RDB （快照存储持久化方式）
* * 将redis莫一刻内存数据保存到硬盘文件，dump.rdb
* * 服务器启动时加载到内存中恢复数据
* * 命令触发： save/bgsave(开启子进程，异步操作，fock子进程过程是同步的)
* * 执行过程：生成临时rdb写入数据，完成时替换正式rdb，删除旧文件
```
# 是否压缩rdb文件
rdbcompression yes

# rdb文件的名称
dbfilename redis-6379.rdb

# rdb文件保存目录
dir ~/redis/
```

* AOF (Append-only file)
* * AOF持久化方式会记录客户端对服务器的每一次写操作命令，并将这些写操作以Redis协议追加保存到以后缀为aof文件末尾
* * 三种写入策略： always/everysec（每秒写）/no(又操作系统决定什么时候写，不建议)
* * 两种重写方式： no-appendfsync-on-rewrite(以配置的方式开启)/bgrewriteaof（命令触发）
* * AOF文件损坏时： redis-check-aof -fix file.aof 修复
```
# 开启aof机制
appendonly yes

# aof文件名
appendfilename "appendonly.aof"

# 写入策略,always表示每个写操作都保存到aof文件中,也可以是everysec或no
appendfsync always

# 默认不重写aof文件
no-appendfsync-on-rewrite no

# 保存目录
dir ~/redis/
```


## redis 回收机制
https://juejin.im/post/5d107ad851882576df7fba9e#heading-16
redis结构体结构：
```
typedef struct redisDb {
        dict *dict;                 /* 数据库的键空间，保存数据库中的所有键值对 */
        dict *expires;              /* 保存所有过期的键 */
        dict *blocking_keys;        /* Keys with clients waiting for data (BLPOP)*/
        dict *ready_keys;           /* Blocked keys that received a PUSH */
        dict *watched_keys;         /* WATCHED keys for MULTI/EXEC CAS */
        int id;                     /* 数据库ID字段，代表不同的数据库 */
        long long avg_ttl;          /* Average TTL, just for stats */
} redisDb;
```
* 用字典来保存每一个键值对
* expire过期方式：
* * 设置了过期时间的，过期后加入expires
* * 调用 expire命令，过期的key
* * 恢复或修改数据时，过期的key


### 过期删除策略
* 定时删除（key过期回收， redis并未采用，会有很多timerfd）
* * 对于每一个设置了过期时间的key都会创建一个定时器，一旦到达过期时间就立即删除，消耗CPU

* 惰性删除（查询的时候，看key有没有过期，触发回收）
* * 当访问一个key时，才判断该key是否过期，过期则删除。节省CPU资源，对内存却十分不友好。有一种极端的情况是可能出现大量的过期key没有被再次访问，因此不会被清除，导致占用了大量的内存。
* 定期删除（每隔一段时间，删除过期key, 默认时100ms执行一次）
* * 每隔一段时间，扫描Redis中过期key字典，并清除部分过期的key，还可以通过调整定时扫描的时间间隔和每次扫描的限定耗时

* del
* unlink

### 过期删除策略实现
* 启动时注册时间事件，在定时器回调过程中执行
* 访问key时，若过期则清除
* 每次事件循环执行时，主动清理部分过期的key

总结：
Redis的过期删除策略是在启动时注册了serverCron函数，每一个时间时钟周期，都会抽取expires字典中的部分key进行清理，从而实现定期删除
Redis会在访问key时判断key是否过期，如果过期了，就删除
以及每一次Redis访问事件到来时，beforeSleep都会调用activeExpireCycle函数，在1ms时间内主动清理部分key，这是惰性删除的实现


### 内存淘汰策略
Redis的内存淘汰策略，是指内存达到maxmemory极限时，使用某种算法来决定清理掉哪些数据，以保证新数据的存入

* noeviction: 当内存不足以容纳新写入数据时，新写入操作会报错。
* allkeys-lru：当内存不足以容纳新写入数据时，在键空间（server.db[i].dict）中，移除最近最少使用的 key（这个是最常用的）。
* allkeys-random：当内存不足以容纳新写入数据时，在键空间（server.db[i].dict）中，随机移除某个 key。
* volatile-lru：当内存不足以容纳新写入数据时，在设置了过期时间的键空间（server.db[i].expires）中，移除最近最少使用的 key。
* volatile-random：当内存不足以容纳新写入数据时，在设置了过期时间的键空间（server.db[i].expires）中，随机移除某个 key。
* volatile-ttl：当内存不足以容纳新写入数据时，在设置了过期时间的键空间（server.db[i].expires）中，有更早过期时间的 key 优先移除。

淘汰时机： 每一次执行命令时，检查是否达到最大内存，是则出发内存淘汰

## redis异步非阻塞
维护EventLoop对象
里面有两个数组events,fired。events存放被注册的事件，fired用于存放EventLoop从多路复用器（epoll）中读取到的，将要执行的事件
异步和非阻塞就反映在这里，注册到多路复用器（epoll）后去做其他事，之后通过主动轮询多路复用器，来逐个取出将要执行的事件，放入fired，逐个执行


## redis五种数据结构
* string => set/del   SDS

集合类型
* list => lpush/lpop
* hash => hset/hdel
* set => sadd/srem
* zset => zadd/zrem

* bitmap => 位图存储
* geo => 地理空间key存储， 二分法bit位
* hyperloglog => 内存非常小，聚合查询快，但存在偏差
* streams => 发布订阅多组模式
https://www.cnblogs.com/CryFace/p/13762241.html

## redis lua
script.lua
```
local key = "rate.limit:" .. KEYS[1]
local limit = tonumber(ARGV[1])
local expire_time = ARGV[2]

local is_exists = redis.call("EXISTS", key)
if is_exists == 1 then
    if redis.call("INCR", key) > limit then
        return 0
    else
        return 1
    end
else
    redis.call("SET", key, 1)
    redis.call("EXPIRE", key, expire_time)
    return 1
end
```
return 1 == (long) connection.eval(loadScriptString("script.lua"), keys, argv);


## redis发布订阅
subscribe cesar
publish cesar "hello word"

## redis 一致性hash
hash环对2^32取模


## redis主从，哨兵，集群的区别
主从：一主一从，启动时从库向主库发送sync命令，主库收到sync命令后在生成快照，并缓存保存快照期间收到的命令，当快照完成时，主库将快照和缓存的命令一起发送给从库，从库进行重放
哨兵：哨兵机制主要解决主从模式中当主库发送故障，需要人为手动将从库升级为主库的问题。哨兵的作用就是监控redis主从数据库是否正常运行，主出现故障自动将从数据库转换为主数据库
集群：redis实例存储的内容是完整的数据，浪费内存，为了最大划利用内存，采用集群模式，就是分布式存储。每台redis存储不同的内容，集群至少是三主三从


## redis 缓存雪崩，缓存击穿，缓存穿透
* 缓存雪崩: 大量key同一时间过期，redis故障 => 减少key同一时间过期，限流，熔断机制
* 缓存击穿: 热点key过期 => 热点key不设置过期时间
* 缓存穿透: 数据在redis/mysql中都不存在 => 设置空值


## redis 原子操作
* multi exec
* lua脚本

## redis 锁
setnx
getset
比如解决死锁，保证只有一个线程
https://blog.csdn.net/wcuuchina/article/details/89154434

## 电商抢购案例
* 前端CDN
* 后端nginx限流，放少量链接进来
* redis锁，不能超卖

