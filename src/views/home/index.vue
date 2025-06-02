<template>
  <div class="home">
    <h1>欢迎来到首页</h1>
    <el-button type="primary" @click="handleClick">点击我</el-button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'Home',
  setup() {
    const message = ref('')

    const handleClick = () => {
      message.value = '你点击了按钮！'
    }

    onMounted(() => {
      console.log('首页已加载')
    })

    return {
      message,
      handleClick
    }
  }
}
</script>

<style scoped>
.home {
  background-color: white;
  padding: 20px;
}
</style>
