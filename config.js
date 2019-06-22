// 静态资源目录
const cdnPath = '/static/'

/**
 * 模块参数
 * @typedef {Object} Options
 * @property {string[]} lives 活跃的 路由列表 在开发环境下只构建此列表下的模块
 *
 * 开发环境下至少有一个 live的模块
 * @type {Options}
 */
const custAppModule = {
  lives: ['home']
}

module.exports = {
  cdnPath,
  custAppModule
}
