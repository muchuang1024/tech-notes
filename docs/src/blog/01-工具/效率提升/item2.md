# item2

## 介绍

Iterm2 是苹果系统增加的命令行终端工具，定制化很强使用方便，并且外观也好看，包含拆分窗格等功能

## 安装

直接从官网下载安装即可：https://iterm2.com/

## 配置

启动时固定全屏

![](https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/image-20230603181532485.png)

## 使用

### 查找

* `ctrl + p` 上一条命令
* `ctrl + n` 下一条命令
* `ctrl + r` 查找历史命令
* `ctrl + i` 包含当前关键字的上一个命令
* `command + ;` 自动列出之前输入过的类似命令

### 移动

* `ctrl + a/ctrl + e` 移动到行首/行尾
* `ctrl + f/ctrl +b ` 前后移动字符
* `option + → | ←` 前后移动单词（https://blog.csdn.net/skyyws/article/details/78480132）

### 删除

* `ctrl + d/ctrl + h` 删除当前光标、当前光标之前的字符
* `ctrl + w` 删除光标之前的单词
* `ctrl + k` 删除到文本末尾
* `ctrl + u` 清除当前行

### 替换

* `ctrl + t` 交换光标处文本

### 撤销

* `ctrl + -` 撤销

### 分屏

* `command + d` 上下分屏
* `command + shift + d` 左右分屏
* `command + ]` 切换分屏 
* `command + w` 关闭分屏


### 标签

* `command + t` 新建标签
* `ctrl + tab` 切换标签
* `command + w` 关闭标签

## 插件

[iterm2-recv-zmodem.sh](https://github.com/caijinlin/dotfiles/blob/master/item2/iterm2-recv-zmodem.sh)

[iterm2-send-zmodem.sh](https://github.com/caijinlin/dotfiles/blob/master/item2/iterm2-send-zmodem.sh)

