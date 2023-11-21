import { StoreOptions } from 'vuex'
import { getLocalSetting, setLocalSetting } from 'utils/util'
import { Locale, THEME_MODE } from 'utils/constant'
import { toggleTheme } from '@zougt/vite-plugin-theme-preprocessor/dist/browser-utils'

const localSetting = getLocalSetting()

// 加载主题
// TODO:
// loadLocalTheme(localSetting);
toggleTheme({
  scopeName: `theme-${
    localSetting.theme?.mode === THEME_MODE.LIGHT ? 'default' : 'dark'
  }`
})

export default {
  namespaced: true,
  state: {
    mobileFlag: true, // 平台类型
    allStaminaValue: 20000000, // 总体力值
    ...localSetting
  },
  getters: {},
  mutations: {
    setDevice(state, mobileFlag: boolean) {
      state.mobileFlag = mobileFlag
    },
    setThemeMode(state, themeMode) {
      const newLocalSetting = getLocalSetting()

      newLocalSetting!.theme!.mode = themeMode
      setLocalSetting(newLocalSetting)

      toggleTheme({
        scopeName: `theme-${
          themeMode === THEME_MODE.LIGHT ? 'default' : 'dark'
        }`
      })
      state.theme = newLocalSetting.theme
    },
    setLocale(state, locale: Locale) {
      setLocalSetting({
        ...getLocalSetting(),
        locale
      })
      state.locale = locale
    }
  }
} as StoreOptions<Record<string, unknown>>
