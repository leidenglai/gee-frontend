const layout = require('tpl/layout/main/html')
const content = require('./content.html')

module.exports = layout
  .init({
    title: 'Algorithm Page',
    description: 'SEO 算法页'
  })
  .run(content())
