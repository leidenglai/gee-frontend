const layout = require('tpl/layout/main/html')
const content = require('./content.html')

module.exports = layout
  .init({
    title: 'Log In',
    description: 'SEO 登陆'
  })
  .run(content())
