import {
  DataSourceStatus,
  DataSourceType,
  FilesUploadStatus
} from 'utils/constant'
import { ModalList } from '@/types/modalConfig'
// TODO:
// import type { GraphConfig } from '@/components/editStreamingGraph/type'

/* 数据库/文件数据源 */
export interface Datasource {
  updateTime: string
  datasourceStatus: DataSourceStatus
  id: string
  datasourceName: string
  datasourceDescribe: string
  datasourceHost: string
  datasourcePort: string
  datasourceUserName: string
  datasourceUserPwd: string
  database: string
  datasourceType: DataSourceType
  datasourceTypeName: string
  taskCount: number
  datasourceConfig: DatasourceConfig
  ruleSetCount: number
  popoverVisible: boolean
  isOperation: boolean
  endpoint: string
  accessKey: string
  secretKey: string
  bucket: string
  hasTimeLine: boolean | null
  datasourceSize: string | null
  presetDatasource: boolean
  timezone: string
}

export interface DatasourceConfig {
  data: any
  modalData: Record<string, ModalList>
  modelAttribute: Record<string, string[]>
}

export interface DataSourceFormState {
  datasourceId: string
  datasourceName?: string
  datasourceDescribe: string
}

export interface DatabaseFormState {
  id: string
  connectType: string
  datasourceType: DataSourceType
  datasourceTypeName: string
  datasourceHost: string
  datasourcePort: string
  datasourceName: string
  database: string
  datasourceUserName?: string
  datasourceUserPwd?: string
  datasourceDescribe: string
  datasourceStatus?: DataSourceStatus
  timezone?: string
  timezoneId: number | null

  // hive数据库特有参数
  kerberosServiceName?: string
  primary?: string
  instance?: string
  realm?: string
  realmName?: string
  keytabFile?: string
  keytabFileName?: string
  hostName?: string
}
export interface CSVFormState {
  id: string
  datasourceName: string
  datasourceDescribe: string
  datasourceType?: DataSourceType
  datasourceTypeName?: string
  datasourceStatus?: DataSourceStatus
  endpoint?: string
  accessKey?: string
  secretKey?: string
  bucket?: string
  reimport?: boolean
  type?: number
  msg?: string
  timezone?: string
  timezoneId: number | null
}

export interface CSVSocketData {
  connected: number
  current: number
  fetched: number
  prepared: number
  total: number
  unit: string
  success: number
  fail: number
}

export interface ConnectTestType {
  datasourceHost: string
  datasourcePort: string
  database: string
  datasourceUserName: string
  datasourceUserPwd: string
  datasourceType: DataSourceType
}
export interface CheckConnectParam {
  connectTestKey: string
  datasourceId: string
}

export interface ValidAttrRes {
  model_type: number
  key_list: any[]
}

// 数据源查看点边统计响应数据
export interface GraphAddList {
  edgeCount: null | string
  vertexCount: null | string
  list: any[]
}

export interface Timezone {
  id: number
  value: string
  label: string
}

export interface UploadFileChunkList {
  fileHash: string
  fileName: string
  index: number
  hash: string
  chunk: Blob
  chunks: number
  size: number
  uploaded: boolean
  progress: number
  status: string
  type: string
}
export interface ChunkListType {
  file: Blob
}
export interface UploadFileType<T> {
  id: string
  status: FilesUploadStatus
  chunkList: T[]
  uploadProgress: number
  fakeUploadProgress: number
  hashProgress: number
  isStartProcess: boolean
  fileIndex: number
  fileHash: string
  isBtnClick: boolean
  hash: string
  name: string
  size: number
  type: string
  isChunk: boolean
  curSliceParaCount: number
}

type UploadList = UploadFileType<UploadFileChunkList>

export interface UploadedList {
  id: string
  datasourceId: string
  filePath: string
  fileName: string
  suffix: string
  createTime: string
  status: string
  fileSize: string
  isBtnClick: boolean
}

/* 流式数据源 */
export interface ChannelDatasource {
  updateTime: string
  name: string
  id: string
  taskCount: number
  popoverVisible: boolean
  isOperation: boolean
  datasourceId?: string | null
  datasourceName?: string
  channelType: string
  topicList: TopicParams[]
  topicListName: string
  isChange?: boolean
}

export interface InChannelDatasourceIdOptions {
  id: string
  datasourceName: string
}

export interface ChannelFormState {
  id?: string
  name: string
  server: string
  topicListName: string
}
export interface ChannelOptions {
  name: string
  id: string
  selected: boolean
}

export interface InChannelParams {
  id?: string
  datasourceId: string | null
  datasourceName?: string | null
  name: string
  channelType: '0'
  topicList: TopicParams[]
  isChange?: boolean // 是否更新
}

export interface TopicParams {
  name: string
  server: string
  unCompleted?: boolean
  activeTabKey: number
  newTabIndex: number
  topicConfig: SampleConfig[]
}

export interface SampleConfig {
  title: string
  key: number
  streamId: number
  streamKey: string[] | null
  streamKeyShow: string | null
  streamValue: string | null
  streamFlag: '0' | '1' // '0'根据key标识 ；'1' 根据key+value标识
  streamCompleted: boolean // stream 标识配置是否已完成
  selectedMapIndex: number // 用户选择的映射标签下标
  graphConfig: any
  allRequiredLinePorts: string[] // 当前画布中的所有必关联项的portId
  graphCompleted: boolean // 样例画布是否已配置完成
  unCompleted: boolean // 样例是否未配置完成
}

/* 任务 */
export interface DatasourceIdOptions {
  datasourceId: string
  datasourceName: string
}
export interface TaskSelectOptions {
  ruleDiscoveryTask?: RuleTask[]
  ruleApplyTask: RuleTask[]
  ruleValidationTask?: RuleValidationTask[]
}
export interface ApiTaskSelectOptions {
  ruleDiscoveryList: RuleTask[]
  ruleApplyList: RuleTask[]
  validationList: RuleValidationTask[]
}
export interface RuleTask {
  taskName: string
  id: string
}
export interface RuleValidationTask {
  taskName: string
  taskId: string
}

/* 获取数据源服务剩余容量 */
export interface RemainInfo {
  remain: string
  tables: TableInfo[]
}
export interface TableInfo {
  schema_name: string
  table_name: string
  size: number | string // 原始字节大小
  switchSize?: number | string // 转化后大小
  unit?: string // 转化后单位
}
