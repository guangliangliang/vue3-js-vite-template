<template>
  <o-table ref="tableRef" :table-config="tableConfig">
    <template #status_display="{ row }">
      <el-tag :type="row['status'] === 'enable' ? 'success' : 'danger'">
        {{ row.status_display }}
      </el-tag>
    </template>

    <template #table-top>
      <el-button type="primary" @click="handleAdd">添加</el-button>
    </template>
  </o-table>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'
import { useDelete } from '@/hooks'
import { Api } from '@/api/common'
import { deleteRole } from '@/api/system/role'

const tableRef = ref(null)

const handleAdd = () => {
  router.push('/system/role/add')
}

const handleDelete = (id) => {
  const { onDelete } = useDelete()
  onDelete(deleteRole, id, tableRef)
}

const tableConfig = {
  api: Api.role,
  headers: [
    {
      prop: 'name',
      label: '角色名称'
    },
    {
      prop: 'desc',
      label: '描述'
    },
    {
      prop: 'count',
      label: '数量'
    },
    {
      prop: 'status_display',
      slot: 'status_display',
      label: '状态'
    },
    {
      prop: 'createTime',
      label: '创建时间'
    }
  ],
  operations: {
    width: 115,
    buttons: [
      {
        text: '编辑',
        show: true,
        click: ({ row }) => {
          router.push(`/system/role/edit/${row.id}`)
        }
      },
      ({ row }) => {
        return {
          text: '删除',
          type: 'danger',
          show: true, // 若有权限控制，可用 row.acl.delete 替代
          click: () => {
            handleDelete(row.id)
          }
        }
      }
    ]
  }
}
</script>
