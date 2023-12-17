# 一、什么是线程模型

线程创建、管理、调度等采用的方式称为线程模型，线程模型一般分为以下三种：`内核级线程模型`、`用户级线程模型`、`两级线程模型`，他们的区别在于用户线程与内核线程之间的对应关系，用户级线程由应用程序管理，而内核级线程由操作系统管理。

# 二、三种线程模型

## 内核级线程模型（1：1）

1 个用户线程对应 1 个内核线程，这种最容易实现，协程的调度都由 CPU 完成了

![](https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/ult_klt_1_1.jpg#id=W2JCh&originHeight=918&originWidth=1038&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

优点：

- 实现起来最简单
- 能够利用多核
- 如果进程中的一个线程被阻塞，不会阻塞其他线程，是能够切换同一进程内的其他线程继续执行

缺点：

- 上下文切换成本高，创建、删除和切换都由 CPU 完成（创建一个用户线程，就需要创建一个内核线程，发生一次系统调用）

## 用户级线程模型（N：1）

1 个进程中的所有线程对应 1 个内核线程
![](https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/ult_klt_n_1.jpg#id=ETmHc&originHeight=938&originWidth=1032&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
优点：

- 上下文切换成本低，在用户态即可完成协程切换

缺点：

- 无法利用多核
- 一旦协程阻塞，造成线程阻塞，本线程的其它协程无法执行

## 两级线程模型（M：N)

M 个线程对应 N 个内核线程

![](https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/ult_klt_n_m.jpg#id=Usv0V&originHeight=932&originWidth=1012&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

优点：

- 能够利用多核
- 上下文切换成本低
- 如果进程中的一个线程被阻塞，不会阻塞其他线程，会切换同一进程内的其他线程继续执行

缺点：

- 实现起来最复杂

# 三、总结

Go 实现的就是两级线程模型（M：N)，准确的说是 GMP 模型，是对两级线程模型的改进实现，使它能够更加灵活地进行线程之间的调度。
