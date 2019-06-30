const layout = require('tpl/layout/main/html')
const content = require('./content.html')

module.exports = layout
  .init({
    title: 'Home Page',
    description: 'SEO 首页'
  })
  .run(
    content({
      name: 'home'
    })
  )
