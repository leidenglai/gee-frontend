import AppMain from 'containers/main'
import './style.less'

/**
 * 页面入口: 订单
 */
class OrderPage extends AppMain {
  constructor() {
    super({ name: 'order' })

    this.init()
    this.bind()
  }

  /**
   * 初始化
   */
  init() {
    // 请求初始数据，初始化页面等
  }

  /**
   * 事件绑定
   */
  bind() {}

  // 其他逻辑
}

export default new OrderPage()
