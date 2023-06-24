## 介绍

go-zero 是一个集成了各种工程实践的 web 和 rpc 框架。通过弹性设计保障了大并发服务端的稳定性，经受了充分的实战检验。

仓库：https://github.com/zeromicro/go-zero/

文档：https://go-zero.dev/

## 安装

### 脚手架安装

goctl 是 go-zero 的内置脚手架，是提升开发效率的一大利器，可以一键生成代码、文档、部署 k8s yaml、dockerfile 等。

```
 go install github.com/zeromicro/go-zero/tools/goctl@latest
```

###  protoc 安装

[protoc](https://protobuf.dev/) 是一个用于生成代码的工具，它可以根据 proto 文件生成C++、Java、Python、Go、PHP 等多重语言的代码，而 gRPC 的代码生成还依赖 [protoc-gen-go](https://github.com/golang/protobuf/tree/master/protoc-gen-go)，[protoc-gen-go-grpc](https://pkg.go.dev/google.golang.org/grpc/cmd/protoc-gen-go-grpc) 插件来配合生成 Go 语言的 gRPC 代码。

```
goctl env check --install --verbose --force
```

### vscode 插件安装

`goctl` vscode 编辑器插件可以安装在 `1.46.0+` 版本的 `Visual Studio Code` 上，首先请确保你的 `Visual Studio Code` 版本符合要求，并已安装 `goctl` 命令行工具。如果尚未安装 `Visual Studio Code`，请安装并打开 `Visual Studio Code`。

```
打开 Visual Studio Code | Extensions，搜索 goctl，点击 install 安装
```

## 创建项目

### Http项目

```
goctl api new gozerohttp
cd gozerohttp
go mod tidy
go run gozero.go -f etc/gozero-api.yaml
curl -i http://localhost:8888/from/you

mkdir internal/model
cd internal/model
`add user.sql`
goctl model mysql ddl --src user.sql --dir .
```

### RPC项目

```
goctl rpc new gozerorpc
```



