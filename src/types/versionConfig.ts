export interface VersionsConfig {
  // 支持创建多种数据库类型的数据源
  MULTIPLE_DATABASE_TYPE?: boolean
  // 单点登录
  SINGLE_SIGN_ON_TRIAL?: boolean
  SINGLE_SIGN_ON_CLOUD?: boolean

  // 试用版禁用路由
  TRIAL_FORBID_ROUTES?: boolean

  // 跳转官网
  NAV_TO_FISHING_FORT_OWE?: boolean
  // 跳转LICENSE
  NAV_TO_LICENSE?: boolean
  // 付费功能并禁止使用
  FORBID_PAYMENT_FUNCTION?: boolean

  // 高级配置功能
  SENIOR_CONFIG?: boolean

  // 数据源管理无法创建
  NO_CREATE_DATASOURCE?: boolean
  // 数据源管理不显示更新时间
  NO_DATASOURCE_UPDATE_TIME?: boolean
  // 数据源管理无法配置
  NO_CONFIG_DATASOURCE?: boolean
  // 数据源管理无法查看
  NO_CHECK_DATASOURCE?: boolean
  // 数据源管理无法删除
  NO_DELETE_DATASOURCE?: boolean
  // 数据源管理无法克隆
  NO_CLONE_DATASOURCE?: boolean

  // 规则发现无法入库规则
  NO_RULE_DISCOVERY_IN_RULES?: boolean
  // 规则发现过程的cores数据显示
  NO_RULE_DISCOVERY_CORES_NUM?: boolean

  // 规则应用过程的cores数据显示
  NO_RULE_APPLY_CORES_NUM?: boolean

  // 通用版禁用数据源可用容量检查
  COMMON_FORBID_SPACE_ALERT?: boolean

  // 埋点
  HAS_BURYING_POINT?: boolean

  // 市场
  HAS_MARKET?: boolean

  // 进入系统无需登录
  NO_LOGIN?: boolean
}
