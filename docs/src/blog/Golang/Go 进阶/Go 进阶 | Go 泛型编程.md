泛型编程是一种编程范式，它允许编写具有参数化类型的代码，从而增加代码的复用性和灵活性。在泛型编程中，你可以编写一段代码，使其适用于不同类型的参数，而不需要为每种类型编写不同的实现。

在过去的 Go 版本中，Go 不支持泛型编程，这意味着你需要为不同类型编写特定的函数或数据结构。不过，自 Go 1.18 版本起，Go 引入了泛型支持，这使得在 Go 中编写泛型代码变得更加容易和灵活。

# 一、基本概念

泛型是 Go 1.18 版本中引入的一项功能，允许在函数和数据结构中使用参数化类型，以增加代码的复用性和灵活性。

## 如何声明一个泛型函数

你可以使用以下语法声明一个泛型函数：

```go
func functionName[T any](params T) {
    // 函数体
}
```

## 什么是泛型类型约束

泛型类型约束是指你可以限制泛型类型参数的类型范围，例如使用 `T comparable` 来限制 `T` 必须是可比较的类型。

# 二、使用示例

```
package main

import "fmt"

// 泛型函数，可以用于不同类型的切片
func contains[T comparable](s []T, elem T) bool {
	for _, v := range s {
		if v == elem {
			return true
		}
	}
	return false
}

func main() {
	intSlice := []int{1, 2, 3, 4, 5}
	strSlice := []string{"apple", "banana", "cherry"}

	fmt.Println(contains(intSlice, 3))            // 输出 true
	fmt.Println(contains(strSlice, "watermelon")) // 输出 false
}
```

泛型允许你编写通用的函数和数据结构，而不需要为每种类型编写特定的实现，从而减少了代码重复。这可以提高代码的可读性，因为你只需关注算法的实现而不必关注具体的数据类型。
