# TODO List 应用

一个基于 Go 后端和 JavaScript 前端的简洁 TODO List Web 应用。

## 功能特性

### 必须功能
- TODO 添加待办事项（包含标题，描述可选）
- TODO 删除待办事项
- TODO 标记待办事项完成/未完成
- TODO 查看待办事项列表

### 扩展功能
- TODO 数据持久化（JSON 文件存储）
- TODO 任务分类（工作/学习/生活/其他）
- TODO 任务过滤（按状态和分类）

## 技术架构

### 后端 (Go)
- HTTP 服务器提供 REST API
- JSON 文件数据持久化
- CORS 支持跨域访问

### 前端 (JavaScript)
- 原生 JavaScript，无框架依赖
- 响应式 CSS 设计
- 异步 API 调用

## 快速开始

1. 确保已安装 Go 1.21+

2. 启动服务器：
```bash
go run main.go
```

3. 打开浏览器访问：http://localhost:8080

## API 接口

| 方法 | 路径 | 功能 |
|------|------|------|
| GET | /api/todos | 获取所有任务 |
| POST | /api/todos | 创建新任务 |
| PUT | /api/todos/{id} | 更新任务 |
| DELETE | /api/todos/{id} | 删除任务 |

## 数据结构

```json
{
  "id": 1,
  "title": "任务标题",
  "description": "任务描述",
  "completed": false,
  "category": "工作",
  "created_at": "2024-01-01 12:00:00"
}
```

## 设计思路

1. **简洁性**：最小化代码量，专注核心功能
2. **可用性**：直观的用户界面，支持键盘操作
3. **持久化**：使用 JSON 文件，无需数据库依赖
4. **扩展性**：清晰的 API 设计，便于后续功能扩展