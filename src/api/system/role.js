import { del, get, patch, post } from '@/utils/request'
import { Api } from '@/api/common'

export function getRoleList(params) {
  return get(`${Api.role}`, params)
}
export function createRole(params) {
  return post(`${Api.role}`, params)
}

export function getRoleInfo(id) {
  return get(`${Api.role}/${id}`)
}

export function updateRole(params) {
  const id = params.id
  delete params.id
  return patch(`${Api.role}/${id}`, params)
}

export function deleteRole(id) {
  return del(`${Api.role}/${id}`)
}
