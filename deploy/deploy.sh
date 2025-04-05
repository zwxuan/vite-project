#!/bin/bash

# 颜色定义
GREEN="\033[0;32m"
RED="\033[0;31m"
NC="\033[0m" # No Color

# 打印带颜色的信息
info() {
    echo -e "${GREEN}[INFO] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
}

# 检查必要的命令是否存在
check_requirements() {
    info "检查部署环境要求..."
    commands=("docker" "docker-compose")
    for cmd in "${commands[@]}"; do
        if ! command -v $cmd &> /dev/null; then
            error "未找到命令: $cmd"
            error "请先安装 $cmd"
            exit 1
        fi
    done
    info "环境检查通过"
}

# 停止并删除旧容器
cleanup() {
    info "清理旧容器..."
    docker-compose down --remove-orphans
}

# 构建新镜像
build() {
    info "构建Docker镜像..."
    docker-compose build --no-cache
    if [ $? -ne 0 ]; then
        error "构建失败"
        exit 1
    fi
}

# 启动服务
start() {
    info "启动服务..."
    docker-compose up -d
    if [ $? -ne 0 ]; then
        error "启动失败"
        exit 1
    fi
}

# 检查服务状态
check_status() {
    info "检查服务状态..."
    sleep 5
    if docker-compose ps | grep -q "vite-app.*Up"; then
        info "服务已成功启动"
        info "应用访问地址: http://localhost:80"
    else
        error "服务启动异常"
        docker-compose logs
        exit 1
    fi
}

# 主函数
main() {
    info "开始部署流程..."
    check_requirements
    cleanup
    build
    start
    check_status
    info "部署完成"
}

# 执行主函数
main