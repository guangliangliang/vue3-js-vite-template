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
import { useLayoutStore } from '@/stores'

defineOptions({
  name: 'ConfigGlobal',
  inheritAttrs: true
})
const layoutStore = useLayoutStore()

const { width } = useWindowSize()

// 监听窗口变化
watch(
  () => width.value,
  (width) => {
    if (width < 768) {
      if (!layoutStore.getMobile()) layoutStore.setMobile(true)
      setCssVar('--left-menu-min-width', '0')
      layoutStore.setCollapse(true)
    } else {
      if (layoutStore.getMobile()) layoutStore.setMobile(false)
      setCssVar('--left-menu-min-width', '64px')
    }
  },
  {
    immediate: true
  }
)
</script>
