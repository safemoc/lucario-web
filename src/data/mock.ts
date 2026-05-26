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
  role: "高级产品设计师",
  level: "P5",
  department: "设计部",
  employeeId: "LU-2026-0087",
  joinedAt: "2024-03-15",
  email: "linyu@lucario.dev",
  phone: "+86 138 0000 8888",
  avatarInitials: "LY",
  monthWorkHours: { used: 132, total: 168 },
  metrics: { assets: 4, projects: 4, todos: 7, requests: 3 },
  bio: "负责 Lucario 设计系统与客户门户改版。喜欢极简、温暖的设计语言。",
};

export const company = {
  ceo: { name: "陈博", title: "CEO" },
  departments: [
    { name: "产品部", head: "周岚", count: 18, color: "bg-indigo-500" },
    { name: "设计部", head: "林屿", count: 9, color: "bg-ocean-500", mine: true },
    { name: "工程部", head: "高骏", count: 32, color: "bg-emerald-500" },
    { name: "运营部", head: "苏婉", count: 14, color: "bg-amber-500" },
    { name: "市场部", head: "梁辉", count: 11, color: "bg-rose-500" },
  ],
};

export const department = {
  name: "设计部",
  head: "林屿",
  members: 9,
  ongoingProjects: 6,
  managedAssets: 24,
  weeklyDelivered: 11,
  vacancies: 2,
};

export const projects: Project[] = [
  { id: "P-201", name: "Lucario 2.0 设计系统", progress: 72, status: "进行中", due: "2026-06-18", team: ["LY", "ZN", "WS"], description: "面向 B 端管理后台的统一设计语言与组件库", priority: "高", category: "设计系统" },
  { id: "P-188", name: "客户门户改版", progress: 45, status: "即将延期", due: "2026-05-30", team: ["LY", "GX"], description: "改造客户自助门户体验", priority: "高", category: "客户体验" },
  { id: "P-176", name: "移动端图标重制", progress: 95, status: "即将完成", due: "2026-05-28", team: ["LY"], description: "iOS / Android 双平台图标体系迭代", priority: "中", category: "移动端" },
  { id: "P-152", name: "品牌 VI 升级", progress: 100, status: "已完成", due: "2026-05-10", team: ["LY", "MN", "ZN"], description: "公司新一轮品牌视觉升级", priority: "中", category: "品牌" },
  { id: "P-220", name: "618 大促主会场", progress: 30, status: "进行中", due: "2026-06-05", team: ["MN", "GX"], description: "618 大促主会场视觉与互动", priority: "高", category: "运营" },
  { id: "P-198", name: "用户调研报告 Q2", progress: 60, status: "进行中", due: "2026-06-12", team: ["HD", "WS"], description: "Q2 季度核心用户深度访谈与分析", priority: "中", category: "用研" },
];

export const initialTodos: Todo[] = [
  { id: 1, text: "完成 Lucario 2.0 登录页评审", priority: "high", due: "今天 18:00", done: false },
  { id: 2, text: "回复客户门户的反馈意见", priority: "medium", due: "明天", done: false },
  { id: 3, text: "提交 5 月份资产盘点表", priority: "medium", due: "周五", done: false },
  { id: 4, text: "约工程部对齐组件库进度", priority: "low", due: "下周", done: false },
  { id: 5, text: "整理品牌 VI 交付物", priority: "low", due: "已完成", done: true },
];

export const initialRequests: Request[] = [
  { id: 1, from: "周岚", avatar: "ZL", dept: "产品部", title: "协助评审新版需求文档", time: "10 分钟前", priority: "high" },
  { id: 2, from: "高骏", avatar: "GJ", dept: "工程部", title: "借用评审会议室 (周四下午)", time: "1 小时前", priority: "medium" },
  { id: 3, from: "苏婉", avatar: "SW", dept: "运营部", title: "618 活动落地页排期协调", time: "今天 09:20", priority: "medium" },
];

export const requests = initialRequests;

export const socialPosts: SocialPost[] = [
  { id: 1, author: "周岚", avatar: "ZL", time: "20 分钟前", topic: "团建合照", content: "今天去了海边，浪漫值拉满～大家拍了好多美照，待会儿发群里。", reactions: 24, comments: 6, accent: "bg-ocean-500" },
  { id: 2, author: "高骏", avatar: "GJ", time: "1 小时前", topic: "新工位", content: "欢迎大家来工程部串门，咖啡免费！", reactions: 17, comments: 3, accent: "bg-emerald-500" },
  { id: 3, author: "苏婉", avatar: "SW", time: "今天 11:32", topic: "618 上线", content: "大促物料已经全部上线，辛苦各位～", reactions: 31, comments: 9, accent: "bg-amber-500" },
  { id: 4, author: "梁辉", avatar: "LH", time: "今天 09:15", topic: "内训招募", content: "新一期主题：高效协作，欢迎报名！", reactions: 12, comments: 2, accent: "bg-rose-500" },
  { id: 5, author: "陈博", avatar: "CB", time: "昨天", topic: "Q2 总结", content: "感谢全员的努力，OKR 超额完成。", reactions: 58, comments: 14, accent: "bg-indigo-500" },
  { id: 6, author: "Lucario", avatar: "LU", time: "昨天", topic: "新功能", content: "资产借还流程升级，欢迎使用反馈。", reactions: 9, comments: 4, accent: "bg-fuchsia-500" },
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
  { id: "A-3092", name: "Wacom Cintiq Pro 27", category: "数位屏", icon: "🎨", borrowedAt: "2025-09-02", due: "2026-06-30", status: "待归还", serialNo: "WC-4402" },
  { id: "A-4087", name: "AirPods Max", category: "耳机", icon: "🎧", borrowedAt: "2025-11-10", due: "长期", status: "在用", serialNo: "AP-9912" },
];

export const knowledgeArticles: KnowledgeArticle[] = [
  { id: "K-1001", title: "Lucario 设计系统 v2 使用手册", category: "设计规范", author: "林屿", avatar: "LY", updatedAt: "今天 09:32", views: 1245, reads: 318, excerpt: "本手册介绍 Lucario 2.0 设计系统的设计 token、组件用法、可访问性原则以及常见问题。", content: "## 概述\n\nLucario 2.0 设计系统面向 B 端管理后台，提供统一的设计 token 与组件库。\n\n## 快速开始\n\n1. 安装 `@lucario/ui`\n2. 引入主题 CSS\n3. 使用 `<Button>` 等基础组件", tags: ["设计系统", "组件库", "Token"], pinned: true, hot: true, starred: true },
  { id: "K-1056", title: "新员工入职 30 天必读清单", category: "入职指南", author: "苏婉", avatar: "SW", updatedAt: "昨天", views: 982, reads: 612, excerpt: "从企业文化、IT 工具到团队协作流程，帮助新同学快速度过试用期。", content: "## 第一周\n\n完成账号开通、阅读 HR 制度、认识团队成员。", tags: ["入职", "新人"], pinned: true },
  { id: "K-1132", title: "前端工程化最佳实践 2026", category: "工程实践", author: "高骏", avatar: "GJ", updatedAt: "2 天前", views: 712, reads: 188, excerpt: "包括 Vite、TypeScript、Tailwind 在内的现代前端工具链最佳实践与团队约定。", content: "## 工具链\n\nVite + React + TypeScript + Tailwind CSS v4", tags: ["前端", "工程化"], hot: true },
  { id: "K-0998", title: "客户门户 PRD v2.1", category: "产品文档", author: "周岚", avatar: "ZL", updatedAt: "5 月 20 日", views: 410, reads: 92, excerpt: "客户门户改版需求文档第二版，覆盖核心场景与边界用例。", content: "## 背景\n\n降低 30% 工单量，提升自助服务体验。", tags: ["PRD", "客户门户"] },
  { id: "K-0871", title: "Figma 团队规范与协作流程", category: "工具教程", author: "张楠", avatar: "ZN", updatedAt: "5 月 18 日", views: 538, reads: 240, excerpt: "命名规范、组件库管理、批注流程、版本控制，全队 Figma 协作落地手册。", content: "## 命名规范\n\n组件使用 PascalCase，页面使用 kebab-case。", tags: ["Figma", "协作"], starred: true },
];

export const members: Member[] = [
  { id: 1, name: "林屿", initials: "LY", role: "高级产品设计师", level: "P5", joinedAt: "2024-03-15", projects: 4, email: "linyu@lucario.dev", status: "在职", skills: ["设计系统", "UI"] },
  { id: 2, name: "张楠", initials: "ZN", role: "视觉设计师", level: "P4", joinedAt: "2024-07-01", projects: 3, email: "zhangnan@lucario.dev", status: "在职", skills: ["品牌", "插画"] },
  { id: 3, name: "王诗", initials: "WS", role: "交互设计师", level: "P4", joinedAt: "2024-09-20", projects: 3, email: "wangshi@lucario.dev", status: "出差", skills: ["交互", "用研"] },
  { id: 4, name: "韩冬", initials: "HD", role: "用户研究员", level: "P3", joinedAt: "2025-01-08", projects: 2, email: "handong@lucario.dev", status: "在职", skills: ["用研"] },
  { id: 5, name: "马宁", initials: "MN", role: "品牌设计师", level: "P4", joinedAt: "2024-05-10", projects: 3, email: "maning@lucario.dev", status: "在职", skills: ["品牌"] },
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
