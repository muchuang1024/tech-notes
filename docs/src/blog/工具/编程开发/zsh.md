# ZSH

## 介绍

Zsh（Z Shell）是一种功能强大的命令行 shell，是 Bash（Bourne Again Shell）的一种替代品。相比于 Bash，Zsh 提供了更多的功能和配置选项，使命令行操作更加高效和便捷。

## 安装

### 安装zsh

```
brew install zsh
chsh -s /usr/local/bin/zsh #将 Zsh 设置为默认的 shell
echo $SHELL # 查看当前shell
```

### 安装 oh my zsh

oh my zsh 是 zsh 框架，可以管理 zsh 配置，并提供了丰富的插件

```
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
```

## 配置

### 修改主题

修改配置文件 ~/.zshrc 中的 ZSH_THEME 来设置使用的风格

```
ZSH_THEME="robbyrussell"
```

更新配置也可以选择重起终端

```
source ~/.zshrc
```

## 效果

![](https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/zsh.png)

## 我的配置

[.zshrc](https://github.com/caijinlin/dotfiles/blob/master/zsh/.zshrc)