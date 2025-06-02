<template>
  <div class="home">
    <h1>欢迎来到首页</h1>
    <el-button type="primary" @click="handleClick">点击我</el-button>
    <p v-if="message">{{ message }}</p>

    <!-- 使用封装好的 Swiper 和 ECharts 组件 -->
    <o-swiper :slides="['幻灯片1', '幻灯片2', '幻灯片3']" />
    <o-echarts :option="chartOption" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const message = ref('')

const handleClick = () => {
  message.value = '你点击了按钮！'
}

onMounted(() => {
  console.log('首页已加载')
})

const chartOption = ref({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
})
</script>

<style scoped>
.home {
  background-color: white;
  padding: 20px;
}
</style>
