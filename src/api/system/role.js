import { del, get, put, post } from '@/utils/request'
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
  return put(`${Api.role}/${params.id}`, params)
}

export function deleteRole(id) {
  return del(`${Api.role}/${id}`)
}
