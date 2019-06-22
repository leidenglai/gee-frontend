import 'jquery/dist/jquery.slim'
import 'assets/css/theme/my-theme.less'
import 'assets/css/common.less'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

/**
 * 所有入口页面模块继承的公共类
 */
export default class AppMain {
  constructor() {
    UIkit.use(Icons)
  }
}
