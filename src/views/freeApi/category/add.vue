<template>
  <o-form-wrap title="分类管理" @confirm="onConfirm">
    <el-form ref="ruleForm" class="w-100" :model="formData" :rules="formRules" label-position="top">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入分类名称" />
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="formData.icon" placeholder="请输入图标" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="formData.sort" :min="0" placeholder="请输入排序" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="formData.status" placeholder="请选择状态" style="width: 100%">
          <el-option label="启用" :value="1" />
          <el-option label="禁用" :value="0" />
        </el-select>
      </el-form-item>
    </el-form>
  </o-form-wrap>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { createCategory, getCategoryInfo, updateCategory } from '@/api/freeApi/category'

const route = useRoute()
const router = useRouter()

const isEditing = ref(false)
const id = route.params.id

isEditing.value = !!id

const ruleForm = ref(null)
const formData = reactive({
  name: undefined,
  icon: undefined,
  sort: 0,
  status: 1
})

const formRules = reactive({
  name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
  sort: [{ required: true, message: '请输入排序', trigger: 'blur' }]
})

const categoryInfo = async () => {
  const info = await getCategoryInfo(Number(id))
  Object.assign(formData, {
    id: info.data.id,
    name: info.data.name,
    icon: info.data.icon,
    sort: info.data.sort,
    status: info.data.status
  })
}

const onConfirm = (loading) => {
  ruleForm.value?.validate(async (valid) => {
    if (valid) {
      loading(true)

      if (isEditing.value) {
        await updateCategory(formData)
        ElMessage.success('编辑成功')
      } else {
        await createCategory(formData)
        ElMessage.success('添加成功')
      }

      loading(false)
      router.back()
    } else {
      return false
    }
  })
}

onBeforeMount(() => {
  if (isEditing.value) {
    categoryInfo()
  }
})
</script>
