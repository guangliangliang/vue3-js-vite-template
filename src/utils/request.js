import axios from 'axios'

const service = axios.create({
  baseURL: '/api', // 统一接口前缀
  timeout: 5000
})

service.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
)

export default service
