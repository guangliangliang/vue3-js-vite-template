# 使用已经拉取好的 nginx 镜像
FROM nginx:latest

# 删除默认页面
RUN rm -rf /usr/share/nginx/html/*

# 复制打包文件到 Nginx 默认目录
COPY dist/ /usr/share/nginx/html/

# 使用自定义配置（可选）
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 80 端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
