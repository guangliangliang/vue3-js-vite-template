<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '@/stores'
onMounted(() => {
  const appStore = useAppStore()
  appStore.initTheme()
})
</script>

<template>
  <ConfigGlobal>
    <router-view></router-view>
  </ConfigGlobal>
</template>
