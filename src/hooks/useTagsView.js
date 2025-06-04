import { useTagsViewStoreWithOut } from '@/stores/tagViews'
import { useRouter } from 'vue-router'
import { computed, nextTick, unref } from 'vue'

export const useTagsView = () => {
  const tagsViewStore = useTagsViewStoreWithOut()
  const { replace, currentRoute } = useRouter()

  const selectedTag = computed(() => tagsViewStore.getSelectedTag)

  const closeAll = (callback) => {
    tagsViewStore.delAllViews()
    if (typeof callback === 'function') {
      callback()
    }
  }

  const closeLeft = (callback) => {
    tagsViewStore.delLeftViews(unref(selectedTag))
    if (typeof callback === 'function') {
      callback()
    }
  }

  const closeRight = (callback) => {
    tagsViewStore.delRightViews(unref(selectedTag))
    if (typeof callback === 'function') {
      callback()
    }
  }

  const closeOther = (callback) => {
    tagsViewStore.delOthersViews(unref(selectedTag))
    if (typeof callback === 'function') {
      callback()
    }
  }

  const closeCurrent = (view, callback) => {
    if (view?.meta?.affix) return
    tagsViewStore.delView(view || unref(currentRoute))
    if (typeof callback === 'function') {
      callback()
    }
  }

  const refreshPage = async (view, callback) => {
    tagsViewStore.delCachedView()
    const { path, query } = view || unref(currentRoute)
    await nextTick()
    replace({
      path: '/redirect' + path,
      query
    })
    if (typeof callback === 'function') {
      callback()
    }
  }

  const setTitle = (title, path) => {
    tagsViewStore.setTitle(title, path)
  }

  return {
    closeAll,
    closeLeft,
    closeRight,
    closeOther,
    closeCurrent,
    refreshPage,
    setTitle
  }
}
