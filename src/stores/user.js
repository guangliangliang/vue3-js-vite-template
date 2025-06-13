import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/login'
import { getRoleList } from '@/api/system/role'

export const useUserStore = defineStore('user', () => {
  const user = reactive({
    name: '',
    sex: '',
    mobile: ''
  })
  const roles = ref()

  const getUser = async () => {
    const res = await getUserInfo()
    console.log(res, 'resres')
    if (res.code === 200) {
      updateUser(res.data)
      getUserRoles()
    }
  }
  const getUserRoles = async () => {
    const res = await getRoleList()
    console.log(res, 'resres')
    if (res.code === 200) {
      roles.value = res.data.list.map((item) => {
        const { id: key, name: value } = item
        return { key, value }
      })
    }
  }
  const getUserObj = () => {
    return this.user
  }

  const updateUser = (payload) => {
    Object.assign(user, payload)
  }

  return {
    roles,
    user,
    getUser,
    getUserObj,
    updateUser
  }
})
