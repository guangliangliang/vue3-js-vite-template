<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'SvgIcon'
})

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#303133'
  },
  prefix: {
    type: String,
    default: 'icon'
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style lang="scss">
.svg-icon {
  height: 1em;
  width: 1em;
}
</style>
