export let SERVER_PROTOCOL = 'http://'

// 开发环境使用http协议
if (__DEV__) {
  SERVER_PROTOCOL = 'http://'
}

// 后端 API 地址
export const SERVER_API_ROOT_API = '/api'

// 请求默认参数
export const DEF_REQUEST_CONFIG = {
  version: '1.0',
  doc: true // true则是api文档，false是正式接口
  // ...
}
