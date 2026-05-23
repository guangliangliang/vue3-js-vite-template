import { del, get, put, post } from '@/utils/freeApiRequest'
import { FreeApi } from '@/api/freeApi/common'

export function getApiList(params) {
  return get(FreeApi.api, params)
}

export function createApi(params) {
  return post(FreeApi.api, params)
}

export function getApiInfo(id) {
  return get(`${FreeApi.api}/${id}`)
}

export function updateApi(params) {
  const id = params.id
  delete params.id
  return put(`${FreeApi.api}/${id}`, params)
}

export function deleteApi(id) {
  return del(`${FreeApi.api}/${id}`)
}
