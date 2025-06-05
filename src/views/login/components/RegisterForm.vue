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
import { reactive, defineEmits, ref } from 'vue'
import { ElMessage } from 'element-plus'

import { onUserRegister } from '@/api/login'
const emit = defineEmits(['to-login'])

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

const toLogin = () => {
  emit('to-login')
}

function handleFinish() {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (!valid) return
    state.loginBtn = true
    onDispatchInfo(formState)
    try {
      const res = await onUserRegister(formState)
      if (res.code === 200) {
        ElMessage.success('注册成功')
      } else {
        state.loginBtn = false
      }
    } catch {
      state.loginBtn = false
    }
  })
}
</script>
