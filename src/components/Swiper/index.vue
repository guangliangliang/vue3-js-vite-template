<template>
  <swiper class="base-swiper" :modules="modules" v-bind="$attrs" :options="swiperOptions">
    <swiper-slide v-for="(item, index) in slides" :key="index">
      <slot :item="item" :index="index">
        <!-- 默认插槽内容 -->
        <div class="slide-content">
          <img v-if="item.img" :src="item.img" alt="slide image" class="slide-image" />
          <div v-if="item.text" class="slide-text">{{ item.text }}</div>
        </div>
      </slot>
    </swiper-slide>

    <template v-if="showPagination">
      <div class="swiper-pagination" slot="pagination"></div>
    </template>
    <template v-if="showNavigation">
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </template>
  </swiper>
</template>

<script setup>
import 'swiper/swiper-bundle.css'

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { Pagination, Navigation, Autoplay } from 'swiper'
const modules = [Pagination, Navigation, Autoplay]
defineOptions({
  name: 'OSwiper',
  inheritAttrs: true
})

defineProps({
  slides: {
    type: Array,
    required: true
  },
  swiperOptions: {
    type: Object,
    default: () => ({})
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  showNavigation: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.base-swiper {
  height: 100%;
  position: relative;
  width: 100%;

  .swiper-slide {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .slide-content {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .slide-image {
      border-radius: 8px;
      max-height: 100%;
      max-width: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.02);
      }
    }

    .slide-text {
      color: #333;
      font-size: 16px;
      margin-top: 12px;
      text-align: center;
    }
  }

  .swiper-pagination {
    bottom: 10px !important;
    text-align: center;

    .swiper-pagination-bullet {
      background: #ccc;
      height: 8px;
      opacity: 1;
      transition: background-color 0.3s;
      width: 8px;

      &-active {
        background: #007aff;
      }
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: #007aff;
    transition: color 0.3s;

    &:hover {
      color: #0051a3;
    }
  }
}
</style>
