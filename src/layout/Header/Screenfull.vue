<script setup>
import { ref } from 'vue'

const isFullScreen = ref(false)

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullScreen.value = true
  } else {
    document.exitFullscreen()
    isFullScreen.value = false
  }
}
</script>

<template>
  <div class="full-screen">
    <SvgIcon :name="isFullScreen ? 'fullscreen-exit' : 'fullscreen'" @click="toggleFullScreen" />
  </div>
</template>
<style lang="scss" scoped>
.full-screen {
  @include flex-center;

  .svg-icon {
    font-size: 30px;
  }

  cursor: pointer;
  margin: 0 10px;
}
</style>
