import Mock from 'mockjs'

Mock.mock('/api/test', 'get', {
  code: 200,
  message: 'OK',
  data: {
    'name': '@cname',
    'age|18-30': 1
  }
})
