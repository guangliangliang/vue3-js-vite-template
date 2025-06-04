import router from '@/router'
import { defineStore } from 'pinia'
import { store } from './index'
import { findIndex } from '@/utils/array'
import { useUserStore } from './user'

export const useTagsViewStore = defineStore('tagsView', {
  state: () => ({
    visitedViews: [],
    cachedViews: new Set(),
    selectedTag: undefined
  }),
  getters: {
    getVisitedViews(state) {
      return state.visitedViews
    },
    getCachedViews(state) {
      return Array.from(state.cachedViews)
    },
    getSelectedTag(state) {
      return state.selectedTag
    }
  },
  actions: {
    addView(view) {
      this.addVisitedView(view)
      this.addCachedView()
    },
    addVisitedView(view) {
      if (this.visitedViews.some((v) => v.path === view.path)) return
      if (view.meta?.noTagsView) return
      this.visitedViews.push({
        ...view,
        title: view.meta?.title || 'no-name'
      })
    },
    addCachedView() {
      const cacheMap = new Set()
      for (const v of this.visitedViews) {
        const item = v
        if (!item?.meta || item.meta.noCache) continue
        cacheMap.add(item.name)
      }

      const current = Array.from(this.cachedViews).sort().toString()
      const updated = Array.from(cacheMap).sort().toString()
      if (current === updated) return

      this.cachedViews = cacheMap
    },
    delView(view) {
      this.delVisitedView(view)
      this.addCachedView()
    },
    delVisitedView(view) {
      const index = this.visitedViews.findIndex((v) => v.path === view.path)
      if (index > -1) {
        this.visitedViews.splice(index, 1)
      }
    },
    delCachedView() {
      const route = router.currentRoute.value
      const index = findIndex(this.getCachedViews, (v) => v === route.name)
      if (index > -1) {
        this.cachedViews.delete(this.getCachedViews[index])
      }
    },
    delAllViews() {
      this.delAllVisitedViews()
      this.addCachedView()
    },
    delAllVisitedViews() {
      const userStore = useUserStore()
      this.visitedViews = userStore.getUserObj
        ? this.visitedViews.filter((tag) => tag.meta?.affix)
        : []
    },
    delOthersViews(view) {
      this.delOthersVisitedViews(view)
      this.addCachedView()
    },
    delOthersVisitedViews(view) {
      this.visitedViews = this.visitedViews.filter((v) => v.meta?.affix || v.path === view.path)
    },
    delLeftViews(view) {
      const index = findIndex(this.visitedViews, (v) => v.path === view.path)
      if (index > -1) {
        this.visitedViews = this.visitedViews.filter(
          (v, i) => v.meta?.affix || v.path === view.path || i > index
        )
        this.addCachedView()
      }
    },
    delRightViews(view) {
      const index = findIndex(this.visitedViews, (v) => v.path === view.path)
      if (index > -1) {
        this.visitedViews = this.visitedViews.filter(
          (v, i) => v.meta?.affix || v.path === view.path || i < index
        )
        this.addCachedView()
      }
    },
    updateVisitedView(view) {
      for (let i = 0; i < this.visitedViews.length; i++) {
        if (this.visitedViews[i].path === view.path) {
          this.visitedViews[i] = { ...this.visitedViews[i], ...view }
          break
        }
      }
    },
    setSelectedTag(tag) {
      this.selectedTag = tag
    },
    setTitle(title, path) {
      for (const v of this.visitedViews) {
        if (v.path === (path || this.selectedTag?.path)) {
          v.meta.title = title
          break
        }
      }
    }
  },
  persist: false
})

export const useTagsViewStoreWithOut = () => {
  return useTagsViewStore(store)
}
