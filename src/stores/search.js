import { ref, nextTick } from 'vue'
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
  ],
  role: [
    {
      id: 'role_name_text',
      name: '角色名称',
      type: 'text',
      hint: '请输入角色名称'
    }
    // {
    //   id: 'role_status',
    //   name: '角色状态',
    //   type: 'select',
    //   hint: '请选择角色状态',
    //   multi_select: false,
    //   options: [
    //     {
    //       key: 'enable',
    //       value: '已启用'
    //     },
    //     {
    //       key: 'disabled',
    //       value: '已禁用'
    //     }
    //   ]
    // }
  ]
}

export const useSearchStore = defineStore('search', () => {
  const searchReady = ref(false) // 控制是否可以请求列表
  const searchList = ref([])

  const getSearchReady = () => {
    return searchReady.value
  }
  const getSearchList = async () => {
    console.log('valvalval')

    searchReady.value = false
    const searchId = searchConfig[location.pathname]
    if (searchId) {
      searchList.value = searchInfoObj[searchId] || []
    }
    nextTick(() => {
      searchReady.value = true
    })
  }

  return {
    searchList,
    searchReady,
    getSearchReady,
    getSearchList
  }
})
