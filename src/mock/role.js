import Mock from 'mockjs'

export let roles = [
  {
    id: 1,
    name: '管理员',
    desc: '系统最高权限',
    status: 'enable',
    status_display: '已启用',
    count: 1,
    createTime: '2024-01-01 12:00:00'
  },
  {
    id: 2,
    name: 'A类用户',
    desc: 'A类功能权限',
    count: 1,
    status_display: '已启用',
    status: 'enable',
    createTime: '2024-02-01 12:00:00'
  },
  {
    id: 3,
    name: 'B类用户',
    desc: 'B类功能权限',
    status_display: '已禁用',
    status: 'disabled',
    count: 1,
    createTime: '2024-03-01 12:00:00'
  },
  {
    id: 4,
    name: '公众',
    desc: '公开访问权限',
    status_display: '已启用',
    status: 'enable',
    count: 1,
    createTime: '2024-04-01 12:00:00'
  }
]

// 获取角色列表（支持分页）
Mock.mock(/^\/role(\?.*)?$/, 'get', (options) => {
  const url = new URL('http://localhost' + options.url)
  const page = Number(url.searchParams.get('page') || 1)
  const pageSize = Number(url.searchParams.get('page_size') || 10)

  const total = roles.length
  const list = roles.slice((page - 1) * pageSize, page * pageSize)

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

// 获取角色详情（GET /role/:id）
Mock.mock(/\/role\/\d+$/, 'get', (options) => {
  const id = parseInt(options.url.split('/').pop())
  const role = roles.find((r) => r.id === id)
  return {
    code: 200,
    message: 'OK',
    data: role || null
  }
})

// 创建角色（POST /role）
Mock.mock('/role', 'post', (options) => {
  const body = JSON.parse(options.body)
  const newRole = {
    ...body,
    id: roles.length + 1,
    createTime: Mock.mock('@datetime')
  }
  roles.push(newRole)
  return {
    code: 200,
    message: '创建成功',
    data: newRole
  }
})

// 更新角色（PATCH /role/:id）
Mock.mock(/\/role\/\d+$/, 'patch', (options) => {
  const id = parseInt(options.url.split('/').pop())
  const body = JSON.parse(options.body)
  roles = roles.map((r) => (r.id === id ? { ...r, ...body } : r))
  return {
    code: 200,
    message: '更新成功',
    data: body
  }
})

// 删除角色（DELETE /role/:id）
Mock.mock(/\/role\/\d+$/, 'delete', (options) => {
  const id = parseInt(options.url.split('/').pop())
  roles = roles.filter((r) => r.id !== id)
  return {
    code: 200,
    message: '删除成功',
    data: true
  }
})
