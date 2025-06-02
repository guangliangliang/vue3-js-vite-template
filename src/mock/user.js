import Mock from 'mockjs'

let users = [
  {
    id: 1,
    name: '张三',
    mobile: '13800000000',
    sex: '男',
    role_ids: [1],
    avatar: ''
  },
  {
    id: 2,
    name: '李四',
    mobile: '13900000000',
    sex: '女',
    role_ids: [2],
    avatar: ''
  }
]

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
          const roles = ['超级管理员', '系统管理员', '运营人员', '内容编辑', '游客']
          const count = Mock.Random.integer(1, 3)
          return Mock.Random.shuffle(roles).slice(0, count).join('、')
        },
        sex: '@pick(["男", "女"])',
        mobile: /^1[3-9]\d{9}$/,
        role: '@pick(["admin", "editor", "viewer"])',
        createTime: '@datetime'
      }
    ]
  }).data

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
  const id = parseInt(options.url.split('/').pop())
  const user = users.find((u) => u.id === id)
  return {
    code: 200,
    message: 'OK',
    data: user || null
  }
})

// 创建用户（POST /user）
Mock.mock('/user', 'post', (options) => {
  const body = JSON.parse(options.body)
  const newUser = {
    ...body,
    id: users.length + 1
  }
  users.push(newUser)
  return {
    code: 200,
    message: '创建成功',
    data: newUser
  }
})

// 更新用户（PUT /user/:id）
Mock.mock(/\/user\/\d+$/, 'put', (options) => {
  const id = parseInt(options.url.split('/').pop())
  const body = JSON.parse(options.body)
  users = users.map((u) => (u.id === id ? { ...u, ...body } : u))
  return {
    code: 200,
    message: '更新成功',
    data: body
  }
})

// 删除用户（DELETE /user/:id）
Mock.mock(/\/user\/\d+$/, 'delete', (options) => {
  const id = parseInt(options.url.split('/').pop())
  users = users.filter((u) => u.id !== id)
  return {
    code: 200,
    message: '删除成功',
    data: true
  }
})
