export * from './user'
export * from './app'
export * from './search'
export * from './tagViews'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()
export const setupStore = (app) => {
  store.use(piniaPluginPersistedstate)
  app.use(store)
}

export { store }
