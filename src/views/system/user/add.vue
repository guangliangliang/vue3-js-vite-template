<template>
  <o-form-wrap title="用户管理" @confirm="onConfirm">
    <el-form
      ref="ruleForm"
      class="form-w-70"
      :model="formData"
      :rules="formRules"
      label-position="top"
    >
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="formData.mobile" placeholder="请输入手机号" :disabled="isEditing" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formData.name" placeholder="请输入姓名" />
      </el-form-item>

      <el-form-item v-if="!isEditing" label="默认密码" prop="password">
        <el-input v-model="formData.password" type="password" placeholder="请输入默认密码" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="formData.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所属角色：" prop="role_ids">
        <o-select
          v-model="formData.role_ids"
          multiple
          :options="roleOptions"
          option-key="role_option"
          placeholder="请选择所属角色"
        />
      </el-form-item>
      <el-form-item label="用户头像：">
        <el-upload
          ref="upload"
          class="upload-wrapper"
          :action="`${baseURL}/file/upload`"
          :headers="headers"
          :limit="1"
          :show-file-list="false"
          :on-success="onAvatarSuccess"
          :on-exceed="onExceed"
        >
          <img v-if="formData.avatar" :src="formData.avatar" class="avatar" />
          <BaseIcon :icon="'Plus'" v-else />
        </el-upload>
      </el-form-item>
    </el-form>
  </o-form-wrap>
</template>

<script setup>
import { ref, reactive, onBeforeMount, computed } from 'vue'
import { ElMessage, genFileId } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

import { baseURL } from '@/utils/request'
import { useUserStore } from '@/stores'
import { createUser, getUserInfo, updateUser } from '@/api/system/user'
import { getToken } from '@/utils/auth'
import { elv } from '@/utils/elValidation'

// 路由 & 用户 store
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 当前是否为编辑模式
const id = route.params.id
const isEditing = computed(() => !!id)
const roleOptions = computed(() => userStore.roles)
window.userStore = userStore
// 引用表单 & 上传组件
const ruleForm = ref()
const upload = ref()

// 表单数据
const formData = reactive({
  sex: '男',
  name: '',
  avatar: '',
  mobile: '',
  password: '',
  role_ids: []
})

// 表单校验规则
const formRules = reactive({
  name: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
  mobile: [{ required: true, validator: elv.isMobile(), trigger: 'blur' }],
  password: [{ required: true, message: '请输入默认密码', trigger: 'blur' }],
  role_ids: [{ required: true, message: '请选择用户角色', trigger: 'change' }]
})

// 上传配置
const headers = {
  'X-TOKEN': getToken()
}

// 获取用户详情（编辑时调用）
const userInfo = async () => {
  const info = await getUserInfo(`${id}`)
  console.log(info, 'infoinfo')

  Object.assign(formData, info.data)
}

// 上传成功
const onAvatarSuccess = (response) => {
  formData.avatar = response.data.url
}

// 文件超出限制时替换上传
const onExceed = (files, uploadFiles) => {
  upload.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  upload.value.handleStart(file)

  const fileRaw = uploadFiles[0].raw
  formData.avatar = URL.createObjectURL(fileRaw)
  upload.value.submit()
}

// 提交表单
const onConfirm = () => {
  ruleForm.value.validate(async (valid) => {
    if (valid) {
      if (isEditing.value) {
        await updateUser(formData)
        ElMessage.success('编辑成功')
        if (userStore.user.id === formData.id) {
          userStore.getUser()
        }
      } else {
        await createUser(formData)
        ElMessage.success('添加成功')
      }
      router.back()
    }
  })
}

// 组件加载时获取数据
onBeforeMount(() => {
  if (isEditing.value) userInfo()
})
</script>

<style lang="scss" scoped>
.form-w-70 {
  width: 70%;
}

.upload-wrapper {
  align-items: center;
  border: 1px dashed var(--el-color-border);
  border-radius: 0.375rem;
  display: flex;
  height: 8.75rem;
  justify-content: center;
  width: 8.75rem;
}

.avatar {
  max-height: 100%;
  max-width: 100%;
  object-fit: cover;
}
</style>
