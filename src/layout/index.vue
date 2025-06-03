<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <o-header />
    </el-header>
    <!-- 手机端打开菜单遮罩 -->
    <div v-if="mobile && !collapse" class="mobile-overlay" @click="handleClickOutside"></div>
    <!-- 侧边菜单栏 -->
    <o-menu />

    <!-- 主体内容 -->
    <el-main
      :class="[layoutStore.collapse ? 'is-collapse' : '', layoutStore.mobile ? 'is-mobile' : '']"
    >
      <el-scrollbar class="main-scrollbar">
        <!-- 主体部分 -->
        <router-view />
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script setup>
import { useLayoutStore, useUserStore } from '@/stores'
import OHeader from './Header.vue'
import OMenu from './Menu/Menu.vue'
import { getToken } from '@/utils/auth'
import { onMounted } from 'vue'
const layoutStore = useLayoutStore()
const useStore = useUserStore()
onMounted(() => {
  if (getToken()) {
    useStore.getUser()
  }
})
const handleClickOutside = () => {
  layoutStore.setCollapse(true)
}
</script>

<style scoped lang="scss">
.el-container {
  height: 100%;
}

.el-header {
  align-items: center;
  background-color: #162746;
  border-bottom: 1px solid rgb(255 255 255 / 10%);
  color: #fff;
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  z-index: 1501;

  p {
    line-height: 60px;
    margin: 0;
  }
}

.aside {
  background-color: var(--el-color-primary);
  bottom: 0;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
  left: 0;
  position: fixed;
  top: 0;
  z-index: 100;
}

.el-main {
  backface-visibility: hidden;
  height: 100%;
  margin-left: var(--left-menu-max-width);
  margin-top: 60px;
  overflow: hidden;
  padding: 0;
  perspective: none;
  position: relative;
  transition: 0.3s margin-left ease-in-out;
}

.mobile-overlay {
  background-color: var(--el-color-black);
  height: 100%;
  left: 0;
  opacity: 0.3;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 99;
}

.is-collapse {
  margin-left: var(--left-menu-min-width);
}

.is-mobile {
  margin-left: 0;
}

:deep(.main-scrollbar) {
  & > .el-scrollbar__wrap {
    & > .el-scrollbar__view {
      padding: 10px;
    }
  }
}
</style>
