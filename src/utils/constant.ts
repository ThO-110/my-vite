import { constantConfig } from '@/config/default'
import type { InjectionKey } from 'vue'

// token
export const TOKEN = 'token'

// user information
export const USER_INFOMATION = 'userInfo'

// heartbeat
export const HEARTBEAT = 'HEARTBEAT'

// LicenseTips
export const LICENSE_TIPS = 'LICENSE_TIPS'

// FirstEntryTips
export const FIRST_ENTRY_TIPS = 'FIRST_ENTRY_TIPS'

// locale
export enum Locale {
  ZH_CN = 'zh_CN',
  EN_US = 'en_US'
}

// theme mode
export const THEME_MODE: {
  DARK: string
  LIGHT: string
} = constantConfig.THEME_MODE

// localeSetting
export const LOCAL_SETTING = 'LOCAL_SETTING'

// 连线模式不可配置提示
export const CONNECTION_MODE_WARNTIPS = 'CONNECTION_MODE_WARNTIPS'

// switch page
export enum SwitchPage {
  PUSH = 'PUSH',
  REPLACE = 'REPLACE',
  BACK = 'BACK'
}

export enum LayoutType {
  EQUAL_PADDING,
  EQUAL_WIDTH,
  CONTENT
}

// mask
export const STRUCT_MASK = '0xf000000000000000'
export const TYPE_MASK = '0xf000000000000'
export const DERIVED_ATTR_MASK = '0xffc000000000'
export const ORIGIN_DERIVED_ATTR_MASK = '0x2000000000'
export const CUSTOM_ATTR_MASK = '0xffc000000000'
export const ORIGIN_CUSTOM_ATTR_MASK = '0x2000000000'
export const SECTION_MAST = '0x1000000000'

export enum StructFlags {
  SINGLE = 'single',
  MULTIPLE = 'multi'
}
export enum TypeFlags {
  STRING = 'string',
  TIME = 'time',
  YMD = 'ymd',
  YM = 'ym',
  INT = 'int',
  BIGINT = 'bigint',
  DOUBLE = 'double',
  MONEY_TYPE = 'money_type',
  NUMBER = 'number',
  NUMBER_SECTION = 'number_section'
}
// 属性值的结构
export const STRUCT_MAP = new Map([
  ['0', StructFlags.SINGLE],
  ['1000000000000000', StructFlags.MULTIPLE]
])
// 属性值的类型
export const TYPE_MAP = new Map([
  ['0', TypeFlags.STRING],
  ['1000000000000', TypeFlags.TIME],
  ['2000000000000', TypeFlags.YMD],
  ['3000000000000', TypeFlags.YM],
  ['4000000000000', TypeFlags.INT],
  ['5000000000000', TypeFlags.BIGINT],
  ['6000000000000', TypeFlags.DOUBLE],
  ['7000000000000', TypeFlags.MONEY_TYPE],
  ['8000000000000', TypeFlags.NUMBER]
])

export enum SectionFlags {
  SINGLE = '0',
  SECTION = '1'
}
// 数值类型是否分段的类型
export const SECTION_MAP = new Map([
  ['0', SectionFlags.SINGLE],
  ['1000000000', SectionFlags.SECTION]
])

// 编辑类型
export enum ShapeFlags {
  SINGLE = 1,
  MULTIPLE = 1 << 1,
  DATE_YMD = 1 << 2,
  DATE_YM = 1 << 3,
  DATE_TIME = 1 << 4,
  NUMBER = 1 << 5,
  NUMBER_SECTION = 1 << 6
}

// provide/inject
// reload
export const RELOAD: InjectionKey<() => void> = Symbol()
// resetScrollbar
export const RESET_SCROLLBAR: InjectionKey<() => void> = Symbol()

// 规则发现状态类型
export enum RuleDiscoveryStatus {
  DISCOVERY = '1',
  RUNNING = '2',
  END = '3',
  NOT_AVAILABLE = '4'
}

// 规则应用状态类型
export enum RuleApplyStatus {
  RUNNING = '0',
  PAUSED = '1',
  ERROR = '2',
  NOT_AVAILABLE = '3'
}

// 数据源类型
export enum DataSourceType {
  POSTGRESQL = '0',
  MYSQL = '1',
  ORACLE = '2',
  HIVE = '3',
  CSV = '5',
  CSV_UPLOAD = '6',
  GREENPLUM = '7',
  GAUSSDB = '8',
  YASHANDB = '9'
}

// 数据源状态类型
export enum DataSourceStatus {
  DISCOVERY = 0, // 配置中
  IMPORTING = 1, // 导入中
  CANCEL_IMPORT = 2, // S3-取消导入
  PARTIAL_IMPORT_SUCCESS = 3, // S3-部分导入成功
  RUNNING = 4, // 抽图中
  END = 5, // 已完成
  STORING = 6, // 入库中
  STORING_FAIL = 8, // 图文件入库失败
  CANNOT_REPAIR = 10, // 检测结果未通过-不可修复
  FAIL = 11, // 抽图失败
  IMPORT_FAIL = 12, // S3-拉取失败
  LOAD_FAIL = 13, // S3-导入失败
  NOT_AVAILABLE = 30 // 数据源不可用
}

// 数据源连接测试状态
export enum ConnectTestStatus {
  INIT = 'init', // 初始状态
  TESTING = 'testing', // 测试中
  SUCCESS = 'success', // 测试成功
  FAILED = 'failed' // 测试失败
}

// CSV本地上传数据源新建状态
export enum CSVCreateStatus {
  INIT = 'init', // 初始状态
  CREATING = 'creating', // 测试中
  SUCCESS = 'success', // 测试成功
  FAILED = 'failed' // 测试失败
}

export enum DataSourceModalId {
  SEASONAL_FORECAST = '0', // 季节推断模型
  TIME_DIVISION = '1', // 时间划分模型
  FESTIVAL = '2', // 节日模型
  ADDRESS_SUBDIVISION = '3', // 地址细分模型
  NAME_GENDER = '4', // 人名性别模型
  COMMODITY_PRICE = '5', // 商品标题价格模型
  NUMBER_SECTION = '6', // 数值分段模型
  MOBILE_ATTRIBUTION = '7', // 手机号信息模型
  IDENTITY_OWNERSHIP = '8', // 身份证号前六位省市归属地查询模型
  COMMERCE_KEYWORDS = '9', // 电商信息关键词抽取模型
  INSTITUTION_NAME = '10' // 机构名命名实体识别模型
}

export enum LicenseFunction {
  RULE_DISCOVERY = '101', // 规则发现
  DATASOURCE = '102', // 数据源管理
  RULE_APPLY = '103', // 规则应用
  POSTGRESQL = '104', // postgresql
  ORACLE = '105', // Oracle
  HIVE = '106', // hive
  CSV = '107', // csv
  SEASONAL_FORECAST = '108', // 季节推断模型
  TIME_DIVISION = '109', // 时间划分模型
  FESTIVAL = '110', // 节日模型
  ADDRESS_SUBDIVISION = '111', // 地址细分模型
  NAME_GENDER = '112', // 中文人名性别模型
  COMMODITY_PRICE = '113', // 商品标题价格模型
  NUMBER_SECTION = '114', // 数值分段模型
  MOBILE_ATTRIBUTION = '115', // 手机号信息模型
  IDENTITY_OWNERSHIP = '117', // 身份证号前六位省市归属地查询模型
  COMMERCE_KEYWORDS = '118', // 电商信息关键词抽取模型
  CSV_FILE_UPLOAD = '116', // csv文件上传
  GAUSSDB = '119', // guassdb
  MYSQL = '120', // mysql
  GREENPLUM = '121', // greenplum
  YASHANDB = '122', // 崖山DB
  INSTITUTION_NAME = '123' // 电机构名命名实体识别模型
}

export enum LicenseFunctionStatus {
  NOT_PURCHASED = '0', // 未购买
  EXRIRED = '1', // 已过期
  NORMAL = '2', // 正常
  TEMPORARY = '3' // 临期
}

export enum FilesUploadStatus {
  WAIT = '0', // 等待
  PAUSE = '1', //停止
  UPLOADING = '2', //上传中
  HASH = '3', // HASH计算
  ERROR = '4', // 错误
  DONE = '5', // 已完成
  DELETE = '6', // 删除
  SUCCESS = '7', // 成功
  SECONDPASS = '8', // 秒传
  RESUME = '9' // 恢复上传
}

// 规则类型枚举
export enum RuleType {
  RULE_SET = '0', // 规则集
  ARTIFICIAL_RULE = '1', // 人工规则
  SYSTEM_RULE = '2', // 系统规则
  MULTI_OP = '3', // 多算子
  SEGMENTATION = '4', // 数值分段
  ART_NUMBER_INTERVAL_RULE = '5', // 人工数值分段规则
  SYS_ZL_COL = '6', // 系统多值规则
  ART_ZL_COL = '7', // 人工多值规则
  ALL_RULE = '99' // 所有规则
}

export enum ImportSampleData {
  ALLSUCCESS = '0', // 全部通过
  HASERROR = '1', // 存在JSON不合法
  MAXDEPTHERROR = '2', // 存在单个JSON最大嵌套深度超出限制
  MAXCOUNTERROR = '3', // 最终拉平的JSON数组嵌套key的个数超出限制
  MAXSAMPLEERROR = '4' // 样例数据最多添加数
}

export const LABEL_NAME_LENGTH = 30
export const ATTRIBUTE_NAME_LENGTH = 30

// 发现方向预测方案名称
export enum PlanName {
  ENTITY_ATTRIBUTE = '0',
  ENTITY_RELATIONSHIP_ATTRIBUTE = '1',
  LINK = '2',
  SKIP = '3'
}

// 规则验证验证集状态
export enum RuleValidationStatus {
  INIT = '-1', // 未验证
  FAIL = '0', // 验证失败
  RUNNING = '1', // 验证中
  SUCCESS = '2', // 验证完成
  ERROR = '3' // 验证异常
}

export default {
  TOKEN,
  USER_INFOMATION,
  HEARTBEAT,
  LICENSE_TIPS,
  Locale,
  THEME_MODE,
  LOCAL_SETTING,
  SwitchPage,
  LayoutType,
  STRUCT_MASK,
  TYPE_MASK,
  StructFlags,
  TypeFlags,
  STRUCT_MAP,
  TYPE_MAP,
  ShapeFlags,
  RELOAD,
  RESET_SCROLLBAR,
  RuleDiscoveryStatus,
  RuleApplyStatus,
  DataSourceStatus,
  ConnectTestStatus,
  CSVCreateStatus,
  DataSourceModalId,
  LicenseFunction,
  LicenseFunctionStatus,
  FilesUploadStatus,
  RuleType,
  ImportSampleData,
  LABEL_NAME_LENGTH,
  ATTRIBUTE_NAME_LENGTH,
  PlanName,
  RuleValidationStatus
}
