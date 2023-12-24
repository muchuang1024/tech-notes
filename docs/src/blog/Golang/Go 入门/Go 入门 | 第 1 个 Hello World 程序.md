当你学习一门新编程语言时，编写一个"Hello, World!"程序是一个很好的起点。以下是一个简单的 Go "Hello World" 程序

在 GOPATH 目录新建一个项目，然后新建一个 main.go 文件，执行 go run main.go

1. `package main`：这是程序的包声明。在 Go 中，每个程序都必须属于一个包，而 `main` 包是一个特殊的包，用于标识可执行程序的入口点。

2. `import "fmt"`：这里使用了 `import` 关键字导入了一个名为 "fmt" 的包。`fmt` 包包含了格式化输入和输出的函数，我们将使用它来输出 "Hello, World!"。

3. `func main()`：这是程序的入口函数。在 Go 中，所有可执行程序的入口点都必须是 `main` 函数。程序从 `main` 函数开始执行。

4. `fmt.Println("Hello, World!")`：这是在 `main` 函数中的一行代码。它使用了 标准库 `fmt` 中的 `Println` 函数，将字符串 "Hello, World!" 输出到标准输出（通常是终端或命令行窗口）。`fmt.Println` 用于在控制台上打印一行文本。

当你运行这个程序，它将输出 "Hello, World!"
