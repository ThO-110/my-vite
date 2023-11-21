<template>
  <a-config-provider :locale="locale">
    <router-view v-if="isRouterAlive" />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { checkMobileFlag } from 'utils/util'
import { useLocale, useReload, useTitle } from '@/hooks'

export default defineComponent({
  setup() {
    const store = useStore()
    const title = useTitle()

    store.commit('setting/setDevice', checkMobileFlag())

    onMounted(() => title.setTitle())

    return { ...useLocale(), ...useReload() }
  }
})
</script>
