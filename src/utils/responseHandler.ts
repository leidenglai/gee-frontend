import { IResError, IResData } from 'src/interfaces/common'

/**
 * 处理返回值
 * @param {Response} response 后端返回的response对象
 * @returns {Promise} 直接返回data或者错误对象
 */
export default function responseHandler(response: Response) {
  return new Promise((resolve: (data: IResData) => void, reject: (data: IResError) => void) => {
    // 服务器返回状态
    switch (response.status) {
      case 200: // 正常
        break
      case 401: // 无权限
        return reject({ code: response.status, message: '登录信息失效' })
      default:
        return reject({ code: response.status, data: response, message: response.statusText })
    }

    response.json().then(({ code, message, data }) => {
      // 服务器返回状态
      switch (code) {
        case 401: // 未登录
        case 403: // 无权限
          reject({ code })
          break
        case 200: // 请求成功
        case 1: // 请求成功
          resolve(data)
          break
        default:
          // 其他报错
          reject({ code, message, data })
          break
      }
    })
  })
}
