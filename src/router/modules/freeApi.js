export default [
  {
    path: '/freeApi/category',
    name: 'freeApiCategory',
    children: [
      {
        path: '',
        component: () => import('@/views/freeApi/category/index.vue'),
        name: 'freeApiCategory1',
        meta: {
          title: '分类管理',
          activePath: '/freeApi/category'
        }
      },
      {
        path: 'add',
        component: () => import('@/views/freeApi/category/add.vue'),
        meta: {
          title: '分类管理-添加',
          activePath: '/freeApi/category'
        }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/freeApi/category/add.vue'),
        meta: {
          title: '分类管理-编辑',
          activePath: '/freeApi/category'
        }
      }
    ]
  },
  {
    path: '/freeApi/api',
    name: 'freeApiApi',
    children: [
      {
        path: '',
        name: 'freeApiApi1',
        component: () => import('@/views/freeApi/api/index.vue'),
        meta: {
          title: 'API管理',
          activePath: '/freeApi/api'
        }
      },
      {
        path: 'add',
        component: () => import('@/views/freeApi/api/add.vue'),
        meta: {
          title: 'API管理-添加',
          activePath: '/freeApi/api'
        }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/freeApi/api/add.vue'),
        meta: {
          title: 'API管理-编辑',
          activePath: '/freeApi/api'
        }
      }
    ]
  }
]
