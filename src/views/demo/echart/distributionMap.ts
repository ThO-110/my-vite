/**
 * 规则发现 - 查看结果 - 规则特征分布图
 */
import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  DataZoomComponent,
  DataZoomComponentOption
} from 'echarts/components'
import {
  BarChart,
  BarSeriesOption,
  LineChart,
  LineSeriesOption
} from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { SVGRenderer } from 'echarts/renderers'

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  SVGRenderer,
  UniversalTransition,
  DataZoomComponent
])

type EChartsOption = echarts.ComposeOption<
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | BarSeriesOption
  | LineSeriesOption
  | DataZoomComponentOption
>

enum DistributionMapEnum {
  /** 折线 x 轴 */
  X_AXIS_OF_LINE = 'X_AXIS_OF_LINE',
  /** 折线 y 轴 */
  Y_AXIS_OF_LINE = 'Y_AXIS_OF_LINE',
  /** 直方图 x 轴 */
  X_AXIS_OF_BAR = 'X_AXIS_OF_BAR',
  /** 直方图 y 轴 */
  Y_AXIS_OF_BAR = 'Y_AXIS_OF_BAR'
}

const basicOption: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none'
    },
    formatter: function (params: any) {
      const x =
        params.find((item: any) => item.seriesType === 'bar')?.axisValue || ''
      const yList = params
        .filter((item: any) => item.seriesType === 'bar') // 只展示直方图数据
        .sort((a: any, b: any) => a.seriesIndex - b.seriesIndex)
        .map(
          (item: any) =>
            `<div style="display: flex;justify-content: space-between;align-items: center;font-size: 12px;line-height: 14px;width: 100%;">
              <div style="display: flex;align-items: center;gap: 4px;">
                <div style="width: 16px;height: 8px;border-radius: 2px;background: ${item.color}";></div>
                <div>${item.seriesName}</div>
              </div>
              <div>${item.data}</div>
            </div>`
        )
        .join('')

      return `<div style="min-width: 130px;display: flex;flex-direction: column;justify-content: space-around;gap: 4px;">
                <span style="font-size: 14px;line-height: 22px;">${x}</span>
                ${yList}
              </div>
              `
    },
    extraCssText:
      'background-color: var(--popoverBg);color: var(--textPrimary);'
  },
  // x轴
  xAxis: [
    {
      id: DistributionMapEnum.X_AXIS_OF_LINE,
      type: 'value',
      min: 'dataMin',
      max: 'dataMax',
      splitLine: {
        show: false
      },
      show: false
    },
    {
      id: DistributionMapEnum.X_AXIS_OF_BAR,
      type: 'category',
      position: 'bottom',
      axisPointer: {
        type: 'shadow',
        show: true,
        shadowStyle: {
          color: '#1670ff',
          opacity: 0.06
        }
      }
    }
  ],
  // y轴
  yAxis: [
    {
      id: DistributionMapEnum.Y_AXIS_OF_LINE,
      type: 'value',
      show: false
    },
    {
      id: DistributionMapEnum.Y_AXIS_OF_BAR,
      type: 'value',
      axisLine: {
        show: false
      },
      position: 'left',
      nameTextStyle: {
        padding: [0, 38, 8, 0]
      },
      // 刻度线
      axisTick: {
        show: false
      },
      // 刻度文本
      axisLabel: {
        margin: 8,
        verticalAlign: 'bottom'
      },
      data: []
    }
  ],
  // 图例
  legend: {
    right: 16,
    itemGap: 12
  },
  series: [],
  color: ['#FF7A4599', '#4096FF99', '#FF7A4599', '#4096FF99'],
  grid: {
    left: '4%',
    bottom: 70,
    containLabel: true
  },
  // 缩放
  dataZoom: [
    {
      type: 'inside'
    },
    {
      type: 'slider',
      bottom: 24,
      height: 14
    }
  ]
}

/** 初始化 */
const init = (dom: HTMLElement): echarts.ECharts => {
  const myChart = echarts.init(dom)
  return myChart
}

/** 折线图基础配置 */
const getLineBasicConfig = (
  config: Record<string, any> = {}
): LineSeriesOption => ({
  type: 'line',
  showSymbol: false,
  smooth: true,
  lineStyle: {
    type: 'dashed'
  },
  symbol: 'none',
  silent: true,
  xAxisId: DistributionMapEnum.X_AXIS_OF_LINE,
  yAxisId: DistributionMapEnum.Y_AXIS_OF_LINE,
  data: [], // X和 Y数据
  ...config
})

/** 直方图基础配置 */
const getBarBasicConfig = (
  config: Record<string, any> = {}
): BarSeriesOption => ({
  type: 'bar',
  barGap: '-100%',
  barWidth: '64.5%',
  xAxisId: DistributionMapEnum.X_AXIS_OF_BAR,
  yAxisId: DistributionMapEnum.Y_AXIS_OF_BAR,
  data: [],
  ...config
})

export {
  init,
  DistributionMapEnum,
  getBarBasicConfig,
  getLineBasicConfig,
  basicOption
}
