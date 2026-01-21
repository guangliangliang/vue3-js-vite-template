<template>
  <o-form-wrap title="用户管理" @confirm="onConfirm">
    <el-form
      ref="ruleForm"
      class="form-w-70"
      :model="formData"
      :rules="formRules"
      label-position="top"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formData.phone" placeholder="请输入手机号" :disabled="isEditing" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" placeholder="邮箱" :disabled="isEditing" />
      </el-form-item>
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" placeholder="请输入姓名" :disabled="isEditing" />
      </el-form-item>

      <el-form-item v-if="!isEditing" label="密码" prop="password">
        <el-input
          v-model="formData.password"
          show-password
          type="password"
          placeholder="请输入默认密码"
        />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <o-select v-model="formData.gender" :options="genderOptions" placeholder="请选择性别" />
      </el-form-item>
      <el-form-item label="所属角色：" prop="roleId">
        <o-select
          v-model="formData.roleId"
          :options="roleOptions"
          option-key="role_option"
          placeholder="请选择所属角色"
        />
      </el-form-item>
      <el-form-item label="用户头像：" v-if="false">
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
const genderOptions = computed(() => userStore.genders)
// 引用表单 & 上传组件
const ruleForm = ref()
const upload = ref()

// 表单数据
const formData = reactive({
  username: undefined,
  password: undefined,
  avatar: undefined,
  phone: undefined,
  email: undefined,
  roleId: undefined
})

// 表单校验规则
const formRules = reactive({
  username: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
  phone: [{ required: true, validator: elv.isMobile(), trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  password: [{ required: true, message: '请输入默认密码', trigger: 'blur' }],
  roleId: [{ required: true, message: '请选择用户角色', trigger: 'change' }]
})

// 上传配置
const headers = {
  'X-TOKEN': getToken()
}

// 获取用户详情（编辑时调用）
const userInfo = async () => {
  const info = await getUserInfo(`${id}`)
  console.log(info, 'infoinfo')
  const { username, email, gender, phone, roleId } = info.data

  Object.assign(formData, {
    id: info.data.id,
    email,
    username,
    gender,
    phone,
    roleId
  })
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
