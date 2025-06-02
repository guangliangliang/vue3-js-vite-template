import { reactive } from 'vue'
import { setUrlParams } from '@/utils/basic'

const defaultPaginationData = {
  total: 0,
  page_size: 20,
  page: 1,
  sizes: [20, 30, 50, 100, 200],
  layout: 'total, sizes, prev, pager, next, jumper'
}

export function usePagination(_paginationData = {}) {
  const pagination = reactive(Object.assign({ ...defaultPaginationData }, _paginationData))

  const handleCurrentChange = (page) => {
    pagination.page = page
    setUrlParams({
      page,
      page_size: pagination.page_size
    })
  }

  const handleSizeChange = (page_size) => {
    pagination.page_size = page_size
    setUrlParams({
      page: pagination.page,
      page_size
    })
  }

  return { pagination, handleCurrentChange, handleSizeChange }
}
