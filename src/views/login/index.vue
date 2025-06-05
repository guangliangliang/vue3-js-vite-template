<template>
  <div class="login-container">
    <LoginForm
      v-if="isLogin"
      class="p-20px h-auto m-auto lt-xl:rounded-3xl lt-xl:light:bg-white"
      @to-register="toRegister"
    />
    <RegisterForm
      v-else
      class="p-20px h-auto m-auto lt-xl:rounded-3xl lt-xl:light:bg-white"
      @to-login="toLogin"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { LoginForm, RegisterForm } from './components'
const isLogin = ref(true)
const toRegister = () => {
  isLogin.value = false
}

const toLogin = () => {
  isLogin.value = true
}
</script>
<style lang="scss">
.login-container {
  align-items: center;
  background: #f0f2f5 url('@/assets/images/login/background.svg') no-repeat 50%;
  background-position: top center;
  background-size: cover;
  background-size: contain;
  display: flex;
  height: 100vh;
  justify-content: center;
  min-height: 100%;
  padding: 20px;
  position: relative;
  width: 100%;

  .login-card {
    border-radius: 8px;
    max-width: 420px;
    padding: 30px 24px;
    width: 100%;
  }

  .login-button {
    margin-bottom: 18px;
    width: 100%;
  }

  .login-two-button {
    margin: 0;
    width: 100%;
  }

  .top-title {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 40px;
    text-align: center;

    h1 {
      font-size: 24px;
      margin: 0;
    }

    img {
      margin-right: 10px;
      width: 40px;
    }
  }

  .footer {
    bottom: 0;
    color: rgb(0 0 0 / 45%);
    margin: 48px 0 0;
    padding: 0 16px;
    text-align: center;
    width: 100%;

    .links {
      font-size: 14px;
      margin-bottom: 8px;

      a {
        transition: all 0.3s;

        &:not(:last-child) {
          margin-right: 20px;
        }
      }
    }

    .copyright {
      font-size: 14px;
    }
  }
}

html.dark {
  .footer {
    color: white !important;
  }
}

/* 移动端适配 */
@media screen and (width <= 600px) {
  .login-container {
    background-position: top center;
    background-size: contain;
    padding: 10px;

    .login-card {
      padding: 24px 16px;
    }

    .top-title {
      h1 {
        font-size: 20px;
      }
    }

    .footer {
      margin: 32px 0 16px;

      .links {
        font-size: 12px;

        a {
          margin-right: 12px;
        }
      }

      .copyright {
        font-size: 12px;
      }
    }
  }
}
</style>
