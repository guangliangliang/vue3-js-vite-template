import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'

export const useAppStore = defineStore('app', {
  state: () => ({
    collapse: false, // 折叠菜单
    mobile: false, // 是否是移动端
    isDark: false, // 暗黑模式
    layout: 'classic', // 布局模式
    title: import.meta.env.VITE_APP_TITLE, // 标题
    theme: '#409eff' // 主题颜色
  }),
  getters: {
    getCollapse: (state) => state.collapse,
    getTheme: (state) => state.theme,
    getMobile: (state) => state.mobile,
    getLayout: (state) => state.layout,
    getIsDark: (state) => state.isDark
  },
  actions: {
    setCollapse(value) {
      this.collapse = value
    },
    setMobile(value) {
      this.mobile = value
    },
    setLayout(value) {
      this.layout = value
    },
    setTheme(value) {
      this.theme = value
    },
    setIsDark(value) {
      this.isDark = value
      const html = document.documentElement
      if (value) {
        html.classList.add('dark')
        html.classList.remove('light')
      } else {
        html.classList.add('light')
        html.classList.remove('dark')
      }
    },
    initTheme() {
      const isDark = useDark({
        valueDark: 'dark',
        valueLight: 'light'
      })
      isDark.value = this.isDark
    }
  },
  persist: true
})
