<template>
  <VueECharts
    :option="option"
    ref="chartRef"
    :auto-resize="true"
    :style="{ height: computedHeight, width: '100%' }"
  />
</template>

<script setup>
import VueECharts from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, PieChart, BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

use([
  CanvasRenderer,
  LineChart,
  PieChart,
  LegendComponent,
  BarChart,
  GridComponent,
  TooltipComponent
])

defineOptions({
  name: 'OEcharts',
  inheritAttrs: true
})

const props = defineProps({
  option: {
    type: Object,
    required: true
  },
  height: {
    type: [String, Number],
    default: 400 // 默认高度
  }
})
const chartRef = ref(null)

function resizeChart() {
  chartRef.value?.resize?.()
}

onMounted(() => {
  window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
})

const computedHeight = computed(() => {
  return typeof props.height === 'number' ? `${props.height}px` : props.height
})
</script>
