const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config.dev')
const webpackConfInit = require('./utils/webpackConfInit')

const newConf = webpackConfInit(config)
const options = {
  hot: true,
  watchOptions: {
    aggregateTimeout: 300
  },
  host: '127.0.0.1',
  port: 5000
}

WebpackDevServer.addDevServerEntrypoints(newConf, options)
newConf.plugins.concat([reloadHtml])

const compiler = webpack(newConf)
const server = new WebpackDevServer(compiler, options)

server.listen(5000, '127.0.0.1', err => {
  err && console.log(err)
})

/**
 * webpack插件
 * 模板发生变化时刷新浏览器
 */
function reloadHtml() {
  const cache = {}
  const plugin = { name: 'CustomHtmlReloadPlugin' }

  this.hooks.compilation.tap(plugin, compilation => {
    compilation.hooks.htmlWebpackPluginAfterEmit.tap(plugin, data => {
      const orig = cache[data.outputName]
      const html = data.html.source()

      // plugin seems to emit on any unrelated change?
      if (orig && orig !== html) {
        server.sockWrite(server.sockets, 'content-changed')
      }
      cache[data.outputName] = html
    })
  })
}
