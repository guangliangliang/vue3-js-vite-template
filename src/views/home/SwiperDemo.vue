<template>
  <o-swiper
    :slides="images"
    class="swiper-demo"
    :autoplay="{ delay: 3500, disableOnInteraction: false }"
  />
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getSwiperImages } from '@/api/home'
const defaultValue = [
  { img: 'https://randomfox.ca/images/40.jpg' },
  {
    img: 'https://randomfox.ca/images/75.jpg'
  },
  {
    img: 'https://randomfox.ca/images/50.jpg'
  }
]
const images = ref([])

const initImages = () => {
  const request = [getSwiperImages(), getSwiperImages(), getSwiperImages()]
  Promise.allSettled(request)
    .then((results) => {
      console.log('所有请求完成，结果如下：')
      results.forEach((data, index) => {
        console.log(`第 ${index + 1} 次请求结果:`, data)
        // 你可以在这里使用 data.image 获取狐狸图片的 URL
      })
      const successArr = results.filter((item) => item.status === 'fulfilled')
      if (successArr.length === request.length) {
        images.value = successArr.map((item) => ({
          img: item.value?.image
        }))
      } else {
        images.value = defaultValue
      }
      console.log(images.value, 'images.valueimages.value')
    })
    .catch((error) => {
      console.error('至少有一个请求失败:', error)
    })
}

onMounted(() => {
  initImages()
  console.log('轮播已加载')
})
</script>
<style lang="scss" scoped>
.swiper-demo {
  :deep(.slide-image) {
    height: 400px;
    width: 400px;
  }
}
</style>
