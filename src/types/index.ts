export type Priority = "high" | "medium" | "low";

export type ProjectStatus = "进行中" | "即将延期" | "即将完成" | "已完成";

export type Project = {
  id: string;
  name: string;
  progress: number;
  status: ProjectStatus;
  due: string;
  team: string[];
  description?: string;
  priority?: "高" | "中" | "低";
  category?: string;
};

export type Todo = {
  id: number;
  text: string;
  priority: Priority;
  due: string;
  done: boolean;
};

export type Request = {
  id: number;
  from: string;
  avatar: string;
  dept: string;
  title: string;
  time: string;
  priority: Priority;
};

export type SocialPost = {
  id: number;
  author: string;
  avatar: string;
  time: string;
  topic: string;
  content: string;
  reactions: number;
  comments: number;
  accent: string;
};

export type User = {
  name: string;
  role: string;
  level: string;
  department: string;
  employeeId: string;
  joinedAt: string;
  email: string;
  phone: string;
  avatarInitials: string;
  monthWorkHours: { used: number; total: number };
  metrics: { assets: number; projects: number; todos: number; requests: number };
  bio?: string;
};

export type Notification = {
  id: number;
  title: string;
  body: string;
  time: string;
  read: boolean;
  link?: { tab: string; query?: string };
};

export type AssetStatus = "在用" | "待归还" | "维修中" | "已归还";

export type MyAsset = {
  id: string;
  name: string;
  category: string;
  icon: string;
  borrowedAt: string;
  due: string;
  status: AssetStatus;
  serialNo?: string;
};

export type KnowledgeArticle = {
  id: string;
  title: string;
  category: string;
  author: string;
  avatar: string;
  updatedAt: string;
  views: number;
  reads: number;
  excerpt: string;
  content: string;
  tags: string[];
  pinned?: boolean;
  hot?: boolean;
  starred?: boolean;
};

export type Member = {
  id: number;
  name: string;
  initials: string;
  role: string;
  level: string;
  joinedAt: string;
  projects: number;
  email: string;
  status: "在职" | "请假" | "出差" | "试用期";
  skills?: string[];
};

export type SearchResult = {
  id: string;
  type: "project" | "asset" | "knowledge" | "member" | "social";
  title: string;
  subtitle?: string;
  tab: string;
  query?: string;
};
