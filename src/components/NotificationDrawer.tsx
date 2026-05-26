import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotifications,
} from "../hooks/queries";
import { useUiStore } from "../stores/ui";
import { Drawer } from "./Drawer";
import { Skeleton } from "./Skeleton";

export function NotificationDrawer() {
  const open = useUiStore((s) => s.notificationOpen);
  const setOpen = useUiStore((s) => s.setNotificationOpen);
  const navigate = useNavigate();
  const { data: list, isLoading, isError, refetch } = useNotifications();
  const markRead = useMarkNotificationRead();
  const markAll = useMarkAllNotificationsRead();

  const unread = list?.filter((n) => !n.read).length ?? 0;

  return (
    <Drawer open={open} onClose={() => setOpen(false)} title="通知中心">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {unread > 0 ? `${unread} 条未读` : "全部已读"}
        </span>
        {unread > 0 && (
          <button
            type="button"
            onClick={() =>
              markAll.mutate(undefined, {
                onSuccess: () => toast.success("已全部标为已读"),
              })
            }
            className="text-xs font-medium text-ocean-700 hover:text-ocean-900"
          >
            全部已读
          </button>
        )}
      </div>

      {isLoading && (
        <div className="space-y-2">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      )}
      {isError && (
        <div className="py-8 text-center text-sm text-slate-500">
          加载失败
          <button
            type="button"
            onClick={() => refetch()}
            className="ml-2 text-ocean-700"
          >
            重试
          </button>
        </div>
      )}
      <ul className="space-y-2">
        {list?.map((n) => (
          <li key={n.id}>
            <button
              type="button"
              onClick={() => {
                if (!n.read) markRead.mutate(n.id);
                if (n.link) {
                  const path = n.link.query
                    ? `/${n.link.tab}?highlight=${n.link.query}`
                    : `/${n.link.tab}`;
                  navigate(path);
                  setOpen(false);
                }
              }}
              className={`w-full rounded-xl border p-3 text-left transition hover:border-ocean-200 ${
                n.read
                  ? "border-slate-100 bg-slate-50/50 opacity-70"
                  : "border-ocean-100 bg-ocean-50/50"
              }`}
            >
              <div className="flex items-start gap-2">
                {!n.read && (
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-ocean-500" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-ocean-950">
                    {n.title}
                  </div>
                  <p className="mt-0.5 text-xs text-slate-600">{n.body}</p>
                  <p className="mt-1 text-[11px] text-slate-400">{n.time}</p>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </Drawer>
  );
}

export function useUnreadNotificationCount() {
  const { data } = useNotifications();
  return data?.filter((n) => !n.read).length ?? 0;
}
