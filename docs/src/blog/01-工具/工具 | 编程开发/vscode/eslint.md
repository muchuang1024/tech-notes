代码格式校验工具，配合项目中的校验规则

## 配置

在setting.json中添加，可以参考一下

```
  {
    "editor.codeActionsOnSave": {

      "source.fixAll": true

    },
    "eslint.validate": [
    	"javascript", "javascriptreact", "vue", "typescript", "typescriptreact"
    ]
  }
```