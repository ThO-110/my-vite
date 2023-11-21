import {
  RuleDiscoveryStatus,
  RuleApplyStatus,
  DataSourceStatus
} from '@/utils/constant'
// 分页
export interface PaginationBase<T> {
  total: number
  rows: T[]
}

// 字典
export interface Dictionary {
  label: string
  value: string
}
// 规则发现状态字典
export interface RuleDiscoveryDictionary {
  label: string
  value: RuleDiscoveryStatus
}

// 规则应用状态字典
export interface RuleApplyDictionary {
  label: string
  value: RuleApplyStatus
}

// 数据源状态字典
export interface DataSourceDictionary {
  label: string
  value: DataSourceStatus
}
