> <<从0开始学架构>> 学习笔记Day11：高可用架构模式-CAP理论


CAP 定理（CAP theorem）又被称作布鲁尔定理（Brewer's theorem），是加州大学伯克利分校的计算机科学家埃里克·布鲁尔（Eric Brewer）在 2000 年的 ACM PODC 上提出的一个猜想。2002 年，麻省理工学院的赛斯·吉尔伯特（Seth Gilbert）和南希·林奇（Nancy Lynch）发表了布鲁尔猜想的证明，使之成为分布式计算领域公认的一个定理。对于设计分布式系统的架构师来说，CAP 是必须掌握的理论。

# CAP理论

### C

一致性（Consistency）

对某个指定的客户端来说，读操作保证能够返回最新的写操作结果

### A

可用性（Availability）

非故障的节点在合理的时间内返回合理的响应（不是错误和超时的响应）

### P

分区容忍性（Partition Tolerance）

当出现网络分区后，系统能够继续“履行职责”

# CAP应用

1.CP - Consistency/Partition Tolerance

为了保证一致性，当发生分区现象后，N1 节点上的数据已经更新到 y，但由于 N1 和 N2 之间的复制通道中断，数据 y 无法同步到 N2，N2 节点上的数据还是 x。这时客户端 C 访问 N2 时，N2 需要返回 Error，提示客户端 C“系统现在发生了错误”，这种处理方式违背了可用性（Availability）的要求，因此 CAP 三者只能满足 CP。

![](https://static001.geekbang.org/resource/image/6e/d7/6e7d7bd54d7a4eb67918080863d354d7.png?wh=337*289)

2.AP - Availability/Partition Tolerance

为了保证可用性，当发生分区现象后，N1 节点上的数据已经更新到 y，但由于 N1 和 N2 之间的复制通道中断，数据 y 无法同步到 N2，N2 节点上的数据还是 x。这时客户端 C 访问 N2 时，N2 将当前自己拥有的数据 x 返回给客户端 C 了，而实际上当前最新的数据已经是 y 了，这就不满足一致性（Consistency）的要求了

![](https://static001.geekbang.org/resource/image/2c/d6/2ccafe41de9bd7f8dec4658f004310d6.png?wh=334*287)


# 总结

虽然 CAP 理论定义是三个要素中只能取两个，但放到分布式环境下来思考，我们会发现必须选择 P（分区容忍）要素，因为网络本身无法做到 100% 可靠，有可能出故障，所以分区是一个必然的现象。如果我们选择了 CA 而放弃了 P，那么当发生分区现象时，为了保证 C，系统需要禁止写入，当有写入请求时，系统返回 error（例如，当前系统不允许写入），这又和 A 冲突了，因为 A 要求返回 no error 和 no timeout。因此，分布式系统理论上不可能选择 CA 架构，只能选择 CP 或者 AP 架构。

在大多数场景下选择AP架构，而一致性是通过最终一致性来妥协实现的
