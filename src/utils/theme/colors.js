import { generate } from '@ant-design/colors/dist/index'
import {
  antDesignConfig,
  constantConfig,
  settingConfig
} from '../../config/default'

// 获取 ant design 色系
function getAntdColors(color, mode) {
  const options =
    mode && mode === constantConfig.THEME_MODE.DARK
      ? { theme: 'dark' }
      : undefined
  return generate(color, options)
}

// 获取功能性颜色
function getFunctionalColors(mode) {
  const options =
    mode && mode === constantConfig.THEME_MODE.DARK
      ? { theme: 'dark' }
      : undefined
  let { success, warning, error } = antDesignConfig.primary
  const { success: s1, warning: w1, error: e1 } = settingConfig.theme
  success = success && s1
  warning = warning && w1
  error = error && e1
  const successColors = generate(success, options)
  const warningColors = generate(warning, options)
  const errorColors = generate(error, options)
  return {
    success: successColors,
    warning: warningColors,
    error: errorColors
  }
}

// 获取菜单色系
function getMenuColors(color, mode) {
  if (mode == constantConfig.THEME_MODE.DARK) {
    return antDesignConfig.primary.dark.menuColors
  }
  return [
    mixDarken(color, 0.93),
    mixDarken(color, 0.83),
    mixDarken(color, 0.73)
  ]
}

// 获取主题模式切换色系
function getThemeToggleColors(color, mode) {
  // 主色系
  const mainColors = getAntdColors(color, mode)
  const primary = mainColors[5]
  // 辅助色系，因为 antd 目前没针对夜间模式设计，所以增加辅助色系以保证夜间模式的正常切换
  const subColors = getAntdColors(primary, constantConfig.THEME_MODE.LIGHT)
  // 菜单色系
  const menuColors = getMenuColors(color, mode)
  // 内容色系（包含背景色、文字颜色等）
  const themeCfg = antDesignConfig.theme[mode]
  let contentColors = Object.keys(themeCfg)
    .map((key) => themeCfg[key])
    .map((colorItem) =>
      isHex(colorItem) ? colorItem : toNum3(colorItem).join(',')
    )
  // 内容色去重
  contentColors = [...new Set(contentColors)]
  // rgb 格式的主题色
  const rgbColors = [toNum3(primary).join(',')]
  const functionalColors = getFunctionalColors(mode)
  return {
    primary,
    mainColors,
    subColors,
    menuColors,
    contentColors,
    rgbColors,
    functionalColors
  }
}

function toNum3(color) {
  if (isHex(color)) {
    return tN3(color)
  }
  let colorStr = ''
  if (isRgba(color)) {
    colorStr = color.slice(5, color.lastIndexOf(','))
  } else if (isRgb(color)) {
    colorStr = color.slice(4, color.length)
  }
  const rgb = colorStr.split(',')
  const r = parseInt(rgb[0])
  const g = parseInt(rgb[1])
  const b = parseInt(rgb[2])
  return [r, g, b]
}

function isHex(color) {
  return color.length >= 4 && color[0] === '#'
}

function isRgb(color) {
  return color.length >= 10 && color.slice(0, 3) === 'rgb'
}

function isRgba(color) {
  return color.length >= 13 && color.slice(0, 4) === 'rgba'
}

function mixLighten(colorStr, weight) {
  return mix('fff', colorStr, weight)
}

function mixDarken(colorStr, weight) {
  return mix('000', colorStr, weight)
}

function mix(color1, color2, weight, alpha1, alpha2) {
  color1 = dropPrefix(color1)
  color2 = dropPrefix(color2)
  if (weight === undefined) weight = 0.5
  if (alpha1 === undefined) alpha1 = 1
  if (alpha2 === undefined) alpha2 = 1
  const w = 2 * weight - 1
  const alphaDelta = alpha1 - alpha2
  const w1 =
    ((w * alphaDelta === -1 ? w : (w + alphaDelta) / (1 + w * alphaDelta)) +
      1) /
    2
  const w2 = 1 - w1
  const rgb1 = toNum3(color1)
  const rgb2 = toNum3(color2)
  const r = Math.round(w1 * rgb1[0] + w2 * rgb2[0])
  const g = Math.round(w1 * rgb1[1] + w2 * rgb2[1])
  const b = Math.round(w1 * rgb1[2] + w2 * rgb2[2])
  return '#' + pad2(r) + pad2(g) + pad2(b)
}

function tN3(colorStr) {
  colorStr = dropPrefix(colorStr)
  if (colorStr.length === 3) {
    colorStr =
      colorStr[0] +
      colorStr[0] +
      colorStr[1] +
      colorStr[1] +
      colorStr[2] +
      colorStr[2]
  }
  const r = parseInt(colorStr.slice(0, 2), 16)
  const g = parseInt(colorStr.slice(2, 4), 16)
  const b = parseInt(colorStr.slice(4, 6), 16)
  return [r, g, b]
}

function dropPrefix(colorStr) {
  return colorStr.replace('#', '')
}

function pad2(num) {
  let t = num.toString(16)
  if (t.length === 1) t = '0' + t
  return t
}

export {
  isHex,
  isRgb,
  isRgba,
  toNum3,
  getAntdColors,
  getMenuColors,
  getThemeToggleColors,
  getFunctionalColors
}
