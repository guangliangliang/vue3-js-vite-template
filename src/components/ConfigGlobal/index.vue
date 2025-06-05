<template>
  <ElConfigProvider :message="{ max: 1 }">
    <slot></slot>
  </ElConfigProvider>
</template>

<script setup>
import { watch } from 'vue'
import { ElConfigProvider } from 'element-plus'
import { useWindowSize } from '@vueuse/core'
import { setCssVar } from '@/utils/global'
import { useAppStore } from '@/stores'
defineOptions({
  name: 'ConfigGlobal'
})
const appStore = useAppStore()

const { width } = useWindowSize()

// 监听窗口变化
watch(
  () => width.value,
  (width) => {
    if (width < 768) {
      if (!appStore.getMobile()) appStore.setMobile(true)
      setCssVar('--left-menu-min-width', '0')
      appStore.setCollapse(true)
    } else {
      if (appStore.getMobile()) appStore.setMobile(false)
      setCssVar('--left-menu-min-width', '64px')
    }
  },
  {
    immediate: true
  }
)
</script>
