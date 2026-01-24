<template>
  <div class="profile-container">
    <h1 class="page-title">个人中心</h1>
    <el-card shadow="hover" class="profile-card">
      <el-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        label-width="120px"
        @submit.prevent="handleUpdate"
      >
        <el-form-item prop="username" label="用户名">
          <el-input v-model="formState.username" placeholder="请输入用户名" disabled />
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="formState.email" placeholder="请输入邮箱" disabled />
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="formState.phone" placeholder="请输入手机号" disabled />
        </el-form-item>
        <el-form-item prop="gender" label="性别">
          <el-select v-model="formState.gender" placeholder="请选择性别">
            <el-option label="男" value="male" />
            <el-option label="女" value="female" />
          </el-select>
        </el-form-item>
        <el-form-item prop="avatar" label="头像">
          <el-upload
            class="avatar-uploader"
            :action="IMAGE_UPLOAD"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="formState.avatar" :src="formState.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpdate" :loading="loading">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getCurrentUserInfo, updateUserInfo } from '@/api/login'
import { Plus } from '@element-plus/icons-vue'
import { IMAGE_UPLOAD } from '@/config'
import { useUserStore } from '@/stores'
const formRef = ref()
const loading = ref(false)
const userStore = useUserStore()
const formState = reactive({
  username: '',
  email: '',
  phone: '',
  gender: '',
  avatar: ''
})

const rules = reactive({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^\d{6,15}$/, message: '请输入有效的手机号', trigger: ['blur', 'change'] }
  ],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }]
})

// 获取用户信息
const getUserInfo = async () => {
  try {
    const res = await getCurrentUserInfo()
    if (res.code === 200) {
      const { username, email, phone, gender, avatar } = res.data
      Object.assign(formState, { username, email, phone, gender, avatar })
    }
  } catch {
    ElMessage.error('获取用户信息失败')
  }
}

// 处理头像上传成功
const handleAvatarSuccess = (response) => {
  if (response.code === 200) {
    formState.avatar = response.data.url
    ElMessage.success('头像上传成功')
  } else {
    ElMessage.error('头像上传失败')
  }
}

// 上传前验证
const beforeAvatarUpload = (rawFile) => {
  const isJPG = rawFile.type === 'image/jpeg' || rawFile.type === 'image/png'
  const isLt2M = rawFile.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('只能上传 JPG/PNG 格式的图片')
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB')
  }
  return isJPG && isLt2M
}

// 更新用户信息
const handleUpdate = () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    try {
      const res = await updateUserInfo(formState)
      if (res.code === 200) {
        ElMessage.success('更新成功')
        userStore.updateUser(res.data)
      } else {
        ElMessage.error('更新失败')
      }
    } catch {
      ElMessage.error('更新失败')
    } finally {
      loading.value = false
    }
  })
}

onMounted(() => {
  getUserInfo()
})
</script>

<style lang="scss" scoped>
.profile-container {
  padding: 20px;
  .page-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .profile-card {
    max-width: 800px;
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  width: 178px;
  height: 178px;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: var(--el-text-color-placeholder);
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
