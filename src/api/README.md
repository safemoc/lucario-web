# Lucario API 对接说明

开发环境默认 `VITE_API_BASE_URL=/api`，由 [MSW](../mocks/handlers.ts) 拦截。生产环境指向真实后端后关闭 MSW 即可。

## 认证

- 登录后 `localStorage.lucario_token` 会随请求附带 `Authorization: Bearer <token>`
- `401` 会触发 `lucario:unauthorized` 并跳转登录页

## Endpoints

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/user` | 当前用户 |
| PATCH | `/user` | 更新资料 |
| GET | `/todos` | 待办列表 |
| PATCH | `/todos/:id/toggle` | 切换完成 |
| GET | `/requests` | 协调申请 |
| POST | `/requests/batch` | 批量同意 `{ ids, action: "approve" }` |
| GET | `/projects` | 项目列表 |
| PATCH | `/projects/:id` | 更新状态 `{ status }` |
| GET | `/social` | 动态列表 |
| POST | `/social` | 发帖 `{ content }` |
| GET | `/assets` | 我的资产 |
| POST | `/assets/:id/return` | 归还 |
| POST | `/assets/apply` | 申请 `{ item, reason }` |
| GET | `/knowledge` | 文档列表 |
| PATCH | `/knowledge/:id/star` | 收藏切换 |
| GET | `/members` | 部门成员 |
| GET | `/notifications` | 通知 |
| PATCH | `/notifications/:id/read` | 标已读 |
| POST | `/notifications/read-all` | 全部已读 |
| GET | `/search?q=` | 全局搜索 |

## 错误格式

```json
{ "code": 400, "message": "描述" }
```

前端 `apiClient` 会抛出 `ApiError(code, message)`。
