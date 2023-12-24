go.sum 文件用于存储模块的哈希校验和，以确保依赖关系的安全性和一致性。它通过为项目中的每个依赖项记录加密哈希值，帮助验证所下载的依赖项是否未被篡改且与预期版本一致，一旦被篡改需要手动解决冲突。

1、**安全性**: 如果有人尝试更改模块仓库中的代码，`go.sum` 会帮助检测到这些更改，因为哈希值将不再匹配。

2、**一致性**: 不同开发者和环境之间构建项目时，`go.sum` 确保每个人都使用相同的依赖版本。

# 一、go.sum 文件结构

`go.sum` 文件包含一系列的行，每行对应一个依赖项的特定版本，格式如下：

```
<module-path> <version> <hash-type>:<hash-value>
```

其中：

- `<module-path>`: 依赖的模块路径。
- `<version>`: 依赖的具体版本。
- `<hash-type>:<hash-value>`: 哈希类型（通常是 `h1`）和对应的哈希值。

示例：

`go.sum` 文件示例：

```
github.com/example/module v0.1.0 h1:Ne3bPgEOIvuSxQjflWJlD1tgnY/5MWz5/SZ3d4ZzjFw=
github.com/example/module v0.1.0/go.mod h1:dh1SgE4H6r2jF6/5m0cPT5e3nsz/RpB2dl7p8Zj9JVE=
...
```

# 二、go.sum 文件初始化

1、**初始化新的模块**：当你使用 `go mod init <module-name>` 命令初始化一个新的 Go 模块时，如果该项目有依赖，`go.mod` 和 `go.sum` 文件将会被创建。此时 `go.sum` 包含这些初始依赖的哈希值。

2、**第一次添加依赖**：如果你在已有的 Go 模块中首次使用 `go get` 添加依赖，Go 工具会自动创建 `go.sum` 文件并添加相关依赖的哈希值。

# 三、go.sum 文件修改

1、**添加或更新依赖**：当你使用 `go get` 添加或更新模块的依赖项时，Go 工具会自动更新 `go.sum` 文件，以包含新依赖项或更新的依赖项的哈希值。

2、**构建项目**：在构建项目（例如使用 `go build` 或 `go test`）时，如果发现 `go.sum` 文件中缺少必需的哈希值，Go 工具会计算这些哈希值并更新文件。

3、**运行 `go mod tidy`**：此命令不仅清理 `go.mod` 文件中不需要的依赖项，还会更新 `go.sum` 文件以确保其反映当前所有使用和测试的依赖项的哈希值。

# 四、解决 go.sum 不一致

当执行 Go 命令（如 go build、go test、go mod 等），发现 go.sum 文件中的哈希值与下载的依赖项的哈希值不一致时，会显示一个错误信息

```
verifying github.com/example/module@v1.0.0: checksum mismatch
    downloaded: h1:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    go.sum:     h1:yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
```

可以采取以下步骤解决：

1、清理缓存：运行 go clean -modcache 清理本地的模块缓存，然后重新下载依赖。

2、重新生成 go.sum：删除 go.sum 文件并通过运行 go mod tidy 或 go build 重新生成。

3、版本控制回退：如果上述步骤不奏效，可以考虑使用版本控制系统回退到之前的稳定状态。

# 五、注意事项

1、**自动管理**：通常你不需要手动编辑 `go.sum` 文件。它是由 Go 的包管理工具自动管理和更新的。

2、**版本控制**：`go.sum` 文件应该被包含在版本控制中，以确保所有团队成员和构建环境使用相同的依赖哈希值，保证构建的一致性和安全性。

通过这些自动化的机制，`go.sum` 文件确保了 Go 项目依赖的完整性和一致性，帮助开发者防止意外或恶意修改依赖项的风险。
