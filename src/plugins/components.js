// 自动注册自定义组件
export function setupComponents(app) {
  const components = import.meta.glob('@/components/*/index.vue', {
    eager: true
  })

  Object.keys(components).forEach((key) => {
    const component = components[key].default
    if (component && component.name) {
      app.component(component.name, component)
    }
  })
}
