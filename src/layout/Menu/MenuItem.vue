<template>
  <template v-for="item in menuList" :key="item.id">
    <el-menu-item
      v-if="!item.children || item.children.length === 0"
      :index="item.path"
      @click="handleSelect(item)"
    >
      <el-icon v-if="item.icon">
        <component :is="item.icon" />
      </el-icon>
      <template #title>{{ item.name }}</template>
    </el-menu-item>
    <el-sub-menu v-else :index="item.name">
      <template #title>
        <el-icon v-if="item.icon">
          <component :is="item.icon" />
        </el-icon>
        <span>{{ item.name }}</span>
      </template>
      <!--  如果有子级数据使用递归组件 -->
      <menu-item :menu-list="item.children" />
    </el-sub-menu>
  </template>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  menuList: {
    type: Array,
    default: () => []
  }
})

const route = useRoute()
const router = useRouter()

function handleSelect(item) {
  if (item.path === route.path) return
  router.push(item.path)
}
</script>
