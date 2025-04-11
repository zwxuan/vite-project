# 使用Nginx作为生产服务器
FROM nginx:alpine

# 复制构建产物和Nginx配置
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露应用运行的端口
EXPOSE 80

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]