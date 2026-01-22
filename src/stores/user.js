import { reactive, ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getCurrentUserInfo, getGenderList, getRoleList } from '@/api/login'
import { ElMessage } from 'element-plus'
import { clearLocal } from '@/utils/auth'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  const user = reactive({
    name: '',
    sex: '',
    mobile: '',
    roleId: ''
  })
  const roles = ref()
  const genders = ref([])

  const onLogout = async () => {
    router.push('/login')
    ElMessage.success('退出登录成功')
    clearLocal()
    router.push('/login')
  }
  const getGenderData = async () => {
    const res = await getGenderList()
    console.log(res, 'resres')
    if (res.code === 200) {
      genders.value = res.data.map((item) => {
        const { label, value } = item
        return { label, value }
      })
    }
  }

  const getRoleOptions = async () => {
    const res = await getRoleList()
    console.log(res, 'resres')
    if (res.code === 200) {
      roles.value = res.data.map((item) => {
        const { label, value } = item
        return { label, value }
      })
    }
  }
  const getUser = async () => {
    const res = await getCurrentUserInfo()
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

  // 判断是否为管理员
  const isAdmin = computed(() => {
    // 这里根据实际情况判断，例如用户角色为admin或roleId为1
    return user.roleId === 1 || user.roleName === 'admin'
  })

  return {
    genders,
    roles,
    user,
    getUser,
    getGenderData,
    getRoleOptions,
    getUserObj,
    onLogout,
    updateUser,
    isAdmin
  }
})
