export default [
  {
    path: '/system/user',
    name: 'user',
    children: [
      {
        path: '',
        component: () => import('@/views/system/user/index.vue'),
        name: 'user1',
        meta: {
          title: '用户管理',
          activePath: '/system/user'
        }
      },
      {
        path: 'add',
        component: () => import('@/views/system/user/add.vue'),
        meta: {
          title: '用户管理-添加',
          activePath: '/system/user'
        }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/system/user/add.vue'),
        meta: {
          title: '用户管理-编辑',
          activePath: '/system/user'
        }
      }
    ]
  },
  {
    path: '/system/role',
    name: 'role',
    children: [
      {
        path: '',
        name: 'role1',
        component: () => import('@/views/system/role/index.vue'),
        meta: {
          title: '角色管理',
          activePath: '/system/role'
        }
      },
      {
        path: 'add',
        component: () => import('@/views/system/role/add.vue'),
        meta: {
          title: '角色管理-添加',
          activePath: '/system/role'
        }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/system/role/add.vue'),
        meta: {
          title: '角色管理-编辑',
          activePath: '/system/role'
        }
      }
    ]
  }
]
