<template>
  <ElSwitch
    :class="prefixCls"
    v-model="isDark"
    inline-prompt
    :border-color="blackColor"
    :inactive-color="blackColor"
    :active-color="blackColor"
  />
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores'
import { ElSwitch } from 'element-plus'
import { useDesign } from '@/hooks'

const { getPrefixCls } = useDesign()

const emit = defineEmits(['change'])

const prefixCls = getPrefixCls('theme-switch')

const appStore = useAppStore()

const isDark = computed({
  get() {
    return appStore.getIsDark
  },
  set(val) {
    appStore.setIsDark(val)
    emit('change', val)
  }
})

const blackColor = 'var(--el-color-black)'
</script>
<style lang="scss" scoped>
:deep(.el-switch__core .el-switch__inner .is-icon) {
  overflow: visible;
}
</style>
