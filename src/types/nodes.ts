import { ComputedRef } from 'vue'
import type {
  TableOption,
  ScanTableHeader,
  LabelOption,
  KeyOption,
  ValueOption,
  KeyType
} from 'api/graphConfig'

/**
 * @Description: 规则发现任务配置
 */
export interface TaskConfig {
  xData?: TreeData //发现对象配置
  yData?: TreeData //发现方向配置
}

/**
 * @Description: X6 画布布局数据
 */
export interface TreeData {
  nodes: Array<Node>
  edges: Array<Edge>
  tag?: string // 自动布局标记，用于判断是否连续进行自动布局
  [propName: string]: any
}
/**
 * @Description: X6 画布布局数据中的节点
 */
export interface Node {
  id: string
  shape: string
  width?: number
  height?: number
  zIndex?: number
  data: any // 携带的业务数据
  x?: number
  y?: number
  attrs: any
  addBtnDisabled?: boolean // 自定义属性：规则发现、规则库节点上的添加按钮是否禁用
  isStartPoint?: boolean // 自定义属性：规则发现-发现对象中的起始点标记
  [propName: string]: any
}
/**
 * @Description: X6 画布布局数据中的边
 */
export interface Edge {
  id: string
  shape: string
  source: string
  target: string
  zIndex?: number
  data: any
  attrs: any
  [propName: string]: any
}

/**
 * @Description: 发现配置、数据准备、规则编辑 弹窗编辑的数据
 */
export interface EditData<T> {
  businessData: T
  cell: Node | Edge
  [propName: string]: any
}

/**
 * @Description: 规则发现弹窗配置中的实体业务数据
 */
export interface EditCellDataInFindConfig {
  filterLabelParams: [] // 过滤 Label 可选项的查询参数
  labelOptions: LabelOption[] // Label 选项
  labelSelected: null | string // 选择的 Label
  keyOptions: KeyOption[] // Key 可选项
  attrLists: AttrListsItemInFindConfig[] // 属性列表
  [propName: string]: any
}

/**
 * @description: 规则发现弹窗配置中的属性行
 */
export interface AttrListsItemInFindConfig {
  keySelected: null | KeyOption
  valueSelected: { selected: ValueOption[] }
  relationshipFlag?: boolean
  deleteTag?: boolean
}

/**
 * @description: 数据准备点击边后，两点间其他边的label
 */
export interface OtherEdgeLabelNames {
  directionEdgeLabelNames: string[] //  与点击边同向的其他边的label
  reverseEdgeLabelNames: string[] // 与点击边反向的边的label
}

/**
 * @Description: 数据源数据准备弹窗配置中实体业务数据
 */
export interface EditDataInSourceEntity {
  // 其他所有 cell 的表格和实体列选中内容,用于判断实体内容的唯一性
  allCellsEntityColumnConfig: CellEntityColumnConfig[]

  // 其他点的标签名称，编辑时判断是否重复(点与点不能重复；边与同起始点同目标点的边不能重复)
  otherCellLabelNames: string[] | OtherEdgeLabelNames

  // 表格选择
  tableSelected: null | string
  tableLoading: boolean
  tableDisabled: boolean
  tableOptions: TableOption[]
  tableSelectedIsError?: boolean // 数据库表格异常

  // 底部预览表
  footerTableLoading: boolean
  dataSource: any[] // 表格数据
  columns: ScanTableHeader[] // 表格字段

  // 实体或者关系列
  entityColumnSelected: string[]
  entityColumnDisabled: boolean
  entityColumnLoading: boolean
  entityColumnOptions: string[]
  unSupportColumnOptions: string[] // 不支持的选项
  entityColumnSelectedIsError?: boolean // 数据库表格字段异常
  errorColumnInEntityColumnSelected?: string[] // 选中项中包含的异常字段

  // 标签名称
  labelName: null | string
  labelNameDisabled: boolean

  // where 语句
  showWhere: boolean
  whereDisabled: boolean
  where: null | string

  // 边的前序点
  sourceLabel: null | string
  sourceSelected: string[]
  sourceLoading: boolean
  sourceDisabled: boolean
  sourceOptions: ComputedRef<string[]> | string[]
  sourceSelectedIsError?: boolean
  errorColumnInSourceSelected?: string[]

  // 边的后序点
  targetLabel: null | string
  targetSelected: string[]
  targetLoading: boolean
  targetDisabled: boolean
  targetOptions: ComputedRef<string[]> | string[]
  targetSelectedIsError?: boolean
  errorColumnInTargetSelected?: string[]

  // 时间列
  timeColumnSelected: null | TimeColumn
  timeColumnDisabled: boolean
  timeColumnLoading: boolean
  timeColumnOptions: ComputedRef<string[]> | string[]
  timeColumnSelectedIsError?: boolean

  // 属性列
  attributeColumnOptions: ComputedRef<string[]> | string[]
  attributeColumnDisabled: boolean
  attributeColumnLoading: boolean
  attrLists: Array<DataSourceEntityAttrListsItem>
}

// 提交给后台的时间列
export interface TimeColumn {
  column: string
  key_type: number
}
/**
 * @Description: 数据源数据准备中实体业务数据--移除loading等控制项，只保留弹窗业务数据
 */
export interface BusinessDataInSourceEntity {
  // 表格选择
  tableSelected: null | string
  // 实体列
  entityColumnSelected: string[]
  // 标签名称
  labelName: null | string
  // where 语句
  where: null | string
  // 边的前序点
  sourceLabel: null | string
  sourceSelected: string[]
  // 时间列
  timeColumnSelected: null | TimeColumn
  // 边的后序点
  targetLabel: null | string
  targetSelected: string[]
  // 属性列
  attrLists: Array<DataSourceEntityAttrListsItemOnlyBusinessData>
}

/**
 * @Description: 数据准备 cell 的表格和实体/关系列选中内容
 */
export interface CellEntityColumnConfig {
  tableSelected: null | string
  entityColumnSelected: string[]
}
/**
 * @Description: 数据源数据准备中实体业务数据-属性列
 */
export interface DataSourceEntityAttrListsItem {
  // 属性列
  attributeColumnRef: any
  attributeColumnSelected: string | null
  attributeColumnSelectedIsError: boolean
  // 属性名称
  attributeName: string | null
  attributeNameDisabled: boolean
  // 属性类型
  attributeTypeRef: any
  attributeTypeSelected: string | null
  attributeTypeLoading: boolean
  attributeTypeDisabled: boolean
  attributeTypeOptions: KeyType[]
}
/**
 * @Description: 数据源数据准备中实体业务数据属性列--移除loading等控制项，只保留弹窗业务数据
 */
export interface DataSourceEntityAttrListsItemOnlyBusinessData {
  // 属性列
  attributeColumnSelected: string | null
  // 属性名称
  attributeName: string | null
  // 属性类型
  attributeTypeSelected: string | null
}
/**
 * @Description: 数据源数据准备中实体业务数据-其他节点的属性名和属性类型
 */
export interface OtherCellAttribute {
  labelName: string
  type: string
  attributeName: string
  attributeTypeSelected: string
}
