<template>
  <el-card element-loading-text="玩命加载中...">
    <div class="table-top-bar">
      <div class="search-bar">
        <el-input v-model="searchForm.keyword" placeholder="请输入分类名称" clearable style="width: 200px; margin-right: 10px" />
        <el-button type="primary" @click="loadData">搜索</el-button>
        <el-button @click="resetSearch">重置</el-button>
      </div>
      <el-button type="primary" @click="handleAdd">添加</el-button>
    </div>

    <el-table :data="tableData" border>
      <el-table-column type="index" width="55" label="序号" />
      <el-table-column prop="name" label="分类名称" show-overflow-tooltip />
      <el-table-column prop="icon" label="图标" show-overflow-tooltip />
      <el-table-column prop="sort" label="排序" />
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'danger'">
            {{ row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" show-overflow-tooltip />
      <el-table-column fixed="right" width="150" label="操作">
        <template #default="{ row }">
          <el-link type="primary" :underline="false" @click="handleEdit(row)">编辑</el-link>
          <el-link type="danger" :underline="false" @click="handleDelete(row)" style="margin-left: 10px">删除</el-link>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="pagination.page"
      v-model:page-size="pagination.pageSize"
      class="pagination-wrapper"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      @size-change="loadData"
      @current-change="loadData"
    />
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import router from '@/router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCategoryList, deleteCategory } from '@/api/freeApi/category'

const tableData = ref([])
const searchForm = ref({
  keyword: ''
})
const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 0
})

const loadData = async () => {
  try {
    const params = {
      page: pagination.value.page,
      pageSize: pagination.value.pageSize
    }
    if (searchForm.value.keyword) {
      params.keyword = searchForm.value.keyword
    }
    const res = await getCategoryList(params)
    tableData.value = res.data.list
    pagination.value.total = res.data.total
  } catch (err) {
    console.error(err)
  }
}

const resetSearch = () => {
  searchForm.value.keyword = ''
  pagination.value.page = 1
  loadData()
}

const handleAdd = () => {
  router.push('/freeApi/category/add')
}

const handleEdit = (row) => {
  router.push(`/freeApi/category/edit/${row.id}`)
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定要删除该分类吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await deleteCategory(row.id)
    ElMessage.success('删除成功')
    loadData()
  }).catch(() => {})
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
.table-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.search-bar {
  display: flex;
  align-items: center;
}

.pagination-wrapper {
  margin-top: 1.25rem;
  display: flex;
  justify-content: flex-end;
}
</style>
