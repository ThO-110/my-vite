/**
 * 此组件目的为了测试 纯函数组件 是否跟 含有antd组件的组件 触发i18n实例更新有关
 * 结论：无关
 */
import { useI18n } from '@/hooks'
import './Index.less'

export default {
  setup() {
    const { $t } = useI18n()
    return () => (
      <div class="container">
        <h1>{$t('demo.title')}</h1>
        <p>{$t('demo.part1')}</p>
        <p>{$t('demo.part2')}</p>
      </div>
    )
  }
}
