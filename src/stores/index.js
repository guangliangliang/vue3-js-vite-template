export * from './user'
export * from './layout'
export * from './search'
export * from './tagViews'
import { createPinia } from 'pinia'
const store = createPinia()
export const setupStore = (app) => {
  app.use(store)
}

export { store }
