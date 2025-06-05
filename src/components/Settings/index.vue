<template>
  <div>
    <!-- 固定在右侧中间的按钮 -->
    <div class="fixed-trigger" @click="drawerVisible = true">
      <el-icon size="24"><Setting /></el-icon>
    </div>

    <!-- 抽屉 -->
    <el-drawer
      v-model="drawerVisible"
      title="项目配置"
      direction="rtl"
      :z-index="4000"
      size="350px"
    >
      <template #header>
        <span class="drawer-title">项目配置</span>
      </template>
      <div class="drawer-body">
        <!-- 主题 -->
        <el-divider>黑夜主题</el-divider>
        <ThemeSwitch />
        <!-- 布局 -->
        <el-divider>布局</el-divider>
        <LayoutRadioPicker />
        <!-- 系统主题 -->
        <el-divider>系统主题</el-divider>
        <ColorRadioPicker
          v-model="systemTheme"
          :schema="[
            '#409eff',
            '#009688',
            '#536dfe',
            '#ff5c93',
            '#ee4f12',
            '#0096c7',
            '#9c27b0',
            '#ff9800'
          ]"
          @change="setSystemTheme"
        />
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useElementPlusTheme } from '@/hooks'
import LayoutRadioPicker from './components/LayoutRadioPicker.vue'
import ColorRadioPicker from './components/ColorRadioPicker.vue'
import ThemeSwitch from './components/ThemeSwitch.vue'
import { useAppStore } from '@/stores'
const appStore = useAppStore()

defineOptions({ name: 'Settings' })

const drawerVisible = ref(false)
const systemTheme = ref()
const { changeTheme } = useElementPlusTheme()
const setSystemTheme = (color) => {
  appStore.setTheme(color)
  changeTheme(color)
}
</script>

<style scoped lang="scss">
.fixed-trigger {
  align-items: center;
  background-color: var(--el-color-primary);
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 12px;
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
}

.drawer-title {
  font-size: 16px;
  font-weight: 700;
}

.drawer-body {
  text-align: center;
}

.chart-placeholder {
  align-items: center;
  border: 1px dashed #ccc;
  color: #999;
  display: flex;
  font-size: 18px;
  height: 100%;
  justify-content: center;
  padding: 20px;
}
</style>
