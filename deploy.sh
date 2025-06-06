#!/bin/bash

###
# @description: 构建并部署到 GitHub Pages（不依赖任何库）
# @repo: https://github.com/guangliangliang/vue3-js-vite-template
# @main branch: main
# @deploy branch: gh-pages
###

set -e  # 一出错就退出

echo "📦 正在构建 Vite 项目..."
npm run build

echo "🚚 正在进入 dist 目录..."
cd dist

echo "🧹 清理旧的 Git 仓库（如果存在）..."
rm -rf .git

echo "🔧 初始化临时 Git 仓库..."
git init
git checkout -b gh-pages

echo "📁 添加构建产物..."
git add -A
git commit -m "chore: deploy to gh-pages"

echo "🚀 推送到 GitHub gh-pages 分支..."

# ✅ 请确认你使用的是 HTTPS 格式（推荐）或已配置好 SSH 公钥
git push -f https://github.com/guangliangliang/vue3-js-vite-template.git gh-pages

cd -

echo "✅ 部署成功！可访问：https://guangliangliang.github.io/vue3-js-vite-template/"
