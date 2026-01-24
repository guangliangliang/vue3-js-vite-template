import { get, post, patch } from '@/utils/request'
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
  return get('/profile')
}

export function updateUserInfo(params) {
  return patch('/profile', params)
}

export function changePassword(params) {
  return patch('/profile/change-password', params)
}
