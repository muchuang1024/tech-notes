在不同的操作系统上安装和配置 Go 环境有一些不同，但基本步骤是类似的

# 一、安装

## Windows

1、**下载**：

- 访问 Go 语言官方网站下载页面 [golang.org/dl/](https://golang.org/dl/)。
- 选择适合 Windows 系统的安装程序（通常是 `.msi` 文件）。

2、**安装**：

- 双击下载的文件并遵循安装向导指示。
- 安装过程中，可以自定义安装路径或使用默认路径。

3、**配置环境变量**：

- 安装器通常会自动设置环境变量。但你可以手动检查：
  - 右键点击 “我的电脑” -> “属性” -> “高级系统设置” -> “环境变量”。
  - 确保 `Path` 环境变量中包含了 Go 的安装路径，如 `C:\Go\bin`。

4、**验证安装**：

- 打开命令提示符，输入 `go version`，应该会显示安装的 Go 版本。

## Mac

1、**下载**：

- 访问 [golang.org/dl/](https://golang.org/dl/)。
- 选择适合 macOS 的安装包（通常是 `.pkg` 文件）。

2、**安装**：

- 双击下载的 `.pkg` 文件，遵循安装指示进行安装。

3、**配置环境变量**：

- macOS 安装器通常会自动设置环境变量。
- 你可以在终端中运行 `echo $PATH` 检查是否包含 Go 的安装路径。

4、**验证安装**：

- 打开终端，输入 `go version`，检查显示的 Go 版本。

## Linux

1、**下载**：

- 访问 [golang.org/dl/](https://golang.org/dl/)。
- 选择适合 Linux 的版本（如 `.tar.gz` 文件）。

2、**安装**：

- 解压下载的文件到 `/usr/local`，可以使用命令：
  ```
  tar -C /usr/local -xzf go$VERSION.$OS-$ARCH.tar.gz
  ```
  其中 `$VERSION`、`$OS` 和 `$ARCH` 替换为相应的版本号、操作系统和架构。

3、**配置环境变量**：

- 你需要手动设置环境变量。在 `~/.profile` 或 `~/.bashrc` 文件中添加以下行：
  ```
  export PATH=$PATH:/usr/local/go/bin
  ```
- 然后运行 `source ~/.profile` 或 `source ~/.bashrc` 使变更生效。

4、**验证安装**：

- 打开终端，输入 `go version`，应显示安装的 Go 版本。

# 二、配置

## 配置 GOPATH

Go 语言通常需要一个工作区（workspace），在 Go 1.11 之后引入了模块（module）机制后，这个要求变得不那么严格，但仍然推荐设置。

1、**创建工作区目录**：

- 通常在用户的主目录下创建一个名为 `go` 的目录。

2、**设置 `GOPATH` 环境变量**：

- 将 `GOPATH` 设置为工作区目录的路径。例如，在 `~/.profile` 或 `~/.bashrc` 文件中添加：
  ```
  export GOPATH=$HOME/go
  ```

3、**更新环境变量**：

- 运行 `source ~/.profile` 或 `source ~/.bashrc`。

4、**创建工作区子目录**：

- 在 `GOPATH` 下创建 `src`, `bin`, 和 `pkg` 子目录。其中 `src` 存放源代码
