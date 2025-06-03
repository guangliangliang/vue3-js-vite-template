import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  const collapse = ref(false) // 折叠菜单
  const mobile = ref(false) // 是否是移动端
  const layout = ref('classic') // 是否是移动端
  const title = ref(import.meta.env.VITE_APP_TITLE) // 标题
  const setCollapse = (value) => {
    collapse.value = value
  }
  const setMobile = (value) => {
    mobile.value = value
  }
  const getMobile = () => {
    return mobile.value
  }
  const setLayout = (value) => {
    mobile.value = value
  }
  const getLayout = () => {
    return layout.value
  }

  return {
    layout,
    title,
    mobile,
    collapse,
    getLayout,
    setLayout,
    getMobile,
    setMobile,
    setCollapse
  }
})
