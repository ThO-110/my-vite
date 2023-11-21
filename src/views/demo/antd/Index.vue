<template>
  <div class="container">
    <my-menu />
    <a-space direction="vertical" :size="18">
      <a-steps :current="1">
        <a-step>
          <!-- <span slot="title">Finished</span> -->
          <template #title>{{ t('demo.finish') }}</template>
          <template #description>
            <span>{{ t('demo.desc') }}</span>
          </template>
        </a-step>
        <a-step
          :title="t('demo.inProcess')"
          :sub-title="`${t('demo.desc')} 00:00:08`"
          :description="t('demo.desc')"
        />
        <a-step :title="t('demo.waiting')" :description="t('demo.desc')" />
      </a-steps>

      <a-range-picker v-model:value="value1" />
      <a-range-picker v-model:value="value2" show-time />
      <a-range-picker v-model:value="value3" picker="week" />
      <a-range-picker v-model:value="value4" picker="month" />
      <a-range-picker v-model:value="value5" picker="year" />

      <a-row>
        <a-col :span="12">
          <a-slider v-model:value="inputValue" :min="0" :max="1" :step="0.01" />
        </a-col>
        <a-col :span="4">
          <a-input-number
            v-model:value="inputValue"
            :min="0"
            :max="1"
            :step="0.01"
            style="margin-left: 16px"
          />
        </a-col>
      </a-row>

      <a-rate v-model:value="rateValue" />

      <a-input v-model:value="inputValue" />

      <a-checkbox-group v-model:value="optionValue" :options="options" />

      <a-cascader
        v-model:value="cascaderValue"
        style="width: 100%"
        multiple
        max-tag-count="responsive"
        :options="cascaderOptions"
        placeholder="Please select"
        :displayRender="displayRender"
      ></a-cascader>

      <a-space size="large">
        <a-spin size="small" />
        <a-spin />
        <a-spin size="large" />
        <a-spin :indicator="indicator" />
      </a-space>

      <a-affix :offset-bottom="24">
        <a-button type="primary">Affix top</a-button>
      </a-affix>
    </a-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, h, computed } from 'vue'
import type { CascaderProps } from 'ant-design-vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { useI18n } from '@/hooks'

import MyMenu from './components/Menu.vue'

export default defineComponent({
  components: { MyMenu },
  setup() {
    const { $t } = useI18n()

    const options = computed(() => [
      { label: $t('demo.apple'), value: 'Apple' },
      { label: $t('demo.pear'), value: 'Pear' },
      { label: $t('demo.orange'), value: 'Orange' }
    ])

    const cascaderOptions: CascaderProps['options'] = [
      {
        label: 'Light',
        value: 'light',
        children: new Array(20)
          .fill(null)
          .map((_, index) => ({ label: `Number ${index}`, value: index }))
      },
      {
        label: 'Bamboo',
        value: 'bamboo',
        children: [
          {
            label: 'Little',
            value: 'little',
            children: [
              {
                label: 'Toy Fish',
                value: 'fish'
              },
              {
                label: 'Toy Cards',
                value: 'cards'
              },
              {
                label: 'Toy Bird',
                value: 'bird'
              }
            ]
          }
        ]
      }
    ]

    const displayRender = ({ labels, selectedOptions }: any) => {
      return h(
        'div',
        { id: `${labels}/${selectedOptions}` },
        `${labels.join('/')}`
      )
    }

    const indicator = h(LoadingOutlined, {
      style: {
        fontSize: '24px'
      },
      spin: true
    })

    return {
      t: $t,
      value1: ref(),
      value2: ref(),
      value3: ref(),
      value4: ref(),
      value5: ref(),
      inputValue: ref(0.33),
      rateValue: ref(2),
      options,
      optionValue: ref(['Pear']),
      cascaderValue: ref<string[]>([]),
      cascaderOptions,
      displayRender,
      indicator,
      MyMenu
    }
  }
})
</script>

<style lang="less" scoped>
.container {
  display: flex;
  gap: 20px;
}
</style>
