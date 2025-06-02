<template>
  <swiper :options="swiperOptions" class="my-swiper">
    <swiper-slide v-for="(slide, index) in slides" :key="index">
      {{ slide }}
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

defineOptions({
  name: 'OSwiper',
  inheritAttrs: true
})

defineProps({
  slides: {
    type: Array,
    default: () => []
  }
})

const swiperOptions = {
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  loop: true
}
</script>

<style scoped>
.my-swiper {
  height: 300px;
  width: 300px;
}
</style>
