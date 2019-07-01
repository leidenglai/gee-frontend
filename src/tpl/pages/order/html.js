const layout = require('tpl/layout/main/html')
const content = require('./content.html')

module.exports = layout
  .init({
    title: 'Order Page',
    description: 'SEO 订单'
  })
  .run(
    content({
      name: 'order'
    })
  )
