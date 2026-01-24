<template>
  <el-scrollbar class="menu-container">
    <el-menu :collapse="appStore.collapse" :default-active="activeMenu">
      <o-menu-item :menu-list="menuList" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import { onBeforeMount, ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores'
import { useUserStore } from '@/stores'
import OMenuItem from './MenuItem.vue'

defineOptions({
  name: 'OMenu'
})

const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()

const activeMenu = ref('')

// 基础菜单项
const baseMenu = [
  {
    id: 'home',
    name: '首页',
    icon: 'HomeFilled',
    path: '/home'
  },
  {
    id: 'profile',
    name: '个人中心',
    icon: 'User',
    path: '/profile'
  }
]

// 系统管理菜单（仅管理员可见）
const systemMenu = {
  id: 'system',
  name: '系统管理',
  icon: 'Platform',
  children: [
    {
      id: 'user',
      name: '用户管理',
      path: '/system/user'
    },
    {
      id: 'role',
      name: '角色管理',
      path: '/system/role'
    }
  ]
}

// 根据用户权限动态生成菜单
const menuList = computed(() => {
  const menus = [...baseMenu]
  // 如果是管理员，添加系统管理菜单
  if (userStore.isAdmin) {
    menus.push(systemMenu)
  }
  return menus
})

onBeforeMount(() => {})

watch(
  () => route,
  (val) => {
    const { meta } = val
    activeMenu.value = meta.activePath
  },
  { immediate: true, deep: true }
)
</script>

<style lang="scss" scoped>
.menu-container {
  //background-color: var(--el-bg-color-overlay);
  border-right: 1px solid var(--el-border-color);
  bottom: 0;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
  height: calc(100% - 60px);
  left: 0;
  overflow-y: auto;
  position: absolute;
  top: 60px;
  z-index: 2000;
}

html.dark {
  .menu-container {
    background-color: var(--el-bg-color-overlay);
  }
}

.el-menu {
  border-right: 0;
  width: var(--left-menu-min-width);

  &:not(.el-menu--collapse) {
    width: var(--left-menu-max-width);
  }
}
</style>
