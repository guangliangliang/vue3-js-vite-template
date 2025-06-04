<template>
  <div :id="prefixCls" :class="prefixCls" class="tags-view">
    <div class="tags-view__scroll">
      <ElScrollbar ref="scrollbarRef" class="tags-view__scrollbar" @scroll="scroll">
        <div class="tags-view__scroll-inner">
          <div
            v-for="item in visitedViews"
            :class="[
              `${prefixCls}__item`,
              item?.meta?.affix ? `${prefixCls}__item--affix` : '',
              {
                'is-active': isActive(item)
              }
            ]"
            :key="item.fullPath"
          >
            <router-link :ref="tagLinksRefs.set" :to="{ ...item }" custom v-slot="{ navigate }">
              <div @click="navigate" class="tags-view__item-content">
                <Icon
                  v-if="canShowIcon(item)"
                  :icon="item?.matched?.[1]?.meta?.icon || item?.meta?.icon"
                  :size="12"
                  class="tags-view__item-icon"
                />
                {{ item?.meta?.title }}
                <Icon
                  :class="`${prefixCls}__item--close`"
                  color="#333"
                  icon="vi-ant-design:close-outlined"
                  :size="12"
                  @click.prevent.stop="closeSelectedTag(item)"
                />
              </div>
            </router-link>
          </div>
        </div>
      </ElScrollbar>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, computed, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useTagsViewStore } from '@/stores'
import { useDesign } from '@/hooks'
import { useTemplateRefsList } from '@vueuse/core'
import { ElScrollbar } from 'element-plus'
import { useScrollTo } from '@/hooks'
import { useTagsView } from '@/hooks'

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('tags-view')

const { currentRoute } = useRouter()
const { closeCurrent } = useTagsView()

const tagsViewStore = useTagsViewStore()

const visitedViews = computed(() => tagsViewStore.getVisitedViews)
const setSelectTag = tagsViewStore.setSelectedTag
const tagsViewIcon = computed(() => true)

const addTags = () => {
  const { name } = currentRoute.value
  if (name) {
    setSelectTag(currentRoute.value)
    tagsViewStore.addView(currentRoute.value)
  }
}

const closeSelectedTag = (view) => {
  closeCurrent(view, () => {
    if (isActive(view)) toLastView()
  })
}

const toLastView = () => {}

const moveToCurrentTag = async () => {
  await nextTick()
  for (const v of visitedViews.value) {
    if (v.fullPath === currentRoute.value.path) {
      moveToTarget(v)
      if (v.fullPath !== currentRoute.value.fullPath) {
        tagsViewStore.updateVisitedView(currentRoute.value)
      }
      break
    }
  }
}

const tagLinksRefs = useTemplateRefsList()
const scrollbarRef = ref()
const scrollLeftNumber = ref(0)

const moveToTarget = (currentTag) => {
  const wrap = scrollbarRef.value?.wrapRef
  let firstTag = null
  let lastTag = null
  const tagList = tagLinksRefs.value
  if (tagList.length > 0) {
    firstTag = tagList[0]
    lastTag = tagList[tagList.length - 1]
  }

  if (firstTag?.to.fullPath === currentTag.fullPath) {
    const { start } = useScrollTo({ el: wrap, position: 'scrollLeft', to: 0, duration: 500 })
    start()
  } else if (lastTag?.to.fullPath === currentTag.fullPath) {
    const { start } = useScrollTo({
      el: wrap,
      position: 'scrollLeft',
      to: wrap.scrollWidth - wrap.offsetWidth,
      duration: 500
    })
    start()
  } else {
    const index = tagList.findIndex((item) => item?.to.fullPath === currentTag.fullPath)
    const tagEls = document.getElementsByClassName(`${prefixCls}__item`)
    const prevTag = tagEls[index - 1]
    const nextTag = tagEls[index + 1]

    const afterOffset = nextTag.offsetLeft + nextTag.offsetWidth + 4
    const beforeOffset = prevTag.offsetLeft - 4

    if (afterOffset > scrollLeftNumber.value + wrap.offsetWidth) {
      const { start } = useScrollTo({
        el: wrap,
        position: 'scrollLeft',
        to: afterOffset - wrap.offsetWidth,
        duration: 500
      })
      start()
    } else if (beforeOffset < scrollLeftNumber.value) {
      const { start } = useScrollTo({
        el: wrap,
        position: 'scrollLeft',
        to: beforeOffset,
        duration: 500
      })
      start()
    }
  }
}

const isActive = (route) => route.path === currentRoute.value.path

const scroll = ({ scrollLeft }) => {
  scrollLeftNumber.value = scrollLeft
}

const canShowIcon = (item) => {
  return (
    (item?.matched?.[1]?.meta?.icon && tagsViewIcon.value) ||
    (item?.meta?.affix && tagsViewIcon.value && item?.meta?.icon)
  )
}

onMounted(() => {
  addTags()
})

watch(
  () => currentRoute.value,
  () => {
    addTags()
    moveToCurrentTag()
  }
)
</script>

<style lang="scss" scoped>
.tags-view {
  background-color: #fff;
  display: flex;
  height: 35px;
  padding: 0 10px;
  position: relative;
  width: 100%;

  :deep(.el-scrollbar__view) {
    height: 100%;
  }

  .tags-view__scrollbar {
    height: 100%;
  }

  &__tool {
    align-items: center;
    cursor: pointer;
    display: flex;
    height: var(--tags-view-height);
    justify-content: center;
    position: relative;
    width: var(--tags-view-height);

    &::before {
      border-left: 1px solid var(--el-border-color);
      content: '';
      height: calc(100% - 1px);
      left: 0;
      position: absolute;
      top: 1px;
      width: 100%;
    }

    &--first::before {
      border-left: none;
      border-right: 1px solid var(--el-border-color);
    }
  }

  &__scroll {
    flex: 1;
    overflow: hidden;
  }

  &__scrollbar {
    height: 100%;
  }

  &__scroll-inner {
    display: flex;
    height: 100%;
  }

  &__item {
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    cursor: pointer;
    font-size: 12px;
    height: calc(100% - 6px);
    margin-left: 4px;
    padding-right: 25px;
    position: relative;
    top: 3px;

    &--close {
      display: none;
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
    }

    &:not(&--affix):hover &--close {
      display: block;
    }

    &.is-active {
      background-color: var(--el-color-primary);
      border: 1px solid var(--el-color-primary);
      color: var(--el-color-white);
    }

    &:not(.is-active):hover {
      color: var(--el-color-primary);
    }
  }

  &__item-content {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    padding-left: 15px;
    white-space: nowrap;
  }

  &__item-icon {
    margin-right: 5px;
  }
}

html.dark {
  .tags-view {
    background-color: var(--el-bg-color-overlay);
  }
  /* stylelint-disable-next-line no-descending-specificity */
  .tags-view__item {
    border: 1px solid var(--el-border-color);

    &.is-active {
      background-color: var(--el-color-primary);
      border-color: var(--el-color-primary);
      color: var(--el-color-white);
    }
  }
}
</style>
