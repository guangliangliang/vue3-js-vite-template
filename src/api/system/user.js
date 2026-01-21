import { del, get, patch, post } from '@/utils/request'
import { Api } from '@/api/common'

export function createUser(params) {
  return post(`${Api.user}`, params)
}

export function getUserInfo(id) {
  return get(`${Api.user}/${id}`)
}

export function updateUser(params) {
  const id = params.id
  delete params.id
  return patch(`${Api.user}/${id}`, params)
}

export function deleteUser(id) {
  return del(`${Api.user}/${id}`)
}
