<template>
  <div class="not-found">
    <svg-icon name="404" class="not-found__image" />

    <div class="not-found__content">
      <p class="not-found__title">404</p>
      <p class="not-found__desc">抱歉，你访问的页面不存在</p>

      <el-button type="primary" @click="$router.push('/')"> 返回首页 </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;

  &__image {
    height: 190px;
    width: 200px;
  }

  &__content {
    margin-left: 3rem; // ≈ ml-12

    .el-button {
      margin-top: 1rem;
    }
  }

  &__title {
    font-size: 2.25rem; // ≈ text-4xl
    font-weight: 500;
    margin-bottom: 1rem;
  }

  &__desc {
    color: #6b7280; // ≈ text-gray-500
    margin-bottom: 1rem;
  }
}
</style>
