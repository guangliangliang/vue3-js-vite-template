<template>
  <VueECharts :option="option" :auto-resize="true" style="height: 400px; width: 100%" />
</template>

<script setup>
import VueECharts from 'vue-echarts'
// 或者按需导入你需要的echarts模块
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent])
defineOptions({
  name: 'OEcharts',
  inheritAttrs: true
})
defineProps({
  option: {
    type: Object,
    required: true
  }
})
</script>
