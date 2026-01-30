import { createApp } from 'vue'
import '@/style.scss'
import App from '@/App.vue'
import { setupStore } from '@/stores'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/src/index.scss'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:svg-icons-register'
import '@/electron'
import 'swiper/css'
import 'swiper/css/pagination'

// if (import.meta.env.MODE === 'development') {
// import('./mock')
// }
const app = createApp(App)

// 注册自定义组件
const components = import.meta.glob('@/components/*/index.vue', {
  eager: true
})

Object.keys(components).forEach((key) => {
  const component = components[key].default
  if (component && component.name) {
    app.component(component.name, component)
  }
})
setupStore(app)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
  locale: zhCn
})
app.use(router)
app.mount('#app')
