import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
  base: '/vue3-js-vite-template/',
  server: {
    host: true, // 或 '0.0.0.0'
    strictPort: false, // 若端口被占用，自动 +1 找下一个可用端口
    port: 5173 // 你想用的端口
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      inject: 'body-first',
      symbolId: 'icon-[name]'
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/index.scss" as *;`
      }
    }
    // 其他样式预处理器也可以在这里添加配置
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
