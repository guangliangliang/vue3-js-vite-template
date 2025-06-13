import { del, get, put, post } from '@/utils/request'
import { Api } from '@/api/common'

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
