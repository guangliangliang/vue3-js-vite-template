<template>
  <el-scrollbar class="menu-container">
    <el-menu :collapse="layoutStore.collapse" :default-active="activeMenu" unique-opened>
      <o-menu-item :menu-list="menuList" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLayoutStore } from '@/stores'
import OMenuItem from './MenuItem.vue'

defineOptions({
  name: 'OMenu'
})

const route = useRoute()
const layoutStore = useLayoutStore()

const activeMenu = ref('')
const menuList = ref([
  {
    id: 'home',
    name: '首页',
    icon: 'HomeFilled',
    path: '/home'
  },
  {
    id: 'system',
    name: '系统管理',
    icon: 'Platform',
    children: [
      {
        id: 'user',
        name: '用户管理',
        path: '/system/user'
      }
    ]
  }
])

onBeforeMount(() => {
  // getMenu()
})

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
  background-color: #fff;
  bottom: 0;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
  height: calc(100% - 60px);
  left: 0;
  overflow-y: auto;
  position: absolute;
  top: 60px;
  z-index: 2000;
}

.el-menu {
  border-right: 0;
  width: var(--left-menu-min-width);

  &:not(.el-menu--collapse) {
    width: var(--left-menu-max-width);
  }
}
</style>
