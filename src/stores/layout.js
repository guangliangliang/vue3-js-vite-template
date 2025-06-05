import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'

export const useLayoutStore = defineStore('layout', () => {
  const collapse = ref(false) // 折叠菜单
  const mobile = ref(false) // 是否是移动端
  const isDark = ref(false) // 是否是暗黑模式
  const layout = ref('classic') // 是否是移动端
  const title = ref(import.meta.env.VITE_APP_TITLE) // 标题
  const theme = ref('#409eff')
  const getTheme = () => {
    return theme.value
  }
  const setTheme = (value) => {
    theme.value = value
  }
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
    layout.value = value
  }
  const getLayout = () => {
    return layout.value
  }
  const setIsDark = (value) => {
    isDark.value = value
    if (value) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }
  const getIsDark = () => {
    return isDark.value
  }
  const initTheme = () => {
    const isDark = useDark({
      valueDark: 'dark',
      valueLight: 'light'
    })
    isDark.value = getIsDark()
  }

  return {
    layout,
    title,
    mobile,
    collapse,
    theme,
    setTheme,
    getTheme,
    getLayout,
    setLayout,
    getMobile,
    setMobile,
    getIsDark,
    setIsDark,
    setCollapse,
    initTheme
  }
})
