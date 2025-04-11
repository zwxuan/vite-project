# FMS Admin 系统部署说明文档

本文档详细说明了FMS Admin系统的部署流程，包括GitHub Actions CI/CD配置、服务器环境准备、密钥设置以及整个自动化部署流程的工作原理。

## 目录

- [部署架构概述](#部署架构概述)
- [前置条件](#前置条件)
- [GitHub Actions CI/CD配置](#github-actions-cicd配置)
- [服务器环境准备](#服务器环境准备)
- [SSH密钥配置](#ssh密钥配置)
- [部署流程详解](#部署流程详解)
- [手动部署方法](#手动部署方法)
- [常见问题排查](#常见问题排查)

## 部署架构概述

本项目采用前后端分离架构，前端部分（FMS Admin）通过GitHub Actions自动构建并部署到生产服务器。部署流程如下：

1. 开发人员将代码推送到GitHub仓库的main分支
2. GitHub Actions自动触发CI/CD流程
3. 构建React应用并生成静态文件
4. 通过SSH将构建产物和部署脚本传输到生产服务器
5. 在服务器上执行部署脚本，使用Docker和Nginx提供Web服务

## 前置条件

- GitHub账号和代码仓库权限
- 生产服务器（Linux系统，推荐Ubuntu 20.04或更高版本）
- 服务器已安装Docker
- 服务器开放80端口（或根据需要配置其他端口）

## GitHub Actions CI/CD配置

### 工作流文件说明

项目使用`.github/workflows/ci-cd.yml`文件定义CI/CD流程。该文件配置了在推送到main分支或创建针对main分支的Pull Request时自动触发构建和部署。

### 配置GitHub Secrets

为了安全地进行自动部署，需要在GitHub仓库中配置以下Secrets：

1. 打开GitHub仓库页面，点击`Settings` > `Secrets and variables` > `Actions`
2. 点击`New repository secret`添加以下密钥：

   - `SSH_PRIVATE_KEY`: 用于SSH连接到服务器的私钥
   - `SERVER_HOST`: 服务器IP地址或域名
   - `SERVER_USER`: 服务器登录用户名

## 服务器环境准备

### 安装Docker

```bash
# 安装Docker
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install -y docker-ce

# 将当前用户添加到docker组（免sudo运行docker）
sudo usermod -aG docker $USER

# Docker已安装完成
```

### 创建项目目录

```bash
mkdir -p ~/fms_admin
```

## SSH密钥配置

### 生成SSH密钥对

在本地开发机器上执行：

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f ~/.ssh/fms_deploy_key
```

### 配置服务器授权密钥

将生成的公钥添加到服务器的授权密钥文件中：

```bash
# 在本地执行
scp ~/.ssh/fms_deploy_key.pub user@server_ip:~/.ssh/

# 在服务器上执行
cat ~/.ssh/fms_deploy_key.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### 添加私钥到GitHub Secrets

将私钥内容复制到GitHub仓库的`SSH_PRIVATE_KEY` Secret中：

```bash
cat ~/.ssh/fms_deploy_key
```

## 部署流程详解

### CI/CD流程说明

1. **代码检出**：GitHub Actions检出最新代码
2. **环境设置**：配置Node.js环境（版本18）
3. **依赖安装**：执行`npm install`安装项目依赖
4. **构建应用**：执行`npm run build`生成生产环境代码
5. **部署到服务器**：
   - 配置SSH连接
   - 将构建产物和部署文件传输到服务器
   - 在服务器上执行部署脚本

### 部署脚本说明

部署脚本`deploy.sh`执行以下操作：

1. 停止并删除旧的Docker容器（如果存在）
2. 使用Dockerfile构建新的Docker镜像
3. 启动新的容器，将80端口映射到主机

### Docker配置说明

**Dockerfile**：
- 使用Node.js镜像构建应用
- 使用Nginx镜像提供Web服务
- 将构建产物复制到Nginx的HTML目录
- 配置Nginx服务器

**Docker运行配置**：
- 使用`docker run`命令启动容器
- 配置端口映射（80:80）
- 设置容器名称为fms_nginx

**nginx.conf**：
- 配置Nginx服务器监听80端口
- 设置静态文件目录和索引文件
- 配置SPA应用所需的URL重写规则

## 手动部署方法

如需手动部署，可按以下步骤操作：

1. 在本地构建应用：

```bash
npm install
npm run build
```

2. 将构建产物和部署文件传输到服务器：

```bash
scp -r dist deploy.sh Dockerfile nginx.conf user@server_ip:~/fms_admin/
```

3. 在服务器上执行部署脚本：

```bash
ssh user@server_ip "cd ~/fms_admin && chmod +x deploy.sh && ./deploy.sh"
```

## 常见问题排查

### 部署失败

1. **SSH连接问题**：
   - 检查`SSH_PRIVATE_KEY`、`SERVER_HOST`和`SERVER_USER`是否正确配置
   - 确认服务器SSH服务正常运行
   - 检查服务器防火墙是否允许SSH连接

2. **构建失败**：
   - 查看GitHub Actions日志中的错误信息
   - 检查依赖项是否正确安装
   - 确认Node.js版本兼容性

3. **Docker相关问题**：
   - 确认服务器上Docker服务正常运行：`systemctl status docker`
   - 检查Docker镜像构建日志：`docker logs fms_nginx`
   - 验证端口映射是否正确：`docker ps`

### 验证部署是否成功

1. 检查容器是否正在运行：

```bash
docker ps | grep fms_nginx
```

2. 测试网站访问：

```bash
curl http://localhost:80
# 或使用服务器IP地址
curl http://server_ip:80
```

3. 查看Nginx日志：

```bash
docker exec fms_nginx cat /var/log/nginx/access.log
docker exec fms_nginx cat /var/log/nginx/error.log
```

---

如有任何部署相关问题，请联系系统管理员或开发团队。