# Vue3 Vite JS 模板项目

这是一个基于 **Vue 3** 和 **Vite** 构建的 JavaScript 项目模板，集成了常用的前端开发工具链、代码规范工具以及常用的功能性库，适用于中大型前端项目的快速开发和初始化配置。

---

## ✨ 项目特性

- ⚡ 使用 [Vite](https://vitejs.dev/) 构建，极速冷启动
- 🧩 使用 [Vue 3](https://vuejs.org/) 进行开发，支持 Composition API
- 🎯 支持 JavaScript 版本（非 TypeScript）
- 📦 内置多个常用功能库，开箱即用
- ✅ 支持代码格式检查（ESLint + Prettier + Stylelint）
- 🛡️ 使用 [Husky](https://typicode.github.io/husky/#/) 进行 Git 提交校验，提升代码质量

---

## 📦 内置功能库

| 库名                                                 | 用途                     |
| ---------------------------------------------------- | ------------------------ |
| [vue-router](https://router.vuejs.org/)              | 路由管理                 |
| [pinia](https://pinia.vuejs.org/)                    | 状态管理                 |
| [axios](https://axios-http.com/)                     | 网络请求                 |
| [dayjs](https://day.js.org/)                         | 日期处理                 |
| [mockjs](https://github.com/nuysoft/Mock)            | 本地 Mock 数据模拟       |
| [swiper](https://swiperjs.com/)                      | 轮播图组件库             |
| [vue-echarts](https://github.com/ecomfe/vue-echarts) | 图表组件（基于 ECharts） |

---

## 🧰 工具集成

### ✅ 代码规范相关

- **ESLint**：检查 JavaScript 代码规范
- **Prettier**：统一代码格式
- **Stylelint**：样式文件（如 `.css`、`.scss`）的规范检查
- **Husky + lint-staged**：Git 提交前自动执行代码检查，保证代码提交质量

---

## 📂 目录结构简介

```bash
├── .husky/                 # Husky 钩子配置
├── public/                 # 公共资源
├── src/                    # 源代码目录
│   ├── api/                # 网络请求封装
│   ├── assets/             # 静态资源
│   ├── components/         # 公共组件
│   ├── config/             # 全局配置
│   ├── hooks/              # 通用Hooks
│   ├── icon/               # svg存放地
│   ├── layout/             # 布局组件
│   ├── mock/               # mock 数据
│   ├── router/             # 路由配置
│   ├── stores/             # 状态管理（Pinia）
│   ├── utils/              # 工具函数
│   ├── views/              # 页面组件
│   ├── App.vue             # 根组件
│   └── main.js             # 入口文件
├── .env                    # 基础配置
├── .env.development        # 开发环境配置
├── .env.production         # 生产环境配置
├── .gitignore              # 设置git不处理的文件和文件夹
├── .prettierignore         # 设置Prettier不处理的文件和文件夹
├── .prettierrc             # Prettier 配置
├── .stylelintrc.json       # Stylelint 配置
├── .check-commit-msg.cjs   # git commit 提交检验配置
├── .deploy.sh              # git page 部署
├── .docker-compose.yml     # docker 动态nginx部署
├── .Dockerfile             # docker 固定nginx部署
├── .eslint.config.js       # ESLint 配置
├── index.html              # 项目根文件
├── LICENSE                 # 开源协议
├── nginx.conf              # docker 固定nginx部署
└── package.json            # 项目的元信息和依赖配置文件
└── package-lock.json            # 锁定具体依赖版本的“快照”文件。
├── vite.config.js          # Vite 配置
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
# 或者使用 pnpm
pnpm install
# 或者使用 yarn
yarn install
```

### 本地开发启动

```bash
npm run dev
```

### 格式化 & 检查代码

```bash
# 执行 ESLint + Stylelint 检查
npm run lint

# 使用 Prettier 格式化代码
npm run format
```

### 构建生产环境代码

```bash
npm run build
```

---

## 🧪 Git 提交校验说明（Husky）

项目中使用了 `husky + lint-staged + commitlint`，主要用于：

- **提交前自动执行 lint 检查和 Prettier 格式化**
- **提交信息规范化（符合 Conventional Commits 规范）**

如需修改相关配置，请查看以下文件：

- `.husky/` 目录中的 Git 钩子脚本
- `check-commit-msg.cjs` 文件

---

## 📄 License

[MIT](./LICENSE)

---

## 👨‍💻 作者

由前端模板爱好者倾力打造。如有建议或问题，欢迎提 [issue](https://github.com/guangliangliang/vue3-js-vite-template/issues) 或 PR。
