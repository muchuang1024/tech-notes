# vscode

## 介绍

## 安装

## 配置

### 主题

颜色主题：Monokai Pro (Filter Machine)

文件图标主题：Material Theme Icons

产品图标主题：默认

### 字体

cascadia-code： https://github.com/microsoft/cascadia-code

在 vscode 配置中搜索`Editor: Font Family` 并设置以下值

```text
'Cascadia Code', 'JetBrains Mono','Fira Code',Menlo,Monaco, 'Courier New', monospace
```

需要在配置中将连字打开（设置中搜索`fontLigatures`关键词）

```text
"editor.fontFamily": "'Fira Code','JetBrains Mono'",
"editor.fontLigatures": true,
```

### 截屏模式

该模式可以将按钮与鼠标操作在屏幕上显示，非常适合讲解使用

开启方式：`ctrl+shift+p` 后选择 `screen`

![](https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/image-20230530165847266.png)

效果：实时显示屏幕按键

### 滚动缩放

开启方式：vscode -> 文本编辑器 > 勾选 Editor: Mouse Wheel Zoom

![](https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/image-20230530170530925.png)

效果：按住 ctrl+滚轮达到放大的效果

### 平滑移动

1. vscode 设置开启 `"editor.cursorSmoothCaretAnimation": true`

2. 修改 Mac `系统偏好设置 > 键盘` 更改 **按键重复** 与 **重复前延迟**

![](https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/image-20230530172150452.png)

3. 在终端执行以下命令

```
# For VSCode
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false

# For VSCode Insiders
defaults write com.microsoft.VSCodeInsiders ApplePressAndHoldEnabled -bool false
```

### 滚动置顶

1. 开启方式：vscode -> 文本编辑器 > 勾选 Sticky Scroll: Enabled

![](https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/image-20230531211518173.png)

### 括号配对

勾选 Bracket Pairs 相关设置

![](https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/image-20230624065106652.png)

### 终端命令

命令面板安装 `code` 命令，就可以在终端中使用 Visual Studio Code 打开文件或目录

## 插件

### 通用插件

| 插件                              | 功能             | 设置 |
| --------------------------------- | ---------------- | ---- |
| Dyno File Utils                   | 新建/重命名文件  |      |
| CodeGeeX                          | 代码自动补全     |      |
| Open in Finder                    | 使用 Finder 打开 |      |
| GitLens                           | Git 版本历史     |      |
| Bracket Pair Colorization Toggler | 括号匹配         |      |
| `expand-region`                   | 扩大选择代码区域 |      |
| tabnine                           | AI 代码自动补全  |      |

### Go 插件

| 插件   | 功能                              | 设置                                                                                                   |
| ------ | --------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Go     | Go 语言支持                       | Go: Test File：设置快捷键 Command + Shift + T;<br />Go: Benchmark File: 设置快捷键 Command + Shift + B |
| go-run | 在终端中执行 go run filename 指令 | 设置快捷键 Command + Shift + R                                                                         |

Notice: 在 Visual Studio Code 中，通过将 "go.buildFlags": ["-mod=mod"] 添加到设置中，你告诉 Go 扩展在构建和执行代码时使用模块模式，这样就可以在代码跳转到 replace 指令对应的目录而不是 vendor 目录。

### Python 插件

| 插件            | 功能                               | 设置                                        |
| --------------- | ---------------------------------- | ------------------------------------------- |
| Python          | Python 语言支持                    |                                             |
| black           | python 代码格式化                  | 右键格式化文档选择 black 作为默认格式化程序 |
| Pylance         | 代码自动完成、类型检查、重构等功能 |                                             |
| python snippets | python 代码片段                    |                                             |

### 前端插件

| 插件                       | 功能                             | 设置                             |
| -------------------------- | -------------------------------- | -------------------------------- |
| vscode-element-helper      |                                  |                                  |
| Volar                      | vue3 支持插件                    |                                  |
| TypeScript Vue Plugin      | volar 的 typescript 类型支持插件 |                                  |
| Prettier                   | 代码格式化                       | [prettier](./vscode/prettier.md) |
| ESLint                     | 代码规范检查                     |                                  |
| Highlight Matching Tag     | 高亮匹配标签\选择匹配标签的内容  | 选择                             |
| Live Server                | 浏览器自动刷新                   |                                  |
|                            |                                  |                                  |
| unplugin-auto-import       |                                  |                                  |
| CSS PEEK                   |                                  |                                  |
| Emmet                      | Faster HTML & CSS Workflow       |                                  |
| Vue VSCode Snippets        |                                  |                                  |
| Vue 3 Support - All In One |                                  |                                  |
| Import Cost                | 显示包大小                       |                                  |

### Sql 插件

| 插件          | 功能       | 设置 |
| ------------- | ---------- | ---- |
| Sql Formatter | sql 格式化 |      |

### Vim 插件

| 插件      | 功能 | 设置 |
| --------- | ---- | ---- |
| vim-sneak |      |      |
| im-select |      |      |

## 使用

vim Keyboard shortcuts for Mac

https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf

Ctrl: 低频操作（切换）

Command：高频操作（编辑）

### 页面管理

| 指令                    | 标题                           | 源          |
| :---------------------- | ------------------------------ | ----------- |
| Command + Shift + P     | 打开命令看板                   | vscode 默认 |
| Command + Shift + D     | 打开调试面板                   | vscode 默认 |
| Command + Shift + X     | 打开插件安装                   | vscode 默认 |
| Command + Shift + U     | 显示输出面板 Show Output panel | vscode 默认 |
| Command + K Command + S | 打开快捷键设置                 | vscode 默认 |
| Command + ,             | 打开软件设置                   | vscode 默认 |
| Command + B             | 切换左侧菜单                   | vscode 默认 |
| Command + J             | 切换下侧菜单                   | vscode 默认 |
| Command + +             | 放大                           | vscode 默认 |
| Command + -             | 缩小                           | vscode 默认 |

### 文件管理

| 指令                 | 标题              | 源                   |
| :------------------- | ----------------- | -------------------- |
| Option + N           | New Items         | Dyno File Utils 插件 |
| Shift + Option + N   | New Items At Root | Dyno File Utils 插件 |
| Option + R           | Rename File       | Dyno File Utils 插件 |
| Option + D           | Duplicate File    | Dyno File Utils 插件 |
| Option + M           | Move File         | Dyno File Utils 插件 |
| Option + Del         | Delete File       | Dyno File Utils 插件 |
| Shift + Option + Del | Delete Folder     | Dyno File Utils 插件 |

### 代码导航

| 指令                      | 标题                 | 源          |
| :------------------------ | -------------------- | ----------- |
| Ctrl + W                  | 切换窗口             | vscode 默认 |
| Ctrl + R                  | 切换项目             | vscode 默认 |
| Ctrl + `                  | 切换终端             | vscode 默认 |
| Option + Command + 方向键 | 在打开的文件之间切换 | vscode 默认 |
| Command + P               | 搜索文件             | vscode 默认 |
| Command + O               | 打开目录             | vscode 默认 |
| Command + Shift + O       | 搜索函数             | vscode 默认 |
| Command + T               | 搜索结构体           | vscode 默认 |

### 代码跳转

| 指令             | 标题       | 源                                  |
| :--------------- | ---------- | ----------------------------------- |
| Ctrl + ]         | 转到定义   | Go 插件修改快捷键, 默认 F12         |
| Ctrl + shift + ] | 转到实现   | Go 插件修改快捷键, 默认 Command+F12 |
| Ctrl + [         | 返回上一级 | vscode 修改快捷键, 默认 Ctrl + -    |

### 代码运行

| 指令                | 标题                    | 源                          |
| :------------------ | ----------------------- | --------------------------- |
| Command + R         | 开始调试                | vscode 默认，默认 F5        |
| Command + Shift + T | 单元测试 （go test)     | Go 插件                     |
| Command + Shift + R | 运行 go 文件（go run)   | Go 插件                     |
| Command + Shift + B | 压力测试 (go benchmark) | Go 插件                     |
| Shift + T           | 测试                    | leetcode 插件（修改快捷键） |
| Shift + S           | 提交                    | leetcode 插件（修改快捷键） |

### 移动

| 指令        | 标题           | 源             |
| :---------- | -------------- | -------------- |
| Ctrl + G    | 定位行号       | vscode 默认    |
| Ctrl + A    | 移动到行首     | vscode 默认    |
| Ctrl + E    | 移动到行尾     | vscode 默认    |
| Ctrl + I    | 上移           | 系统更改方向键 |
| Ctrl + K    | 下移           | 系统更改方向键 |
| Ctrl + J    | 左移           | 系统更改方向键 |
| Ctrl + L    | 右移           | 系统更改方向键 |
| Command + ↑ | 移动到页面顶部 | 系统更改方向键 |
| Command + ↓ | 移动到页面末尾 | 系统更改方向键 |

### 查找选择

| 指令                | 标题                                         | 源                          |
| :------------------ | -------------------------------------------- | --------------------------- |
| Command + E         | 查找指定内容                                 | vscode 默认                 |
| Command + F         | 查找搜索内容                                 | vscode 默认                 |
| Command + Shift + F | 多个文件中查找搜索内容                       | vscode 默认                 |
| Command + Shift + H | 查找替换                                     | vscode 默认                 |
| Command + G         | 选中下一个与当前关闭处相同的单词             | vscode 默认                 |
| Command + Shift + G | 选中上一个与当前关闭处相同的单词             | vscode 默认                 |
| Command + D         | 增加选中下一个与当前关闭处相同的单词         | vscode 默认                 |
| Command + Shift + L | 选中所有与当前光标处相同的单词               | vscode 默认                 |
| Command + L         | 展开行选择                                   | vscode 默认                 |
| Shift + ↑           | 向上选择多行                                 | 系统更改方向键              |
| Shift + ↓           | 向下选择多行                                 | 系统更改方向键              |
| Shift + <-          | 向左选择多个单词                             | 系统更改方向键              |
| Shift + ->          | 向右选择多个单词                             | 系统更改方向键              |
| `Ctrl + W`          | 将选择范围扩展到单词、引号、方括号、函数体等 | expand-region 插件          |
| `Ctrl + U`          | 选择标签内的内容（不包括标签）               | Highlight Matching Tag 插件 |
| `Ctrl + shift + U`  | 选择标签内的内容（包括标签）                 | Highlight Matching Tag 插件 |

### 代码编辑

| 指令                | 说明                      | 源                               |
| :------------------ | ------------------------- | -------------------------------- |
| Command + C         | 复制                      | vscode 默认                      |
| Command + V         | 粘贴                      | vscode 默认                      |
| Command + Z         | 撤销                      | vscode 默认                      |
| Command + Shift + Z | 恢复撤销                  | vscode 默认                      |
| Command + /         | 切换行注释                | vscode 默认                      |
| Command + X         | 剪切删除                  | vscode 默认                      |
| Command + ]         | 行缩进                    | vscode 修改快捷键, 默认 Ctrl + ] |
| Command + [         | 行减少缩进                | vscode 修改快捷键, 默认 Ctrl + [ |
| Alt + ↑             | 向上移动行 Move line up   | vscode 默认                      |
| Alt + ↓             | 向下移动行 Move line down | vscode 默认                      |
| `Ctrl  + D`         | 向后删除 deleteRight      | vscode 默认（编辑引号的内容）    |
| `Ctrl  + H`         | 向前删除 deleteLeft       | vscode 默认                      |
| `Ctrl  + O`         | lineBreakInsert           | vscode 默认                      |

## 最佳实践

- 在终端中使用 `code` 命令来打开 Visual Studio Code
- 切换项目：Ctrl + R

- 隐藏左侧菜单：Command + B
- 隐藏下侧菜单：Command + J
- 开始调试：Command + R

- 将插件支持的命令（标题） 在快捷方式中搜索，然后设置快捷键，方便快捷操作

- Git 查看文件历史记录
