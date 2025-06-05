<template>
  <el-breadcrumb separator="/" :class="`${prefixCls} flex items-center h-full ml-[10px]`">
    <transition-group appear enter-active-class="animate__animated animate__fadeInRight">
      <el-breadcrumb-item
        v-for="item in breadcrumbList"
        :key="item.name"
        :to="item.disabled ? '' : item.path"
      >
        <el-icon v-if="item.meta.icon">
          <component :is="item.meta.icon" />
        </el-icon>
        {{ item.meta.title || '' }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch, computed, unref } from 'vue'
import { useRouter } from 'vue-router'
import { filterBreadcrumb } from './helper'
import { filter, treeToList } from '@/utils/tree'
import { useDesign } from '@/hooks'
import routers from '@/router/routes'

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('breadcrumb')

const { currentRoute } = useRouter()

const levelList = ref([])

const menuRouters = computed(() => {
  return filterBreadcrumb(routers)
})

const getBreadcrumb = () => {
  const currentPath = currentRoute.value.matched.slice(-1)[0].path
  levelList.value = filter(unref(menuRouters), (node) => node.path === currentPath)
}

const breadcrumbList = computed(() => {
  const list = treeToList(unref(levelList)) || []
  const result = list.map((v) => ({
    ...v,
    disabled: !v.redirect || v.redirect === 'noredirect',
    meta: v.meta || {}
  }))
  return result.slice(1)
})
window.breadcrumbList = breadcrumbList
console.log('breadcrumbList', breadcrumbList.value)

watch(
  () => currentRoute.value,
  (route) => {
    if (!route.path.startsWith('/redirect/')) {
      getBreadcrumb()
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.breadcrumb {
  margin-left: 10px;

  &__item {
    display: flex;

    .breadcrumb__inner {
      align-items: center;
      color: var(--top-header-text-color);
      display: flex;

      &:hover {
        color: var(--el-color-primary);
      }
    }
  }

  &__item:not(:last-child) {
    .breadcrumb__inner {
      color: var(--top-header-text-color);

      &:hover {
        color: var(--el-color-primary);
      }
    }
  }

  &__item:last-child {
    /* stylelint-disable-next-line no-descending-specificity */
    .breadcrumb__inner {
      color: var(--el-text-color-placeholder);

      &:hover {
        color: var(--el-text-color-placeholder);
      }
    }
  }
}
</style>
