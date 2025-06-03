<script setup>
import { computed } from 'vue'
import { useLayoutStore } from '@/stores'
import { useDesign } from '@/hooks'

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('layout-radio-picker')

const layoutStore = useLayoutStore()

const layout = computed(() => layoutStore.getLayout)
</script>

<template>
  <div :class="prefixCls" class="layout-picker-wrapper">
    <div
      :class="[`${prefixCls}__classic`, 'layout-item', { 'is-acitve': layout === 'classic' }]"
      @click="appStore.setLayout('classic')"
    ></div>
    <div
      :class="[`${prefixCls}__top-left`, 'layout-item', { 'is-acitve': layout === 'topLeft' }]"
      @click="appStore.setLayout('topLeft')"
    ></div>
    <div
      :class="[`${prefixCls}__top`, 'layout-item', { 'is-acitve': layout === 'top' }]"
      @click="appStore.setLayout('top')"
    ></div>
    <div
      :class="[`${prefixCls}__cut-menu`, 'layout-item', { 'is-acitve': layout === 'cutMenu' }]"
      @click="appStore.setLayout('cutMenu')"
    >
      <div class="cut-menu-inner-bar"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$primary-border-color: var(--el-color-primary);
$default-border-color: #e5e7eb;
$dark-bg: #273352;
$light-bg: #fff;

.layout-picker-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0 14px;
  justify-content: center;
}

.layout-item {
  background-color: #d1d5db; // bg-gray-300
  border: 2px solid $default-border-color;
  border-radius: 4px;
  cursor: pointer;
  height: 48px;
  position: relative;
  width: 56px;
}

.cut-menu-inner-bar {
  background-color: #e5e7eb; // bg-gray-200
  height: 100%;
  left: 10%;
  position: absolute;
  top: 0;
  width: 33%;
}

.is-acitve {
  border-color: $primary-border-color;
}

@function prefix($name) {
  @return 'v-layout-radio-picker' + $name;
}

// 以下按原 Less 转换来的结构
@at-root {
  .v-layout-radio-picker__classic {
    &::before {
      background-color: $dark-bg;
      border-radius: 4px 0 0 4px;
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 33%;
      z-index: 1;
    }

    &::after {
      background-color: $light-bg;
      border-radius: 4px 4px 0 0;
      content: '';
      height: 25%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }

  .v-layout-radio-picker__top-left {
    &::before {
      background-color: $dark-bg;
      border-radius: 4px 4px 0 0;
      content: '';
      height: 33%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 1;
    }

    &::after {
      background-color: $light-bg;
      border-radius: 4px 0 0 4px;
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 33%;
    }
  }

  .v-layout-radio-picker__top {
    &::before {
      background-color: $dark-bg;
      border-radius: 4px 4px 0 0;
      content: '';
      height: 33%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 1;
    }
  }

  .v-layout-radio-picker__cut-menu {
    &::before {
      background-color: $dark-bg;
      border-radius: 4px 4px 0 0;
      content: '';
      height: 33%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 1;
    }

    &::after {
      background-color: $light-bg;
      border-radius: 4px 0 0 4px;
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 10%;
    }
  }
}
</style>
