import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth'
// 状态码提示信息映射表
const codeMessage = {
  400: '请求错误',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求地址不存在',
  408: '请求超时',
  500: '服务器内部错误',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时'
}

export const baseURL = import.meta.env.VITE_APP_API_BASEURL

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 环境变量
  timeout: 10000, // 超时设置
  withCredentials: true
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    ElMessage.error('请求发送失败')
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 处理 Blob 类型（如文件下载）
    if (response.config.responseType === 'blob') {
      return response
    }

    const res = response.data

    // 假设后端返回格式统一为 { code, message, data }
    if (res.code !== 200) {
      ElMessage.error(res.message || '请求失败')
      return Promise.reject(res)
    }

    return res
  },
  (error) => {
    if (error.response) {
      const msg = codeMessage[error.response.status] || '请求失败'
      ElMessage.error(msg)
    } else if (error.code === 'ECONNABORTED') {
      ElMessage.error('请求超时')
    } else {
      ElMessage.error(error.message || '未知错误')
    }

    return Promise.reject(error)
  }
)

// 通用方法
const get = (url, params = {}, config = {}) => {
  return service.get(url, { params, ...config })
}

const post = (url, data = {}, config = {}) => {
  return service.post(url, data, config)
}

const put = (url, data = {}, config = {}) => {
  return service.put(url, data, config)
}

const del = (url, params = {}, config = {}) => {
  return service.delete(url, { params, ...config })
}

export default service
export { get, post, put, del }
