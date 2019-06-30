import 'jquery/dist/jquery.slim'
import 'assets/css/theme/my-theme.less'
import 'assets/css/common.less'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

/**
 * 所有入口页面模块继承的公共类
 */
export default class AppMain {
  /** 当前模块根节点 原生 dom对象 */
  moduleDomElem: HTMLElement
  /** 当前模块根节点 JQuery dom对象 */
  moduleDom: JQuery<HTMLElement>

  constructor(options: {
  /**
     * ！！必须！！ 当前模块名称，用于保存根dom。
     * Class AppMain 实例化时会根据name值去查找 `app-container-${name}` 节点,然后放在`this.moduleDom` 和 `this.moduleDomElem` 上
     */
  name: string
  }) {
    // 保存根节点
    this.moduleDomElem = document.querySelector(`.app-container-${options.name}`)
    this.moduleDom = $(this.moduleDomElem)

    UIkit.use(Icons)
  }
}
