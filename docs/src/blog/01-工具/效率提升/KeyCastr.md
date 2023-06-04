# KeyCastr

## 介绍

[https://github.com/keycastr/keycastr](https://github.com/keycastr/keycastr)

KeyCastr是一款 GitHub 上的开源免费软件，它可以让 Mac 在屏幕上实时显示你按下的键盘符号，比如在键盘上按了「command + A」键，屏幕上就会显示「⌘ A」符号。

这个软件很适合在录屏的时候使用，比如要录制某个软件的使用教程，经常会用到快捷键，有了这个软件就可以让观众更直观的看到你按了什么快捷键，从而提高观众的观看体验。

通过该软件还能清楚地看到⌘（Command）、⌥（Option）等对应的键位，很多人经常会分不清楚他们对应的键位。


## 安装

Mac 下通过brew安装

```
brew install --cask keycastr
```

## 配置

### 权限设置

软件安装完成后，第一次打开时会提示需要开启一些权限，按照提示开启即可。

macOS 10.14 或更低版本，「系统偏好设置」-「安全性与隐私」-「辅助功能」里面手动将KeyCastr添加到「辅助功能」里面；

macOS 10.15 或更高的系统版本中，「系统偏好设置」-「安全性与隐私」-「输入监听」里直接勾选KeyCastr 即可。

![](https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/image-20210321223326200.png)

### 偏好设置

将显示模式改为 Svelte 即可; 默认情况下，该模式只显示四个特殊键位，勾选上 [Display all keystrokes] 即可显示全部键位

![](https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/image-20210321223741117.png)

## 效果

实时显示按键，按键显示位置可以拖拽到你想要的任何位置

![KeyCastr](https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/KeyCastr.gif)