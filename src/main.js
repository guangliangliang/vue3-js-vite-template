import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import { createPinia } from 'pinia'
import router from '@/router'

const pinia = createPinia()


if (import.meta.env.MODE === 'development') {
  import('./mock')
}
const  app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
