import AppMain from 'src/containers/main'
import testTpl from './tpl/test.tpl.html'
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

    // 加载模版
    const testHtml = testTpl<{ title: string; list: string[]; tplFunc?: TemplateExecutor }>({
      title: 'Test ',
      list: ['1', '2', '3']
    })

    this.moduleDom.find('.test-card-box').html(testHtml)
  }

  /**
   * 事件绑定
   */
  bind() {}

  // 其他逻辑
}

export default new DatasetsPage()
