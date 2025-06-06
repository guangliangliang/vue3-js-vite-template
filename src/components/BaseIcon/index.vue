<script setup>
import { ElIcon } from 'element-plus'
import { defineProps, computed } from 'vue'

defineOptions({
  name: 'BaseIcon'
})

// 组件参数
const props = defineProps({
  icon: {
    type: [Object, Function, String], // 支持组件、函数式组件、字符串（从外部已 import 的组件名）
    required: false
  },
  size: {
    type: [Number, String],
    default: 16
  },
  color: {
    type: String,
    default: ''
  }
})

const iconStyle = computed(() => ({
  fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
  color: props.color
}))
</script>

<template>
  <el-icon v-if="icon" :style="iconStyle">
    <component :is="icon" />
  </el-icon>
</template>
