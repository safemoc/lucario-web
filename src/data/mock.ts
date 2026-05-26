import type {
  KnowledgeArticle,
  Member,
  MyAsset,
  Notification,
  Project,
  Request,
  SocialPost,
  Todo,
  User,
} from "../types";

export const user: User = {
  name: "林屿",
  role: "协同平台产品负责人",
  level: "P5",
  department: "研发平台部",
  employeeId: "LU-2026-0087",
  joinedAt: "2024-03-15",
  email: "linyu@lucario.dev",
  phone: "+86 138 0000 8888",
  avatarInitials: "LY",
  monthWorkHours: { used: 132, total: 168 },
  metrics: { assets: 4, projects: 4, todos: 7, requests: 3 },
  bio: "负责 Lucario 的产品路线、模块优先级与跨团队协同落地。",
};

export const company = {
  ceo: { name: "陈博", title: "CEO" },
  departments: [
    { name: "产品部", head: "周岚", count: 18, color: "bg-indigo-500" },
    { name: "研发平台部", head: "林屿", count: 9, color: "bg-ocean-500", mine: true },
    { name: "工程部", head: "高骏", count: 32, color: "bg-emerald-500" },
    { name: "行政资产部", head: "苏婉", count: 14, color: "bg-amber-500" },
    { name: "安全合规部", head: "梁辉", count: 11, color: "bg-rose-500" },
  ],
};

export const department = {
  name: "研发平台部",
  head: "林屿",
  members: 9,
  ongoingProjects: 6,
  managedAssets: 24,
  weeklyDelivered: 11,
  vacancies: 2,
};

export const projects: Project[] = [
  { id: "P-201", name: "项目协同中台", progress: 72, status: "进行中", due: "2026-06-18", team: ["LY", "ZN", "WS"], description: "沉淀项目、需求、Bug、里程碑和文档之间的关系。", priority: "高", category: "项目管理" },
  { id: "P-188", name: "资产与空间资源台账", progress: 45, status: "即将延期", due: "2026-05-30", team: ["LY", "GX"], description: "统一管理实物资产、会议室、工位、数字资产和 AI 资源。", priority: "高", category: "资产管理" },
  { id: "P-176", name: "内部动态与知识沉淀", progress: 95, status: "即将完成", due: "2026-05-28", team: ["LY"], description: "把项目进展、经验分享和文档归档放在同一条协作链路里。", priority: "中", category: "内部社区" },
  { id: "P-152", name: "人员组织与权限模型", progress: 100, status: "已完成", due: "2026-05-10", team: ["LY", "MN", "ZN"], description: "组织架构、成员档案、角色权限和岗位变动记录。", priority: "中", category: "人员管理" },
  { id: "P-220", name: "AI Agent 操作助手", progress: 30, status: "进行中", due: "2026-06-05", team: ["MN", "GX"], description: "面向全站的智能助手，支持代办规划、草稿生成和授权操作。", priority: "高", category: "AI Agent" },
  { id: "P-198", name: "协同开发资源联动", progress: 60, status: "进行中", due: "2026-06-12", team: ["HD", "WS"], description: "串联仓库、CI、测试环境、构建产物与项目上下文。", priority: "中", category: "协同开发" },
];

export const initialTodos: Todo[] = [
  { id: 1, text: "确认资产与空间资源台账的数据字段", priority: "high", due: "今天 18:00", done: false },
  { id: 2, text: "补齐 AI Agent 二次确认交互", priority: "medium", due: "明天", done: false },
  { id: 3, text: "提交 5 月份资产盘点表", priority: "medium", due: "周五", done: false },
  { id: 4, text: "约工程部对齐仓库与 CI 关联方案", priority: "low", due: "下周", done: false },
  { id: 5, text: "整理权限模型评审结论", priority: "low", due: "已完成", done: true },
];

export const initialRequests: Request[] = [
  { id: 1, from: "周岚", avatar: "ZL", dept: "产品部", title: "协助评审新版需求文档", time: "10 分钟前", priority: "high" },
  { id: 2, from: "高骏", avatar: "GJ", dept: "工程部", title: "借用评审会议室 (周四下午)", time: "1 小时前", priority: "medium" },
  { id: 3, from: "苏婉", avatar: "SW", dept: "运营部", title: "618 活动落地页排期协调", time: "今天 09:20", priority: "medium" },
];

export const requests = initialRequests;

export const socialPosts: SocialPost[] = [
  { id: 1, author: "周岚", avatar: "ZL", time: "20 分钟前", topic: "项目进展", content: "项目协同中台已完成需求流转草案，下午会同步给工程和测试。", reactions: 24, comments: 6, accent: "bg-ocean-500" },
  { id: 2, author: "高骏", avatar: "GJ", time: "1 小时前", topic: "协同开发", content: "CI 环境和项目卡片的关联字段已打通，下一步补构建记录。", reactions: 17, comments: 3, accent: "bg-emerald-500" },
  { id: 3, author: "苏婉", avatar: "SW", time: "今天 11:32", topic: "资产盘点", content: "会议室、工位和办公设备的第一批台账已导入，请各部门核对。", reactions: 31, comments: 9, accent: "bg-amber-500" },
  { id: 4, author: "梁辉", avatar: "LH", time: "今天 09:15", topic: "安全合规", content: "AI Key 申领将纳入审批与审计，避免共享账号口口相传。", reactions: 12, comments: 2, accent: "bg-rose-500" },
  { id: 5, author: "陈博", avatar: "CB", time: "昨天", topic: "路线图", content: "Lucario 先把项目、人、资产三条主线跑顺，再逐步加社区和 Agent。", reactions: 58, comments: 14, accent: "bg-indigo-500" },
  { id: 6, author: "Lucario", avatar: "LU", time: "昨天", topic: "新功能", content: "资产借还流程升级，支持关联项目、领用人和预计归还日期。", reactions: 9, comments: 4, accent: "bg-fuchsia-500" },
];

export const notifications: Notification[] = [
  { id: 1, title: "协调申请待处理", body: "周岚请求协助评审新版需求文档", time: "10 分钟前", read: false, link: { tab: "dashboard" } },
  { id: 2, title: "项目即将延期", body: "客户门户改版进度 45%，请关注", time: "1 小时前", read: false, link: { tab: "projects", query: "P-188" } },
  { id: 3, title: "知识库更新", body: "设计系统 v2 使用手册已更新", time: "今天 09:00", read: false, link: { tab: "knowledge", query: "K-1001" } },
  { id: 4, title: "社交圈互动", body: "高骏赞了你的动态", time: "昨天", read: true, link: { tab: "social" } },
];

export const myAssets: MyAsset[] = [
  { id: "A-2031", name: "MacBook Pro 16'' M3 Max", category: "电脑", icon: "💻", borrowedAt: "2024-03-15", due: "长期", status: "在用", serialNo: "C02XK9" },
  { id: "A-2147", name: "Studio Display 27''", category: "显示器", icon: "🖥️", borrowedAt: "2024-03-15", due: "长期", status: "在用", serialNo: "SD-8821" },
  { id: "A-3092", name: "GPT Team 共享席位", category: "AI 账号", icon: "🤖", borrowedAt: "2026-05-12", due: "2026-06-30", status: "待归还", serialNo: "AI-SEAT-07" },
  { id: "A-4087", name: "dev-runner-02 测试环境", category: "服务器", icon: "🧩", borrowedAt: "2026-05-10", due: "长期", status: "在用", serialNo: "RUN-9912" },
];

export const knowledgeArticles: KnowledgeArticle[] = [
  { id: "K-1001", title: "Lucario 设计系统 v2 使用手册", category: "设计规范", author: "林屿", avatar: "LY", updatedAt: "今天 09:32", views: 1245, reads: 318, excerpt: "本手册介绍 Lucario 2.0 设计系统的设计 token、组件用法、可访问性原则以及常见问题。", content: "## 概述\n\nLucario 2.0 设计系统面向 B 端管理后台，提供统一的设计 token 与组件库。\n\n## 快速开始\n\n1. 安装 `@lucario/ui`\n2. 引入主题 CSS\n3. 使用 `<Button>` 等基础组件", tags: ["设计系统", "组件库", "Token"], pinned: true, hot: true, starred: true },
  { id: "K-1056", title: "新员工入职 30 天必读清单", category: "入职指南", author: "苏婉", avatar: "SW", updatedAt: "昨天", views: 982, reads: 612, excerpt: "从企业文化、IT 工具到团队协作流程，帮助新同学快速度过试用期。", content: "## 第一周\n\n完成账号开通、阅读 HR 制度、认识团队成员。", tags: ["入职", "新人"], pinned: true },
  { id: "K-1132", title: "前端工程化最佳实践 2026", category: "工程实践", author: "高骏", avatar: "GJ", updatedAt: "2 天前", views: 712, reads: 188, excerpt: "包括 Vite、TypeScript、Tailwind 在内的现代前端工具链最佳实践与团队约定。", content: "## 工具链\n\nVite + React + TypeScript + Tailwind CSS v4", tags: ["前端", "工程化"], hot: true },
  { id: "K-0998", title: "项目协同中台 PRD v2.1", category: "项目文档", author: "周岚", avatar: "ZL", updatedAt: "5 月 20 日", views: 410, reads: 92, excerpt: "覆盖项目、需求、Bug、文档和协同开发资源之间的核心关系。", content: "## 背景\n\n让项目从创建、推进到归档都有统一的协作入口。", tags: ["PRD", "项目管理"] },
  { id: "K-0871", title: "AI 资源申领与 Key 安全规范", category: "安全规范", author: "梁辉", avatar: "LH", updatedAt: "5 月 18 日", views: 538, reads: 240, excerpt: "共享账号、API Key、额度和模型订阅的申领、使用与审计约定。", content: "## 使用原则\n\nAI Key 不在聊天工具中明文传播，所有申领都需要归属人与项目。", tags: ["AI 资源", "安全"], starred: true },
];

export const members: Member[] = [
  { id: 1, name: "林屿", initials: "LY", role: "协同平台产品负责人", level: "P5", joinedAt: "2024-03-15", projects: 4, email: "linyu@lucario.dev", status: "在职", skills: ["产品规划", "权限模型"] },
  { id: 2, name: "张楠", initials: "ZN", role: "前端工程师", level: "P4", joinedAt: "2024-07-01", projects: 3, email: "zhangnan@lucario.dev", status: "在职", skills: ["React", "Design System"] },
  { id: 3, name: "王诗", initials: "WS", role: "后端工程师", level: "P4", joinedAt: "2024-09-20", projects: 3, email: "wangshi@lucario.dev", status: "出差", skills: ["Rust", "SQLx"] },
  { id: 4, name: "韩冬", initials: "HD", role: "测试负责人", level: "P3", joinedAt: "2025-01-08", projects: 2, email: "handong@lucario.dev", status: "在职", skills: ["E2E", "质量度量"] },
  { id: 5, name: "马宁", initials: "MN", role: "AI 应用工程师", level: "P4", joinedAt: "2024-05-10", projects: 3, email: "maning@lucario.dev", status: "在职", skills: ["Agent", "Prompt"] },
];

export const weekWorkHours = [
  { day: "周一", hours: 8 },
  { day: "周二", hours: 7.5 },
  { day: "周三", hours: 8 },
  { day: "周四", hours: 6 },
  { day: "周五", hours: 8 },
  { day: "周六", hours: 0 },
  { day: "周日", hours: 0 },
];
