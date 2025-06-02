<template>
  <div class="header-left">
    <el-icon class="collapse-icon" :size="25" color="#fff" @click="handleCollapse">
      <expand v-if="isCollapse" />
      <fold v-else />
    </el-icon>
    <span class="title" v-text="baseTitle" />
  </div>
  <div class="header-right">
    <el-dropdown>
      <div class="user-dropdown">
        <el-avatar :src="user.avatar || avatar" />
        <span class="name">{{ user.name }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { logout } from '@/api/login'
import { useLayoutStore, useUserStore } from '@/stores'
import { confirmBox } from '@/utils/elementPlus'
import { clearLocal } from '@/utils/auth'
import router from '@/router'
import avatar from '@/icons/avatar.svg'
import { baseTitle } from '@/config'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'OHeader'
})

const userStore = useUserStore()
const layoutStore = useLayoutStore()

const { user } = storeToRefs(userStore)
const { isCollapse } = storeToRefs(layoutStore)

const handleCollapse = () => {
  layoutStore.updateCollapse(!layoutStore.isCollapse)
}

const handleLogout = () => {
  confirmBox('确认退出当前账户吗？', '提示', {
    autofocus: false,
    type: 'warning'
  }).then(async () => {
    const res = await logout()
    if (res.code === 200) {
      router.push('/login')
      ElMessage.success('退出登录成功')
      clearLocal()
      router.push('/login')
    }
  })
}
</script>

<style scoped lang="scss">
.header-left {
  align-items: center;
  display: flex;

  .collapse-icon {
    cursor: pointer;
  }

  .title {
    margin-left: 12px;
  }
}

.header-right {
  display: flex;
  justify-content: flex-end;

  .user-dropdown {
    align-items: center;
    cursor: pointer;
    display: flex;

    .name {
      color: white;
      margin-left: 8px;
    }
  }
}
</style>
