// 密码验证规则配置

// 密码强度验证：必须包含数字、字母、符号中的至少两种，长度最少8位
export const validatePassword = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入密码'))
    return
  }

  // 长度验证
  if (value.length < 8) {
    callback(new Error('密码长度不能少于8个字符'))
    return
  }

  // 密码强度验证：数字、字母、符号中的至少两种
  let hasNumber = /\d/.test(value)
  let hasLetter = /[a-zA-Z]/.test(value)
  let hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value)

  let validCount = 0
  if (hasNumber) validCount++
  if (hasLetter) validCount++
  if (hasSymbol) validCount++

  if (validCount < 2) {
    callback(new Error('密码必须包含数字、字母、符号中的至少两种'))
    return
  }

  callback()
}

// 统一的密码验证规则
export const passwordRules = {
  required: true,
  validator: validatePassword,
  trigger: 'blur'
}

// 确认密码验证规则
export const confirmPasswordRules = (passwordField) => {
  return {
    required: true,
    validator: (rule, value, callback) => {
      if (!value) {
        callback(new Error('请确认密码'))
        return
      }
      if (value !== passwordField.value) {
        callback(new Error('两次输入的密码不一致'))
        return
      }
      callback()
    },
    trigger: 'blur'
  }
}
