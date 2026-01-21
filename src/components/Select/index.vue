<template>
  <el-select
    v-model="value"
    v-bind="$attrs"
    :filterable="!!searchKey || filterable"
    :remote="!!searchKey"
    :clearable="clearable"
    reserve-keyword
    :loading="loading"
    @clear="onClear"
  >
    <el-option
      v-for="option in options"
      :key="option.key || option.value"
      :label="option.label || option[prop.value]"
      :value="valueKey ? option[valueKey] : option[prop.key] || option.value"
    />
  </el-select>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'

defineOptions({
  name: 'OSelect',
  inheritAttrs: true
})

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },
  valueKey: {
    type: String,
    default: ''
  },
  searchKey: {
    type: String,
    default: ''
  },
  clearable: {
    type: Boolean,
    default: true
  },
  filterable: {
    type: Boolean,
    default: true
  },
  modelValue: {
    type: [String, Number, Array, Object],
    default: ''
  },
  prop: {
    type: Object,
    default: () => ({
      key: 'key',
      value: 'value'
    })
  }
})

const loading = ref(false)
const _options = ref([])

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const onClear = () => {
  if (props.searchKey) {
    _options.value = []
  }
}

onBeforeMount(() => {
  _options.value = props.options
})
</script>
