# Vim

## 介绍

Vim是从vi发展出来的一个文本编辑器。其代码补完、编译及错误跳转等方便编程的功能特别丰富，在程序员中被广泛使用

Neovim 是基于 vim 的速度更快的编辑器，也是 vim 的良好替代品，官网：https://neovim.io/

vim包含

vim 具有多种模式，每种模式下可以执行不同的操作。分别是普通模式、插入模式、命令模式和可视化模式，各模式的功能区分如下：

### 普通模式

vim默认模式，其它模式下按 `esc` 即可进入普通模式，控制屏幕光标的移动、字符、字或行的删除、移动复制某区段

### 插入模式

在普通模式下，按下`i`键进入插入模式，用于直接输入文本，并进行编辑

| 指令 |    说明   |   助记    |
| -------- | ------ | ------ |
| i | 在当前光标字符前插入 |insert |
| a | 在当前光标字符后插入 |append |
| I | 在当前行首插入| Insert |
| A | 在当前行尾插入| Append |
| o | 在下方开一新行插入| open |
| O | 在上方开一新行插入| Open |
| gi | 上一次插入地方插入|  |

### 命令模式

在普通模式下按`:`进入，用于搜索、替换、保存退出等操作

| 指令 |    说明   |
| -------- | ------ |
| :w| 保存 |
| :w file| 另存为文件 |
| :q| 退出 |
| :q!| 放弃修改退出 |
| :wq| 保存修改并退出 |
| :e file| 打开文件file |

### 可视化模式

在普通模式下按`v`进入可视模式

| 指令 |    说明   |
| -------- | ------ |
| v| 字符可视化模式，文本选择是以字符为单位 |
| V| 行可视化模式，文本选择是以行为单位 |
| ctrl-V| 块可视化模式，可以选择一个矩形内的文本 |


## 安装

```
brew install vim
```

## 使用

### 移动跳转

* `hjkl` 上下左右
* `0/^/$` 移动到行首、行中第1个不为空的字符、行尾
* `b/B` 跳转到上一个单词开头
* `w/W` 跳转到下一个单词开头
* `e/E` 跳转到下一个单词结尾
* `fx` 向前移动到字符 x 上
* `Fx` 向后移动到字符 x 上
* `tx` 向前移动到字符 x 前
* `Tx` 向后移动到字符 x 前
* `nb` 向前移动n个词
* `nw` 向后移动n个词
* `(` 到段首
* `)` 到段尾
* `{` 到段首
* `}` 到段尾
* `%` 跳转到匹配的块如 }、)、]
* `gg` 移动到文件结尾
* `G` 移动到文件结尾
* `:n` 移动到第n行
* `nG` 移动到第n行
* `nk` 向上移动n行
* `nj` 向下移动n行
* `H/M/L` 屏幕开头、中间、结尾
* `ctrl+d` 向下翻半页
* `ctrl+u` 向上翻半页
* `ctrl+f` 向下翻页
* `ctrl+b` 向上翻页
* `zt/zz/zb` 把当前行设置到顶部、中部、底部

* `ctrl-o` 移动到上次编辑位置，可以跨文件操作
* `ctrl-i` 回到最新编辑位置
* `shift+*` 向下跳转到同名单词位置
* `shift+#` 向上跳转到同名单词位置

### 选择

* `vt]` 选择到]，不包含]
* `va]` 选择到]， 包含]
* `*`命令：按下`*`命令会向下查找光标所在位置的下一个相同单词，并将其选中
* `#`命令：按下`#`命令会向上查找光标所在位置的上一个相同单词，并将其选中
* `g*n`命令：按下`g*n`命令会向下查找所有相同的单词，并将其一次性选中
* `g#n`命令：按下`g#n`命令会向上查找所有相同的单词，并将其一次性选中
* Ctrl + d: 选择相同单词

### 剪切

* `x` 删除当前光标所在处的字符
* `X` 删除当前光标左边的字符
* `d` 删除单词
* `dd` 删除当前行并鼠标移动到下一行；
* `5dd` 删除从光标开始处的 5 行代码
* `dgg` 删除从光标到文本开头
* `dG` 删除从光标到文本结尾
* `nx` 删除n个字符
* `nd` 删除n行
* `dnw` 删除n个单词
* `d0` 删除到行首
* `d$` 删除到行尾
* `dw/db/de` 反向删除单词、正向删除单词
* `ggdG` 删除全部
* `D` 删除当前行并鼠标在当前行
* `dfa` 删除从当前光标到光标后面的第一个a字符之间的内容
* `d%` 删除函数体
* `dt{char}` 删除光标到字符中间内容
* `d2t{char}` 删除直到遇到第2个字符
* `diw` 正向删除整个单词
* `daw` 正向删除整个单词，包含左右空格边界
* `di{` 删除花扩号内容,不包含}
* `dit` 删除 HTML 标签内容

### 删除修改

* `cw` 正向删除从光标处到单词结尾并进入插入模式
* `ce` 正向删除从光标处到单词结尾并进入插入模式
* `cb` 反向删除单词并进入插入模式
* `cc` 删除一整行并进入插入模式
* `C` 删除当前行并鼠标在当前行，进入插入模式
* `R` 进入替换模式
* `c0` 删除到行首，并进入插入模式
* `c$` 删除到行尾，并进入插入模式
* `ct{char}` 删除光标到字符中间内容，并进入插入模式
* `ciw` 正向删除整个单词并进入插入模式
* `caw` 正向删除整个单词并进入编辑，包含左右空格边界
* `ci{` 删除花扩号内容,不包含}
* `cit` 删除 HTML 标签内容，并进入插入模式

### 编辑修改

* `ysiw'` 单词加引号
* `ysiwt h2` 添加h2标签   
* `dst` 删除标签   
* `yss'` 整行加引号
* `ds'` 删除引号
* `cs"'` 替换双引号为单引号
* `cS"'` 整行替换双引号为单引号
* `shift+i` 批量编辑

### 查找

* `t/F/f{char}` 行内搜索，;查找下一个，,查找上一个    
* `2f{char}` 向右查找第2个字符
* `2F{char}` 向左查找第2个字符
* `/xx` 可以查找某个单词xx，n查找下一个，N查找上一个
* `?xx` 可以反向查找
* `%` 跳转到匹配的块如 }、)、]

### 替换

* `:%s/xx/xx` 替换第一个
* `:%s/xx/xx/g` 替换当前行
* `:%s/xx/xx/g` 替换全部
* `:1,6 s/xx/xx/g` 替换1~6行的xx
* `:%s/old/new/gc` 替换全部，并提示是否进行替换
* `xp` 交换当前字母与后一个字母的位置
* `u/U` 将可视模式下选择的字母全改成大写/小写字母
* `r{char}` 修改光标字符
* `R{chars}` 修改多个光标字符
* `ddp` 调换当前行和下一行


### 复制

* `y` 复制
* `yfa` 拷贝从当前光标到光标后面的第一个a字符之间的内容.
* `y%` 复制函数体
* `nyy` 复制多行
* `ggyG` 拷贝全部

### 粘贴

* `p` 粘贴
* `yyp`复制当前行并粘贴

### 撤销

* `u` 撤销命令
* `ctrl + r` 重做撤销命令

### 窗口管理

* `vim -On file1 file2` 左右分屏打开文件
* `:vsp file` 左右分屏打开文件
* `:sp file` 上下分屏打开文件
* `ctrl +w v` 左右分屏当前文件 
* `ctrl +w s` 上下分屏当前文件 
* `ctrl +w c` 关闭当前窗口 
* `ctrl +w o` 关闭其它窗口 
* `ctrl +w l/j/k/w` 切换窗口
* `ctrl +w w` 窗口间循环切换
* `ctrl +w x` 窗口互换
* `ctrl +w H` 从水平布局到垂直布局
* `ctrl +w J` 从垂直布局到水平布局
* `:vertical resize 80` 设置宽度 80%
* `:resize 80`  设置高度 80%

可以在配置文件中定义热键，来简化窗口操作操作

```
"分屏热键
nmap sl :set splitright<CR>:vsplit<CR>
nmap sh :set nosplitright<CR>:vsplit<CR>
nmap sk :set nosplitbelow<CR>:split<CR>
nmap sj :set splitbelow<CR>:split<CR>
```

### 标签页管理

* `vim -p file1 file2` tab标签打开文件
* `:tabnew` 打开新的tab
* `:tabclose` 关闭当前的tab
* `:tabonly` 关闭所有其他的tab 
* `:tabprev` 前一个tab
* `:tabnext` 后一个tab

修改配置文件来定义键盘映射会让操作变得方便

```
"============标签管理============
map tt :tabe<CR>
map tj :-tabnext<CR>
map tk :+tabnext<CR>
```

### 多行注释

```
1. 进入命令行模式，按ctrl + v进入 visual block模式（可视快模式），然后按j, 或者k选中多行，把需要注释的行标记起来
2. 按大写字母I，再插入注释符，例如//
3. 按esc键过会儿就会全部注释了
```

### 取消多行注释

```
1. 进入命令行模式，按ctrl + v进入 visual block模式（可视快模式），按小写字母l横向选中列的个数，例如 // 需要选中2列
2. 按字母j，或者k选中注释符号
3. 按d键就可全部取消注释
```

### 缩进

* `:m,n >` 指定行缩进
* `:m,n <` 指定行反缩进
* `gg<G` 全部缩进
* `gg>G` 全部反缩进

### 折叠

* `zc` 折叠代码块
* `zo` 展开代码块
* `zC` 折叠所有代码块
* `zO` 展开所有代码块

## 插件

### 对齐

```
,a=
```

## 键盘映射

可以对按键布局进行自定义设置

nmap 为 normal 模式
imap 为 insert 模式

`<LEADER>`为前缀键，let mapleader=" " 将 LEADER 定义为空格
C 为 ctrl 键如 `<C-b>` 指 ctrl+b"


```
" ============ 键盘映射
let mapleader=" "
nmap ge :CocCommand explorer
nmap S :w <CR>
nmap Q :q <CR>
nmap <C-p> :FZF <CR>
nmap H <Home>
nmap L <End>
imap jj <Esc>

" ============ 分屏
nmap <LEADER>vh :vsplit<CR>
nmap <LEADER>vj :split<CR>
nmap <LEADER>w <C-w>

" ============ 文件树
nmap <C-b> ge <CR>
```

## 实战

### 如何快速编辑

```
var r = alg.Rider{
            ID         string `xlsx:"id"`
            Name       string `xlsx:"name"`
            Type       int    `xlsx:"type"`
        }

var r = alg.Rider{
            ID: data.ID,         
            Name: data.Name,
            Type: data.Type
        }
        
        
// 单词部分修改
TimeSeqSorters
TimeSeqSorters

timeSeqSorters
timeSeqSorters

// 单词增加引号
```

### 如何快速填充

```
return alg.Job{
		OrderID: task.OrderID,
		IsSoonArrival: task.IsSoonArrival,
		IsShareOrder: task.IsShareOrder,
}
```



## 我的配置

[vimrc](https://github.com/caijinlin/dotfiles/blob/master/vim/vimrc)