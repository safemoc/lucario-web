import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  Search,
  Settings,
  Users,
  Wallet,
  Waves,
} from "lucide-react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CommandPalette } from "../components/CommandPalette";
import { ErrorBoundary } from "../components/ErrorBoundary";
import {
  NotificationDrawer,
  useUnreadNotificationCount,
} from "../components/NotificationDrawer";
import { useUser } from "../hooks/queries";
import { usePreferencesStore } from "../stores/preferences";
import { useUiStore } from "../stores/ui";
import { Avatar } from "../pages/dashboard/shared";

const navItems = [
  { path: "/dashboard", label: "个人看板", icon: LayoutDashboard },
  { path: "/assets", label: "资产申请", icon: Wallet },
  { path: "/departments", label: "部门管理", icon: Users },
  { path: "/projects", label: "项目管理", icon: Waves },
  { path: "/knowledge", label: "知识库", icon: BookOpen },
  { path: "/social", label: "社交圈", icon: MessageCircle },
  { path: "/settings", label: "设置", icon: Settings },
] as const;

const pathLabels: Record<string, string> = Object.fromEntries(
  navItems.map((n) => [n.path, n.label]),
);

export function DashboardLayout({ onLogout }: { onLogout: () => void }) {
  const collapsed = usePreferencesStore((s) => s.sidebarCollapsed);
  const setCollapsed = usePreferencesStore((s) => s.setSidebarCollapsed);
  const setCommandOpen = useUiStore((s) => s.setCommandOpen);
  const setNotificationOpen = useUiStore((s) => s.setNotificationOpen);
  const mobileNavOpen = useUiStore((s) => s.mobileNavOpen);
  const setMobileNavOpen = useUiStore((s) => s.setMobileNavOpen);
  const location = useLocation();
  const navigate = useNavigate();
  const { data: userData } = useUser();
  const unread = useUnreadNotificationCount();

  const user = userData ?? {
    name: "林屿",
    department: "设计部",
    avatarInitials: "LY",
  };

  const openSearch = () => {
    if (collapsed) {
      setCollapsed(false);
      setTimeout(() => setCommandOpen(true), 200);
    } else {
      setCommandOpen(true);
    }
    setMobileNavOpen(false);
  };

  const handleLogout = () => {
    toast.success("已退出登录");
    onLogout();
  };

  const sidebarContent = (mobile?: boolean) => (
    <>
      <div
        className={`flex shrink-0 items-center py-5 ${
          collapsed && !mobile ? "justify-center px-2" : "justify-between px-5"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
            <Waves className="h-4 w-4" />
          </div>
          {(!collapsed || mobile) && (
            <span className="whitespace-nowrap text-base font-semibold tracking-wide">
              Lucario
            </span>
          )}
        </div>
        {!mobile && !collapsed && (
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="rounded-md p-1 text-white/60 hover:bg-white/10 hover:text-white"
            aria-label="收起侧边栏"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {collapsed && !mobile && (
        <div className="mb-2 flex justify-center px-2">
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            className="rounded-md p-1 text-white/60 hover:bg-white/10"
            aria-label="展开侧边栏"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      <nav
        className={`flex-1 space-y-1 overflow-y-auto ${
          collapsed && !mobile ? "px-2" : "px-3"
        }`}
      >
        {navItems.map((it) => (
          <NavLink
            key={it.path}
            to={it.path}
            title={collapsed && !mobile ? it.label : undefined}
            onClick={() => setMobileNavOpen(false)}
            className={({ isActive }) =>
              `group relative flex items-center rounded-xl text-sm transition ${
                collapsed && !mobile
                  ? "justify-center px-2 py-2.5"
                  : "gap-3 px-3 py-2"
              } ${
                isActive
                  ? "bg-white/15 text-white shadow-inner shadow-black/10"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <it.icon className="h-5 w-5 shrink-0" strokeWidth={1.8} />
            {(!collapsed || mobile) && (
              <span className="truncate">{it.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div
        className={`shrink-0 border-t border-white/10 ${
          collapsed && !mobile ? "px-2 py-3" : "px-3 py-3"
        }`}
      >
        {collapsed && !mobile ? (
          <button
            type="button"
            onClick={openSearch}
            title="搜索 (⌘K)"
            className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10 hover:bg-white/20"
          >
            <Search className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={openSearch}
            className="flex w-full items-center gap-2 rounded-xl bg-white/10 px-2.5 py-2 ring-1 ring-white/10 hover:bg-white/15"
          >
            <Search className="h-4 w-4 shrink-0 text-white/60" />
            <span className="flex-1 text-left text-sm text-white/40">
              搜索...
            </span>
            <span className="rounded bg-white/10 px-1 py-0.5 text-[9px] text-white/60">
              ⌘K
            </span>
          </button>
        )}
      </div>

      <div
        className={`shrink-0 border-t border-white/10 ${
          collapsed && !mobile ? "px-2 py-3" : "px-3 py-3"
        }`}
      >
        {collapsed && !mobile ? (
          <div className="flex flex-col items-center gap-2">
            <Avatar initials={user.avatarInitials} size="sm" />
            <button
              type="button"
              onClick={() => setNotificationOpen(true)}
              className="relative flex h-7 w-7 items-center justify-center rounded-md text-white/70 hover:bg-white/10"
              aria-label="通知"
            >
              <Bell className="h-4 w-4" />
              {unread > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white">
                  {unread}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-7 w-7 items-center justify-center rounded-md text-white/70 hover:bg-rose-500/20"
              aria-label="退出"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2 ring-1 ring-white/10">
            <button
              type="button"
              onClick={() => navigate("/settings")}
              className="shrink-0"
              title="个人设置"
            >
              <Avatar initials={user.avatarInitials} size="sm" />
            </button>
            <button
              type="button"
              onClick={() => navigate("/settings")}
              className="min-w-0 flex-1 text-left"
            >
              <div className="truncate text-xs font-medium text-white">
                {user.name}
              </div>
              <div className="truncate text-[11px] text-white/60">
                {user.department}
              </div>
            </button>
            <button
              type="button"
              onClick={() => setNotificationOpen(true)}
              className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-white/70 hover:bg-white/10"
              aria-label="通知"
            >
              <Bell className="h-4 w-4" />
              {unread > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white ring-2 ring-ocean-900">
                  {unread}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-white/70 hover:bg-rose-500/20"
              aria-label="退出"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-ocean-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-ocean-950/30">
      <CommandPalette />
      <NotificationDrawer />

      {/* Desktop sidebar */}
      <aside
        className={`dark-scroll hidden h-screen shrink-0 flex-col overflow-hidden bg-gradient-to-b from-ocean-950 via-ocean-900 to-ocean-800 text-white transition-[width] duration-300 lg:flex ${
          collapsed ? "lg:w-16" : "lg:w-56"
        }`}
      >
        {sidebarContent()}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileNavOpen(false)}
            />
            <motion.aside
              className="dark-scroll fixed inset-y-0 left-0 z-50 flex w-56 flex-col bg-gradient-to-b from-ocean-950 via-ocean-900 to-ocean-800 text-white lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
            >
              {sidebarContent(true)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-12 shrink-0 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md lg:hidden dark:border-slate-700 dark:bg-slate-900/80">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="rounded-lg p-2 text-slate-600 dark:text-slate-300"
            aria-label="打开菜单"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold text-ocean-950 dark:text-white">
            {pathLabels[location.pathname] ?? "Lucario"}
          </span>
        </header>

        <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto p-3 lg:overflow-hidden lg:p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              className="min-h-full lg:h-full"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
