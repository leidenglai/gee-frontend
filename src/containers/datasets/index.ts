import AppMain from 'src/containers/main'
import table from './tpl/table.tpl.html'
import testTpl from './tpl/test.tpl.html'
import userService from 'src/services/userService'
import { ITest } from 'src/interfaces/order'
import './style.less'

/**
 * 页面入口：数据集
 */
class DatasetsPage extends AppMain {
  constructor() {
    super({ name: 'datasets' })

    this.init()
    this.bind()
  }

  /**
   * 初始化
   */
  init() {
    // 请求初始数据，初始化页面等
    userService.fetchServTest().then(res => {
      // 服务端返回数据
      console.log(res)
    })

    const data = {
      title: '2222222',
      list: ['1', '2', '3']
    }
    // 加载模版
    const testHtml = testTpl<ITest>(data)

    // this.moduleDom.find('.test-card-box').html(testHtml)

    const tableHtml = table<ITest>({ title: 'aa', data: testHtml })
    const tableHtml2 = table()

    this.moduleDom.find('.test-card-box').html(tableHtml)
  }

  /**
   * 事件绑定
   */
  bind() {}

  // 其他逻辑
}

export default new DatasetsPage()
