<template>
  <div class="container">
    <a-typography>
      <a-typography-title>{{ $t('demo.title') }}</a-typography-title>
      <a-typography-paragraph>
        {{ $t('demo.part1') }}
      </a-typography-paragraph>
      <a-typography-paragraph>
        {{ $t('demo.part2') }}
      </a-typography-paragraph>
    </a-typography>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '@/hooks'

const { $t } = useI18n()
</script>

<style lang="less" scoped>
.container {
  max-width: 70%;
  margin: 0 auto;
}
</style>
