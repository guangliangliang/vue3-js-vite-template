// 定义路由元信息注释（仅供参考，JS 无类型增强）
/**
 * path:'router-name'             跳转地址
 * name:'router-name'             如果用到<keep-alive>，必须设置该属性
 * meta : {
 *   title: 'title',              用于设置网页标签显示的标题
 *   activePath: '',              用于记录菜单活动状态
 *   keepAilve: true              是否缓存，默认 false
 * }
 */

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
          activePath: '/home'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      activePath: '/404'
    }
  }
]

// 自动引入模块路由
const routeModuleFiles = import.meta.glob('./modules/*.js', { eager: true })
Object.keys(routeModuleFiles).forEach((key) => {
  const module = routeModuleFiles[key]
  if (Array.isArray(module.default)) {
    module.default.forEach((route) => {
      routes[1].children.push(route)
      // routes.push(route)
    })
  }
})

export default routes
