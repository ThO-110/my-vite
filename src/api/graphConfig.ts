// TODO:
// import axios from "utils/axios";
import { params2Url } from 'utils/util'
import type { PaginationBase } from 'api/typing'
import type { GraphPlans } from '@/types/interactGraph'

export interface UrlParams {
  pageNum?: number
  pageSize?: number
  orderByColumn?: string
  isAsc?: string
  [propName: string]: any
}
export interface PostParams {
  [propName: string]: any
}

type KeyCountsPercent = string | number | null
export interface LabelOption {
  labelName: string
  labelId: string
  codeId: string
  srcLable: null | string
  desLabel: null | string
  featureKey: '0' | '1' // 是否包含衍生属性 0 不包含
  allKeyCounts: string
  keyCounts: string
  labelType: 'edge_info' | 'vertex_info'
  keyCountsPercent?: KeyCountsPercent
  hasRepeat?: boolean // labelname 是否相同
}
type LabelOptionList = PaginationBase<LabelOption>

/**
 * @Description: 根据 labelID 获取 key 的查询参数
 */
export interface KeyParams {
  datasourceId: string
  labelId: string
  pageNum?: number
  pageSize?: number
  orderByColumn?: 'key_counts'
  isAsc?: 'desc,key_id'
  keyName?: string
  [propName: string]: any
}
export interface KeyOption {
  keyName: string
  keyId: string
  codeId: string
  keyCounts: string
  keyType: string
  labelId: string
  modelType?: null | number // 衍生属性类型
  keyCountsPercent?: string | number | null
}
type KeyOptionList = PaginationBase<KeyOption>

/**
 * @Description: 根据 keyID 获取 value 的查询参数
 */
export interface ValueParams {
  datasourceId: string
  keyId: string
  pageNum?: number
  pageSize?: number
  orderByColumn?: 'key_counts'
  isAsc?: 'desc,value_id'
  valueName?: string
  timeString?: string
  [propName: string]: any
}
/**
 * @Description: 根据 keyID 获取 value 的可选项
 */
export interface ValueOption {
  valueId: string
  valueName: string
  keyId: string
  codeId: string
  keyCounts: string
  keyCountsPercent?: string | number | null
  valueNameFormat?: string
}
type ValueOptionList = PaginationBase<ValueOption>

export interface TableOption {
  schema_name: string
  table_name: string
  type: string
}

export interface ColNameRes {
  support: string[]
  unsupport: string[]
}
export interface ScanTableHeader {
  title: string
}
export interface ScanTableRes {
  columns: ScanTableHeader[]
  dataSource: any[]
  error?: any
}
/**
 * @Description:  数据准备属性类型选项
 */
export interface KeyType {
  id: string | number
  key_type: string
}
export interface KeysType {
  [propName: string]: [KeyType]
}

export interface AttrStruct {
  key_struct: string
}

/** 
// 查询实体/边 label
const apiGetGraphLabel = (urlParams: UrlParams, postParams: PostParams) =>
  axios.post<LabelOptionList, PostParams>(
    `${params2Url("/flask/graph/label", urlParams)}`,
    postParams
  );

// 实体/边配置-根据labelID查询key
const apiGetGraphKey = (params: KeyParams) =>
  axios.get<KeyOptionList, KeyParams>("/flask/graph/key", params);

// 实体/边配置-根据 keyID 查询 value
const apiGetGraphValue = (params: ValueParams) =>
  axios.get<ValueOptionList, ValueParams>("/flask/graph/value", params);

// 连线模式根据起始点查询允许连接的目标点
const apiGetCanLineNode: Api<unknown> = (params) =>
  axios.get("/flask/graph/filterLabel", params);

// 数据准备配置-获取数据库表格名称
const apiGetTable: Api<TableOption[]> = (params) =>
  axios.get(`/datasource/conf/vertex_edge/table_name/${params?.id}`);

// 数据准备配置-获取表头字段
const apiGetTableColumns: Api<ColNameRes> = (params: any) =>
  axios.post("/datasource/conf/vertex_edge/col_name", params);

// 数据准备配置-预览表
const apiGetScanTable: Api<ScanTableRes> = (params: any) =>
  axios.post("/datasource/conf/vertex_edge/scan_table", params);

// 数据准备-获取属性类型
const apiGetAttrsType: Api<KeysType> = (params) =>
  axios.post("/datasource/conf/vertex_edge/attrs_type", params);

// 数据准备-全量属性类型映射关系map
const apiGetAllAttrType: Api<KeyType[]> = (params) =>
  axios.post("/datasource/check/coding_check/get_key_types_map", params);

// 数据准备-判断属性结构
const apiGetAttrStruct = <T>(params?: T) =>
  axios.post<AttrStruct, T>("/datasource/conf/vertex_edge/arrt_struct", params);

// 数据准备-where语句检查
const apiTryWhere: Api<unknown> = (params) =>
  axios.post("/datasource/conf/vertex_edge/try_where", params);

// 同构表判断
const apiIsomorphicTable: Api<boolean> = (params) =>
  axios.post("/datasource/conf/vertex_edge/isomorphic_table", params);

// 交互抽图
const apiFdRun = <T>(params?: T) =>
  axios.post<any, T>("/datasource/fd/run", params);

const apiFdGraphProgress = <T>(params?: T) =>
  axios.post<any, T>("/datasource/fd/progress", params);

const apiFdGetGraphPlan = <T>(params?: T) =>
  axios.post<GraphPlans, T>("/datasource/fd/get_plans", params);

const apiFdPrevGraphPlan = <T>(params?: T) =>
  axios.post<GraphPlans, T>("/datasource/fd/backtrack", params);

const apiFdSelectGraphPlan = <T>(params?: T) =>
  axios.post<GraphPlans, T>("/datasource/fd/chose_plan", params);

const apiFdCleanGraphPlan = <T>(params?: T) =>
  axios.post<any, T>("/datasource/fd/clean", params);

export {
  apiGetGraphLabel,
  apiGetGraphKey,
  apiGetGraphValue,
  apiGetCanLineNode,
  apiGetTable,
  apiGetTableColumns,
  apiGetScanTable,
  apiGetAttrsType,
  apiGetAllAttrType,
  apiGetAttrStruct,
  apiTryWhere,
  apiIsomorphicTable,
  // 交互抽图
  apiFdRun,
  apiFdGraphProgress,
  apiFdGetGraphPlan,
  apiFdPrevGraphPlan,
  apiFdSelectGraphPlan,
  apiFdCleanGraphPlan,
};
 */
