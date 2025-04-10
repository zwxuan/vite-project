# 使用官方的 Node.js 镜像作为基础镜像
FROM node:latest

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 构建生产环境代码
RUN npm run build

# 使用Nginx作为生产服务器
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露应用运行的端口
EXPOSE 80

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]