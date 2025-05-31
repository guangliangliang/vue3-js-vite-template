import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      id: null,
      username: '',
      email: '',
      token: ''
    }
  }),
  getters: {
    isLoggedIn: (state) => !!state.userInfo.token
  },
  actions: {
    setUserInfo(info) {
      this.userInfo = { ...this.userInfo, ...info }
    },
    clearUserInfo() {
      this.userInfo = {
        id: null,
        username: '',
        email: '',
        token: ''
      }
    }
  }
})
