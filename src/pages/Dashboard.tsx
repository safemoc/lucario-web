import { useRef, useState } from "react";
import { Avatar, user } from "./dashboard/shared";
import Home from "./dashboard/Home";
import Assets from "./dashboard/Assets";
import Departments from "./dashboard/Departments";
import Projects from "./dashboard/Projects";
import Knowledge from "./dashboard/Knowledge";
import Social from "./dashboard/Social";
import Settings from "./dashboard/Settings";

/* ============================================================
 * 导航定义
 * ============================================================ */

type TabKey =
  | "dashboard"
  | "assets"
  | "departments"
  | "projects"
  | "knowledge"
  | "social"
  | "settings";

const navItems: {
  key: TabKey;
  label: string;
  icon: string;
}[] = [
  {
    key: "dashboard",
    label: "个人看板",
    icon: "M3 12l9-9 9 9M5 10v10h14V10",
  },
  {
    key: "assets",
    label: "资产申请",
    icon: "M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM8 7V5a2 2 0 012-2h4a2 2 0 012 2v2",
  },
  {
    key: "departments",
    label: "部门管理",
    icon: "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M17 4a4 4 0 010 7.75M9 4a4 4 0 110 7.75",
  },
  {
    key: "projects",
    label: "项目管理",
    icon: "M9 11l3 3 8-8M3 12a9 9 0 1018 0 9 9 0 00-18 0z",
  },
  {
    key: "knowledge",
    label: "知识库",
    icon: "M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v17H6.5A2.5 2.5 0 014 16.5v-12A2.5 2.5 0 016.5 2z",
  },
  {
    key: "social",
    label: "社交圈",
    icon: "M21 15a4 4 0 01-4 4H7l-4 4V7a4 4 0 014-4h10a4 4 0 014 4z",
  },
  {
    key: "settings",
    label: "设置",
    icon: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.7 1.7 0 00.4 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.4 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.9.4l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.4-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.4-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.4h0a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5h0a1.7 1.7 0 001.9-.4l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.4 1.9v0a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z",
  },
];

const NOTIFICATION_COUNT = 3;

/* ============================================================
 * Sidebar 内部小图标
 * ============================================================ */

const Icon = {
  Search: (props: { className?: string }) => (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  ),
  Bell: (props: { className?: string }) => (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 01-3.4 0" />
    </svg>
  ),
  Logout: (props: { className?: string }) => (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  ),
};

/* ============================================================
 * Sidebar
 * ============================================================ */

function Sidebar({
  active,
  onChange,
  collapsed,
  onToggle,
  onLogout,
}: {
  active: TabKey;
  onChange: (k: TabKey) => void;
  collapsed: boolean;
  onToggle: () => void;
  onLogout: () => void;
}) {
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearchActivate = () => {
    if (collapsed) {
      onToggle();
      window.setTimeout(() => searchRef.current?.focus(), 320);
    } else {
      searchRef.current?.focus();
    }
  };

  return (
    <aside
      className={`dark-scroll hidden h-screen shrink-0 flex-col overflow-hidden bg-gradient-to-b from-ocean-950 via-ocean-900 to-ocean-800 text-white transition-[width] duration-300 ease-out lg:flex ${
        collapsed ? "lg:w-16" : "lg:w-56"
      }`}
    >
      {/* Logo + 折叠按钮 */}
      <div
        className={`flex shrink-0 items-center py-5 ${
          collapsed ? "justify-center px-2" : "justify-between px-5"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 backdrop-blur">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12c2.5-2 5 2 7.5 0S14.5 10 17 12s5-2 5-2" />
              <path d="M2 17c2.5-2 5 2 7.5 0S14.5 15 17 17s5-2 5-2" />
              <path d="M2 7c2.5-2 5 2 7.5 0S14.5 5 17 7s5-2 5-2" />
            </svg>
          </div>
          {!collapsed && (
            <span className="whitespace-nowrap text-base font-semibold tracking-wide">
              Lucario
            </span>
          )}
        </div>
        {!collapsed && (
          <button
            type="button"
            onClick={onToggle}
            className="rounded-md p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
            aria-label="收起侧边栏"
            title="收起侧边栏"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
      </div>

      {collapsed && (
        <div className="mb-2 flex shrink-0 justify-center px-2">
          <button
            type="button"
            onClick={onToggle}
            className="rounded-md p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
            aria-label="展开侧边栏"
            title="展开侧边栏"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}

      {/* 主导航 */}
      <nav
        className={`flex-1 space-y-1 overflow-y-auto ${
          collapsed ? "px-2" : "px-3"
        }`}
      >
        {navItems.map((it) => {
          const isActive = it.key === active;
          return (
            <button
              key={it.key}
              type="button"
              onClick={() => onChange(it.key)}
              title={collapsed ? it.label : undefined}
              className={`group relative flex w-full items-center rounded-xl text-sm transition ${
                collapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2"
              } ${
                isActive
                  ? "bg-white/15 text-white shadow-inner shadow-black/10"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <svg
                className="h-5 w-5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={it.icon} />
              </svg>
              {!collapsed && (
                <span className="min-w-0 flex-1 truncate text-left text-sm leading-tight">
                  {it.label}
                </span>
              )}
              {isActive && !collapsed && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              )}
              {isActive && collapsed && (
                <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* 搜索 tab */}
      <div
        className={`shrink-0 border-t border-white/10 ${
          collapsed ? "px-2 py-3" : "px-3 py-3"
        }`}
      >
        {collapsed ? (
          <button
            type="button"
            onClick={handleSearchActivate}
            title="搜索"
            className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/80 ring-1 ring-white/10 transition hover:bg-white/20 hover:text-white"
          >
            <Icon.Search className="h-4 w-4" />
          </button>
        ) : (
          <label
            className="group flex cursor-text items-center gap-2 rounded-xl bg-white/10 px-2.5 py-2 ring-1 ring-white/10 transition focus-within:bg-white/15 focus-within:ring-white/25"
            onClick={() => searchRef.current?.focus()}
          >
            <Icon.Search className="h-4 w-4 shrink-0 text-white/60" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索资产、项目、文档..."
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
            />
            <span className="shrink-0 rounded bg-white/10 px-1 py-0.5 text-[9px] font-medium text-white/60">
              ⌘ K
            </span>
          </label>
        )}
      </div>

      {/* 用户 tab：头像 + 信息 + 通知 + 退出 */}
      <div
        className={`shrink-0 border-t border-white/10 ${
          collapsed ? "px-2 py-3" : "px-3 py-3"
        }`}
      >
        {collapsed ? (
          <div className="flex flex-col items-center gap-2">
            <div
              className="relative"
              title={`${user.name} · ${user.department}`}
            >
              <Avatar initials={user.avatarInitials} size="sm" />
              {NOTIFICATION_COUNT > 0 && (
                <span className="absolute -right-1 -top-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white ring-2 ring-ocean-900">
                  {NOTIFICATION_COUNT}
                </span>
              )}
            </div>
            <button
              type="button"
              title={`${NOTIFICATION_COUNT} 条新通知`}
              className="relative flex h-7 w-7 items-center justify-center rounded-md text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <Icon.Bell className="h-4 w-4" />
              {NOTIFICATION_COUNT > 0 && (
                <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-ocean-900" />
              )}
            </button>
            <button
              type="button"
              onClick={onLogout}
              title="退出登录"
              className="flex h-7 w-7 items-center justify-center rounded-md text-white/70 transition hover:bg-rose-500/20 hover:text-rose-200"
            >
              <Icon.Logout className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2 ring-1 ring-white/10 backdrop-blur">
            <Avatar initials={user.avatarInitials} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-medium text-white">
                {user.name}
              </div>
              <div className="truncate text-[11px] text-white/60">
                {user.department}
              </div>
            </div>
            <button
              type="button"
              title={`${NOTIFICATION_COUNT} 条新通知`}
              className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <Icon.Bell className="h-4 w-4" />
              {NOTIFICATION_COUNT > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white ring-2 ring-ocean-900">
                  {NOTIFICATION_COUNT}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={onLogout}
              title="退出登录"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-white/70 transition hover:bg-rose-500/20 hover:text-rose-200"
            >
              <Icon.Logout className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

/* ============================================================
 * Page
 * ============================================================ */

type DashboardProps = { onLogout: () => void };

function Dashboard({ onLogout }: DashboardProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [tab, setTab] = useState<TabKey>("dashboard");

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-ocean-50/40">
      <Sidebar
        active={tab}
        onChange={setTab}
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        onLogout={onLogout}
      />

      <main className="min-h-0 flex-1 overflow-hidden p-3 lg:p-4">
        {tab === "dashboard" && <Home />}
        {tab === "assets" && <Assets />}
        {tab === "departments" && <Departments />}
        {tab === "projects" && <Projects />}
        {tab === "knowledge" && <Knowledge />}
        {tab === "social" && <Social />}
        {tab === "settings" && <Settings />}
      </main>
    </div>
  );
}

export default Dashboard;
