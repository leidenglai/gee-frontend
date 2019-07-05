/** webpack当前运行环境 */
const __DEV__: boolean

/**
 * 模版生成器执行函数类型
 *
 * 可以添加模版需要的变量执行参数 返回模版字符串 用法类似 `_.template()`
 * https://www.lodashjs.com/docs/latest#_templatestring-options
 **/
interface TemplateExecutor {
  <T extends object>(data: T): string
  (): string
}

declare module '*.tpl.html' {
  /**
   * .tpl.html 格式文件 自动导出为模版生成器执行函数
   * 可以添加模版需要的变量 返回模版字符串 用法于同 `_.template()`
   *
   * 模版文件
   * ```ejs
   * // test.tpl.html
   * <div><%- title%></div>
   *
   * <%if(success){%>
   *  <div>模版逻辑判断输出</div>
   * <%}%>
   * ```
   *
   *
   * ts中调用使用
   * ```typescript
   * import testTpl from './test.tpl.html';
   *
   * // 使用泛型约束传入模版变量
   * const eleHtml = testTpl<{title: string, success: boolean}>({title: 'Hello World!!', success: true})
   * // eleHtml 为模版字符串，可以通过$('xx').html(eleHtml) 插入到页面
   * ```
   * 最终eleHtml字符串为：`<div>Hello World!!</div><div>模版逻辑判断输出</div>`
   **/
  const templateExecutor: TemplateExecutor

  export default templateExecutor
}
