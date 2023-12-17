一般遇到问题，都会上百度、Google 等网站找答案，最近发现一个牛逼的搜索引擎网站 Devv.ai，使用 AI 做的，非常适合程序员，排查技术相关问题

Devv.ai 是一款新一代的人工智能搜索引擎，专为程序员设计。该网站的目标是提供更快速、准确的编程解决方案，以提高开发效率。

网址：https://devv.ai/

首页非常简洁，可以设置语言、背景主题、预设编程语言

![](https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231217182548804.png)

在搜索框，输入问题后，左侧即可显示答案和其它推荐的问题，右侧显示相关网址，这里的网址都是专业的网站，点击链接可跳转到对应的地址

![](https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231217181743346.png)

那么，它和传统的搜索引擎相比，有什么优势呢？我总结了下有如下优点：

1、回答更加清晰和直观，直接给出回答，并罗列几个步骤

2、回答更加准确，按照回答操作，基本能解决问题

3、回答的相关网站质量高，信息源来自权威的网站

下面举个例子看下，比如最近我部署 vuepress 博客的时候，执行 yarn dev 命令时，出现了一个错误

![](https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231217173008965.png)

```
Error: EACCES: permission denied, rmdir '/usr/local/lib/node_modules/vuepress/node_modules/@vuepress
```

对比了下几个搜索引擎的效果，发现 devv 回答质量更高，准确率最高

1、GPT 搜索结果

回答直观，但步骤没有 devv 清晰有效

![](https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231217173427874.png)

2、google 搜索结果

回答不直观，需要找到相关性最高的网页，再找到回答，增加了筛选的时间

![google](https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231217173157363.png)

3、devv 搜索结果

回答直观，并且准确，不愧为新一代搜索引擎

![devv](https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231217173101729.png)

按照 devv 给的搜索结果，可以看到是权限问题

按照步骤一，看到目录的权限是 root

![](https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231217173616005.png)

按照步骤二，将目录的权限修改为当前用户

![](https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231217173639732.png)

重新执行 yarn dev 命令，正常跑起来了，问题解决

![](https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231217173705814.png)

devv 直接一步给出回答，还能保证回答的准确性，简直太香了

如果是传统的搜索引擎，首先得找到相关性最高的网页，然后再从网页步骤中找答案，还不能保证答案可行

借助 AI 搜索引擎 ，真的能提高程序员的效率，传统搜索引擎或许也得考虑引入 AI 了

作为程序员，遇到问题，借助搜索引擎解决问题，是一件非常高的操作

效率非常重要，当工作经验到一定年限了，拼的就是效率了，如果你能更快解决问题，或许就被裁的就不是你了
