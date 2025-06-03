<template>
  <div :class="['color-radio-picker']">
    <span
      v-for="(item, i) in schema"
      :key="`radio-${i}`"
      class="color-item"
      :class="{ 'is-active': colorVal === item }"
      :style="{ background: item }"
      @click="colorVal = item"
    >
      <Icon v-if="colorVal === item" color="#fff" icon="vi-ep:check" :size="16" />
    </span>
  </div>
</template>

<script setup>
import { ref, watch, unref } from 'vue'

// Props
const props = defineProps({
  schema: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'change'])

const colorVal = ref(props.modelValue)

// 同步外部传入值到内部 colorVal
watch(
  () => props.modelValue,
  (val) => {
    if (val !== unref(colorVal)) {
      colorVal.value = val
    }
  }
)

// 同步内部值到父组件
watch(colorVal, (val) => {
  emit('update:modelValue', val)
  emit('change', val)
})
</script>

<style scoped lang="scss">
.color-radio-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 0 14px;
  justify-content: center;
}

.color-item {
  border: 2px solid #dcdfe6;
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  height: 20px;
  line-height: 20px;
  margin-bottom: 5px;
  text-align: center;
  width: 20px;

  &.is-active {
    border-color: var(--el-color-primary);
  }
}
</style>
