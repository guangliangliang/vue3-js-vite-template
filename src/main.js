import { createApp } from 'vue'
import '@/style.scss'
import App from '@/App.vue'
import { createPinia } from 'pinia'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:svg-icons-register'

import 'swiper/css'
import 'swiper/css/pagination'

const pinia = createPinia()

if (import.meta.env.MODE === 'development') {
  import('./mock')
}
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

app.use(pinia)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
  locale: zhCn
})
app.use(router)
app.mount('#app')
