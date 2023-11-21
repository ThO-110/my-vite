<template>
  <img :src="getAssetSource('vue.svg')" alt="" />
  <article v-html="activeHtml" />
  <!-- <component :is="content" :key="fileName"></component> -->
</template>

<script lang="ts">
import { ref, defineComponent, computed, shallowRef, onMounted } from 'vue'
import { marked } from 'marked'
import { useRoute } from 'vue-router'
import { getAssetSource } from 'utils/util'

export default defineComponent({
  setup() {
    const route = useRoute()

    const activeHtml = ref()
    const content = shallowRef()

    const fileName = computed(() => route.params.name)

    /**
     * 可以使用插件 vite-plugin-md 将.md文件引入为vue组件，配合路由/doc/:mdName实现单页面markdown，
     * 且后续添加md文件无需做其他修改
     */
    // watchEffect(async () => {
    //   if (fileName.value) {
    //     try {
    //       const fileComponent = await import(
    //         `../../../assets/md/${fileName.value}.md`
    //       )
    //       console.log(
    //         '🚀 ~ file: Index.vue:41 ~ watchEffect ~ fileComponent:',
    //         fileComponent
    //       )
    //       content.value = fileComponent.default
    //     } catch (error) {
    //       // TODO: 如文件路径不存在，跳转到 404
    //       console.log(
    //         '🚀 ~ fileComponent: Index.vue:28 ~ watchEffect ~ error:',
    //         error
    //       )
    //     }
    //   }
    // })

    onMounted(async () => {
      try {
        const mdFile = (await import('@/assets/md/key-features.md?raw')).default
        activeHtml.value = marked.parse(mdFile)
      } catch (error) {
        // TODO: 如文件路径不存在，跳转到 404
        console.log('🚀 ~ file: Index.vue:22 ~ onMounted ~ error:', error)
      }
    })

    return {
      activeHtml,
      content,
      fileName,
      getAssetSource
    }
  }
})
</script>
