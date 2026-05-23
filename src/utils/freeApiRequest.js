import axios from 'axios'
import { ElMessage } from 'element-plus'

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

const service = axios.create({
  baseURL: import.meta.env.VITE_FREE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    ElMessage.error('请求发送失败')
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    if (response.config.responseType === 'blob') {
      return response
    }

    const res = response.data

    if (res.code !== 200) {
      ElMessage.error(res.message || '请求失败')
      return Promise.reject(res)
    }

    return res
  },
  (error) => {
    if (error.response) {
      const status = error.response.status
      // 优先检查响应数据中是否有 message 字段
      if (error.response.data && error.response.data.message) {
        ElMessage.error(error.response.data.message)
      } else {
        const msg = codeMessage[status] || '请求失败'
        ElMessage.error(msg)
      }
    } else if (error.code === 'ECONNABORTED') {
      ElMessage.error('请求超时')
    } else {
      ElMessage.error(error.message || '未知错误')
    }

    return Promise.reject(error)
  }
)

const get = (url, params = {}, config = {}) => {
  return service.get(url, { params, ...config })
}

const post = (url, data = {}, config = {}) => {
  return service.post(url, data, config)
}

const put = (url, data = {}, config = {}) => {
  return service.put(url, data, config)
}

const patch = (url, data = {}, config = {}) => {
  return service.patch(url, data, config)
}

const del = (url, params = {}, config = {}) => {
  return service.delete(url, { params, ...config })
}

export default service
export { get, post, put, patch, del }
