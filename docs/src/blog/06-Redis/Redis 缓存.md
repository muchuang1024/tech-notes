## 缓存穿透

- 现象：访问不存在的数据，缓存和数据库都没有

- 解决办法：缓存空值或者缓存前增加BloomFilter判断

## 缓存击穿

- 现象:  热点key过期，缓存没有，数据库有
- 解决办法：互斥锁，一个线程访问数据库更新缓存

## 缓存雪崩

- 现象：大量缓存同时过期，缓存没有，数据库有
- 解决办法：设置不同的过期时间（永不过期）



https://www.quora.com/What-are-the-best-tips-for-writing-a-resume
https://vadimkravcenko.com/shorts/habits-of-great-software-engineers/
https://www.zhihu.com/xen/market/ecom-page/1713335111771230208?theme=light
https://dev.to/

https://medium.com/@abhi454300/speed-boost-for-devs-how-ai-tools-supercharge-your-coding-journey-74464efa3037