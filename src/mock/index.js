import Mock from 'mockjs'

Mock.mock('/login', 'post', {
  code: 200,
  message: 'OK',
  data: 'token'
})
Mock.mock('/user', 'get', {
  code: 200,
  message: 'OK',
  data: {
    name: 'admin'
  }
})
Mock.mock('/logout', 'get', {
  code: 200,
  message: 'OK',
  data: true
})
