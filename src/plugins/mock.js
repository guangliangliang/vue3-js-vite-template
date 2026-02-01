// 只在开发环境导入mock
// eslint-disable-next-line no-unused-vars
export function setupMock(app) {
  if (import.meta.env.MODE === 'development') {
    import('@/mock')
  }
}
