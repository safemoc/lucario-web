import { useMemo, type ReactNode } from "react";

export type {
  Priority,
  ProjectStatus,
  Project,
  Todo,
  Request,
  SocialPost,
} from "../../types";

export {
  user,
  company,
  department,
  projects,
  initialTodos,
  requests,
  socialPosts,
  weekWorkHours,
} from "../../data/mock";

import type { Priority, ProjectStatus } from "../../types";

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
      className={`relative flex h-full min-h-0 flex-col rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_8px_24px_-12px_rgba(6,29,51,0.12)] transition hover:shadow-[0_14px_32px_-16px_rgba(6,29,51,0.2)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-none ${className}`}
    >
      <header className="mb-3 flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-ocean-950 dark:text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
          )}
        </div>
        {action && <div className="shrink-0 sm:max-w-[55%]">{action}</div>}
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
      <div className="flex items-center justify-between gap-1">
        <span className="text-xs leading-snug text-slate-500">{label}</span>
        {icon && <span className="shrink-0 opacity-70">{icon}</span>}
      </div>
      <div className="mt-1 text-xl font-bold leading-tight sm:text-2xl">{value}</div>
      {hint && (
        <div className="mt-0.5 text-[11px] leading-snug text-slate-400">{hint}</div>
      )}
    </div>
  );
}

/** 顶部统计条：手机 2 列，平板 4 列 */
export const statsRow4 =
  "grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3";

/** 顶部统计条：手机 2 列，中屏 3 列，桌面 5 列 */
export const statsRow5 =
  "grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3";

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
