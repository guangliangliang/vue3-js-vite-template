import Mock from 'mockjs'
import { roles } from './role'
let users = []

// 用户列表 mock
Mock.mock(/^\/user(\?.*)?$/, 'get', (options) => {
  const url = new URL('http://localhost' + options.url)
  const page = Number(url.searchParams.get('page') || 1)
  const pageSize = Number(url.searchParams.get('page_size') || 10)

  const total = 57 // 假设总共57条数据
  const list = Mock.mock({
    [`data|${pageSize}`]: [
      {
        id: '@id',
        name: '@cname',
        email: '@email',
        roles: () => {
          const rolesVal = roles.map((item) => item.name)
          const count = Mock.Random.integer(1, 3)
          return Mock.Random.shuffle(rolesVal).slice(0, count).join('、')
        },
        role_ids: () => {
          const rolesVal = roles.map((item) => item.id)
          const count = Mock.Random.integer(1, 3)
          return Mock.Random.shuffle(rolesVal).slice(0, count)
        },
        sex: '@pick(["男", "女"])',
        mobile: /^1[3-9]\d{9}$/,
        role: '@pick(["admin", "editor", "viewer"])',
        createTime: '@datetime'
      }
    ]
  }).data
  users = list
  console.log(list, 'listlist')

  return {
    code: 200,
    message: 'OK',
    data: {
      list,
      page,
      page_size: pageSize,
      total
    }
  }
})

// 获取用户详情（GET /user/:id）
Mock.mock(/\/user\/\d+$/, 'get', (options) => {
  const id = options.url.split('/').pop()
  console.log(id, 'idq')

  const user = users.find((u) => u.id === `${id}`)
  return {
    code: 200,
    message: 'OK',
    data: user || null
  }
})
