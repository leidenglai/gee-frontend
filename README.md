# webpack 架构 SPA

## 环境

安装 nodejs 最新版本即可初始化 安装依赖包

```sh
npm install
```

## 开始开发

调试模式

```sh
npm start
```

构建线上环境文件

```sh
npm run build
```

## 架构详细文档

### 概述

本架构是有 webpack4 和 html-webpack-plugin 插件搭建的多页面系统。利用 entry 和 html-webpack-plugin 生成多 html 静态页面和多 entry js 入口。

### 技术栈

1.  Nodejs // 各插件基础、依赖包管理
2.  Webpack // 前端资源模块化管理、开发、打包工具
3.  Typescript // 类型系统， 可选
4.  jQuery
5.  UIKit // UI 库
6.  Less // 一门向后兼容的 CSS 扩展语言
7.  i18next // 多语言系统
8.  Lodash.js // JS 工具库，强大的辅助函数

### 资源

- npm 包：https://www.npmjs.com
- package 解释 [package.json 文件 — JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/nodejs/packagejson.html)
- Webpack 中文文档：http://www.css88.com/doc/webpack2
- Webpack 官网： [webpack](https://webpack.js.org/)
- UIKit U 库： [UIKit](https://getuikit.com/docs/introduction)
- Lodash.js 中文文档： http://www.css88.com/doc/lodash/
- Less: [{less}](http://less.bootcss.com/)http://less.bootcss.com/
- flexible: [GitHub - amfe/lib-flexible: 可伸缩布局方案](https://github.com/amfe/lib-flexible)
- 多语言库 i18next： [i18next](https://www.i18next.com/overview/getting-started)

### 目录结构

```
— build/  // 架构启动、构建配置，webpack 配置
— dist/ // 构建输出目录
— node_modules/   // 所以依赖安装包文件
— src/                        // 项目文件
    assets/ // 所有静态资源 如 css、图片、字体等
      css/// css、less文件位置
      images/// 图片文件目录
    components/// 组件目录
    constants/// 常量配置、前端存放的一些不变的json数据等
    containers/ // 项目主要逻辑 模块控制器
    libs/// 自己引用的一些库
	  locales/ // 多语言文件
    services/// 与后端交互的接口请求文件
    tpl/ // 项目模板文件
    utils/// 自己写的一些中间件、插件方法等
    config.js// 项目的配置
    index.js// 项目入口
    routes.js// 路由配置
— .babelre// babel插件的配置文件
— package.json  // 项目描述文件
— README.md // 项目文档
```

通过配置了 webpack 的 alias 参数，可以在包引用时简写路径如 src/assets/css/index.less 可以简写为 css/index.less
再通过 extensions 配置可以省略后缀名 css/index

具体配置请看 /build/webpack.config.base.js 中的 resolve 字段

## 项目开始

本项目使用了 npm 作为包管理工具，同时项目采用多入口，所以每一个模块都有一个入口文件。入口都放在/containers/\*，每一个文件夹代表一个模块。

Windows 下使用 cmd，mac 启动 terminal。cd 到项目目录，然后执行`npm install`安装项目下的所有的依赖包，执行此命令 安装 package.json 中 devDependencies（开发环境）和 dependencies（生产环境）中的所有依赖包。

安装完成所有依赖包之后执行命令`npm start` 此命令执行 package.json 下的 scripts.start 的值：使用 node 执行 build/dev.js 启动项目。
**注意 ** ：npm 除了执行 start、test、stop 等几个可以简写，其他的自定义命令都需要在执行时写全 `npm run xxx` [npm scripts 使用指南](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)

npm start 执行 build/dev.js，启动 webpack 构建开发环境等等。通过 配置插件 自动生成多入口配置执行 webpack 编译 ，然后使用终端输出的地址在浏览器中打开。具体 webpack 使用和配置另说。

### 入口文件

入口文件的 配置逻辑在 webpack 的 build/utils/中，js 入口 src/containers/\* ，每一个文件夹代表一个模块。
