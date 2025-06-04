import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/login'

export const useUserStore = defineStore('user', () => {
  const user = reactive({
    name: '',
    sex: '',
    mobile: ''
  })

  const getUser = async () => {
    const res = await getUserInfo()
    console.log(res, 'resres')
    if (res.code === 200) {
      updateUser(res.data)
    }
  }
  const getUserObj = () => {
    return this.user
  }

  const updateUser = (payload) => {
    Object.assign(user, payload)
  }

  return {
    user,
    getUser,
    getUserObj,
    updateUser
  }
})
