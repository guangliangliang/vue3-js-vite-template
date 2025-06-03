import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  const collapse = ref(false) // 折叠菜单
  const mobile = ref(false) // 是否是移动端
  const title = ref(import.meta.env.VITE_APP_TITLE) // 标题

  const setCollapse = (value) => {
    collapse.value = value
  }
  const setMobile = (value) => {
    console.log(value, 'valuevalue')

    mobile.value = value
  }
  const getMobile = () => {
    return mobile.value
  }

  return {
    title,
    mobile,
    collapse,
    getMobile,
    setMobile,
    setCollapse
  }
})
