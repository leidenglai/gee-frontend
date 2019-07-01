const layout = require('tpl/layout/main/html')
const content = require('./content.html')

module.exports = layout
  .init({
    title: 'About Page',
    description: 'SEO 关于我们'
  })
  .run(
    content({
      name: 'about'
    })
  )
