<script setup>
import { onMounted } from 'vue'
import { useLayoutStore } from '@/stores'
onMounted(() => {
  const layoutStore = useLayoutStore()
  layoutStore.initTheme()
})
</script>

<template>
  <ConfigGlobal>
    <router-view></router-view>
  </ConfigGlobal>
</template>
