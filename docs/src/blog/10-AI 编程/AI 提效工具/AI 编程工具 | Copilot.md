# 一、介绍

GitHub Copilot 是 GitHub 和 OpenAI 合作开发的一个 AI 辅助编程工具

官网地址：https://github.com/features/copilot

官方文档：https://docs.github.com/copilot

# 二、安装

在 VSCode 插件下载页面，搜索 Github Copilot 插件并安装

![](https://files.mdnice.com/user/855/0d5ee715-5d73-4ac0-bae9-72b7feeb2f56.png)

登录 Github Copilot

![](https://files.mdnice.com/user/855/9b449972-26cc-425c-9c4c-92fb0ea45db4.png)

弹出页面申请免费试用 30 天，后面要收费

![](https://files.mdnice.com/user/855/ca86fc5b-3430-443f-b5a6-f3c2c061923e.png)

填写信息认证

![](https://files.mdnice.com/user/855/5ae9d0b5-3edd-47d0-8cf5-f9e59250d4d0.png)

填写信用卡认证信息

![](https://files.mdnice.com/user/855/ada367f2-979c-406d-9896-281a73d5dddf.png)

认证成功

![](https://files.mdnice.com/user/855/d60d738b-5bfb-4137-af18-773ac343be9a.png)

试用成功，重启 VSCode 即可使用

![](https://files.mdnice.com/user/855/6613c8bc-aaef-49d4-9fb3-be67046c46fe.png)

# 三、功能

## 一）代码补全

根据已经输入的代码，以及代码的上下文，智能地推断出您接下来可能要输入的代码，并进行补全

![](https://files.mdnice.com/user/855/4133e775-f30c-47a4-bd4c-36f069ad2174.png)

## 二）注释生成代码

根据注释生成常用代码片段

![](https://files.mdnice.com/user/855/6a4d8cb3-7b65-46f0-96a6-7fd5c0887e34.png)

## 三）代码注释

它会自动分析代码的功能，然后添加相应的注释，这对于提高代码的可读性和后期维护都有很大帮助。操作就是，你只需要在函数面前加上注释符 // 即可。
这对于我们去了解别人的代码效率直接翻倍，也让不喜欢写注释的同学解放双手。

![](https://files.mdnice.com/user/855/856e960a-be0c-4cec-a584-64e45abfcf48.png)

## 四）代码对话

只需要 // q: 回车，AI 会给你答案。当然，侧边栏也可以单独聊天，和 ChatGPT 一样

![](https://files.mdnice.com/user/855/b9752fd9-efac-4b65-bec0-499375fab5fe.png)

## 五）Copliot Chat 指令

/tests：为选定的代码生成单元测试

/fix：针对所选代码中的问题提出修复建议

/explain：解释所选代码的工作原理

/vscode：询问关于 VS Code 的问题

/help：关于 GitHub Copilot 的一般帮助

![](https://files.mdnice.com/user/855/ad88f21f-9d9d-4994-be34-b0b252f52fb2.png)

# 四、优缺点

优点：

1）代码建议准确率高

2）支持多种语言

3）支持多种编辑器

4）支持多种操作系统

缺点：

1）复杂代码支持不佳

# 五、原理

Copilot 的核心是一个基于 GPT-3.5 的大规模预训练模型，它可以通过大量的代码片段进行训练，从而学习到代码的语法、语义、结构等信息，然后在编写代码时，根据上下文，生成代码片段，从而提供代码建议
