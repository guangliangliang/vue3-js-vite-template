import { get } from '@/utils/freeApiRequest'

export const FreeApi = {
  category: '/api/admin/categories',
  api: '/api/admin/apis',
  publicCategories: '/api/categories'
}

export function getFreeTableData(api, params) {
  const newParams = { ...params }
  if (newParams.limit) {
    newParams.pageSize = newParams.limit
    delete newParams.limit
  }
  return get(api, newParams)
}
