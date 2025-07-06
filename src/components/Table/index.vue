<template>
  <o-search :loading="loading" @search="submitSearch" />

  <el-card element-loading-text="玩命加载中...">
    <div class="table-top-bar">
      <slot name="table-top" />
    </div>

    <el-table :data="tableData" border v-bind="$attrs">
      <!-- 表格复选框 -->
      <el-table-column v-if="tableConfig.selection" type="selection" width="55" reserve-selection />

      <!-- 表格索引 -->
      <el-table-column v-if="tableConfig.index" type="index" width="55" label="序号" />

      <el-table-column
        v-for="item in tableConfig.headers"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        show-overflow-tooltip
        :sortable="item.sortable"
        :min-width="item.width ? item.width : ''"
      >
        <template #default="scope">
          <!-- 插槽渲染 -->
          <slot v-if="item.slot" :row="scope.row" :name="item.slot" />

          <template v-else>
            <span v-if="scope.row[item.prop] === ''"> - </span>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </template>
      </el-table-column>

      <!-- 操作列 -->
      <el-table-column
        v-if="tableConfig.operations?.buttons"
        :fixed="tableConfig.operations.fixed || 'right'"
        :width="tableConfig.operations.width"
      >
        <template #header>
          <span>操作</span>
        </template>
        <template #default="scope">
          <template v-for="btn in tableConfig.operations.buttons" :key="btn.text">
            <template v-if="isFunction(btn)">
              <div v-if="btn(scope).show" class="operation-link">
                <el-link
                  :underline="false"
                  :type="btn(scope).type || 'primary'"
                  @click.stop="btn(scope).click(scope)"
                >
                  {{ btn(scope).text }}
                </el-link>
              </div>
            </template>
            <template v-else>
              <el-link
                v-if="btn.show"
                class="operation-link"
                :underline="false"
                :type="btn.type || 'primary'"
                @click.stop="btn.click(scope)"
              >
                {{ btn.text }}
              </el-link>
            </template>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="pagination.page"
      v-model:page-size="pagination.page_size"
      class="pagination-wrapper"
      :page-sizes="pagination.sizes"
      :layout="pagination.layout"
      :total="pagination.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { isFunction } from '@/utils/types'

import { useRoute } from 'vue-router'
import { usePagination, useTable } from '@/hooks'
import { getTableData } from '@/api/common'
import { useSearchStore } from '@/stores'

defineOptions({
  name: 'OTable',
  inheritAttrs: true
})

const props = defineProps({
  tableConfig: {
    type: Object,
    required: true
  }
})

const route = useRoute()
const searchStore = useSearchStore()
const { pagination: pager } = usePagination()

let searchData = { ...props.tableConfig.params }

const { loading, tableData, pagination, loadData, handleSizeChange, handleCurrentChange } =
  useTable(getTableData, {
    api: props.tableConfig.api,
    params: searchData,
    immediate: false
  })

const searchReady = computed(() => searchStore.searchReady)

const submitSearch = (search) => {
  searchData = {
    page: 1,
    page_size: pagination.page_size,
    ...search
  }
  loadData(searchData)
}

const dispatchLoad = () => {
  loadData(
    Object.assign(searchData, {
      page: pagination.page,
      page_size: pagination.page_size
    })
  )
}

onMounted(() => {
  const query = route.query
  pagination.page = Number(query.page) || pager.page
  pagination.page_size = Number(query.page_size) || pager.page_size

  Object.assign(searchData, {
    page: pagination.page,
    page_size: pagination.page_size
  })
  searchStore.getSearchList()
})

watch([() => pagination.page, () => pagination.page_size], dispatchLoad)
watch(
  () => searchReady.value,
  (val) => {
    console.log(val, 'valvalval')
    if (val) {
      dispatchLoad()
    }
  }
)

defineExpose({
  dispatchLoad
})
</script>
<style lang="scss" scoped>
.table-top-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.operation-link {
  display: inline-block;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.pagination-wrapper {
  margin-top: 1.25rem;
}
</style>
