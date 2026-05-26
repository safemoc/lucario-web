import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Skeleton } from "../../components/Skeleton";
import {
  useBatchApproveRequests,
  useHandleRequest,
  useProjects,
  useRequests,
  useSocial,
  useToggleTodo,
  useTodos,
  useUser,
} from "../../hooks/queries";
import {
  Avatar,
  Card,
  PriorityDot,
  StatusBadge,
  company,
  department,
} from "./shared";

function AccountCard() {
  const navigate = useNavigate();
  const { data: user, isLoading } = useUser();
  if (isLoading || !user) {
    return <Card title="我的账户" subtitle="加载中"><Skeleton className="h-32 w-full" /></Card>;
  }
  const pct = Math.round(
    (user.monthWorkHours.used / user.monthWorkHours.total) * 100,
  );

  const now = new Date();
  const dateStr = now.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  const hour = now.getHours();
  const greeting =
    hour < 6
      ? "凌晨好"
      : hour < 12
        ? "早上好"
        : hour < 14
          ? "中午好"
          : hour < 18
            ? "下午好"
            : "晚上好";
  const greetingEmoji =
    hour < 6
      ? "🌙"
      : hour < 12
        ? "🌅"
        : hour < 14
          ? "🍱"
          : hour < 18
            ? "🌤️"
            : "🌃";

  return (
    <Card
      title="我的账户"
      subtitle={dateStr}
      action={
        <button
          type="button"
          onClick={() => navigate("/settings")}
          className="text-xs text-ocean-700 hover:text-ocean-900"
        >
          编辑资料
        </button>
      }
    >
      {/* 顶部问候横幅（原顶部导航栏左侧内容） */}
      <div className="-mx-1 mb-3 flex items-center gap-2.5 rounded-xl bg-gradient-to-br from-ocean-50 via-white to-amber-50/40 px-3 py-2 ring-1 ring-ocean-100/70">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-lg ring-1 ring-ocean-100">
          {greetingEmoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-ocean-900">
            {greeting}，{user.name}
          </div>
          <div className="truncate text-[11px] text-slate-500">
            今日待办 <span className="font-medium text-amber-600">{user.metrics.todos}</span> 项 · 协调申请 {user.metrics.requests} 条
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Avatar initials={user.avatarInitials} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="truncate text-base font-semibold text-ocean-950">
              {user.name}
            </h4>
            <span className="rounded-md bg-ocean-900 px-1.5 py-0.5 text-[10px] font-bold text-white">
              {user.level}
            </span>
          </div>
          <p className="mt-0.5 truncate text-sm text-slate-500">
            {user.role} · {user.department}
          </p>
          <p className="mt-0.5 truncate text-xs text-slate-400">
            工号 {user.employeeId}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="text-slate-500">本月工时</span>
          <span className="font-medium text-ocean-900">
            {user.monthWorkHours.used} / {user.monthWorkHours.total} h
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-ocean-700 to-ocean-500 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

    </Card>
  );
}

function TodosCard() {
  const { data: todos = [], isLoading } = useTodos();
  const toggle = useToggleTodo();
  const remaining = todos.filter((t) => !t.done).length;
  return (
    <Card
      title="我的待办"
      subtitle={`还有 ${remaining} 项未完成`}
      action={
        <button className="text-xs text-ocean-700 hover:text-ocean-900">
          + 新增
        </button>
      }
      bodyClassName="overflow-y-auto pr-1"
    >
      {isLoading ? (
        <Skeleton className="h-24 w-full" />
      ) : (
      <ul className="space-y-1">
        {todos.map((t) => (
          <li
            key={t.id}
            className="flex items-center gap-2.5 rounded-lg px-1.5 py-1.5 transition hover:bg-slate-50"
          >
            <button
              type="button"
              onClick={() => toggle.mutate(t.id)}
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                t.done
                  ? "border-ocean-700 bg-ocean-700 text-white"
                  : "border-slate-300 bg-white hover:border-ocean-500"
              }`}
              aria-label={t.done ? "标记为未完成" : "标记为已完成"}
            >
              {t.done && (
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12l5 5L20 7" />
                </svg>
              )}
            </button>
            <div className="min-w-0 flex-1">
              <div
                className={`truncate text-sm ${
                  t.done ? "text-slate-400 line-through" : "text-ocean-900"
                }`}
              >
                {t.text}
              </div>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
                <PriorityDot p={t.priority} />
                <span>{t.due}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      )}
    </Card>
  );
}

function RequestsCard() {
  const { data: list = [], isLoading } = useRequests();
  const handleAct = useHandleRequest();
  const batch = useBatchApproveRequests();
  return (
    <Card
      title="协调申请"
      subtitle={`${list.length} 条待处理`}
      action={
        list.length > 0 ? (
          <button
            type="button"
            onClick={() =>
              batch.mutate(
                list.map((r) => r.id),
                { onSuccess: () => toast.success("已全部同意") },
              )
            }
            className="text-xs text-ocean-700 hover:text-ocean-900"
          >
            全部同意
          </button>
        ) : null
      }
      bodyClassName="overflow-y-auto pr-1"
    >
      {isLoading ? (
        <Skeleton className="h-24 w-full" />
      ) : list.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center text-center text-sm text-slate-400">
          <svg
            className="mb-2 h-10 w-10 text-slate-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          全部处理完啦
        </div>
      ) : (
        <ul className="space-y-2">
          {list.map((r) => (
            <li
              key={r.id}
              className="rounded-lg border border-slate-100 bg-slate-50/40 p-2.5"
            >
              <div className="flex items-start gap-2.5">
                <Avatar initials={r.avatar} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-ocean-950">
                      {r.from}
                    </span>
                    <span className="text-xs text-slate-400">· {r.dept}</span>
                    <PriorityDot p={r.priority} />
                  </div>
                  <p className="mt-0.5 truncate text-xs text-slate-600">
                    {r.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">{r.time}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      handleAct.mutate(r.id, {
                        onSuccess: () => toast.success("已同意"),
                      })
                    }
                    className="rounded-md bg-ocean-900 px-2 py-1 text-xs font-medium text-white transition hover:bg-ocean-800"
                  >
                    同意
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleAct.mutate(r.id, {
                        onSuccess: () => toast.info("已拒绝"),
                      })
                    }
                    className="rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 transition hover:bg-white"
                  >
                    拒绝
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function CapabilityMapCard() {
  const navigate = useNavigate();
  const lines = [
    {
      name: "项目",
      desc: "项目、需求、Bug、里程碑、文档",
      status: "已展示",
      tone: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    },
    {
      name: "人员",
      desc: "组织架构、成员档案、协作关系",
      status: "已展示",
      tone: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    },
    {
      name: "资产",
      desc: "实物、空间、数字、AI 与项目归属",
      status: "强化中",
      tone: "bg-amber-50 text-amber-700 ring-amber-100",
    },
    {
      name: "社区",
      desc: "内部动态、话题、项目进展",
      status: "已展示",
      tone: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    },
    {
      name: "Agent",
      desc: "代办规划、草稿生成、授权操作",
      status: "新增入口",
      tone: "bg-ocean-50 text-ocean-700 ring-ocean-100",
    },
  ];
  const gaps = ["协同开发资源", "会议室冲突检测", "权限与审计", "AI 资源额度"];

  return (
    <Card
      title="Lucario 落地总览"
      subtitle="按开发意向核对当前原型覆盖度"
      action={
        <button
          type="button"
          onClick={() => navigate("/agent")}
          className="text-xs text-ocean-700 hover:text-ocean-900"
        >
          查看 AI 助手
        </button>
      }
      bodyClassName="grid min-h-0 gap-3 lg:grid-cols-[1.25fr_0.75fr]"
    >
      <div className="min-h-0 overflow-hidden">
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-5">
          {lines.map((line) => (
            <div
              key={line.name}
              className="min-w-0 rounded-lg border border-slate-100 bg-slate-50/50 px-2 py-1.5"
            >
              <div className="truncate text-sm font-semibold text-ocean-950">
                {line.name}
              </div>
              <span
                className={`mt-1 inline-flex rounded-full px-1.5 py-0.5 text-[10px] font-medium ring-1 ${line.tone}`}
              >
                {line.status}
              </span>
              <p className="mt-1 hidden truncate text-[11px] text-slate-400 xl:block">
                {line.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-1.5 rounded-lg bg-amber-50/60 px-2.5 py-1.5 text-xs text-amber-800 ring-1 ring-amber-100">
          <span className="font-medium">继续补深</span>
          {gaps.map((gap) => (
            <span key={gap} className="rounded bg-white/70 px-1.5 py-0.5">
              {gap}
            </span>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-col gap-2 rounded-xl bg-white p-2.5 ring-1 ring-slate-100">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-sm font-semibold text-ocean-950">
              {department.name}
            </div>
            <div className="text-[11px] text-slate-400">
              负责人 {department.head} · {company.ceo.name} {company.ceo.title}
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
            运转良好
          </span>
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {[
            { label: "在研项目", value: department.ongoingProjects },
            { label: "管理资源", value: department.managedAssets },
            { label: "本周交付", value: department.weeklyDelivered },
            { label: "待补岗位", value: department.vacancies },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-slate-50 px-1.5 py-2 text-center">
              <div className="text-lg font-bold leading-tight text-ocean-900">
                {s.value}
              </div>
              <div className="mt-0.5 truncate text-[11px] text-slate-500">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function ProjectsCard() {
  const { data: projects = [], isLoading } = useProjects();
  return (
    <Card
      title="管理的项目"
      subtitle={`共 ${projects.length} 个`}
      action={
        <button className="text-xs text-ocean-700 hover:text-ocean-900">
          全部项目
        </button>
      }
      bodyClassName="overflow-y-auto pr-1"
    >
      {isLoading ? (
        <Skeleton className="h-24 w-full" />
      ) : (
      <ul className="space-y-2">
        {projects.map((p) => (
          <li
            key={p.id}
            className="group rounded-lg border border-transparent px-2 py-2 transition hover:border-slate-200 hover:bg-slate-50/60"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-medium text-ocean-950">
                    {p.name}
                  </span>
                  <StatusBadge status={p.status} />
                </div>
                <div className="mt-0.5 flex items-center gap-3 text-xs text-slate-400">
                  <span>{p.id}</span>
                  <span>截止 {p.due}</span>
                </div>
              </div>
              <div className="flex -space-x-2">
                {p.team.map((t) => (
                  <Avatar key={t} initials={t} size="sm" />
                ))}
              </div>
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all ${
                    p.status === "即将延期"
                      ? "bg-rose-500"
                      : p.progress === 100
                        ? "bg-emerald-500"
                        : "bg-gradient-to-r from-ocean-700 to-ocean-500"
                  }`}
                  style={{ width: `${p.progress}%` }}
                />
              </div>
              <span className="w-9 text-right text-xs font-medium text-slate-500">
                {p.progress}%
              </span>
            </div>
          </li>
        ))}
      </ul>
      )}
    </Card>
  );
}

function SocialCard() {
  const { data: socialPosts = [] } = useSocial();
  const [activeId, setActiveId] = useState<number | null>(null);
  const active = socialPosts.find((p) => p.id === activeId) ?? null;

  return (
    <Card
      title="社交圈"
      subtitle={`${socialPosts.length} 条同事动态`}
      action={
        <button
          type="button"
          onClick={() => window.location.assign("/social")}
          className="text-xs text-ocean-700 hover:text-ocean-900"
        >
          进入社交圈 →
        </button>
      }
      bodyClassName="flex flex-col gap-2 overflow-hidden"
    >
      {active && (
        <div className="shrink-0 rounded-xl bg-gradient-to-br from-ocean-50 to-white p-3 ring-1 ring-ocean-100">
          <div className="flex items-center gap-2">
            <Avatar initials={active.avatar} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-ocean-950">
                  {active.author}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium text-white ${active.accent}`}
                >
                  {active.topic}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">{active.time}</div>
            </div>
            <button
              type="button"
              onClick={() => setActiveId(null)}
              className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="关闭详情"
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
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ocean-900">
            {active.content}
          </p>
          <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 11c0 5.5-7 10-7 10z" />
              </svg>
              {active.reactions}
            </span>
            <span className="flex items-center gap-1">
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              {active.comments}
            </span>
          </div>
        </div>
      )}

      <ul className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
        {socialPosts.map((p) => {
          const isActive = p.id === activeId;
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setActiveId(isActive ? null : p.id)}
                className={`flex w-full items-start gap-2.5 rounded-lg px-2 py-2 text-left transition ${
                  isActive
                    ? "bg-ocean-50 ring-1 ring-ocean-100"
                    : "hover:bg-slate-50"
                }`}
              >
                <Avatar initials={p.avatar} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-medium text-ocean-950">
                      {p.author}
                    </span>
                    <span
                      className={`inline-flex shrink-0 items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium text-white ${p.accent}`}
                    >
                      {p.topic}
                    </span>
                    <span className="ml-auto shrink-0 text-[11px] text-slate-400">
                      {p.time}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {p.content}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col gap-3 lg:grid lg:h-full lg:min-h-0 lg:grid-cols-12 lg:grid-rows-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-4">
      <div className="min-h-[220px] shrink-0 lg:col-span-4 lg:row-span-1 lg:min-h-0">
        <AccountCard />
      </div>
      <div className="min-h-[200px] shrink-0 lg:col-span-4 lg:row-span-1 lg:min-h-0">
        <TodosCard />
      </div>
      <div className="min-h-[200px] shrink-0 lg:col-span-4 lg:row-span-1 lg:min-h-0">
        <RequestsCard />
      </div>

      <div className="min-h-[240px] shrink-0 lg:col-span-8 lg:row-span-1 lg:min-h-0">
        <CapabilityMapCard />
      </div>
      <div className="min-h-[320px] shrink-0 lg:col-span-4 lg:row-span-2 lg:min-h-0">
        <SocialCard />
      </div>
      <div className="min-h-[220px] shrink-0 lg:col-span-8 lg:row-span-1 lg:min-h-0">
        <ProjectsCard />
      </div>
    </div>
  );
}
