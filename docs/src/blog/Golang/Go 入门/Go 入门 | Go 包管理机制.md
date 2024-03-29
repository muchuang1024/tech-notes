Go 语言的代码包管理是开发者们在项目开发中不可或缺的一部分，它的进化历程经历了两种主要模式：GOPATH 模式和 Modules 模式。

| 特点/模式      | GOPATH 模式                                      | Modules 模式                                        |
| -------------- | ------------------------------------------------ | --------------------------------------------------- |
| **引入时间**   | Go 语言早期                                      | Go 1.11                                             |
| **模式开启**   | go env GO111MODULE 为 off                        | go env GO111MODULE 为 on 或 auto                    |
| **项目组织**   | 所有项目必须在同一个 `GOPATH` 的 src 目录下      | 每个项目作为独立模块，可以在任意位置                |
| **依赖管理**   | 通过 `go get` 获取最新版本的依赖，不支持版本控制 | 通过 `go.mod` 管理依赖，支持版本控制                |
| **相对导入**   | 不支持项目之间相对导入                           | 支持项目之间相对导入                                |
| **模块化**     | 不支持模块化                                     | 支持模块化，每个模块有自己的 `go.mod` 文件          |
| **工具链集成** | go get 命令直接下载最新版本到 GOPATH 中          | go get 命令更新依赖指定版本，并自动修改 go.mod 文件 |
| **适用场景**   | 旧项目，向后兼容                                 | 新项目，现代化的依赖管理和项目组织                  |

一、GOPATH 模式

GOPATH 模式是早期 Go 语言使用的代码包管理方式，它依赖于一个名为 GOPATH 的环境变量，该变量指定了工作区的位置。工作区通常包括三个子目录：src、pkg 和 bin。

1、src 目录：存放源代码文件，每个项目都应该根据其导入路径组织在 src 目录下。例如，如果一个代码包的导入路径是 github.com/user/mypkg，则其源码文件应位于 $GOPATH/src/github.com/user/mypkg 目录下。

2、pkg 目录：存放编译后的包文件。

3、bin 目录：存放编译后的可执行文件。

可以使用 go env GOPATH 命令来查看当前的 GOPATH 设置

在 GOPATH 模式下，所有的代码包都需要放在 src 目录下，按照导入路径组织。要使用第三方代码包，需要使用 go get 命令将其下载到工作区。

总的来说，虽然 GOPATH 模式在早期是 Go 语言的标准包管理方式，但它在依赖管理、版本控制和灵活性方面存在一些不足之处。

为了解决这些问题，Go 语言从 1.11 版本开始引入了 Modules 模式，提供了更现代化和可维护的包管理方式，弥补了 GOPATH 模式的不足，并为开发者提供更大的灵活性和便利性。

因此，Modules 模式被推荐用于新项目和现代化的 Go 开发。

二、Modules 模式

Modules 模式是从 Go 1.11 版本开始引入的新的代码包管理方式，它不再依赖于 GOPATH 环境变量，而是通过在每个项目的根目录下创建一个 go.mod 文件来记录项目的元信息和依赖信息。

Modules 模式的优势在于可以支持项目放置在任意位置，不再受工作区的限制。同时，它还能够支持同一个项目使用不同版本的依赖包，以及使用代理服务器来加速依赖包的下载。

要使用 Modules 模式，需要设置环境变量 GO111MODULE 为 on 或 auto（默认值）。

三、总结

Go 语言的包管理方式经历了从 GOPATH 模式到 Modules 模式的演进，Modules 模式为项目的依赖管理带来了更大的灵活性和可维护性，这种方式有助于确保项目的可维护性和稳定性，并简化了依赖包的管理过程。

从 Go 1.11 版本开始，模块管理已成为 Go 开发的标准做法，鼓励开发者采用。
