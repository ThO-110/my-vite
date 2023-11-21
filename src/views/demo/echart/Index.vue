<template>
  <div class="result-preview">
    <div class="result-title">规则特征分布图</div>
    <a-spin :spinning="isLoading" :delay="150">
      <div id="echartContainer" ref="echartContainer"></div>
    </a-spin>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
  onBeforeMount
} from 'vue'
import { Empty } from 'ant-design-vue'
import type { ECharts } from 'echarts/core'
import type { LineSeriesOption, BarSeriesOption } from 'echarts/charts'
import {
  init,
  DistributionMapEnum,
  getBarBasicConfig,
  getLineBasicConfig,
  basicOption
} from './distributionMap'
import { getMockData } from './mock'

interface PinganDataItem {
  x: number[]
  y: number[]
  title: string
}

interface PinganShowData {
  ruleId: string
  type: string
  f1: string
  f2: string
  f3: string
  content: any
  hist: PinganDataItem[]
  kde: PinganDataItem[]
  xTicks: Array<string | number>
}

export default defineComponent({
  name: 'ResultPreview',
  props: {
    previewData: {
      type: Object,
      default: function () {
        return {
          ruleId: '',
          content: {},
          hist: [],
          kde: [],
          xTicks: []
        }
      }
    },
    resizeFlag: Boolean,
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  setup(props: any) {
    const echartContainer = ref()
    let echartInstance: ECharts

    /** 组装数据 */
    const composeData = (data: PinganShowData) => {
      // 直方图x轴是否为枚举值
      const isXAxisEnum = !!data.xTicks.length

      // x轴
      const xAxis = [
        {
          id: DistributionMapEnum.X_AXIS_OF_BAR,
          name: isXAxisEnum ? '类型' : '',
          data: isXAxisEnum ? data.xTicks : data.hist?.[0]?.x || []
        }
      ]

      // y轴
      const yAxis = [
        {
          id: DistributionMapEnum.Y_AXIS_OF_BAR,
          name: '数量'
        }
      ]

      // 系列
      const series: Array<BarSeriesOption | LineSeriesOption> = []
      series.push(
        ...data.hist.map(({ y, title }) =>
          getBarBasicConfig({
            id: title,
            name: title,
            data: y
          })
        )
      )
      if (!isXAxisEnum) {
        series.push(
          ...data.kde.map(({ x, y, title }) =>
            getLineBasicConfig({
              id: `line-${title}`,
              name: `line-${title}`,
              data: x.map((item, index) => [item, y[index]])
            })
          )
        )
      }

      // 图例
      const legendData = series
        .filter((item) => (item.name as string).indexOf('line') === -1)
        .map((item) => ({
          name: item.name
        }))

      return {
        xAxis,
        yAxis,
        series,
        legend: {
          data: legendData
        }
      }
    }

    const resetEchart = () => {
      echartInstance.clear()
      echartInstance.setOption(basicOption)
    }

    const updateEchart = async () => {
      resetEchart()
      const mockData = await getMockData(4)
      const data = composeData(mockData as PinganShowData)
      // const data = composeData(props.previewData);
      echartInstance.setOption(data)
    }

    // resize
    const resizeFlag = ref(false)
    const resizeFn = () => {
      console.log('🚀 ~ file: Index.vue:154 ~ resize:')
      resizeFlag.value = true
      nextTick(() => {
        resizeFlag.value = false
      })
    }
    onBeforeMount(() => {
      window.addEventListener('resize', resizeFn)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeFn!)
    })
    watch(
      () => props.resizeFlag,
      () => {
        echartInstance.resize()
      }
    )

    onMounted(async () => {
      echartInstance = init(echartContainer.value)
      updateEchart()
    })
    onBeforeUnmount(() => {
      echartInstance.dispose()
    })

    return {
      echartContainer
    }
  }
})
</script>

<style lang="less" scoped>
.result-preview {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  .result-title {
    border-bottom: 1px solid @divider-color;
  }

  #echartContainer {
    width: 100%;
    height: 100%;
    padding-top: 12px;
  }
}
.no-data {
  position: absolute;
  top: 2.5rem;
  left: 0;
  height: calc(100% - 2.5rem);
  width: 100%;
}
</style>
