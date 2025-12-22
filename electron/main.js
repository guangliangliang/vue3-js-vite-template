import { app, BrowserWindow, globalShortcut, Menu, dialog } from 'electron'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
const devFlag = process.env.NODE_ENV === 'development'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let win
const isDev = !app.isPackaged

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    icon: join(__dirname, 'assets/icon.png'), // 图标路径
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:5173')
    win.webContents.openDevTools()
  } else {
    win.loadFile(join(__dirname, '../dist/index.html'))
  }

  let otherImage = devFlag ? [{ label: '切换开发者工具', role: 'toggleDevTools' }] : []
  // 自定义菜单（中文）
  const template = [
    {
      label: '文件',
      submenu: [
        { label: '新建窗口', click: () => createWindow() },
        { label: '退出', role: 'quit' }
      ]
    },
    {
      label: '编辑',
      submenu: [
        { label: '撤销', role: 'undo' },
        { label: '重做', role: 'redo' },
        { type: 'separator' },
        { label: '复制', role: 'copy' },
        { label: '粘贴', role: 'paste' }
      ]
    },
    {
      label: '视图',
      submenu: [{ label: '刷新', role: 'reload' }, ...otherImage]
    },
    {
      label: '帮助',
      submenu: [
        {
          label: '关于',
          click: () => {
            console.log('关于本应用')
            win.webContents.send('show-about')
            dialog.showMessageBox(win, {
              type: 'info',
              title: '关于本应用',
              message: '这是一个 Electron 应用',
              buttons: ['确定']
            })
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  console.log(JSON.stringify(process.env.MODE), 'process.env.NODE_ENVprocess.env.NODE_ENV')
  if (process.env.NODE_ENV === 'development') {
    globalShortcut.register('F12', () => {
      if (win) {
        if (win.webContents.isDevToolsOpened()) {
          win.webContents.closeDevTools()
        } else {
          win.webContents.openDevTools()
        }
      }
    })
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
