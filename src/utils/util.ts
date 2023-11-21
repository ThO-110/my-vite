import { TreeData, Node, Edge } from '@/types/nodes'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import duration from 'dayjs/plugin/duration'
import { isString, isObject, isArray } from '@/utils/is'
import versionsConfig from '@/config/versions'
import type { Datasource } from '@/types/dataSource'
import {
  STRUCT_MASK,
  TYPE_MASK,
  DERIVED_ATTR_MASK,
  ORIGIN_DERIVED_ATTR_MASK,
  SECTION_MAST,
  StructFlags,
  TypeFlags,
  STRUCT_MAP,
  TYPE_MAP,
  SECTION_MAP,
  ShapeFlags,
  SectionFlags,
  LOCAL_SETTING,
  Locale,
  DataSourceStatus,
  ImportSampleData,
  LicenseFunction,
  DataSourceType
} from 'utils/constant'
import { settingConfig } from '../config/default'
import { LocalSetting } from '@/types'
const { lang, theme } = settingConfig

// 判断移动端/PC端
export function checkMobileFlag(): boolean {
  const regExp =
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  return regExp.test(navigator.userAgent)
}

// 获取本地配置
export function getLocalSetting() {
  const localSetting: LocalSetting = JSON.parse(
    window.localStorage.getItem(LOCAL_SETTING) || '{}'
  )

  // 默认国际化,兼容'zh-CN'类型
  localSetting.locale = (
    localSetting.locale ||
    window.navigator.language ||
    lang
  ).replace(/-/g, '_')

  // 除'zh-CN'外，默认是英文
  localSetting.locale =
    Locale[localSetting.locale!.toLocaleUpperCase() as keyof typeof Locale] ||
    Locale.EN_US

  // 默认主题
  localSetting.theme = {
    ...theme,
    ...localSetting.theme
  }

  return localSetting
}

// 存储本地配置
export function setLocalSetting(localSetting: LocalSetting) {
  window.localStorage.setItem(LOCAL_SETTING, JSON.stringify(localSetting))
}

// 批量删除缓存
export function removeStorage(...keys: string[]) {
  keys.forEach((key) => window.localStorage.removeItem(key))
}

// 体力值单位转换
export function switchStaminaUnit(n: number): string | number {
  const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'B', 'N', 'D', 'C']
  let nToString = n.toString()
  if (/^-/.test(nToString)) {
    nToString = nToString.slice(1)
  }
  const integerLength = nToString.split('.')[0].length
  const unitIndex = Math.floor((integerLength - 1) / 3)
  if (unitIndex === 0) {
    return n
  }
  return `${(n / 1000 ** unitIndex).toFixed(2)}${units[unitIndex]}`
}

// 单位转换
export function switchUnit(n: number) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const unitIndex = Math.floor(Math.log(n) / Math.log(1024))
  const size = n / 1024 ** unitIndex

  return {
    size: size.toFixed(2),
    unit: units[unitIndex >= units.length ? units.length - 1 : unitIndex]
  }
}

/**
 * @description: 根据字节大小自动转化单位
 * @param  bytes 字节大小
 */
export function bytesSwitchUnit(bytes: number | string) {
  if (isString(bytes)) {
    bytes = Number(bytes)
  }

  if (bytes === 0) {
    return { size: 0, switchSize: 0, unit: 'MB' }
  }

  let sign = '+'
  if (bytes < 0) {
    bytes = Math.abs(bytes)
    sign = '-'
  }

  const k = 1024
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(k))
  let switchSize = bytes / Math.pow(k, unitIndex)

  if (sign === '-') {
    bytes = -bytes
    switchSize = -switchSize
  }

  return {
    size: bytes,
    switchSize: switchSize.toFixed(2),
    unit: units[unitIndex >= units.length ? units.length - 1 : unitIndex]
  }
}

// 列表中新增子项
export function addItemToList<T>(list: T[], maxLength: number) {
  const length = list.length
  if (length >= maxLength || length === 0) {
    return list
  }
  const restList: T[] = [...Array(maxLength - length)]
  return [...list, ...restList]
}

// 校验单一树结构
export function checkSingleTree(treeData: TreeData) {
  const nodeList: Node[] = deepClone(treeData.nodes)
  const edgeList: Edge[] = deepClone(treeData.edges)
  let countNode = 0
  const fnz = function fns(id: string) {
    const index = nodeList.findIndex((node) => node.id === id)
    const currentNode = nodeList[index]
    if (!currentNode || currentNode.tag) return
    countNode++
    currentNode.tag = true
    edgeList.forEach((edge) => {
      const edgeMap = new Map([
        [edge.source, edge.target],
        [edge.target, edge.source]
      ])
      fns(edgeMap.get(currentNode.id) as string)
    })
  }
  fnz(nodeList[0]?.id)
  return countNode < nodeList.length
}

// 十进制转26进制
export function switchNumberToLetter(n: number) {
  let str = ''
  while (n > 0) {
    let m = n % 26
    if (m == 0) {
      m = 26
    }
    str = String.fromCharCode(m + 96) + str
    n = (n - m) / 26
  }
  return str
}

// 26进制转十进制
export function switchLetterToNumber(str: string) {
  if (!str) return 0
  let n = 0
  const s = str.match(/./g) //求出字符数组
  for (let i = str.length - 1, j = 1; i >= 0; i--, j *= 26) {
    const c = s![i].toUpperCase()
    if (c < 'A' || c > 'Z') {
      return 0
    }
    n += (c.charCodeAt(0) - 64) * j
  }
  return n
}

/**
 * @Description: 返回限制在 lower 和 upper 之间的值
 * @param {*} value
 * @param {*} min
 * @param {*} max
 */
export function clamp(value: number, min: number, max: number): number {
  if (value < min) {
    return min
  } else if (value > max) {
    return max
  }
  return value
}
// 根据codeId判断是否为衍生属性
export function checkCustomAttrByCodeId(codeId: string) {
  if (!codeId) return false
  // return true
  return !!(
    !+`0x${getOriginalFromMask(codeId, DERIVED_ATTR_MASK)}` &&
    !+`0x${getOriginalFromMask(codeId, ORIGIN_DERIVED_ATTR_MASK)}`
  )
}

// 根据codeId判断是否为衍生属性
export function checkDerivedAttrByCodeId(codeId: string) {
  if (!codeId) return false
  return !!(
    +`0x${getOriginalFromMask(codeId, DERIVED_ATTR_MASK)}` &&
    !+`0x${getOriginalFromMask(codeId, ORIGIN_DERIVED_ATTR_MASK)}`
  )
}

// 根据codeId判断是否为衍生属性的原始属性
export function checkOriginDerivedAttrByCodeId(codeId: string) {
  if (!codeId) return false
  return !!(
    +`0x${getOriginalFromMask(codeId, DERIVED_ATTR_MASK)}` &&
    +`0x${getOriginalFromMask(codeId, ORIGIN_DERIVED_ATTR_MASK)}`
  )
}

// 根据codeId判定keyType是否相同
export function checkKeyTypeEqual(idX: string, idY: string) {
  const strEmpty = new Array(64).fill(0).join('')
  const getKeyTypeBit = (id: string) =>
    `${strEmpty}${Number(id).toString(2)}`.slice(-60, -52)
  return getKeyTypeBit(idX) === getKeyTypeBit(idY)
}

// 获取掩码遮盖后的值
const getOriginalFromMask = (codeId: string, mask: string) =>
  (BigInt(codeId) & BigInt(mask)).toString(16)

const getOriginalValue = <T>(
  codeId: string,
  map: Map<string, T>,
  mask: string
): T | undefined => map.get(getOriginalFromMask(codeId, mask))

// 根据codeId判定keyType
export function getKeyType(codeId: string) {
  if (!codeId) return ShapeFlags.SINGLE
  // 如下几种类型目前合并入number
  const mergeToNumber = [
    TypeFlags.INT,
    TypeFlags.BIGINT,
    TypeFlags.DOUBLE,
    TypeFlags.MONEY_TYPE,
    TypeFlags.NUMBER
  ]
  const struct = getOriginalValue(codeId, STRUCT_MAP, STRUCT_MASK)
  const type = getOriginalValue(codeId, TYPE_MAP, TYPE_MASK)
  const section = getOriginalValue(codeId, SECTION_MAP, SECTION_MAST)

  // 日期类型
  if (type === TypeFlags.YMD) return ShapeFlags.DATE_YMD
  if (type === TypeFlags.YM) return ShapeFlags.DATE_YM
  if (type === TypeFlags.TIME) return ShapeFlags.DATE_TIME

  // 数值类型
  if (section === SectionFlags.SECTION) return ShapeFlags.NUMBER_SECTION
  if (type && mergeToNumber.includes(type)) return ShapeFlags.NUMBER

  // 多选类型
  if (struct === StructFlags.MULTIPLE) return ShapeFlags.MULTIPLE

  if (!(type && struct)) console.error('getKeyType: type or struct error')

  // 单选类型
  return ShapeFlags.SINGLE
}

// 节流
export function throttle(fn: () => void, delay: number): () => void {
  let timeout: number | undefined = undefined
  let startTime = Date.now()
  return function (this: unknown, ...args) {
    const curTime = Date.now()
    const remaining = delay - (curTime - startTime)
    const func = () => {
      fn.apply(this, args)
      startTime = Date.now()
    }
    clearTimeout(timeout)
    if (remaining > 0) {
      timeout = setTimeout(func, remaining)
      return
    }
    func()
  }
}

// 防抖
export function debounce(
  fn: (...args: any[]) => void,
  wait: number,
  beforeFn?: () => void
): (...args: any[]) => void {
  let timeout: number | undefined = undefined
  return function (...args) {
    beforeFn && beforeFn()
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
    }, wait)
    return timeout
  }
}

// 深拷贝
export function deepClone(target: any): any {
  // 定义一个变量
  let result: any
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === 'object') {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = [] // 将result赋值为一个数组，并且执行遍历
      for (const i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]))
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null || target?.constructor === RegExp) {
      result = target
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {}
      for (const i in target) {
        result[i] = deepClone(target[i])
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target
  }
  // 返回最终结果
  return result
}

/**
 * @Description: 格式化日期
 */
export function formatTime(
  time: string | number,
  flag: any,
  utcOffset: string | null = null,
  isShowUtc = true
): string {
  const timeObj: any = {
    ymd: 'YYYY-MM-DD',
    ym: 'YYYY-MM',
    ymdt: 'YYYY-MM-DD HH:mm:ss'
  }
  let date = dayjs(Number(time)).format(timeObj[flag])
  if (utcOffset) {
    dayjs.extend(utc)
    date = dayjs(Number(time)).utcOffset(utcOffset).format(timeObj[flag])
    if (isShowUtc) {
      date += ' (UTC' + utcOffset + ')'
    }
  }
  return date
}

/**
 * @description:  转化剩余天数格式
 * @param millisecond 剩余时长的时间戳
 */
export function switchRemainDate(millisecond: number) {
  dayjs.extend(duration)
  let days = dayjs.duration(millisecond).asDays()
  days = Math.floor(days)
  return {
    time: millisecond,
    days: days
  }
}

/**
 * @Description: 参数拼接url
 */
export function params2Url(uri: string, params: any) {
  const paramsArray: any[] = []
  Object.keys(params).forEach(
    (key) => params[key] && paramsArray.push(`${key}=${params[key]}`)
  )
  if (uri.search(/\?/) === -1) {
    uri += `?${paramsArray.join('&')}`
  } else {
    uri += `&${paramsArray.join('&')}`
  }
  return uri
}

// 域名正则校验
export function checkDomainName(value: string): boolean {
  const regExp =
    /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/
  return regExp.test(value)
}

// 地址(ip+端口)正则校验
export function checkAddress(value: string): boolean {
  const ip_ip = '(25[0-5]|2[0-4]\\d|1\\d\\d|\\d\\d|[1-9])'
  const ip_ip2 = '(25[0-5]|2[0-4]\\d|1\\d\\d|\\d\\d|\\d)'
  const ip_ipdot = ip_ip + '\\.'
  const ip_ipdot2 = ip_ip2 + '\\.'
  const ip_port = '(:([1-9]|[1-9]\\d{1,3}|[1-5]\\d{4}|6[0-5][0-5][0-3][0-5]))'
  const regExp = new RegExp(
    '^' + ip_ipdot + ip_ipdot2 + ip_ipdot2 + ip_ip + ip_port + '$'
  )
  return regExp.test(value)
}

// IP正则校验
export function checkIP(value: string): boolean {
  const regExp =
    /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/
  return regExp.test(value)
}

// 端口正则校验
export function checkPort(value: string): boolean {
  const regExp =
    /^[1-9]$|(^[1-9]\d{1,3}$)|(^[1-5]\d{4}$)|(^6[0-5][0-5][0-3][0-5]$)/
  return regExp.test(value)
}

// 特殊字符正则校验
export function checkSpechars(value: string): boolean {
  const regExp = /[\\:/:*?"<>|]/
  return regExp.test(value)
}

// 失败状态的数据源状态
export function dataSourceErrorStatus(status: DataSourceStatus) {
  return [
    DataSourceStatus.CANNOT_REPAIR,
    DataSourceStatus.STORING_FAIL,
    DataSourceStatus.FAIL,
    DataSourceStatus.IMPORT_FAIL,
    DataSourceStatus.LOAD_FAIL,
    DataSourceStatus.NOT_AVAILABLE
  ].includes(status)
}

// CSV数据源查看跳转到数据库连接页面的状态
export function csvDataSourceToConnect(status: DataSourceStatus) {
  return [
    DataSourceStatus.PARTIAL_IMPORT_SUCCESS,
    DataSourceStatus.IMPORTING,
    DataSourceStatus.IMPORT_FAIL,
    DataSourceStatus.LOAD_FAIL,
    DataSourceStatus.CANCEL_IMPORT,
    DataSourceStatus.NOT_AVAILABLE
  ].includes(status)
}

// 移除指定url参数
export function delUrlQueryByName(name: string) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  // 匹配指定参数
  const queryList = window.location.search.substring(1).match(reg)
  if (queryList != null) {
    const url = window.location.href.replace(queryList[0], '')
    const urlLength = url.length - 1
    // 判断最后位是否为'?' 是则移除
    return url.charAt(urlLength) === '?' && url.substring(0, urlLength)
  }
  return window.location.href
}

// 配合商用版nginx转发端口，获取用户端口
export function getPort() {
  const portString = window.location?.pathname.match(/^(\/user-\d+?)\//)
  return portString ? portString[1] : ''
}

// 获取JSON对象深度和Key值
function getGraphImportData(obj: any, index: number, isArr = false) {
  let curDepth = 1
  let hasNoEmptyKey = true
  const graphKeyArr: string[][] = []

  function loopGetObjectLevelAndKey(
    objArgs: any,
    curNodeArr?: string[],
    level?: number
  ) {
    const curLevel = level ? level : 0

    for (const key in objArgs) {
      if (key.trim() === '') {
        hasNoEmptyKey = false
        break
      }
      const curPathArr = curNodeArr
        ? [...curNodeArr, key]
        : isArr
        ? [String(index), key]
        : [key]

      if (isObject(objArgs[key]) && JSON.stringify(objArgs[key]) !== '{}') {
        loopGetObjectLevelAndKey(objArgs[key], curPathArr, curLevel + 1)
      } else {
        graphKeyArr.push(curPathArr)
        curDepth = curLevel + 1 > curDepth ? curLevel + 1 : curDepth
      }
    }

    return {
      hasNoEmptyKey: hasNoEmptyKey,
      maxDepth: curDepth,
      graphKey: graphKeyArr
    }
  }
  return loopGetObjectLevelAndKey(obj)
}

export function verifyImportData(
  importSampleData: string,
  jsonDepth: number,
  jsonTotalWidth: number,
  curSampleCount: number
) {
  const afterRemoveSpaceData = importSampleData.trim()
  if (afterRemoveSpaceData === '') {
    return { errorInfo: ImportSampleData.ALLSUCCESS, result: [] }
  }
  const resultArr: (string | string[])[][][] = []
  let jsonErrorInfo: ImportSampleData = ImportSampleData.ALLSUCCESS
  let splitJsonArr = ''
  let isUnEmptyJsonCount = 0
  let batchCount = 0

  const loopElement = (
    element: any,
    index: number,
    itemIndex?: number,
    isArr?: boolean
  ) => {
    const result = getGraphImportData(element, itemIndex || 0, isArr)
    if (isArr) {
      if (!resultArr[index]) {
        resultArr[index] = []
      }
      resultArr[index].push(result.graphKey)
    } else {
      resultArr.push(result.graphKey)
    }

    isUnEmptyJsonCount++
    batchCount += result.graphKey.length

    if (!result.hasNoEmptyKey) {
      jsonErrorInfo = ImportSampleData.HASERROR
      return false
    }

    if (result.maxDepth > jsonDepth) {
      jsonErrorInfo = ImportSampleData.MAXDEPTHERROR
      return false
    }
    if (batchCount > jsonTotalWidth) {
      jsonErrorInfo = ImportSampleData.MAXCOUNTERROR
      return false
    }
    return true
  }
  try {
    splitJsonArr = JSON.parse('[' + afterRemoveSpaceData + ']')
    let index = 0
    for (const element of splitJsonArr) {
      if (JSON.stringify(element) === '{}') {
        continue
      }
      if (isObject(element)) {
        loopElement(element, index)
        // console.log(resultArr)
      } else if (isArray(element)) {
        element.forEach((item: any, itemIndex) => {
          const rtn = loopElement(item, index, itemIndex, true)
          if (!rtn) {
            throw Error
          }
        })
      } else {
        jsonErrorInfo = ImportSampleData.HASERROR
        break
      }
      index++
    }
  } catch (error) {
    jsonErrorInfo = ImportSampleData.HASERROR
  }

  if (
    resultArr.length &&
    jsonErrorInfo === ImportSampleData.ALLSUCCESS &&
    curSampleCount + isUnEmptyJsonCount > 10
  ) {
    jsonErrorInfo = ImportSampleData.MAXSAMPLEERROR
  }
  console.log(resultArr)

  return {
    errorInfo: jsonErrorInfo,
    result: resultArr
  }
}

// license数据源code映射
export const licenseDataSourceMapping: Record<string, DataSourceType> = {
  [LicenseFunction.POSTGRESQL]: DataSourceType.POSTGRESQL,
  [LicenseFunction.MYSQL]: DataSourceType.MYSQL,
  [LicenseFunction.ORACLE]: DataSourceType.ORACLE,
  [LicenseFunction.HIVE]: DataSourceType.HIVE,
  [LicenseFunction.CSV]: DataSourceType.CSV,
  [LicenseFunction.CSV_FILE_UPLOAD]: DataSourceType.CSV_UPLOAD,
  [LicenseFunction.GREENPLUM]: DataSourceType.GREENPLUM,
  [LicenseFunction.GAUSSDB]: DataSourceType.GAUSSDB,
  [LicenseFunction.YASHANDB]: DataSourceType.YASHANDB
}

// 不可配置的数据源
export const nonConfigurableDataSource = (item: Datasource) => {
  return (
    [
      DataSourceStatus.RUNNING,
      DataSourceStatus.STORING,
      DataSourceStatus.CANNOT_REPAIR,
      DataSourceStatus.STORING_FAIL,
      DataSourceStatus.FAIL,
      DataSourceStatus.NOT_AVAILABLE
    ].includes(item.datasourceStatus) ||
    versionsConfig.NO_CONFIG_DATASOURCE ||
    (item.datasourceStatus === DataSourceStatus.END && item.taskCount > 0) ||
    item.presetDatasource ||
    String(item.isOperation) === 'false'
  )
}

// 数据展示处理
type Data = number | string | null
export const setFloat2 = (data: Data) => {
  return data || data === 0 ? String(Math.ceil(+data * 100) / 100) : void 0
}
export const setPercentage = (data: Data) => {
  return data || data === 0 ? Math.ceil(+data * 10000) / 100 + '%' : void 0
}
export const setMse = (mse: Data) => {
  const mseArr = mse !== null ? String(mse).split('e') : null
  const hasE = mseArr?.[1] ? 'e' + mseArr[1] : ''
  return mseArr ? (+mseArr[0]).toFixed(2) + hasE : null
}
export const setR2 = (data: Data) => {
  return data || data === 0 ? (+data).toFixed(2) : null
}

/**
 * vite方式引入assets目录下静态资源
 * @param url assets目录下的路径 eg: video/example.mp4
 * @returns 目标资源路径，生产环境下带hash值
 */
export const getAssetSource = (url: string) =>
  new URL(`../assets/${url}`, import.meta.url).href
