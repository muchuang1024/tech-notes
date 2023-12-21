# tmux

## 介绍

tmux（终端复用器）是一个在终端窗口中创建和管理多个会话的工具。它允许用户在一个终端窗口中同时运行多个终端会话，并在这些会话之间自由切换，实现终端复用和多任务管理的功能

tmux 包括会话、窗口、面板三个角色，以下是 tmux 的一些特点和用法：

会话管理：tmux 允许创建和管理多个会话，每个会话可以包含一个或多个窗口，窗口又可以分割为多个面板。这样可以在一个终端窗口中同时运行多个终端会话，便于在不同任务之间切换和管理。

窗口和面板：tmux 中的窗口类似于标签页，每个窗口可以包含一个或多个面板，面板则是终端窗口的分割区域。通过创建窗口和调整面板布局，可以在一个终端窗口中同时查看和操作多个终端会话。

快捷键操作：tmux 使用快捷键来执行各种操作，如创建会话、切换窗口、调整面板大小等。这些快捷键操作可以大大提高终端操作的效率和速度。

会话的持久化：tmux 允许用户在会话之间断开连接，并在重新连接后恢复之前的会话状态。这意味着你可以断开 SSH 连接或关闭终端窗口，然后在需要时重新连接并恢复之前的会话，无需重新打开和配置。

远程协作：tmux 支持多用户同时协作编辑同一个终端会话。多个用户可以同时连接到同一个 tmux 会话，并实时查看和编辑会话内容，方便团队协作和共享。

## 安装

```
brew install tmux
```

## 配置

### 字体图标

安装字体，有些风格的主题显示图标时就可以正常显示了

```
cd
git clone https://github.com/powerline/fonts.git --depth=1
cd fonts
./install.sh
cd ..
rm -rf fonts
```

安装完字体，在 item2 终端进行设置

![](https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/tmux_setting.png)

## 插件

### 安装插件管理器

```
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

### 安装插件

修改配置文件 ~/.tmux.conf 添加以下内容，然后在**tmux**中执行命令`prefix + I`安装插件(注意大写 I)，prefix 指前缀键（默认 ctrl + b, tmux 所有快捷键都要通过前缀键唤起)

```
# theme主题
set -g @plugin 'odedlaz/tmux-onedark-theme'

set -g @onedark_widgets "木川"
set -g @onedark_time_format "%I:%M"
set -g @onedark_date_format "%m.%d"
#set -g @onedark_date_format "%m:%d"

# 解决neovim中esc响应慢
set -s escape-time 0
set-option -g status-position bottom

# 自动保存会话
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'
set -g @plugin 'tmux-plugins/tmux-resurrect'
set -g @plugin 'tmux-plugins/tmux-continuum'
set -g @continuum-save-interval '15'
set -g @continuum-restore 'on'
set -g @resurrect-capture-pane-contents 'on'
run '~/.tmux/plugins/tpm/tpm'

# 设置自定义前缀
set -g prefix C-b
# 采用vim的操作方式
setw -g mode-keys vi
# 窗口序号从1开始计数
set -g base-index 1
# 开启鼠标模式
set-option -g mouse on

# 通过前缀+KJHL快速切换pane
#up
bind-key k select-pane -U
#down
bind-key j select-pane -D
#left
bind-key h select-pane -L
#right
bind-key l select-pane -R
```

重新加载配置项

```
tmux source ~/.tmux.conf
```

## 使用

Tmux 的最简操作流程:

通过`tmux new -s my_session`新建会话，在 Tmux 窗口运行所需的程序，按下快捷键`ctrl+b d`将会话分离
下次使用时，通过`tmux attach -t my_session`重新连接到会话

会话（session）、窗口（window）和窗格（pane）是层次结构关系的组成部分，用于管理和组织终端会话。

- 会话（session）：是 tmux 的最顶层概念，表示一个完整的终端会话。一个会话可以包含多个窗口，并且可以在后台运行，即使你关闭了终端窗口也不会中断。会话提供了一个持久的运行环境，可以在其中创建、切换和管理窗口。

- 窗口（window）：是会话中的一个独立工作区域，可以看作是一个可见的终端屏幕。每个窗口都有自己的编号和标签，并可以在会话中进行切换。你可以在一个窗口中运行一个应用程序或进程，并在不同窗口之间切换来进行不同的任务。

- 窗格（pane）：是窗口中的分割区域，可以将一个窗口划分为多个垂直或水平的窗格。每个窗格可以运行不同的命令或程序，并在同一个窗口内同时显示多个终端界面。通过窗格，你可以同时查看和操作多个终端会话。

总结关系：

- 一个会话（session）可以包含多个窗口（window）。
- 一个窗口可以被划分为多个窗格（pane）。
- 在一个会话中，可以通过切换窗口来在不同窗口之间进行切换。
- 在一个窗口中，可以通过切分窗格来创建多个并行运行的终端界面。

通过这种层次结构关系，tmux 提供了灵活的终端管理功能，使你能够高效地组织和控制多个终端会话和任务。

### 帮助

- `tmux list-commands` 所有命令
- `tmux list-keys` 所有快捷键
- `tmux list-sessions` 所有会话
- `tmux list-windows` 所有窗口
- `tmux list-panes` 所有窗格

### 会话管理 (session)

| shell 命令                        | 说明                        | 快捷键   |
| --------------------------------- | --------------------------- | -------- |
| tmux ls                           | 查看所有会话                |          |
| tmux new -s session_name          | 新建会话                    |          |
| tmux -CC                          | 新建会话（基于 item2 操作） |          |
| tmux attach -t session_name       | 进入会话                    |          |
| tmux rename-session session_name  | 重命名当前会话              | ctrl+b $ |
| tmux switch -t session_name       | 切换会话                    | ctrl+b s |
| tmux detach                       | 分离当前会话                | ctrl+b d |
| tmux kill-session                 | 杀死当前会话                |          |
| tmux kill-session -t session_name | 杀死指定会话                |          |

### 窗口管理 (window)

| shell 命令                        | 说明                 | 快捷键        |
| --------------------------------- | -------------------- | ------------- |
| tmux new-window -n window_name    | 新建窗口             | ctrl+b c      |
| tmux list-windows                 | 所有窗口             |               |
| tmux select-window -t window_name | 切换窗口             |               |
|                                   | 切换到上一个窗口     | ctrl+b p      |
|                                   | 切换到下一个窗口     | ctrl+b n      |
|                                   | 切换到指定编号的窗口 | ctrl+b number |
|                                   | 切换                 | ctrl+b w      |
| tmux rename-window window_name    | 重命名当前窗口       | ctrl+b ,      |
| tmux kill-window -t window_name   | 关闭窗口             | ctrl+b &      |

### 窗格管理 (pane)

| shell 命令                   | 说明                                       | 快捷键            |
| ---------------------------- | ------------------------------------------ | ----------------- |
| tmux list-panes              | 所有窗格                                   |                   |
| tmux split-window            | 上下分隔窗口得到 2 个窗格                  | ctrl+b "          |
| tmux split-window -h         | 左右分隔窗口得到 2 个窗格                  | ctrl+b %          |
| tmux kill-pane               | 关闭窗格                                   | ctrl+b x          |
| tmux select-pane -t 窗格序号 | 切换指定窗格                               |                   |
|                              | 切换到上一个窗格                           | ctrl+b ;          |
|                              | 切换并与上一个窗格交换                     | ctrl+b o          |
| tmux select-pane -U          | 切换到上方窗格                             | ctrl+b 方向键     |
| tmux select-pane -D          | 切换到下方窗格                             | ctrl+b 方向键     |
| tmux select-pane -L          | 切换到左边窗格                             | ctrl+b 方向键     |
| tmux select-pane -R          | 切换到右边窗格                             | ctrl+b 方向键     |
| tmux swap-pane -U            | 当前窗格上移                               | ctrl+b {          |
| tmux swap-pane -D            | 当前窗格下移                               | ctrl+b }          |
| tmux swap-pane -D            | 当前窗格全屏显示，再使用一次会变回原来大小 | ctrl+b z          |
|                              | 调整窗格大小                               | ctrl+b alt+方向键 |
|                              | 显示窗格编号                               | ctrl+b q          |

## 效果

![](https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/tmux.png)

## 我的配置

[tmux.conf](https://github.com/caijinlin/dotfiles/blob/master/tmux/.tmux.conf)
