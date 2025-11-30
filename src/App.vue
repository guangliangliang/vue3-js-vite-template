<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '@/stores'
onMounted(() => {
  const appStore = useAppStore()
  appStore.initTheme()
  console.log('App mounted, theme initialized.')
})
</script>

<template>
  <ConfigGlobal>
    <router-view></router-view>
  </ConfigGlobal>
</template>
