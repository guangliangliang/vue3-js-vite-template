<template>
  <div class="home">
    <Hello />
    <ElRow :gutter="20" justify="space-between">
      <ElCol :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
        <el-card class="box-bottom">
          <template #header>
            <div class="card-header">
              <span>星期统计2</span>
            </div>
          </template>
          <o-echarts :option="weekOptions" />
        </el-card>
      </ElCol>
      <ElCol :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
        <BaseContainer class="box-bottom" title="星期统计">
          <template #right>
            <a>新增</a>
          </template>
          <o-echarts :option="weekOptions" />
        </BaseContainer>
      </ElCol>
      <ElCol :xl="8" :lg="8" :md="24" :sm="24" :xs="24">
        <ElCard shadow="hover" class="box-bottom">
          <o-echarts :option="pieOptions" :height="300" />
        </ElCard>
      </ElCol>
      <ElCol :xl="8" :lg="8" :md="24" :sm="24" :xs="24">
        <ElCard shadow="hover" class="box-bottom">
          <SwiperDemo />
        </ElCard>
      </ElCol>
      <ElCol :xl="8" :lg="8" :md="24" :sm="24" :xs="24">
        <ElCard shadow="hover" class="box-bottom">
          <o-echarts :option="barOptions" :height="300" />
        </ElCard>
      </ElCol>
      <ElCol :span="24">
        <ElCard shadow="hover" class="box-bottom">
          <o-echarts :option="lineOptions" :height="350" />
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SwiperDemo from './SwiperDemo.vue'
import { getWeekOptions, getPieOptions, getBarOptions, getLineOptions } from './options'
import Hello from './hello.vue'
onMounted(() => {
  console.log('首页已加载')
})
const weekOptions = ref(getWeekOptions())
const pieOptions = ref(getPieOptions())
const barOptions = ref(getBarOptions())
const lineOptions = ref(getLineOptions())
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;

  .box-bottom {
    margin-bottom: 20px;
  }
}
</style>
