import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/login'

export const useUserStore = defineStore('user', () => {
  const user = ref({
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

  const updateUser = (payload) => {
    Object.assign(user.value, payload)
  }

  return {
    user,
    getUser,
    updateUser
  }
})
