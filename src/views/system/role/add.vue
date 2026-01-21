<template>
  <o-form-wrap title="角色管理" @confirm="onConfirm">
    <el-form ref="ruleForm" class="w-100" :model="formData" :rules="formRules" label-position="top">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色描述：" prop="description">
        <el-input v-model="formData.description" placeholder="请输入角色描述" />
      </el-form-item>
    </el-form>
  </o-form-wrap>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { createRole, getRoleInfo, updateRole } from '@/api/system/role'

const route = useRoute()
const router = useRouter()

const isEditing = ref(false)
const id = route.params.id

isEditing.value = !!id

const ruleForm = ref(null)
const formData = reactive({
  name: undefined,
  description: undefined
})

const formRules = reactive({
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  description: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
})

const roleInfo = async () => {
  const info = await getRoleInfo(Number(id))
  Object.assign(formData, {
    id: info.data.id,
    name: info.data.name,
    description: info.data.description
  })
}

// onConfirm 是 o-form-wrap 组件触发的提交事件
const onConfirm = (loading) => {
  ruleForm.value?.validate(async (valid) => {
    if (valid) {
      loading(true)

      if (isEditing.value) {
        await updateRole(formData)
        ElMessage.success('编辑成功')
      } else {
        await createRole(formData)
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
    roleInfo()
  }
})
</script>
