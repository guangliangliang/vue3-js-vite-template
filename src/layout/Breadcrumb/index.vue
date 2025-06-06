<template>
  <el-breadcrumb :class="`${prefixCls} breadcrumb-wrapper`" separator="/">
    <transition-group appear enter-active-class="animate__animated animate__fadeInRight" tag="div">
      <el-breadcrumb-item
        v-for="item in breadcrumbList"
        :key="item.name"
        :to="item.disabled ? '' : item.path"
        class="breadcrumb-item"
      >
        <div class="breadcrumb-item-inner">
          <el-icon v-if="item.meta.icon">
            <component :is="item.meta.icon" />
          </el-icon>
          <span>{{ item.meta?.title || '' }}</span>
        </div>
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

function getBreadcrumb() {
  const currentPath = currentRoute.value.matched.slice(-1)[0]?.path || ''
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
$prefix-cls: '#{$adminNamespace}-breadcrumb';

.#{$prefix-cls} {
  align-items: center;
  display: flex;
  height: 100%;
  margin-left: 10px;

  .breadcrumb-item {
    display: flex;

    &-inner {
      align-items: center;
      color: var(--top-header-text-color);
      cursor: pointer;
      display: flex;

      &:hover {
        color: var(--el-color-primary);
      }
    }

    &:not(:last-child)-inner {
      color: var(--top-header-text-color);

      &:hover {
        color: var(--el-color-primary);
      }
    }

    &:last-child {
      &-inner {
        color: var(--el-text-color-placeholder);
        cursor: default;

        &:hover {
          color: var(--el-text-color-placeholder);
        }
      }
    }
  }

  .breadcrumb-icon {
    margin-right: 5px;
  }
}
</style>
