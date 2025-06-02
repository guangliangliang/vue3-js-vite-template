import { del, get, put, post } from '@/utils/request'
import { Api } from '@/api/common' // 注意：JS中不能使用 TypeScript 的 enum，需将 enum 改为对象导出，见说明

export function createUser(params) {
  return post(`${Api.user}`, params)
}

export function getUserInfo(id) {
  return get(`${Api.user}/${id}`)
}

export function updateUser(params) {
  return put(`${Api.user}/${params.id}`, params)
}

export function deleteUser(id) {
  return del(`${Api.user}/${id}`)
}
