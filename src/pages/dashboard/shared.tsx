import { useMemo, type ReactNode } from "react";

/* ============================================================
 * 类型
 * ============================================================ */

export type Priority = "high" | "medium" | "low";

export type ProjectStatus = "进行中" | "即将延期" | "即将完成" | "已完成";

export type Project = {
  id: string;
  name: string;
  progress: number;
  status: ProjectStatus;
  due: string;
  team: string[];
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

/* ============================================================
 * 共享 Mock 数据
 * ============================================================ */

export const user = {
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
};

export const company = {
  ceo: { name: "陈博", title: "CEO" },
  departments: [
    { name: "产品部", head: "周岚", count: 18, color: "bg-indigo-500" },
    {
      name: "设计部",
      head: "林屿",
      count: 9,
      color: "bg-ocean-500",
      mine: true,
    },
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
  {
    id: "P-201",
    name: "Lucario 2.0 设计系统",
    progress: 72,
    status: "进行中",
    due: "2026-06-18",
    team: ["LY", "ZN", "WS"],
  },
  {
    id: "P-188",
    name: "客户门户改版",
    progress: 45,
    status: "即将延期",
    due: "2026-05-30",
    team: ["LY", "GX"],
  },
  {
    id: "P-176",
    name: "移动端图标重制",
    progress: 95,
    status: "即将完成",
    due: "2026-05-28",
    team: ["LY"],
  },
  {
    id: "P-152",
    name: "品牌 VI 升级",
    progress: 100,
    status: "已完成",
    due: "2026-05-10",
    team: ["LY", "MN", "ZN"],
  },
];

export const initialTodos: Todo[] = [
  { id: 1, text: "完成 Lucario 2.0 登录页评审", priority: "high", due: "今天 18:00", done: false },
  { id: 2, text: "回复客户门户的反馈意见", priority: "medium", due: "明天", done: false },
  { id: 3, text: "提交 5 月份资产盘点表", priority: "medium", due: "周五", done: false },
  { id: 4, text: "约工程部对齐组件库进度", priority: "low", due: "下周", done: false },
  { id: 5, text: "整理品牌 VI 交付物", priority: "low", due: "已完成", done: true },
];

export const requests: Request[] = [
  { id: 1, from: "周岚", avatar: "ZL", dept: "产品部", title: "协助评审新版需求文档", time: "10 分钟前", priority: "high" },
  { id: 2, from: "高骏", avatar: "GJ", dept: "工程部", title: "借用评审会议室 (周四下午)", time: "1 小时前", priority: "medium" },
  { id: 3, from: "苏婉", avatar: "SW", dept: "运营部", title: "618 活动落地页排期协调", time: "今天 09:20", priority: "medium" },
];

export const socialPosts: SocialPost[] = [
  { id: 1, author: "周岚", avatar: "ZL", time: "20 分钟前", topic: "团建合照", content: "今天去了海边，浪漫值拉满～大家拍了好多美照，待会儿发群里。", reactions: 24, comments: 6, accent: "bg-ocean-500" },
  { id: 2, author: "高骏", avatar: "GJ", time: "1 小时前", topic: "新工位", content: "欢迎大家来工程部串门，咖啡免费！", reactions: 17, comments: 3, accent: "bg-emerald-500" },
  { id: 3, author: "苏婉", avatar: "SW", time: "今天 11:32", topic: "618 上线", content: "大促物料已经全部上线，辛苦各位～", reactions: 31, comments: 9, accent: "bg-amber-500" },
  { id: 4, author: "梁辉", avatar: "LH", time: "今天 09:15", topic: "内训招募", content: "新一期主题：高效协作，欢迎报名！", reactions: 12, comments: 2, accent: "bg-rose-500" },
  { id: 5, author: "陈博", avatar: "CB", time: "昨天", topic: "Q2 总结", content: "感谢全员的努力，OKR 超额完成。", reactions: 58, comments: 14, accent: "bg-indigo-500" },
  { id: 6, author: "Lucario", avatar: "LU", time: "昨天", topic: "新功能", content: "资产借还流程升级，欢迎使用反馈。", reactions: 9, comments: 4, accent: "bg-fuchsia-500" },
];

/* ============================================================
 * 共享 UI 组件
 * ============================================================ */

export function Avatar({
  initials,
  size = "md",
  className = "",
}: {
  initials: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    sm: "h-7 w-7 text-[10px]",
    md: "h-9 w-9 text-xs",
    lg: "h-12 w-12 text-sm",
    xl: "h-14 w-14 text-base",
  };
  const palette = [
    "bg-ocean-700",
    "bg-emerald-600",
    "bg-amber-600",
    "bg-rose-600",
    "bg-indigo-600",
    "bg-fuchsia-600",
    "bg-cyan-600",
  ];
  const idx = useMemo(() => {
    let s = 0;
    for (const c of initials) s += c.charCodeAt(0);
    return s % palette.length;
  }, [initials]);
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-bold text-white ring-2 ring-white ${palette[idx]} ${sizes[size]} ${className}`}
    >
      {initials}
    </span>
  );
}

export function PriorityDot({ p }: { p: Priority }) {
  const map = {
    high: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]",
    medium: "bg-amber-500",
    low: "bg-slate-300",
  };
  return <span className={`inline-block h-2 w-2 rounded-full ${map[p]}`} />;
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const map: Record<ProjectStatus, string> = {
    进行中: "bg-ocean-50 text-ocean-700 ring-ocean-200",
    即将延期: "bg-rose-50 text-rose-700 ring-rose-200",
    即将完成: "bg-amber-50 text-amber-700 ring-amber-200",
    已完成: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${map[status]}`}
    >
      {status}
    </span>
  );
}

export function Card({
  title,
  subtitle,
  action,
  children,
  className = "",
  bodyClassName = "",
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section
      className={`relative flex h-full min-h-0 flex-col rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_8px_24px_-12px_rgba(6,29,51,0.12)] transition hover:shadow-[0_14px_32px_-16px_rgba(6,29,51,0.2)] ${className}`}
    >
      <header className="mb-3 flex shrink-0 items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-ocean-950">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 truncate text-xs text-slate-400">{subtitle}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </header>
      <div className={`min-h-0 flex-1 ${bodyClassName}`}>{children}</div>
    </section>
  );
}

/* 紧凑统计单元 */
export function StatTile({
  label,
  value,
  hint,
  tone = "ocean",
  icon,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: "ocean" | "emerald" | "amber" | "rose" | "indigo" | "fuchsia" | "slate";
  icon?: ReactNode;
}) {
  const toneMap = {
    ocean: "from-ocean-50 to-white text-ocean-700 ring-ocean-100",
    emerald: "from-emerald-50 to-white text-emerald-700 ring-emerald-100",
    amber: "from-amber-50 to-white text-amber-700 ring-amber-100",
    rose: "from-rose-50 to-white text-rose-700 ring-rose-100",
    indigo: "from-indigo-50 to-white text-indigo-700 ring-indigo-100",
    fuchsia: "from-fuchsia-50 to-white text-fuchsia-700 ring-fuchsia-100",
    slate: "from-slate-50 to-white text-slate-700 ring-slate-100",
  };
  return (
    <div
      className={`relative flex flex-col rounded-xl bg-gradient-to-br p-3 ring-1 ${toneMap[tone]}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">{label}</span>
        {icon && <span className="opacity-70">{icon}</span>}
      </div>
      <div className="mt-1 text-2xl font-bold leading-tight">{value}</div>
      {hint && (
        <div className="mt-0.5 text-[11px] text-slate-400">{hint}</div>
      )}
    </div>
  );
}

/* 简单的页面页头：可放在每个 tab 主区顶部 */
export function PageHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex shrink-0 items-end justify-between gap-3">
      <div className="min-w-0">
        <h1 className="truncate text-xl font-bold text-ocean-950">{title}</h1>
        {subtitle && (
          <p className="mt-0.5 truncate text-sm text-slate-500">{subtitle}</p>
        )}
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  );
}
