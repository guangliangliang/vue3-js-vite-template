<template>
  <el-dialog v-model="visible" title="修改密码" width="500px" destroy-on-close>
    <el-form ref="passwordFormRef" :model="passwordForm" :rules="passwordRules" label-width="120px">
      <el-form-item prop="oldPassword" label="旧密码">
        <el-input
          v-model="passwordForm.oldPassword"
          type="password"
          placeholder="请输入旧密码"
          show-password
        />
      </el-form-item>
      <el-form-item prop="newPassword" label="新密码">
        <el-input
          v-model="passwordForm.newPassword"
          type="password"
          placeholder="请输入新密码"
          show-password
        />
      </el-form-item>
      <el-form-item prop="confirmPassword" label="确认新密码">
        <el-input
          v-model="passwordForm.confirmPassword"
          type="password"
          placeholder="请再次输入新密码"
          show-password
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleChangePassword" :loading="changingPassword">
          确认修改
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineExpose } from 'vue'
import { changePassword } from '@/api/login'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'

// 组件的可见性
const visible = ref(false)
const passwordFormRef = ref()
const changingPassword = ref(false)
const userStore = useUserStore()
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 表单验证规则
const passwordRules = ref({
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '新密码长度不能少于6个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.value.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

// 打开修改密码弹窗
const open = () => {
  visible.value = true
}

// 关闭修改密码弹窗
const close = () => {
  visible.value = false
  resetForm()
}

// 取消修改
const handleCancel = () => {
  close()
}

// 重置表单
const resetForm = () => {
  passwordForm.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
  if (passwordFormRef.value) {
    passwordFormRef.value.resetFields()
  }
}

// 提交修改密码
const handleChangePassword = () => {
  if (!passwordFormRef.value) return
  passwordFormRef.value.validate(async (valid) => {
    if (!valid) return
    changingPassword.value = true
    try {
      const { oldPassword, newPassword } = passwordForm.value
      const res = await changePassword({ oldPassword, newPassword })
      if (res.code === 200) {
        ElMessage.success('密码修改成功')
        close()
        userStore.onLogout()
      } else {
        ElMessage.error(res.message || '密码修改失败')
      }
    } catch {
      ElMessage.error('密码修改失败')
    } finally {
      changingPassword.value = false
    }
  })
}

// 暴露方法给父组件
defineExpose({
  open,
  close
})
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
