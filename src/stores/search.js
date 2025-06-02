import { ref } from 'vue'
import { defineStore } from 'pinia'
import searchConfig from '@/assets/enum/search'

// 搜索项配置对象
const searchInfoObj = {
  user: [
    {
      id: 'user_name_text',
      name: '用户名称',
      type: 'text',
      hint: '请输入用户名称'
    },
    {
      id: 'user_mobile',
      name: '手机号',
      type: 'auto_complete',
      hint: '请输入手机号'
    }
  ]
}

export const useSearchStore = defineStore('search', () => {
  const searchReady = ref(false) // 控制是否可以请求列表
  const searchList = ref([])

  const getSearchList = async () => {
    searchReady.value = false
    const searchId = searchConfig[location.pathname]
    if (!searchId) {
      searchReady.value = true
    } else {
      searchList.value = searchInfoObj[searchId] || []
      searchReady.value = true
    }
  }

  return {
    searchList,
    searchReady,
    getSearchList
  }
})
