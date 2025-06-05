<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <div class="top-title">
        <img :src="logoSrc" />
        <h1 v-text="baseTitle" />
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
        <el-form-item>
          <el-button
            size="large"
            type="primary"
            class="login-button"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
            @click="handleFinish"
          >
            登录
          </el-button>
          <el-button size="large" class="login-two-button" @click="toRegister"> 注册 </el-button>
        </el-form-item>
      </el-form>
      <div class="footer">
        <div class="links">
          <a href="#">帮助</a>
          <a href="#">隐私</a>
          <a href="#">条款</a>
        </div>
        <div class="copyright">Copyright &copy;@2025 科技有限公司 管理系统服务</div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, defineEmits, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import logoSrc from '@/assets/images/login/logo.png'
import { useUserStore } from '@/stores/user' // Pinia 的用户状态管理
import { setToken } from '@/utils/auth'
import { baseTitle } from '@/config'

import { getUserInfo, onUserLogin } from '@/api/login'
const emit = defineEmits(['to-register'])
const router = useRouter()
const userStore = useUserStore()
const formRef = ref()

const formState = reactive({
  username: '',
  password: ''
})

const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const state = reactive({
  loginBtn: false
})

function onDispatchInfo(values) {
  values.username = values.username.trim()
  values.password = values.password.trim()
}

function toRegister() {
  emit('to-register')
}

function handleFinish() {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (!valid) return
    state.loginBtn = true
    onDispatchInfo(formState)
    try {
      const res = await onUserLogin(formState)
      console.log(res, 'resres')
      if (res.code === 200) {
        router.push('/home')
        state.loginBtn = false
        ElMessage.success('登录成功')
        setToken(`Bearer ${res.data}`)
        const userRes = await getUserInfo({ user_id: res.data })
        if (userRes.code === 200) {
          userStore.updateUser(userRes.data)
        }
      } else {
        state.loginBtn = false
      }
    } catch {
      state.loginBtn = false
    }
  })
}
</script>
