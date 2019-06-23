const layout = require('tpl/layout/main/html')
const content = require('./content.html')

module.exports = layout
  .init({
    title: 'Sign Up',
    description: 'SEO 注册'
  })
  .run(content())
