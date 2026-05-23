import { useMemo, useState } from "react";
import {
  Avatar,
  Card,
  StatTile,
  StatusBadge,
  projects as basicProjects,
  type Project,
  type ProjectStatus,
} from "./shared";

type DetailProject = Project & {
  description: string;
  priority: "高" | "中" | "低";
  budget: { used: number; total: number };
  tasks: { done: number; total: number };
  category: string;
};

const projects: DetailProject[] = [
  {
    ...basicProjects[0],
    description: "面向 B 端管理后台的统一设计语言与组件库",
    priority: "高",
    budget: { used: 56, total: 80 },
    tasks: { done: 38, total: 52 },
    category: "设计系统",
  },
  {
    ...basicProjects[1],
    description: "改造客户自助门户体验、降低 30% 工单量",
    priority: "高",
    budget: { used: 42, total: 60 },
    tasks: { done: 18, total: 41 },
    category: "客户体验",
  },
  {
    ...basicProjects[2],
    description: "iOS / Android 双平台图标体系迭代",
    priority: "中",
    budget: { used: 18, total: 20 },
    tasks: { done: 22, total: 23 },
    category: "移动端",
  },
  {
    ...basicProjects[3],
    description: "公司新一轮品牌视觉升级",
    priority: "中",
    budget: { used: 30, total: 30 },
    tasks: { done: 25, total: 25 },
    category: "品牌",
  },
  {
    id: "P-220",
    name: "618 大促主会场",
    progress: 30,
    status: "进行中",
    due: "2026-06-05",
    team: ["MN", "GX"],
    description: "618 大促主会场视觉与互动",
    priority: "高",
    budget: { used: 12, total: 40 },
    tasks: { done: 6, total: 20 },
    category: "运营",
  },
  {
    id: "P-198",
    name: "用户调研报告 Q2",
    progress: 60,
    status: "进行中",
    due: "2026-06-12",
    team: ["HD", "WS"],
    description: "Q2 季度核心用户深度访谈与分析",
    priority: "中",
    budget: { used: 8, total: 16 },
    tasks: { done: 7, total: 12 },
    category: "用研",
  },
  {
    id: "P-141",
    name: "登录与权限重构",
    progress: 100,
    status: "已完成",
    due: "2026-04-22",
    team: ["LY", "WS"],
    description: "SSO + 多角色权限控制",
    priority: "高",
    budget: { used: 22, total: 22 },
    tasks: { done: 18, total: 18 },
    category: "基础平台",
  },
];

const statuses: ProjectStatus[] = ["进行中", "即将延期", "即将完成", "已完成"];

const statusMeta: Record<
  ProjectStatus,
  { bar: string; head: string; soft: string }
> = {
  进行中: { bar: "bg-ocean-500", head: "text-ocean-700", soft: "bg-ocean-50" },
  即将延期: { bar: "bg-rose-500", head: "text-rose-700", soft: "bg-rose-50" },
  即将完成: { bar: "bg-amber-500", head: "text-amber-700", soft: "bg-amber-50" },
  已完成: {
    bar: "bg-emerald-500",
    head: "text-emerald-700",
    soft: "bg-emerald-50",
  },
};

function ProjectKanbanCard({ p }: { p: DetailProject }) {
  const meta = statusMeta[p.status];
  return (
    <div className="cursor-pointer rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm transition hover:-translate-y-0.5 hover:border-ocean-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-semibold text-ocean-950">
              {p.name}
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-slate-400">
            <span>{p.id}</span>
            <span>· {p.category}</span>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
            p.priority === "高"
              ? "bg-rose-100 text-rose-700"
              : p.priority === "中"
                ? "bg-amber-100 text-amber-700"
                : "bg-slate-100 text-slate-600"
          }`}
        >
          {p.priority}
        </span>
      </div>

      <p className="mt-1.5 line-clamp-2 text-xs text-slate-500">
        {p.description}
      </p>

      <div className="mt-2">
        <div className="mb-0.5 flex items-center justify-between text-[10px] text-slate-400">
          <span>进度</span>
          <span className="font-medium text-ocean-900">{p.progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full ${meta.bar}`}
            style={{ width: `${p.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex -space-x-2">
          {p.team.map((t) => (
            <Avatar key={t} initials={t} size="sm" />
          ))}
        </div>
        <span className="text-[10px] text-slate-500">截止 {p.due}</span>
      </div>
    </div>
  );
}

export default function Projects() {
  const [query, setQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<"全部" | "高" | "中" | "低">(
    "全部",
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (priorityFilter !== "全部" && p.priority !== priorityFilter) return false;
      if (query && !`${p.name}${p.id}${p.category}`.includes(query)) return false;
      return true;
    });
  }, [priorityFilter, query]);

  const grouped = useMemo(() => {
    const g: Record<ProjectStatus, DetailProject[]> = {
      进行中: [],
      即将延期: [],
      即将完成: [],
      已完成: [],
    };
    for (const p of filtered) g[p.status].push(p);
    return g;
  }, [filtered]);

  const totalProgress = Math.round(
    filtered.reduce((s, p) => s + p.progress, 0) /
      Math.max(filtered.length, 1),
  );

  return (
    <div className="grid h-full min-h-0 grid-cols-12 grid-rows-[auto_minmax(0,1fr)] gap-3 lg:gap-4">
      {/* Row 1: stats */}
      <div className="col-span-12 grid grid-cols-5 gap-3 lg:gap-4">
        <StatTile
          label="进行中"
          value={grouped.进行中.length}
          hint={`整体进度 ${totalProgress}%`}
          tone="ocean"
        />
        <StatTile
          label="即将延期"
          value={grouped.即将延期.length}
          hint="需要重点关注"
          tone="rose"
        />
        <StatTile
          label="即将完成"
          value={grouped.即将完成.length}
          hint="本周可交付"
          tone="amber"
        />
        <StatTile
          label="本季完成"
          value={grouped.已完成.length}
          hint="按时率 92%"
          tone="emerald"
        />
        <StatTile label="项目总数" value={filtered.length} tone="indigo" />
      </div>

      {/* Row 2: Kanban */}
      <div className="col-span-12 row-span-1 min-h-0">
        <Card
          title="项目看板"
          subtitle="按状态分组 · 拖拽排序"
          action={
            <div className="flex items-center gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索项目名 / 编号..."
                className="w-40 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/15"
              />
              <div className="flex rounded-md bg-slate-100 p-0.5 text-[11px] text-slate-500">
                {(["全部", "高", "中", "低"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriorityFilter(p)}
                    className={`rounded px-2 py-0.5 transition ${
                      priorityFilter === p
                        ? "bg-white font-medium text-ocean-900 shadow-sm"
                        : "hover:text-ocean-700"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button className="rounded-lg bg-ocean-900 px-3 py-1 text-xs font-medium text-white transition hover:bg-ocean-800">
                + 新项目
              </button>
            </div>
          }
          bodyClassName="overflow-hidden"
        >
          <div className="grid h-full min-h-0 grid-cols-4 gap-3">
            {statuses.map((s) => {
              const list = grouped[s];
              const meta = statusMeta[s];
              return (
                <div
                  key={s}
                  className={`flex min-h-0 flex-col rounded-xl ${meta.soft} p-2`}
                >
                  <div className="mb-2 flex shrink-0 items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={s} />
                      <span className={`text-xs font-medium ${meta.head}`}>
                        {list.length}
                      </span>
                    </div>
                    <button className="rounded p-0.5 text-slate-500 hover:bg-white/60">
                      <svg
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>
                  <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
                    {list.map((p) => (
                      <ProjectKanbanCard key={p.id} p={p} />
                    ))}
                    {list.length === 0 && (
                      <div className="rounded-lg border border-dashed border-slate-200 bg-white/60 py-6 text-center text-[11px] text-slate-400">
                        暂无项目
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
