export interface TableSelect {
  title: string
  value: string
  children?: Array<{ title: string; value: string }>
}

export interface TableContent {
  value: string
  schema: string
  tableName: string
  tableType: string
  cols: string[]
  colOptions: string[]
  checkAll?: boolean
  indeterminate?: boolean
  isOpenPreview?: boolean
  isAttrsView?: boolean
  isOpenAttrsView?: boolean
}

export interface TableContentParams {
  cols: string[]
  schema: string
  table_name: string
  table_type: string
  tableName: string
  tableType: string
}

export interface FieldSelectData {
  tableContent: Array<TableContent>
  selectTable: Array<{ label: string; value: string }>
  selectedTable: Array<{ label: string; value: string }>
}

export interface Attr {
  col: string
  key_name: string
  key_type: string
  key_type_id: number
}

export interface Vertexe {
  new: boolean
  schema: string
  table: string
  table_type: string
  id: string
  label: string
  uid: string[]
  attrs: Array<Attr>
}

export interface Edge {
  id?: string
  new: boolean
  schema: string
  table: string
  table_type: string
  label: string
  uid: string[]
  from_id: string
  to_id: string
  from: string[]
  to: string[]
  attrs: Array<Attr>
}

export interface GraphPlan {
  plan_id: string
  vertexes: Array<Vertexe>
  edges: Array<Edge>
}

export interface GraphPlans {
  ds_id?: string
  round: number
  total_plans: number
  total_page: number
  cur_page: number
  fd_covers: GraphPlan[]
}

export interface GraphShowData {
  id: string
  schema: string
  table: string
  label: string
  new: boolean
  from_id?: string
  to_id?: string
  uid?: Array<string>
  col?: string
  key_name?: string
  key_type_id?: number
  // 操作
  previewVisible: boolean
  editVisible: boolean
  isEdge: boolean
  isError: boolean
  isLabel: boolean
  isRemove?: boolean
}

export interface GraphShowType {
  graphData: GraphPlan | null
  allGraphDataList: Array<GraphShowData>
  newGraphDataList: Array<GraphShowData>
}
