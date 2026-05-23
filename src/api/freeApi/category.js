import { del, get, put, post } from '@/utils/freeApiRequest'
import { FreeApi } from '@/api/freeApi/common'

export function getCategoryList(params) {
  return get(FreeApi.category, params)
}

export function createCategory(params) {
  return post(FreeApi.category, params)
}

export function getCategoryInfo(id) {
  return get(`${FreeApi.category}/${id}`)
}

export function updateCategory(params) {
  const id = params.id
  delete params.id
  return put(`${FreeApi.category}/${id}`, params)
}

export function deleteCategory(id) {
  return del(`${FreeApi.category}/${id}`)
}

export function getAllCategories() {
  return get(FreeApi.publicCategories)
}
