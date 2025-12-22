const isElectron = import.meta.env.VITE_IS_ELECTRON === 'true'
// ====== Electron 相关功能：仅 electron 模式注入 ======
if (isElectron && window.electronAPI) {
  window.electronAPI.onAbout(() => {
    import('element-plus').then(({ ElMessageBox }) => {
      ElMessageBox.alert('这是 Electron 的关于信息', '关于')
    })
  })
}
