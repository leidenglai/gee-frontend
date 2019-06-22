import _ from 'lodash'
import 'whatwg-fetch'
import { SERVER_API_ROOT_API, DEF_REQUEST_CONFIG } from 'src/config'
import responseHandler from 'utils/responseHandler'
import { IReqParams, IResError, IResData } from 'src/interfaces/common'

/**
 *请求后端数据封装
 *@returns 直接返回data或者错误对象
 */
export default function requestData({ api, params = {}, method = 'POST' }: IReqParams) {
  return new Promise((resolve: (data: IResData) => void, reject: (err: IResError) => void) => {
    let completeApi = SERVER_API_ROOT_API + api

    const requestParams = _.map(Object.assign({}, DEF_REQUEST_CONFIG, params), (value, key) => {
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      } else if (typeof value === 'string') {
        value = value.trim()
      }

      return key + '=' + encodeURIComponent(value)
    })

    const options: RequestInit = {
      method,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

      // 让请求中包含cookie
      credentials: 'include',

      /*
       * same-origin：
       * 该模式是不允许跨域的，它需要遵守同源策略，否则浏览器会返回一个error告知不能跨域；
       * 其对应的response type为basic。
       * cors:
       * 该模式支持跨域请求，顾名思义它是以CORS的形式跨域；
       * 当然该模式也可以同域请求不需要后端额外的CORS支持；其对应的response type为cors。
       * no-cors:
       * 该模式用于跨域请求但是服务器不带CORS响应头，也就是服务端不支持CORS；
       * 这也是fetch的特殊跨域请求方式；其对应的response type为opaque。
       */
      mode: 'cors'
    }

    if (method.toLowerCase() == 'post') {
      /*
       * 需要发送的数据，可以是 Blob, BufferSource, FormData, URLSearchParams, 或者 USVString。
       * 需要注意的是 GET 和 HEAD 方法不能包含 body。
       */
      options.body = requestParams.join('&')
    } else if (method.toLowerCase() == 'get') {
      completeApi = completeApi + '?' + requestParams.join('&')
    }

    // 发送请求 返回promise对象
    fetch(completeApi, options)
      .then(responseHandler)
      .then(resolve)
      .catch(err => {
        console.log(err)

        reject(err)
      })
  })
}
