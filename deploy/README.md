# 部署指南

本文档提供了在Linux环境下部署该Vite项目的详细步骤和说明。

## 环境要求

- Docker (推荐 20.10.0 或更高版本)
- Docker Compose (推荐 2.0.0 或更高版本)
- 确保80端口未被占用

## 部署步骤

1. 将项目代码克隆到服务器

```bash
git clone <项目仓库地址>
cd vite-project
```

2. 赋予部署脚本执行权限

```bash
chmod +x deploy/deploy.sh
```

3. 执行部署脚本

```bash
./deploy/deploy.sh
```

部署脚本会自动执行以下操作：
- 检查环境要求
- 清理旧容器（如果存在）
- 构建新的Docker镜像
- 启动服务
- 验证服务状态

## 访问应用

部署成功后，可以通过以下地址访问应用：
- http://服务器IP:80

## 常见问题

### 1. 端口冲突

如果80端口被占用，可以修改 `docker-compose.yml` 中的端口映射：
```yaml
ports:
  - "8080:80"  # 将主机的8080端口映射到容器的80端口
```

### 2. 构建失败

如果构建过程中遇到网络问题，可以尝试以下解决方案：
- 检查网络连接
- 确保有足够的磁盘空间
- 查看 Docker 日志获取详细错误信息：`docker-compose logs`

### 3. 服务无法启动

如果服务启动失败：
- 检查日志：`docker-compose logs`
- 确认环境变量配置正确
- 验证容器内部服务状态：`docker-compose exec vite-app ps aux`

## 维护命令

- 查看服务状态：`docker-compose ps`
- 查看服务日志：`docker-compose logs -f`
- 重启服务：`docker-compose restart`
- 停止服务：`docker-compose down`
- 更新部署：重新运行 `./deploy/deploy.sh`

## 注意事项

- 建议在生产环境中配置 HTTPS
- 定期备份重要数据
- 监控服务器资源使用情况
- 保持系统和Docker版本更新