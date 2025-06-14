import { get, post } from '@/utils/request'
export function onUserLogin(params) {
  return post('/login', params)
}
export function onUserRegister(params) {
  return post('/register', params)
}

export function logout() {
  return get('/logout')
}
export function getUserInfo() {
  return get('/user')
}
