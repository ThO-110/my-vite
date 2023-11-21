<template>
  <a-space>
    <a-switch :checked="themeChecked" @change="changeTheme">
      <template #checkedChildren><heart-outlined /></template>
      <template #unCheckedChildren><frown-outlined /></template>
    </a-switch>
    <a-switch
      :checked="langChecked"
      @change="changeLang"
      checked-children="中"
      un-checked-children="EN"
    />
  </a-space>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { HeartOutlined, FrownOutlined } from '@ant-design/icons-vue'
import { Locale, THEME_MODE } from 'utils/constant'
import { useStore } from 'vuex'

const store = useStore()

// 主题
const themeChecked = computed(
  () => store.state.setting.theme.mode === THEME_MODE.LIGHT
)
// const changeTheme = (checked: boolean) => {
//   store.commit(
//     "setting/setTheme",
//     checked ? THEME_MODE.LIGHT : THEME_MODE.DARK
//   );
// };
const changeTheme = (checked: boolean) =>
  store.commit(
    'setting/setThemeMode',
    checked ? THEME_MODE.LIGHT : THEME_MODE.DARK
  )

// 国际化
const langChecked = computed(() => store.state.setting.locale === Locale.ZH_CN)
const changeLang = (checked: boolean) => {
  store.commit('setting/setLocale', checked ? Locale.ZH_CN : Locale.EN_US)
}
</script>
