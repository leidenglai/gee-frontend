// 静态资源目录
const cdnPath = '/static/'

/**
 * 模块参数
 * @typedef {Object} Options
 * @property {string[]} lives 活跃的 路由列表 在开发环境下只构建此列表下的模块
 *
 * 开发环境下至少有一个 live的模块
 * 可将在开发中暂时不用的模块注释，提高构建速度
 * @type {Options}
 */
const custAppModule = {
  lives: [
    // 'home',
    'account/login',
    // 'account/signup',
    // 'about',
    // 'algorithm',
    'datasets'
    // 'order',
  ]
}

module.exports = {
  cdnPath,
  custAppModule
}
