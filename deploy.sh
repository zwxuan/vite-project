#!/bin/bash
# 建议在脚本开头清理无效资源（避免影响后续操作）
echo "清理无效的Docker资源..."
docker system prune -f

# 停止并删除旧容器（如果存在）
if [ "$(docker ps -aq -f name=fms_nginx)" ]; then
    echo "停止并删除旧的容器..."
    docker stop fms_nginx
    docker rm fms_nginx
fi

# 删除旧镜像（如果存在）
if [ "$(docker images -q fms_nginx:latest)" ]; then
    echo "删除旧镜像..."
    docker rmi fms_nginx:latest
fi

# 在服务器上构建Docker镜像
echo "在服务器上构建Docker镜像..."
docker build -t fms_nginx:latest .

# 运行新容器
echo "启动新的容器..."
docker run -d -p 80:80 --name fms_nginx fms_nginx:latest

echo "部署完成！"