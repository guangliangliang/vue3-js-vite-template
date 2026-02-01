<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <div class="top-title">
        <h3 v-text="'注册用户'" />
      </div>
      <el-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        label-width="80px"
        @submit.prevent="handleFinish"
      >
        <el-form-item prop="username" label="用户名">
          <el-input v-model="formState.username" placeholder="请输入用户名" prefix-icon="user" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="formState.password"
            placeholder="请输入密码"
            show-password
            prefix-icon="lock"
          />
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="formState.phone" placeholder="请输入手机号" prefix-icon="phone" />
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="formState.email" placeholder="请输入邮箱" prefix-icon="message" />
        </el-form-item>
        <el-form-item prop="gender" label="性别">
          <o-select v-model="formState.gender" :options="genderOptions" placeholder="请选择性别" />
        </el-form-item>
        <el-form-item prop="roleId" label="角色">
          <o-select v-model="formState.roleId" :options="roleOptions" placeholder="请选择角色" />
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
        <el-form-item label-width="0px">
          <el-button
            type="primary"
            class="login-button"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
            @click="handleFinish"
          >
            注册
          </el-button>
          <el-button class="login-two-button" @click="toLogin"> 已有账号？去登录 </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, defineEmits, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import { onUserRegister } from '@/api/login'
import { DEV_FLAG, IMAGE_UPLOAD } from '@/config'
import { passwordRules } from '../config'
const emit = defineEmits(['to-login'])
const userStore = useUserStore()
const formRef = ref()
const genderOptions = computed(() => userStore.genders)
const roleOptions = computed(() => userStore.roles)

const formState = reactive(
  DEV_FLAG
    ? {
        username: 'wx',
        email: '17600498921@163.com',
        phone: 17600498911,
        gender: 'male',
        password: '123456',
        roleId: '',
        avatar: ''
      }
    : {
        username: undefined,
        email: undefined,
        phone: undefined,
        gender: undefined,
        password: undefined,
        roleId: undefined,
        avatar: undefined
      }
)

const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^\d{6,15}$/, message: '请输入有效的手机号', trigger: ['blur', 'change'] }
  ],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
  password: [passwordRules],
  avatar: [
    { type: 'url', message: '请输入有效的URL地址', trigger: ['blur', 'change'], required: false }
  ]
})

const state = reactive({
  loginBtn: false
})

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

function onDispatchInfo(values) {
  const normalize = (v) => {
    if (typeof v !== 'string') return v
    const t = v.trim()
    return t === '' ? undefined : t
  }

  const { username, email, phone, gender, password, roleId, avatar } = values || {}
  return {
    username: normalize(username),
    email: normalize(email),
    phone: normalize(phone),
    gender: normalize(gender),
    password: normalize(password),
    roleId: normalize(roleId),
    avatar: normalize(avatar)
  }
}

const toLogin = () => {
  emit('to-login')
}

function handleFinish() {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (!valid) return
    state.loginBtn = true
    const params = onDispatchInfo(formState)
    try {
      const res = await onUserRegister(params)
      if (res.code === 200) {
        ElMessage.success('注册成功')
      }
      state.loginBtn = false
    } catch {
      state.loginBtn = false
    }
  })
}

onMounted(() => {
  userStore.getGenderData()
  userStore.getRoleOptions()
})
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: var(--el-text-color-placeholder);
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
