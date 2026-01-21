import { get } from '@/utils/request'

export const Api = {
  user: '/users',
  role: '/roles'
  // 其他接口地址
}
export function getTableData(api, params) {
  return get(api, params)
}
