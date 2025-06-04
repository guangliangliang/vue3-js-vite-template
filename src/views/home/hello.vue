<template>
  <ElCard shadow="hover" class="home-hello box-bottom">
    <el-avatar :src="user.avatar || avatar" />
    <div class="home-hello-span">
      <span>早安，{{ user.name }}，祝你开心每一天!</span><br />
      今日晴，20℃ - 32℃！
    </div>
  </ElCard>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import avatar from '@/icons/avatar.svg'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>
<style scoped lang="scss">
.home-hello {
  :deep(.el-card__body) {
    align-items: center;
    display: flex;
  }

  &-span {
    font-size: 14px;
    margin-left: 10px;
  }
}
</style>
