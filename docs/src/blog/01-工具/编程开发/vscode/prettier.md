## 安装插件

vscode 搜索插件安装 https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

## 配置文件

官网 https://prettier.io/ 设置选项配置，然后导出

在项目根目录创建.prettierrc 文件，将内容复制进去

```
{
    "arrowParens": "always",
    "bracketSameLine": true,
    "bracketSpacing": true,
    "embeddedLanguageFormatting": "auto",
    "htmlWhitespaceSensitivity": "css",
    "insertPragma": false,
    "jsxSingleQuote": false,
    "printWidth": 120,
    "proseWrap": "never",
    "quoteProps": "as-needed",
    "requirePragma": false,
    "semi": false,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "all",
    "useTabs": false,
    "vueIndentScriptAndStyle": false,
    "singleAttributePerLine": false
  }
```

## 解决冲突

当 eslint 的规则和 prettier 的规则相冲突时，就会发现一个尴尬的问题，用其中一种来格式化代码，另一种就会报错

解决思路：eslint 只用来进行代码质量检查（主要指 bug），prettier 用来做代码格式化

### 解决方式

安装 eslint-config-prettier 插件配置集，把其配置到 eslintrc 规则的尾部；执行 ESLint 命令，会禁用那些和 Prettier 配置有冲突的规则，再使用 Prettier 来替代 ESLint 的格式化功能

### 安装依赖

```
npm install --save-dev eslint-config-prettier
npm install --save-dev eslint-plugin-prettier
```

### 修改.eslintrc.js 文件

在 extends 尾部加入上面安装的依赖

```
module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ['prettier'],
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/typescript/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}

```
