const layout = require('tpl/layout/main/html')
const content = require('./content.html')

module.exports = layout
  .init({
    title: 'Datasets Page',
    description: 'SEO 数据集'
  })
  .run(content())
