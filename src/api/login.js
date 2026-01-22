import { get, post } from '@/utils/request'
export function onUserLogin(params) {
  return post('/auth/login', params)
}
export function onUserRegister(params) {
  return post('/auth/register', params)
}
export function getGenderList(params) {
  return get('/dict/name/gender', params)
}

export function getRoleList(params) {
  return get('/roles/options/list', params)
}

export function logout() {
  return post('/auth/logout')
}
export function getCurrentUserInfo() {
  return get('/users/profile')
}
