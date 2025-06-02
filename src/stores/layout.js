import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  const isCollapse = ref(false)

  const updateCollapse = (payload) => {
    isCollapse.value = payload
  }

  return {
    isCollapse,
    updateCollapse
  }
})
