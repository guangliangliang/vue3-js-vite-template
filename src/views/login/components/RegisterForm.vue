<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <div class="top-title">
        <h3 v-text="'注册'" />
      </div>
      <el-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        label-width="0px"
        @submit.prevent="handleFinish"
      >
        <el-form-item prop="username">
          <el-input
            v-model="formState.username"
            size="large"
            placeholder="请输入用户名"
            prefix-icon="user"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formState.password"
            size="large"
            placeholder="请输入密码"
            show-password
            prefix-icon="lock"
          />
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            v-model="formState.phone"
            size="large"
            placeholder="请输入手机号"
            prefix-icon="phone"
          />
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            v-model="formState.email"
            size="large"
            placeholder="请输入邮箱"
            prefix-icon="message"
          />
        </el-form-item>
        <el-form-item prop="gender">
          <o-select v-model="formState.gender" :options="genderOptions" placeholder="请选择性别" />
        </el-form-item>
        <el-form-item>
          <el-button
            size="large"
            type="primary"
            class="login-button"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
            @click="handleFinish"
          >
            注册
          </el-button>
          <el-button size="large" class="login-two-button" @click="toLogin">
            已有账号？去登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, defineEmits, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import { onUserRegister } from '@/api/login'
import { DEV_FLAG } from '@/config'
const emit = defineEmits(['to-login'])
const userStore = useUserStore()
const formRef = ref()
const genderOptions = computed(() => userStore.genders)

const formState = reactive(
  DEV_FLAG
    ? {
        username: 'wx',
        email: '17600498921@163.com',
        phone: 17600498911,
        gender: 'male',
        password: '123456'
      }
    : {
        username: undefined,
        email: undefined,
        phone: undefined,
        gender: undefined,
        password: undefined
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
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const state = reactive({
  loginBtn: false
})

function onDispatchInfo(values) {
  const normalize = (v) => {
    if (typeof v !== 'string') return v
    const t = v.trim()
    return t === '' ? undefined : t
  }

  const { username, email, phone, gender, password } = values || {}
  return {
    username: normalize(username),
    email: normalize(email),
    phone: normalize(phone),
    gender: normalize(gender),
    password: normalize(password)
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
})
</script>
