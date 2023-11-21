// antd 配置
// 配置的值不能重复，否则会导致匹配错误
// 透明度会被过滤，rgba或者#ffffffff
export default {
  primary: {
    color: '#1890ff',
    warning: '#faad14',
    success: '#52c41a',
    error: '#ff4d4f',
    light: {
      menuColors: ['#000c17', '#001529', '#002140']
    },
    dark: {
      menuColors: ['#151515', '#1f1f1f', '#1e1e1e']
    }
  },
  theme: {
    light: {
      'gray-1': '#fff',
      'gray-2': '#fafafa',
      'gray-3': '#f5f5f5',
      'gray-4': '#f0f0f0',
      'gray-5': '#d9d9d9',
      'gray-6': '#bfbfbf',
      'gray-7': '#8c8c8c',
      'gray-8': '#595959',
      'gray-9': '#262626',
      'gray-1-rgb': 'rgb(255, 255, 255)',
      'gray-2-rgb': 'rgb(250, 250, 250)',
      'gray-3-rgb': 'rgb(245, 245, 245)',
      'gray-4-rgb': 'rgb(240, 240, 240)',
      'gray-5-rgb': 'rgb(217, 217, 217)',
      'gray-6-rgb': 'rgb(191, 191, 191)',
      'gray-7-rgb': 'rgb(140, 140, 140)',
      'gray-8-rgb': 'rgb(89, 89, 89)',
      'gray-9-rgb': 'rgb(38, 38, 38)',
      'gray-10-rgb': 'rgb(0, 0, 0)',

      'white-keep': '#fefefe', // #fff -> #fefefe
      'black-keep': '#000001',

      'gray-tooltip': '#404040',
      'gray-hover': '#f6fbff',
      'gray-dropdown': '#fefeff', // #fff -> #fefeff
      'gray-disabled': '#f5f5f4', // #f5f5f5 -> #f5f5f4

      'node-btn-disabled-color': '#b9ddfe',
      // 知识服务市场卡片页脚渐变色
      'card-footer-bg': '#e8f4ff'
    },
    dark: {
      'gray-1': '#1d1d1d',
      'gray-2': '#212121', // #262626 -> #212121(视觉更合适)
      'gray-3': '#141414',
      'gray-4': '#303030',
      'gray-5': '#434343',
      'gray-6': '#5a5a5a',
      'gray-7': '#7d7d7d',
      'gray-8': '#acacac',
      'gray-9': '#dbdbdb',
      'gray-1-rgb': 'rgb(38, 38, 37)',
      'gray-2-rgb': 'rgb(29, 29, 29)',
      'gray-3-rgb': 'rgb(20, 20, 20)',
      'gray-4-rgb': 'rgb(48, 48, 48)',
      'gray-5-rgb': 'rgb(67, 67, 67)',
      'gray-6-rgb': 'rgb(90, 90, 90)',
      'gray-7-rgb': 'rgb(125, 125, 125)',
      'gray-8-rgb': 'rgb(172, 172, 172)',
      'gray-9-rgb': 'rgb(219, 219, 219)',
      'gray-10-rgb': 'rgb(255, 255, 255)',

      'white-keep': '#fefefe',
      'black-keep': '#000001',

      'gray-tooltip': '#434342',
      'gray-hover': '#212133',
      'gray-dropdown': '#252525', // #262626 -> #252525
      'gray-disabled': '#272727', // #262626 -> #272727

      'node-btn-disabled-color': '#164c7f',
      // 知识服务市场卡片页脚渐变色
      'card-footer-bg': '#062745'
    }
  }
}
