# vscode

## 介绍

## 安装

## 配置

### 截屏模式

该模式可以将按钮与鼠标操作在屏幕上显示，非常适合讲解使用

开启方式：`ctrl+shift+p` 后选择 `screen`

![](https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/image-20230530165847266.png)

效果：实时显示屏幕按键

### 滚动缩放

开启方式：vscode -> 文本编辑器 > 勾选 Editor: Mouse Wheel Zoom

![](https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/image-20230530170530925.png)

效果：按住ctrl+滚轮达到放大的效果

### 平滑移动

1. 开启方式：修改 `系统偏好设置 > 键盘` 更改 **按键重复** 与 **重复前延迟**

![](https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/image-20230530172150452.png)

在命令行执行以下命令

```
# For VSCode
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false

# For VSCode Insiders
defaults write com.microsoft.VSCodeInsiders ApplePressAndHoldEnabled -bool false
```

### 滚动置顶

1. 开启方式：vscode -> 文本编辑器 > 勾选 Sticky Scroll: Enabled

![](https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/image-20230531211518173.png)

## 使用

vim Keyboard shortcuts for Mac

https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf （转成markdown）

Ctrl: 低频操作（切换）

Command：高频操作（编辑）

| 指令                      | 说明                         | 源                                 |
| :------------------------ | ---------------------------- | ---------------------------------- |
| Command + Shift + P       | 打开命令看板                 | 软件默认                           |
| Command + ,               | 打开软件设置                 |                                    |
| Command + Shift + D       | 调试面板                     |                                    |
| Command + Shift +  X      | 打开插件安装                 |                                    |
| Command + K  Command + S  | 打开快捷键设置               |                                    |
| Command + P               | 搜索文件                     |                                    |
| Command + Shift + O       | 搜索函数                     |                                    |
| Command  + B              | 切换左侧菜单                 |                                    |
| Command  + J              | 切换下侧菜单                 |                                    |
| Command + L               | 选中当前行                   |                                    |
| Command + D (Command + M) | 将下一个查找匹配项添加到选择 |                                    |
| Command + E               | 查找指定内容                 |                                    |
| Command + F               | 查找搜索内容                 |                                    |
| Command + Shift + F       | 多个文件中查找搜索内容       |                                    |
| Command + G               | 查找下一个                   |                                    |
| Command + Shift + G       | 查找上一个                   |                                    |
| Command + O               | 打开项目/文件                |                                    |
| Command + T               | 搜索结构体                   |                                    |
| Command + +               | 放大                         |                                    |
| Command + -               | 缩小                         |                                    |
| Command + Z               | 撤销                         |                                    |
| Command + Shift + Z       | 恢复撤销                     |                                    |
| Command + /               | 切换行注释                   |                                    |
| Command + X               | 剪切删除                     |                                    |
| Ctrl  + D (Command+D)     | 向后删除 deleteRight         |                                    |
| Ctrl  + H (Command+H)     | 向前删除 deleteLeft          |                                    |
| Ctrl  + O                 | lineBreakInsert              |                                    |
| Ctrl + `                  | 切换终端                     |                                    |
| Ctrl + R                  | 切换项目                     |                                    |
|                           |                              |                                    |
| Ctrl + G                  | 定位行号                     |                                    |
| Ctrl + A                  | 移动到行首                   |                                    |
| Ctrl + E                  | 移动到行尾                   |                                    |
| Ctrl + I                  | 上移                         | 系统更改方向键                     |
| Ctrl + K                  | 下移                         | 系统更改方向键                     |
| Ctrl + J                  | 左移                         | 系统更改方向键                     |
| Ctrl + L                  | 右移                         | 系统更改方向键                     |
| Ctrl + shift + I          | 向上选择多行                 | shift + 方向键                     |
| Ctrl + shift + K          | 向下选择多行                 | shift + 方向键                     |
| Ctrl + shift + J          | 向左选择多个单词             | shift + 方向键                     |
| Ctrl + shift + L          | 向右选择多个单词             | shift + 方向键                     |
| Ctrl + shift + ]          | 转到实现                     | Go插件修改快捷键,  默认Command+F12 |
| Ctrl + ]                  | 转到定义                     | Go插件修改快捷键,  默认F12         |
| Ctrl + [                  | 返回上一级                   | vscode修改快捷键, 默认Ctrl + -     |
| Command + ]               | 行缩进                       | vscode修改快捷键, 默认Ctrl + ]     |
| Command + [               | 行减少缩进                   | vscode修改快捷键, 默认Ctrl + [     |
|                           |                              |                                    |

## 配置

### 主题

插件：Monokai Pro

### 字体

cascadia-code： https://github.com/microsoft/cascadia-code

在vscode配置中搜索`Editor: Font Family` 并设置以下值

```text
'Cascadia Code', 'JetBrains Mono','Fira Code',Menlo,Monaco, 'Courier New', monospace
```

需要在配置中将连字打开（设置中搜索`fontLigatures`关键词）

```text
"editor.fontFamily": "'Fira Code','JetBrains Mono'",
"editor.fontLigatures": true,
```

### 图标

插件：Material Theme Icons

## 插件

### Go

支持功能：函数跳转 

修改快捷键  "转到定义"

Go: Test File：设置快捷键 Command + Shift + T

Go: Benchmark File:  设置快捷键 Command + Shift + B

### Dyno File Utils

The best way to create, copy, move, rename and delete files and folders (multiple files) & create templates

https://marketplace.visualstudio.com/items?itemName=dyno-nguyen.vscode-dynofileutils

dynoFileUtils.renameFile:  修改快捷键 Option + R

### vscode-element-helper

### Vetur

### Prettier

配置

```text
{
  "arrowParens": "always",
  "bracketSameLine": true,
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxSingleQuote": false,
  "printWidth": 120,
  "proseWrap": "never",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false,
  "vueIndentScriptAndStyle": false,
  "singleAttributePerLine": false
}
```

### Jupyter Notebook Renderers

### vim-sneak

### im-select

### CodeGeeX

### Open in Finder

### go-run

可自动在终端中执行go run filename指令，并将快捷键修改为Command + Shift + R

## 最佳实践

隐藏左侧菜单：Command + B

切换项目：Ctrl + r

将插件支持的命令（标题） 在快捷方式中搜索，然后设置快捷键，方便快捷操作

Git查看文件历史记录

![](https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/image-20230601182144521.png)

![](https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/image-20230602220353063.png)



单步调试