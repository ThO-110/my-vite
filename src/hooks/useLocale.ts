import { computed, ComputedRef } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import constant from 'utils/constant'

import type { Locale } from 'ant-design-vue/lib/locale-provider'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

// 时间类组件的国际化问题
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

interface SetupLocale {
  locale: ComputedRef<Locale>
}

// 未使用 zh_CN.locale 作为类型名，与antd框架隔离便于维护
const locales: Record<string, Locale> = {
  [constant.Locale.ZH_CN]: zhCN,
  [constant.Locale.EN_US]: enUS
}

export default function useLocale(): SetupLocale {
  const store = useStore()
  const i18n = useI18n()
  const locale = computed(() => {
    const localeType =
      (Reflect.ownKeys(locales).filter(
        (item) => item === store.state.setting.locale
      )[0] as string) || constant.Locale.EN_US
    i18n.locale.value = localeType
    return locales[localeType]
  })

  return { locale }
}
