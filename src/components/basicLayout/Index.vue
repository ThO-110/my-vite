<template>
  <div class="basic-layout">
    <a-space class="header">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <ButtonGroup />
    </a-space>
    <div class="content">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonGroup from './ButtonGroup.vue'
</script>

<style lang="less" scoped>
.basic-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: auto;
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
  .content {
    padding: 20px;
    margin: 0 auto;
    width: 100%;
    max-width: 1180px;
    min-width: 720px;
    min-height: 400px;
  }
}
</style>
