<template>
  <el-container>
    <template v-if="layout === 'classic'">
      <o-header
        :class="{
          'top-left-header': !appStore.mobile,
          'top-left-header-collapse': appStore.collapse && !appStore.mobile
        }"
      />
      <div
        :class="{
          'sum-menu': true,
          'sum-menu-is-collapse': appStore.collapse,
          'sum-menu-is-mobile': appStore.mobile
        }"
      >
        <TitleLogo />
        <o-menu />
      </div>
    </template>
    <template v-if="layout === 'topLeft'">
      <div class="sum-header">
        <TitleLogo />
        <o-header />
      </div>
      <o-menu
        style="position: absolute"
        :class="{
          'classic-menu-is-mobile': appStore.mobile
        }"
      />
    </template>
    <!-- 手机端打开菜单遮罩 -->
    <div
      v-if="appStore.mobile && !appStore.collapse"
      class="mobile-overlay"
      @click="handleClickOutside"
    ></div>
    <Settings />
    <!-- 主体内容 -->
    <el-main :class="[appStore.collapse ? 'is-collapse' : '', appStore.mobile ? 'is-mobile' : '']">
      <!-- <OTagsView /> -->
      <el-scrollbar class="main-scrollbar">
        <!-- 主体部分 -->
        <router-view />
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script setup>
import { useAppStore, useUserStore } from '@/stores'
import OHeader from './Header.vue'
import OMenu from './Menu/Menu.vue'
import { getToken } from '@/utils/auth'
import { onMounted, computed } from 'vue'
import TitleLogo from '@/layout/TitleLogo.vue'
// import OTagsView from './TagsView.vue'

const appStore = useAppStore()
const useStore = useUserStore()
const layout = computed(() => appStore.getLayout)

onMounted(() => {
  if (getToken()) {
    useStore.getUser()
  }
})
const handleClickOutside = () => {
  appStore.setCollapse(true)
}
</script>

<style scoped lang="scss">
.el-container {
  height: 100%;
}

.el-header {
  align-items: center;
  //background-color: #162746;
  border-bottom: 1px solid var(--el-border-color);
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

.top-left-header {
  left: var(--left-menu-max-width);
  width: calc(100% - var(--left-menu-max-width));
}

.top-left-header-collapse {
  left: var(--left-menu-min-width);
  width: calc(100% - var(--left-menu-min-width));
}

.sum-menu {
  border-right: 1px solid var(--el-border-color);
  height: 100%;
  position: absolute;
  transition: all 0.3s;
  width: var(--left-menu-max-width);

  .menu-container {
    border-right: none;
    box-shadow: unset;
    top: 0;
  }

  :deep(.el-menu) {
    background-color: unset;
  }

  .logo-title {
    height: 60px;
    justify-content: flex-start;
    transition: all 0.3s;
    width: var(--left-menu-max-width);
  }

  :deep(.logo-title .title) {
    opacity: 1;
    pointer-events: auto;
    transition-delay: 0.3s; // 延迟展示
    transition-duration: 0s; // 无动画渐变
  }
}

.sum-menu-is-mobile {
  background: white;
  z-index: 9999;
}

.sum-menu-is-collapse.sum-menu-is-mobile {
  // 同时存在两个类时生效
  .logo-title {
    opacity: 0;
    pointer-events: none;
  }
}

.sum-menu-is-collapse {
  width: var(--left-menu-min-width);

  /* stylelint-disable-next-line no-descending-specificity */
  .logo-title {
    width: var(--left-menu-min-width);
  }

  :deep(.logo-title .title) {
    opacity: 0;
    pointer-events: none;
    transition-delay: 0s;
    transition-duration: 0s; // 立即隐藏
    // display: none;
  }
}

.classic-menu-is-mobile {
  background-color: var(--el-bg-color-overlay);
}

.sum-header {
  border-bottom: 1px solid var(--el-border-color);
  display: flex;
  height: 60px;
  position: fixed;
  width: 100%;

  :deep(.el-header) {
    flex: 1 1 0%;
    position: relative;
    width: auto;
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
  background-color: var(--app-content-bg-color);
  height: 100%;
  margin-left: var(--left-menu-max-width);
  margin-top: 60px;
  overflow: hidden;
  padding: 0;
  perspective: none;
  position: relative;
  transition: 0.3s margin-left ease-in-out;
}

html.dark {
  .el-header {
    background-color: var(--el-bg-color-overlay);
    color: white;
  }

  .el-main {
    background-color: var(--el-bg-color-overlay);
  }
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
