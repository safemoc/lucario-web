import { useState } from "react";
import {
  Avatar,
  Card,
  PriorityDot,
  StatusBadge,
  company,
  department,
  initialTodos,
  projects,
  requests,
  socialPosts,
  user,
  type Todo,
} from "./shared";

function AccountCard() {
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
        <button className="text-xs text-ocean-700 hover:text-ocean-900">
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
            今日还有 <span className="font-medium text-amber-600">{user.metrics.todos}</span> 项待办 · 加油 💪
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

      <div className="mt-3 grid grid-cols-4 gap-2">
        {[
          { label: "资产", value: user.metrics.assets, color: "text-ocean-700" },
          { label: "项目", value: user.metrics.projects, color: "text-emerald-600" },
          { label: "待办", value: user.metrics.todos, color: "text-amber-600" },
          { label: "协调", value: user.metrics.requests, color: "text-rose-600" },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-lg bg-slate-50 px-2 py-2 text-center"
          >
            <div className={`text-lg font-bold leading-tight ${m.color}`}>
              {m.value}
            </div>
            <div className="mt-0.5 text-xs text-slate-500">{m.label}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TodosCard() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
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
      <ul className="space-y-1">
        {todos.map((t) => (
          <li
            key={t.id}
            className="flex items-center gap-2.5 rounded-lg px-1.5 py-1.5 transition hover:bg-slate-50"
          >
            <button
              type="button"
              onClick={() =>
                setTodos((prev) =>
                  prev.map((x) =>
                    x.id === t.id ? { ...x, done: !x.done } : x,
                  ),
                )
              }
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
    </Card>
  );
}

function RequestsCard() {
  const [list, setList] = useState(requests);
  const handleAct = (id: number) =>
    setList((prev) => prev.filter((r) => r.id !== id));
  return (
    <Card
      title="协调申请"
      subtitle={`${list.length} 条待处理`}
      action={
        <button className="text-xs text-ocean-700 hover:text-ocean-900">
          全部
        </button>
      }
      bodyClassName="overflow-y-auto pr-1"
    >
      {list.length === 0 ? (
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
                    onClick={() => handleAct(r.id)}
                    className="rounded-md bg-ocean-900 px-2 py-1 text-xs font-medium text-white transition hover:bg-ocean-800"
                  >
                    同意
                  </button>
                  <button
                    onClick={() => handleAct(r.id)}
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

function CompanyStructureCard() {
  return (
    <Card
      title="公司结构 · 我的部门"
      subtitle={`${company.ceo.name} ${company.ceo.title} · 含 ${department.name} 详情`}
      action={
        <button className="text-xs text-ocean-700 hover:text-ocean-900">
          完整组织
        </button>
      }
      bodyClassName="flex flex-col gap-3"
    >
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-ocean-900 to-ocean-700 text-sm font-bold text-white shadow-lg shadow-ocean-900/30">
            {company.ceo.name}
          </div>
          <span className="mt-1 text-xs text-slate-500">
            {company.ceo.title}
          </span>
        </div>

        <div className="my-1.5 h-4 w-px bg-slate-300" />
        <div className="relative h-px w-full bg-slate-200" />

        <div className="grid w-full grid-cols-5 gap-2 pt-2">
          {company.departments.map((d) => (
            <div key={d.name} className="flex flex-col items-center">
              <div className="-mt-2 h-2 w-px bg-slate-300" />
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold text-white shadow-md ${d.color} ${
                  d.mine ? "ring-4 ring-ocean-200" : ""
                }`}
                title={d.head}
              >
                {d.head}
              </div>
              <div className="mt-1 text-center">
                <div
                  className={`text-xs font-medium ${
                    d.mine ? "text-ocean-700" : "text-ocean-900"
                  }`}
                >
                  {d.name}
                </div>
                <div className="text-[10px] text-slate-400">{d.count} 人</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-ocean-500" />
            <span className="text-sm font-medium text-ocean-900">
              {department.name}
            </span>
            <span className="text-xs text-slate-400">
              · 负责人 {department.head}
            </span>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
            运转良好
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "部门人数", value: department.members },
            { label: "在研项目", value: department.ongoingProjects },
            { label: "管理资产", value: department.managedAssets },
            { label: "本周交付", value: department.weeklyDelivered },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-slate-100 bg-gradient-to-br from-white to-slate-50/50 px-2 py-2 text-center"
            >
              <div className="text-lg font-bold leading-tight text-ocean-900">
                {s.value}
              </div>
              <div className="mt-0.5 text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between rounded-lg bg-amber-50/60 px-2.5 py-1.5 text-xs text-amber-800">
          <span className="flex items-center gap-1.5">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M12 9v4M12 17h.01" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            目前有 {department.vacancies} 个岗位空缺
          </span>
          <button className="font-medium text-amber-800 hover:text-amber-900">
            查看 →
          </button>
        </div>
      </div>
    </Card>
  );
}

function ProjectsCard() {
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
    </Card>
  );
}

function SocialCard() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const active = socialPosts.find((p) => p.id === activeId) ?? null;

  return (
    <Card
      title="社交圈"
      subtitle={`${socialPosts.length} 条同事动态`}
      action={
        <button className="text-xs text-ocean-700 hover:text-ocean-900">
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
    <div className="grid h-full min-h-0 grid-cols-12 grid-rows-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1fr)] gap-3 lg:gap-4">
      <div className="col-span-4 row-span-1 min-h-0">
        <AccountCard />
      </div>
      <div className="col-span-4 row-span-1 min-h-0">
        <TodosCard />
      </div>
      <div className="col-span-4 row-span-1 min-h-0">
        <RequestsCard />
      </div>

      <div className="col-span-8 row-span-1 min-h-0">
        <CompanyStructureCard />
      </div>
      <div className="col-span-4 row-span-2 min-h-0">
        <SocialCard />
      </div>
      <div className="col-span-8 row-span-1 min-h-0">
        <ProjectsCard />
      </div>
    </div>
  );
}
