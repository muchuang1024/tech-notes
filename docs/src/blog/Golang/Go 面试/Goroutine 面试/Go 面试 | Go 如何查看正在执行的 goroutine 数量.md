1、程序中引入 pprof pakage

```
import _ "net/http/pprof"
```

2、程序中开启 HTTP 监听服务

```
package main
​
import (
  "net/http"
  _ "net/http/pprof"
)
​
func main() {
​
  for i := 0; i < 100; i++ {
    go func() {
      select {}
    }()
  }
​
  go func() {
    http.ListenAndServe("localhost:6060", nil)
  }()
​
  select {}
}
```

3、分析 goroutine 文件

shell 执行如下命令

```
go tool pprof -http=:1248 http://127.0.0.1:6060/debug/pprof/goroutine
```

会自动打开浏览器页面如下图所示

![](https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/pprof.png#id=QRpMk&originHeight=861&originWidth=1818&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

在图中可以清晰的看到 goroutine 的数量以及调用关系，可以看到有 103 个 goroutine
