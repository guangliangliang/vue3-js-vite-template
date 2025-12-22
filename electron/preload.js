// preload.js (CommonJS)
// eslint-disable-next-line no-undef
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  versions: () => process.versions,
  ping: () => ipcRenderer.invoke('app:ping')
})

contextBridge.exposeInMainWorld('electronAPI', {
  onAbout: (cb) => ipcRenderer.on('show-about', cb)
})
