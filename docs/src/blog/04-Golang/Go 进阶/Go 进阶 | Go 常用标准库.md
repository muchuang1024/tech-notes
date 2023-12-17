1、**`fmt`** - 用于格式化输入输出

示例：打印字符串到控制台。

```go
package main
import "fmt"
func main() {
    fmt.Println("Hello, World!")
}
```

2、**`strings`** - 提供字符串操作功能

示例：字符串分割。

```go
package main
import (
    "fmt"
    "strings"
)
func main() {
    fmt.Println(strings.Split("a,b,c", ","))
}
```

3、**`sort`** - 用于排序切片和用户定义的数据类型

示例：排序整数切片。

```go
package main
import (
    "fmt"
    "sort"
)
func main() {
    slice := []int{3, 1, 4, 1}
    sort.Ints(slice)
    fmt.Println(slice)
}
```

4、**`os`** - 提供操作系统函数，如文件操作

示例：读取环境变量。

```go
package main
import (
    "fmt"
    "os"
)
func main() {
    fmt.Println("PATH:", os.Getenv("PATH"))
}
```

5、**`io/ioutil`** - 简化文件读写操作

示例：读取文件内容。

```go
package main
import (
    "fmt"
    "io/ioutil"
)
func main() {
    data, err := ioutil.ReadFile("filename.txt")
    if err != nil {
        fmt.Println("File reading error", err)
        return
    }
    fmt.Println("Contents of file:", string(data))
}
```

6、**`net/http`** - 用于 HTTP 客户端和服务器实现

示例：启动一个简单的 HTTP 服务器。

```go
package main
import (
    "fmt"
    "net/http"
)
func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, %s!", r.URL.Path[1:])
}
func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}
```

7、**`encoding/json`** - 用于 JSON 的编码和解码

示例：解码 JSON 字符串。

```go
package main
import (
    "encoding/json"
    "fmt"
)
func main() {
    var data map[string]interface{}
    jsonStr := `{"name": "John", "age": 30}`
    json.Unmarshal([]byte(jsonStr), &data)
    fmt.Println(data)
}
```

8、**`database/sql`** - 用于数据库操作

示例：打开数据库连接（需配合数据库驱动使用）。

```go
package main
import (
    "database/sql"
    _ "github.com/go-sql-driver/mysql"
)
func main() {
    db, err := sql.Open("mysql", "user:password@/dbname")
    if err != nil {
        panic(err.Error())
    }
    defer db.Close()
}
```

9、**`time`** - 提供时间操作

示例：获取当前时间并格式化输出。

```go
package main
import (
    "fmt"
    "time"
)
func main() {
    fmt.Println("Current time:", time.Now().Format("2006-01-02 15:04:05"))
}
```

10、**`sync`** - 提供同步原语，如锁和条件变量

示例：使用互斥锁。

```go
    package main
    import (
        "fmt"
        "sync"
    )
    func main() {
        var mutex sync.Mutex
        mutex.Lock()
        // critical section
        mutex.Unlock()
        fmt.Println("Mutex unlocked")
    }
```

这些库覆盖了 Go 语言中最常见的一些功能，从基本的字符串和格式化操作到更复杂的网络和并发处理。
