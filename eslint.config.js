// eslint.config.js
import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import prettier from 'eslint-config-prettier'

export default defineConfig([
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    files: ['**/*.js', '**/*.vue'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      vue,
    },
    processor: vue.processors['.vue'], // 关键：让 .vue 文件被处理
    rules: {
      ...js.configs.recommended.rules,
      ...vue.configs['flat/recommended'].rules,
    },
    extends: [
      prettier, // 放最后，关闭 ESLint 中与 Prettier 冲突的规则
    ],
  },
])
