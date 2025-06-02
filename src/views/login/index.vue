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
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formState.password"
            size="large"
            placeholder="请输入密码"
            show-password
            prefix-icon="el-icon-lock"
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import logoSrc from '@/assets/images/login/logo.png'
import { useUserStore } from '@/stores/user' // Pinia 的用户状态管理
import { setToken } from '@/utils/auth'
import { baseTitle } from '@/config'

import { getUserInfo, onUserLogin } from '@/api/login'

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

<style scoped lang="scss">
.login-container {
  align-items: center;
  background: #f0f2f5;
  background: #f0f2f5 url('@/assets/images/login/background.svg') no-repeat 50%;
  background-size: 100%;
  display: flex;
  height: 100vh;
  justify-content: center;
  min-height: 100%;
  position: relative;
  width: 100%;

  .login-card {
    border-radius: 8px;
    padding: 30px;
    padding-bottom: 0;
    width: auto;
  }

  .login-button {
    width: 100%;
  }

  .top-title {
    align-items: center;
    display: flex;
    justify-content: center;
    margin-bottom: 40px;

    h1 {
      margin: 0;
    }

    img {
      margin-right: 10px;
      width: 50px;
    }
  }

  .footer {
    bottom: 0;
    margin: 48px 0 24px;
    padding: 0 16px;
    text-align: center;
    width: 100%;

    .links {
      font-size: 14px;
      margin-bottom: 8px;

      a {
        color: rgb(0 0 0 / 45%);
        transition: all 0.3s;

        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }

    .copyright {
      color: rgb(0 0 0 / 45%);
      font-size: 14px;
    }
  }
}
</style>
