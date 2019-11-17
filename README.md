# 药研社 UI 组件库

前端 Framework Vue
https://vuejs.org/

## 使用 Quick Start

npm i yys-web-ui -S

```
import Vue from 'vue
import YysUI from 'yys-web-ui'
import "yys-web-ui/dist/assets/styles/index.";

Vue.use(YysUI)
```

## DEMO 展示

修改 demo 文件夹下的 main.js，添加想展示的组件，并运行命令
npm run demo

# 开发

npm i -g cross-env element-theme

# 文件夹目录

demo DEMO 展示目录
dist 最终打包文件目录
packages 自定义组件目录
src 源码目录，自定义代码
test 测试目录
types TypeScript 申明目录

## 开发环境打包

npm run build

## 生产环境打包，会对文件进行压缩，处理，

npm run build:prod

## 打包

npm pack
