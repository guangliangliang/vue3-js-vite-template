import { get } from '@/utils/request'

export const Api = {
  user: '/user'
  // 其他接口地址
}
export function getTableData(api, params) {
  return get(api, params)
}
