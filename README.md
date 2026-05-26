# Lucario

企业协作 ERP 前端原型（React 19 + Vite 8 + Tailwind CSS 4）。

## 开发

```bash
npm install
npm run dev
```

默认账号：任意邮箱登录即可（Mock 认证）。

## 环境变量

| 变量 | 说明 | 默认 |
|------|------|------|
| `VITE_API_BASE_URL` | REST API 根路径 | `/api` |

开发模式下 [MSW](src/mocks/handlers.ts) 会拦截 `/api/*` 请求。对接真实后端时设置 `VITE_API_BASE_URL` 并移除 `main.tsx` 中的 MSW 启动逻辑。

## 路由

| 路径 | 页面 |
|------|------|
| `/login` | 登录 |
| `/dashboard` | 个人看板 |
| `/assets` | 资产申请 |
| `/departments` | 部门管理 |
| `/projects` | 项目管理 |
| `/knowledge` | 知识库 |
| `/social` | 社交圈 |
| `/agent` | AI 助手 |
| `/settings` | 设置 |

快捷键：`Ctrl/Cmd + K` 打开全局搜索。

## 脚本

- `npm run build` — 生产构建
- `npm run test` — Vitest 单元测试
- `npm run test:e2e` — Playwright 冒烟测试
- `npm run lint` — ESLint

API 契约见 [src/api/README.md](src/api/README.md)。
