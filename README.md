# Lucario

> 一个面向公司内部使用的 **人员 + 项目 + 资产 + 内部社区 + AI Agent 一体化协同管理平台**。

---

## 一、项目愿景（Why）

在日常工作中，公司内部往往同时存在多个项目，每个项目又会涉及：

- 多名相关人员（负责人、开发、测试、产品……）
- 不断变化的需求和开发计划
- 持续累积的 Bug 与优化项
- 散落在各处的文档（设计、接口、会议记录、变更记录）
- 项目以外的「人」本身——团队成员、协作关系、日常动态

与此同时，公司还存在大量**与项目协同强相关、却长期缺乏统一管理的资源**：

- **协同开发资源**：代码仓库、CI/CD、测试环境、构建产物
- **空间资源**：会议室预订、工位安排
- **实物资产**：桌椅板凳、显示器、电脑、外设、办公设备
- **数字化资产**：域名、服务器、license、设计素材、内部文档库
- **AI 资源**：公共 / 共享的 AI 账号、API Key、调用额度、模型订阅

这些信息常常分散在 Excel、聊天记录、网盘、便签、白板里，**缺少一个统一、可追溯、可协作的地方**——谁在用哪台机器、哪个 AI 账号是谁申请的、哪间会议室几点空闲、哪份文档是最新的，往往只能靠「问一下」。

**Lucario 的目标**，就是把「项目 / 人 / 资产」集中管理起来，让公司内部的研发与协作有一个清晰的入口和数据沉淀，让「资源」也能像项目和需求一样被看见、被追踪、被协同使用。

---

## 二、产品主线（Vision）

> 「一个公司，一个 Lucario。」

期望最终覆盖以下 **五条主线**：

| 主线 | 说明 |
| --- | --- |
| **项目（Project）** | 项目信息、成员、需求、Bug、里程碑、文档、与仓库/CI/环境的关联 |
| **人员（People）** | 员工档案、组织架构、角色权限、入离职与岗位变动 |
| **资产（Assets）** | 会议室/工位、实物与数字化资产、AI 账号与配额，并与项目/人员打通 |
| **社区（Moments）** | 内部动态流、点赞评论、话题标签，与项目/人员轻量联动 |
| **Agent** | 贯穿全站的 AI 助手：对话、代办规划、草稿生成、在授权下执行平台操作 |

---

## 三、技术架构

项目采用 **Next.js 全栈（一栈式）** 开发：同一仓库内完成页面渲染、服务端逻辑与数据访问，不再维护独立的 Rust 后端服务。

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js App Router                    │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │  React 页面   │  │ Server Action │  │  Route Handler │  │
│  │  (RSC / CC)  │  │  (登录等)     │  │  (REST API)   │  │
│  └──────────────┘  └──────────────┘  └───────────────┘  │
│                          │                               │
│                    lib/（auth、prisma）                   │
└──────────────────────────┼──────────────────────────────┘
                           ▼
              ┌────────────────────────┐
              │  PostgreSQL (Prisma)   │
              │  Redis（已编排，待接入）  │
              └────────────────────────┘
```

---

## 四、技术栈

| 分类 | 选型 |
| --- | --- |
| 框架 | [Next.js 16](https://nextjs.org/)（App Router） |
| UI | [React 19](https://react.dev/) + [Tailwind CSS 4](https://tailwindcss.com/) |
| 语言 | TypeScript |
| ORM | [Prisma 7](https://www.prisma.io/)（`@prisma/adapter-pg` + `pg` 连接池） |
| 数据库 | PostgreSQL |
| 缓存 | Redis（`composer.yml` 已提供，业务层尚未接入） |
| 认证 | [jose](https://github.com/panva/jose)（JWT Cookie） |
| 校验 | [Zod](https://zod.dev/)（依赖已安装，逐步接入） |
| 图标 | [lucide-react](https://lucide.dev/) |
| 包管理 | [pnpm](https://pnpm.io/) |

详细依赖见 [`package.json`](./package.json)。

---

## 五、当前开发进度

> 分支：`next` · 阶段：**早期搭建 / 基础骨架**

### 已完成

- [x] Next.js 工程初始化（App Router、Tailwind、TypeScript、ESLint）
- [x] 本地依赖编排：PostgreSQL + Redis（[`composer.yml`](./composer.yml)）
- [x] Prisma 数据层：`User`、`Motto` 模型及首次迁移
- [x] 首页入口（`/``）与登录/注册流程 UI
- [x] 登录：Server Action + JWT Cookie（`jose`）
- [x] 注册：客户端表单 + `POST /api/login/register`
- [x] 控制台骨架：侧边栏导航 + 8 个业务模块路由占位
- [x] 登录页品牌区（格言卡片、系统状态等 UI 组件）

### 进行中 / 待完善

- [ ] 路由鉴权：`proxy.ts` 中 Dashboard 保护逻辑尚未启用
- [ ] 密码安全：当前为明文比对，`bcryptjs` 尚未接入
- [ ] 统一 API 响应与错误处理
- [ ] 各业务模块页面（目前多为占位 `Hello world`）
- [ ] 「我的待办」等 Dashboard 组件（代码已起草，尚未启用）
- [ ] Redis 缓存与会话/限流等场景
- [ ] 邀请码、第三方登录等业务校验

### 控制台模块路由（占位）

| 路径 | 模块 |
| --- | --- |
| `/dashboard` | 个人看板 |
| `/dashboard/assets` | 资产申请 |
| `/dashboard/departments` | 部门管理 |
| `/dashboard/projects` | 项目管理 |
| `/dashboard/knowledge` | 知识库 |
| `/dashboard/social` | 社交圈 |
| `/dashboard/agents` | AI 助手 |
| `/dashboard/settings` | 设置 |

---

## 六、目录结构

```text
lucario-web/
├── app/
│   ├── layout.tsx              # 根布局与全局样式
│   ├── page.tsx                # 首页
│   ├── login/                  # 登录、注册
│   │   ├── actions.tsx         # 登录 Server Action
│   │   └── register/
│   ├── api/login/              # 登录 / 注册 Route Handler
│   ├── dashboard/              # 控制台页面（各业务模块）
│   └── ui/                     # 可复用 UI 组件
├── lib/
│   ├── auth.ts                 # JWT 签发与校验
│   ├── prisma.ts               # Prisma Client（pg 适配器）
│   └── generated/prisma/       # Prisma 生成客户端（gitignore）
├── prisma/
│   ├── schema.prisma           # 数据模型
│   └── migrations/             # 数据库迁移
├── proxy.ts                    # 请求代理（Dashboard 鉴权，待启用）
├── composer.yml                # 本地 Postgres / Redis
├── prisma.config.ts            # Prisma CLI 配置
├── .env.example                # 环境变量样例
└── package.json
```

---

## 七、快速开始

### 环境要求

- Node.js 20+
- pnpm
- Docker（用于本地数据库）

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动依赖服务

```bash
docker compose -f composer.yml up -d
```

将启动本地 PostgreSQL（`5432`）与 Redis（`6379`）。默认数据库：`lucario`，用户/密码：`root` / `root`。

### 3. 配置环境变量

```bash
cp .env.example .env
```

本地开发建议至少配置：

```env
# JWT 签名密钥（登录 Cookie）
SECRET=change-me-in-production

# 数据库（需与 composer.yml 一致）
DB_HOST=localhost
DB_PORT=5432
DB_USER=root
DB_PASSWORD=root
DB_NAME=lucario
DB_MAX_CONNECT=10
DB_MIN_CONNECT=1
```

### 4. 初始化数据库

```bash
pnpm db:migrate
# 或仅同步 schema（开发时）
pnpm db:push
```

### 5. 启动开发服务器

```bash
pnpm dev
```

默认访问：<http://localhost:3000>

### 常用脚本

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 开发模式 |
| `pnpm build` | 生产构建（含 `prisma generate`） |
| `pnpm start` | 生产模式启动 |
| `pnpm lint` | ESLint 检查 |
| `pnpm db:generate` | 生成 Prisma Client |
| `pnpm db:migrate` | 开发环境迁移 |
| `pnpm db:push` | 将 schema 推送到数据库 |

---

## 八、路线图（Roadmap）

> 顺序会随实际推进调整；`[x]` 表示已有初步实现。

### 平台基础

- [x] Next.js 全栈工程与 UI 骨架
- [x] PostgreSQL + Prisma 数据层
- [x] 用户注册 / 登录（基础流程）
- [ ] 路由鉴权与权限模型（RBAC）
- [ ] 密码哈希、统一错误处理、输入校验（Zod）
- [ ] Redis 接入（会话、缓存、限流等）

### 项目管理

- [ ] 项目 CRUD、负责人与成员
- [ ] 需求 / Bug / 里程碑 / 文档

### 人员与组织

- [ ] 员工档案、组织架构
- [ ] 角色权限、入离职记录

### 资产管理

- [ ] 会议室预订、工位与实物资产
- [ ] 数字化资产、AI 账号与配额
- [ ] 资产 ↔ 项目 ↔ 人员关联视图

### 协同与社区

- [ ] 代码仓库 / CI / 环境关联
- [ ] 内部动态流、互动与话题
- [ ] 站内通知与 @ 提醒

### AI Agent

- [ ] 对话与上下文感知
- [ ] 代办规划与草稿生成
- [ ] 平台操作工具（二次确认 + 审计日志）

---

## 九、说明

本项目主要服务于**公司内部研发协作**场景，目标是轻量、可演进、贴近真实工作流，而不是复刻大型 SaaS。功能会按真实需要逐步扩展。

早期 README 曾描述独立的 Rust（Axum）后端；当前仓库已切换为 **Next.js 一栈式** 方案，请以本文档与 `package.json` 为准。
