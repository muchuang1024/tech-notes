Go 语言程序的基本结构通常包含以下几个部分：

1、**包声明（Package Declaration）**：每个 Go 程序都是由包组成的。程序运行的入口是 `main` 包。

```go
package main
```

2、**引入包（Import Packages）**：这里你可以引入 Go 标准库中的包，或者其他第三方包。

```go
import (
    "fmt"
)
```

3、**函数（Functions）**：`main` 函数是每个可执行程序必须包含的入口函数。

```go
func main() {
    fmt.Println("Hello, World!")
}
```

4、**变量声明（Variable Declarations）**：在 Go 中，你可以在函数内或全局范围内声明变量。

```go
var globalVar string
```

5、**常量声明（Constants）**：常量是一个简单的值，一旦被声明之后在程序运行期间不会改变。

```go
const Pi = 3.14
```

6、**类型声明（Type Declarations）**：可以声明新的类型或类型别名。

```go
type MyInt int
```

7、**语句和表达式（Statements and Expressions）**：这些是构成程序逻辑的基础，例如循环、条件判断等。

8、**注释（Comments）**：用于解释代码，不会被程序执行。

```go
// 这是一个注释
```

每个 Go 程序至少包含 `main` 包和 `main` 函数，这是程序的入口点。在这个结构下，你可以根据需求添加更多的包、变量、常量、类型和其他函数。
