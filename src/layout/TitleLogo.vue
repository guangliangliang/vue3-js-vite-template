<template>
  <div class="logo-title" @click.stop="() => $router.push('/')">
    <a>
      <img :src="logoSrc" />
      <span class="title" v-text="baseTitle" />
    </a>
  </div>
</template>

<script setup>
import { baseTitle } from '@/config'
import logoSrc from '@/assets/images/login/logo.png'
</script>

<style scoped lang="scss">
.logo-title {
  padding: 1px 10px 0;

  @include flex-center;

  a {
    @include flex-center;

    cursor: pointer;
    justify-content: flex-start;
  }

  img {
    width: 30px;
  }

  .title {
    margin: 0 12px 0 5px;
  }
}
</style>
