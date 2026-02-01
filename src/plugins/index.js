import { setupElementPlus } from './element-plus'
import { setupComponents } from './components'
import { setupSwiper } from './swiper'
import { setupElectron } from './electron'
import { setupSvgIcons } from './svg-icons'
import { setupMock } from './mock'

export function setupPlugins(app) {
  // 注册 Element Plus
  setupElementPlus(app)

  // 注册自定义组件
  setupComponents(app)

  // 注册 Swiper
  setupSwiper(app)

  // 注册 Electron
  setupElectron(app)

  // 注册 SVG 图标
  setupSvgIcons(app)

  // 注册 Mock
  setupMock(app)
}
