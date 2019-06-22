/** 带分页功能的列表数据接口 */
export interface IPager<T = any> {
  content?: T[]
  pageNum: number
  pageSize: number
  totalCount: number
}

/** 请求参数 */
export interface IReqParams {
  /** 后端API */
  api: string

  /** 请求参数*/
  params?: { [queryName: string]: any }
  method?: 'POST' | 'GET'
}

/** 错误返回 */
export interface IResError {
  code: number
  message?: string
  data?: any
}

/** 正常返回的Data*/
export type IResData = string | number | Object | Array<any>
