<template>
  <o-form-wrap title="API管理" @confirm="onConfirm">
    <el-form ref="ruleForm" class="w-100" :model="formData" :rules="formRules" label-position="top">
      <el-form-item label="所属分类" prop="category_id">
        <el-select v-model="formData.category_id" placeholder="请选择分类" style="width: 100%">
          <el-option v-for="item in categoryOptions" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="API名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入API名称" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="formData.description" type="textarea" placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="请求方法" prop="method">
        <el-select v-model="formData.method" placeholder="请选择请求方法" style="width: 100%">
          <el-option label="GET" value="GET" />
          <el-option label="POST" value="POST" />
          <el-option label="PUT" value="PUT" />
          <el-option label="DELETE" value="DELETE" />
        </el-select>
      </el-form-item>
      <el-form-item label="路径" prop="path">
        <el-input v-model="formData.path" placeholder="请输入路径" />
      </el-form-item>
      <el-form-item label="目标URL" prop="target_url">
        <el-input v-model="formData.target_url" placeholder="请输入目标URL" />
      </el-form-item>
      <el-form-item label="是否免费" prop="is_free">
        <el-select v-model="formData.is_free" placeholder="请选择" style="width: 100%">
          <el-option label="免费" :value="1" />
          <el-option label="付费" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="请求参数" prop="request_params">
        <el-input v-model="requestParamsStr" type="textarea" placeholder="请输入请求参数（JSON格式）" :rows="4" />
      </el-form-item>
      <el-form-item label="响应示例" prop="response_example">
        <el-input v-model="responseExampleStr" type="textarea" placeholder="请输入响应示例（JSON格式）" :rows="4" />
      </el-form-item>
      <el-form-item label="文档内容" prop="doc_content">
        <el-input v-model="formData.doc_content" type="textarea" placeholder="请输入文档内容" :rows="4" />
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
import { createApi, getApiInfo, updateApi } from '@/api/freeApi/api'
import { getAllCategories } from '@/api/freeApi/category'

const route = useRoute()
const router = useRouter()

const isEditing = ref(false)
const id = route.params.id
const categoryOptions = ref([])

isEditing.value = !!id

const ruleForm = ref(null)
const formData = reactive({
  category_id: undefined,
  name: undefined,
  description: undefined,
  method: 'GET',
  path: undefined,
  target_url: undefined,
  is_free: 1,
  request_params: undefined,
  response_example: undefined,
  doc_content: undefined,
  sort: 0,
  status: 1
})

const requestParamsStr = ref('')
const responseExampleStr = ref('')

const formRules = reactive({
  category_id: [{ required: true, message: '请选择分类', trigger: 'change' }],
  name: [{ required: true, message: '请输入API名称', trigger: 'blur' }],
  method: [{ required: true, message: '请选择请求方法', trigger: 'change' }],
  path: [{ required: true, message: '请输入路径', trigger: 'blur' }]
})

const loadCategories = async () => {
  try {
    const res = await getAllCategories()
    categoryOptions.value = res.data || []
  } catch {
    console.error('加载分类失败')
  }
}

const apiInfo = async () => {
  const info = await getApiInfo(Number(id))
  Object.assign(formData, {
    id: info.data.id,
    category_id: info.data.category_id,
    name: info.data.name,
    description: info.data.description,
    method: info.data.method,
    path: info.data.path,
    target_url: info.data.target_url,
    is_free: info.data.is_free,
    doc_content: info.data.doc_content,
    sort: info.data.sort,
    status: info.data.status
  })
  
  requestParamsStr.value = typeof info.data.request_params === 'string' 
    ? info.data.request_params 
    : JSON.stringify(info.data.request_params, null, 2)
  
  responseExampleStr.value = typeof info.data.response_example === 'string'
    ? info.data.response_example
    : JSON.stringify(info.data.response_example, null, 2)
}

const onConfirm = (loading) => {
  ruleForm.value?.validate(async (valid) => {
    if (valid) {
      loading(true)
      
      try {
        const submitData = { ...formData }
        
        if (requestParamsStr.value) {
          submitData.request_params = JSON.parse(requestParamsStr.value)
        }
        
        if (responseExampleStr.value) {
          submitData.response_example = JSON.parse(responseExampleStr.value)
        }

        if (isEditing.value) {
          await updateApi(submitData)
          ElMessage.success('编辑成功')
        } else {
          await createApi(submitData)
          ElMessage.success('添加成功')
        }

        loading(false)
        router.back()
      } catch (err) {
        loading(false)
        ElMessage.error('JSON格式错误，请检查请求参数和响应示例')
      }
    } else {
      return false
    }
  })
}

onBeforeMount(() => {
  loadCategories()
  if (isEditing.value) {
    apiInfo()
  }
})
</script>
