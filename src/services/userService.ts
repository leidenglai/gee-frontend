import requestData from 'utils/requestData'

/**
 * 对应后端API
 * @class 公共接口
 */
class CommonService {
  /**
   * 接口测试
   */
  fetchServTest(): Promise<any> {
    return requestData({
      method: 'POST',
      api: '/api/common/test'
    })
  }
}

// 导出单例
export default new CommonService()
