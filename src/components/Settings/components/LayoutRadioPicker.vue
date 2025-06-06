<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores'
import { useDesign } from '@/hooks'

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('layout-radio-picker')

const appStore = useAppStore()
const layout = computed(() => appStore.getLayout)
</script>

<template>
  <div :class="prefixCls" class="layout-radio-picker-wrapper">
    <div
      :class="[
        `${prefixCls}__classic`,
        'layout-radio-picker-item',
        { 'is-active': layout === 'classic' }
      ]"
      @click="appStore.setLayout('classic')"
    ></div>
    <div
      :class="[
        `${prefixCls}__top-left`,
        'layout-radio-picker-item',
        { 'is-active': layout === 'topLeft' }
      ]"
      @click="appStore.setLayout('topLeft')"
    ></div>
    <!-- <div
      :class="[`${prefixCls}__top`, 'layout-radio-picker-item', { 'is-active': layout === 'top' }]"
      @click="appStore.setLayout('top')"
    ></div>
    <div
      :class="[
        `${prefixCls}__cut-menu`,
        'layout-radio-picker-item',
        { 'is-active': layout === 'cutMenu' }
      ]"
      @click="appStore.setLayout('cutMenu')"
    >
      <div class="cut-menu-inner"></div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
$prefix-cls: '#{$adminNamespace}-layout-radio-picker';

.layout-radio-picker-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 14px; // 代替 space-x-14px
  justify-content: center;
}

.layout-radio-picker-item {
  background-color: #d1d5db; // bg-gray-300 颜色替代
  cursor: pointer;
  height: 48px;
  position: relative;
  width: 56px;

  &.is-active {
    border-color: var(--el-color-primary);
  }
}

.#{$prefix-cls} {
  &__classic {
    border: 2px solid #e5e7eb;
    border-radius: 4px;

    &::before {
      background-color: #273352;
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
      background-color: #fff;
      border-radius: 4px 4px 0;
      content: '';
      height: 25%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }

  &__top-left {
    border: 2px solid #e5e7eb;
    border-radius: 4px;

    &::before {
      background-color: #273352;
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
      background-color: #fff;
      border-radius: 4px 0 0 4px;
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 33%;
    }
  }

  &__top {
    border: 2px solid #e5e7eb;
    border-radius: 4px;

    &::before {
      background-color: #273352;
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

  &__cut-menu {
    border: 2px solid #e5e7eb;
    border-radius: 4px;

    &::before {
      background-color: #273352;
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
      background-color: #fff;
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

.cut-menu-inner {
  background-color: #e5e7eb; // bg-gray-200 替代色
  height: 100%;
  left: 10%;
  position: absolute;
  top: 0;
  width: 33%;
}
</style>
