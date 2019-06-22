const path = require('path')
const fs = require('fs')

/**
 * 模块参数 唯一约束：module+controller 和 router
 * @typedef {Object} AppModule
 * @property {string} module
 * @property {string} controller
 * @property {string} router
 * @property {boolean} live 在开发环境下 default=false或者没有是不会构建此模块
 */

/**
 * 通过目录约定生成路由配置 约定大于配置
 * 'src/tpl/pages/search/*'解析为
  {
    module: 'search',
    controller: 'index',
    router: 'search'
  }
 *
 * 'src/tpl/pages/search/results/*'解析为
  {
    module: 'search',
    controller: 'results',
    router: 'search/results'
  }
 * @param {string} filePath 需要遍历的文件路径 默认 src/tpl/pages/**
 * @param {Object} options 配置
 * @param {boolean|string[]} options.lives 只构建列表中的entry 或者全部处理
 *
 * @return {AppModule[]}
 */
function handleModuleList(filePath, options = {}) {
  const moduleMap = new Set()
  // 去掉路由两端的斜线
  const liveList = (options.lives || []).map(item => item.replace(/^([/]{1})/, '').replace(/([/]{1})$/, ''))

  function fileDisplay(_path) {
    // 根据文件路径读取文件，返回文件列表
    const files = fs.readdirSync(_path)

    // 遍历读取到的文件列表
    files.forEach(filename => {
      // 获取当前文件的绝对路径
      const filedir = path.join(_path, filename)
      // 根据文件路径获取文件信息，返回一个fs.Stats对象
      const stats = fs.statSync(filedir)

      const isDir = stats.isDirectory() // 是文件夹
      const isFile = stats.isFile() // 是文件

      if (isDir) {
        fileDisplay(filedir) // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
      }

      if (isFile && filename === 'html.js') {
        const regPath = /[/]{1}([0-9a-zA-Z]+)$/.exec(_path)
        const lastPath = regPath && regPath[1] // / 路径最后一节
        const router = _path.replace(filePath, '').slice(1)
        // 保留顶级目录部分
        const module = lastPath === router ? router : router.replace(lastPath, '').slice(0, -1)
        const controller = lastPath === router ? 'index' : lastPath
        const live = liveList.length <= 0 ? false : !!~liveList.indexOf(router)

        moduleMap.add({
          module: module ? module : controller,
          controller,
          router,
          live
        })
      }
    })
  }

  fileDisplay(filePath)

  return moduleMap
}

module.exports = handleModuleList
