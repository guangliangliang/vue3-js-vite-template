export const elv = {
  /**
   * @description 手机号校验
   * @param {boolean} required 是否必填
   * @param {string} msg 自定义提示
   * @returns {Function} 表单校验函数
   */
  isMobile(required = true, msg = '请输入手机号') {
    const mobileReg = /^1[3-9]\d{9}$/ // 简单的中国大陆手机号校验

    return function (rule, value, callback) {
      if (required) {
        if (!value) {
          return callback(new Error(msg))
        } else if (!mobileReg.test(String(value))) {
          return callback(new Error('请输入正确的手机号'))
        }
        return callback()
      }

      if (!value) {
        return callback()
      } else if (!mobileReg.test(String(value))) {
        return callback(new Error('请输入正确的手机号'))
      }
      return callback()
    }
  },

  /**
   * @description 身份证号校验（中国大陆第二代身份证）
   * @returns {Function} 表单校验函数
   */
  isIdCard() {
    const idCardReg = /^[1-9]\d{5}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/

    return function (rule, value, callback) {
      if (!value) {
        return callback(new Error('请输入身份证号'))
      } else if (!idCardReg.test(value)) {
        return callback(new Error('请输入正确的身份证号'))
      }
      return callback()
    }
  }
}
