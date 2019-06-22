const layout = require('./index.html') // 整个页面布局的模板文件，主要是用来统筹各个公共组件的结构
const header = require('tpl/section/header/index.html') // 页头的模板
const footer = require('tpl/section/footer/index.html') // 页脚的模板

/* 整理渲染公共部分所用到的模板变量 */
const componentRenderData = {
  title: 'Title',
  bodyClass: 'fixed-layout-body'
}

const moduleExports = {
  /* 处理各个页面传入而又需要在公共区域用到的参数 */
  init(data) {
    // 传入的参数合并到默认
    Object.assign(componentRenderData, data)

    return this
  },

  /* 整合各公共组件和页面实际内容，最后生成完整的HTML文档 */
  run(content) {
    const renderData = Object.assign(
      {
        header: header(componentRenderData),
        footer: footer(componentRenderData),
        content
      },
      componentRenderData
    )

    return layout(renderData)
  }
}

module.exports = moduleExports
