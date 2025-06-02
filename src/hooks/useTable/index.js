import { ref } from 'vue'
import { usePagination } from '../usePagination'

export function useTable(getTableDataFun, options) {
  const loading = ref(false)
  const tableData = ref([])
  const { immediate = true, params = {}, api } = options
  const { pagination, handleCurrentChange, handleSizeChange } = usePagination()

  const loadData = async (_params = {}) => {
    // 更新分页数据
    pagination.page = _params.page
    pagination.page_size = _params.page_size

    if (process.env.NODE_ENV !== 'production' && !api) {
      console.error('请求 url 为空')
      return
    }

    try {
      loading.value = true
      const res = await getTableDataFun(api, _params)
      loading.value = false
      console.log(res.data.list, 'res.data.list')

      tableData.value = res.data.list
      pagination.total = res.data.total
    } catch (err) {
      console.log(err)
      loading.value = false
    }
  }

  if (immediate) {
    loadData(params)
  }

  return {
    loading,
    tableData,
    pagination,
    loadData,
    handleSizeChange,
    handleCurrentChange
  }
}
