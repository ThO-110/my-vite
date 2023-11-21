import { Locale } from 'utils/constant'

declare interface Api<T> {
  (params?: Record<string, unknown>): Promise<T>
}

// 接口返回格式
declare interface ResponseData<T> {
  code: number
  msg: string
  data: T
}

// 自定义HTML元素
declare type CustomizedHTMLElement<T> = HTMLElement & T

// 本地设置
declare interface LocalSetting {
  theme?: Record<string, string>
  locale?: Locale | string
}

// 请求的其他参数，用于解决接口的特殊情况
interface RequestOptions {
  isErrorCatchBySelf?: boolean
  isCheckSetion?: boolean
  isDownload?: boolean
  fileName?: string
  contentType?: string
  cancelToken?: CancelToken
  onUploadProgress?: (progressEvent: any) => void
}
