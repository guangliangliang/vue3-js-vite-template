<template>
  <div class="base-container">
    <div class="header">
      <div class="header-left">
        <slot name="left">
          <span class="default-title">{{ title }}</span>
        </slot>
      </div>
      <div class="header-right">
        <slot name="right" />
      </div>
    </div>

    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'BaseContainer'
})
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.base-container {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 0 12px rgb(0 0 0 / 12%);

  .header {
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
    padding: 18px 20px;

    .header-left {
      .default-title {
        color: #333;
        // font-size: 18px;
        // font-weight: 600;
      }
    }

    .header-right {
      align-items: center;
      display: flex;
      gap: 8px;
    }
  }

  .content {
    // 可自定义内容样式
    padding: 20px;
  }
}

html.dark {
  .base-container {
    background-color: var(--el-bg-color-overlay);

    /* stylelint-disable-next-line no-descending-specificity */
    .default-title {
      color: white !important;
    }
  }
}
</style>
