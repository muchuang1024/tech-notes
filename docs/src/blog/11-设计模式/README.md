## 原则

### 单一职责

一个类对外只提供一种功能

### 开闭原则

增加功能时去增加代码而不是修改代码

```
type AbstracBank interface {
	Do()
}

type TransferBank struct {
	
}

func (t *TransferBank) Do() {
	
}

type PayBank struct {
	
}

func (p *PayBank) Do() {
	
}

func BankBusiness(banker AbstracBank) {
	banker.Do()
}

BankBusiness(&TransferBank{})
BankBusiness(&PayBank{})
```

### 依赖倒转原则

模块与模块依赖抽象而不是具体实现

### 合成复用原则

通过组合来实现父类方法

### 迪米特法则

依赖第三方来实现解耦