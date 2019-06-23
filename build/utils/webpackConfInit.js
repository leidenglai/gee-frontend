const path = require('path')
const _ = require('lodash')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackFormatPlugin = require('../plugins/html-webpack-format-plugin')
const createAppModule = require('./createAppModule')
const { custAppModule } = require('../../build-config.js')

const rootPath = path.resolve(__dirname, '../../')
const mode = process.env.NODE_ENV.trim()
const appModule = createAppModule(path.join(rootPath, 'src/tpl/pages'), custAppModule)

function tplOptionConstructor(modItem, commonChunks) {
  const options = {
    filename: `${mode === 'production' ? '../pages/' : ''}${modItem.router}.html`,
    chunksSortMode: 'dependency',
    minify: false
  }

  if (modItem.controller === 'index') {
    options.template = path.join(rootPath, `src/tpl/pages/${modItem.module}/html.js`)
    options.chunks = [...commonChunks, modItem.module]
  } else {
    options.template = path.join(rootPath, `src/tpl/pages/${modItem.module}/${modItem.controller}/html.js`)
    options.chunks = [...commonChunks, modItem.module + modItem.controller]
  }

  return options
}

/**
 * 自动化配置webpack 模块系统 实现多入口
 * 添加entry 和 HtmlWebpackPlugin
 * @param {webpack.Configuration} webpack config
 */
function webpackConfInit(config) {
  const commonChunks = ['manifest', ..._.map(_.get(config, 'optimization.splitChunks.cacheGroups', []), (v, k) => k)]
  const entry = {}
  const htmlWebpackList = []

  appModule.forEach(item => {
    const { module, controller, live } = item

    // 将appModule添加到entry 默认使用模块名作为js名字
    if (live || config.mode === 'production') {
      if (controller === 'index') {
        entry[module] = path.join(rootPath, `src/containers/${module}`)
      } else {
        entry[module + controller] = path.join(rootPath, `src/containers/${module}/${controller}`)
      }
    }

    // 将appModule添加到HtmlWebpackPlugin
    if (live || config.mode === 'production') {
      const webpackModule = new HtmlWebpackPlugin(tplOptionConstructor(item, commonChunks))

      htmlWebpackList.push(webpackModule)
    }
  })

  config.entry = entry
  config.plugins = config.plugins.concat(htmlWebpackList, [
    new HtmlWebpackFormatPlugin() // 格式化输出的html 模板
  ])

  return config
}

module.exports = webpackConfInit
