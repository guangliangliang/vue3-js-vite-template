import { createApp } from 'vue'
import '@/style.scss'
import App from '@/App.vue'
import { setupStore } from '@/stores'
import router from '@/router'
import { setupPlugins } from '@/plugins'

const app = createApp(App)

// 注册插件
setupPlugins(app)

// 注册状态管理
setupStore(app)

// 注册路由
app.use(router)

// 挂载应用
app.mount('#app')
