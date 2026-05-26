import {
  Bot,
  Bug,
  CalendarPlus,
  CheckCircle2,
  FileText,
  KeyRound,
  MessageSquareText,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useProjects, useTodos, useUser } from "../../hooks/queries";
import { Avatar, Card, PriorityDot, StatTile, StatusBadge, statsRow4 } from "./shared";

type ActionStatus = "待确认" | "已执行" | "需补充";

const actionQueue: {
  id: string;
  title: string;
  desc: string;
  status: ActionStatus;
  icon: typeof Bug;
}[] = [
  {
    id: "ACT-01",
    title: "创建 Bug",
    desc: "为资产与空间资源台账创建“会议室冲突校验缺失”问题",
    status: "待确认",
    icon: Bug,
  },
  {
    id: "ACT-02",
    title: "预订会议室",
    desc: "周三 15:00 预订 8 人会议室，对齐 CI 资源关联方案",
    status: "待确认",
    icon: CalendarPlus,
  },
  {
    id: "ACT-03",
    title: "申请 AI Key",
    desc: "为 AI Agent 操作助手申请测试额度，归属 P-220",
    status: "需补充",
    icon: KeyRound,
  },
  {
    id: "ACT-04",
    title: "生成周报",
    desc: "汇总本周项目进度、风险和下周计划并归档到知识库",
    status: "已执行",
    icon: FileText,
  },
];

const auditLogs = [
  { id: "L-219", actor: "林屿", action: "确认生成项目周报", time: "今天 11:20" },
  { id: "L-218", actor: "Agent", action: "读取 P-201 项目上下文", time: "今天 11:18" },
  { id: "L-217", actor: "林屿", action: "取消关闭 Bug B-118", time: "昨天" },
];

const quickDrafts = [
  "把 P-188 的延期风险整理成三条可执行建议",
  "根据本周动态生成 Lucario 周报草稿",
  "列出资产管理还缺哪些字段和流程",
];

function statusClass(status: ActionStatus) {
  if (status === "已执行") return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (status === "需补充") return "bg-amber-50 text-amber-700 ring-amber-200";
  return "bg-ocean-50 text-ocean-700 ring-ocean-200";
}

export default function Agent() {
  const { data: user } = useUser();
  const { data: todos = [] } = useTodos();
  const { data: projects = [] } = useProjects();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "agent",
      text: "我已经读取当前用户、项目和资源上下文。P-188 需要优先处理会议室冲突校验、AI Key 审批和资产归属字段。",
    },
    {
      role: "user",
      text: "帮我把今天的风险和下一步动作整理出来。",
    },
    {
      role: "agent",
      text: "建议先确认 P-188 延期风险，再创建一个会议室冲突检测 Bug，并把 AI Key 申请绑定到 P-220。",
    },
  ]);

  const openTodos = useMemo(() => todos.filter((t) => !t.done), [todos]);
  const riskyProjects = projects.filter((p) => p.status === "即将延期");

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      {
        role: "agent",
        text: "已生成草稿：先处理延期项目和待确认动作，再把结论同步到项目文档。",
      },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col gap-3 lg:grid lg:h-full lg:min-h-0 lg:grid-cols-12 lg:grid-rows-[auto_minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-4">
      <div className={`${statsRow4} lg:col-span-12`}>
        <StatTile label="待规划代办" value={openTodos.length} hint="来自项目与对话上下文" tone="ocean" icon={<Bot className="h-4 w-4" />} />
        <StatTile label="待确认动作" value={actionQueue.filter((a) => a.status === "待确认").length} hint="改动数据前需确认" tone="amber" icon={<CheckCircle2 className="h-4 w-4" />} />
        <StatTile label="风险项目" value={riskyProjects.length} hint={riskyProjects[0]?.name ?? "暂无"} tone="rose" icon={<ShieldCheck className="h-4 w-4" />} />
        <StatTile label="可用工具" value={5} hint="需求、Bug、会议室、资产、周报" tone="emerald" icon={<Sparkles className="h-4 w-4" />} />
      </div>

      <div className="min-h-[420px] lg:col-span-8 lg:row-span-1 lg:min-h-0">
        <Card
          title="AI 助手"
          subtitle="上下文感知 · 草稿生成 · 授权操作"
          action={
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              在线
            </span>
          }
          bodyClassName="flex flex-col gap-3 overflow-hidden"
        >
          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
            {messages.map((m, index) => {
              const agent = m.role === "agent";
              return (
                <div
                  key={index}
                  className={`flex items-start gap-2 ${agent ? "" : "justify-end"}`}
                >
                  {agent && (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ocean-900 text-white">
                      <Bot className="h-4 w-4" />
                    </span>
                  )}
                  <div
                    className={`max-w-[82%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                      agent
                        ? "bg-slate-50 text-slate-700 ring-1 ring-slate-100"
                        : "bg-ocean-900 text-white"
                    }`}
                  >
                    {m.text}
                  </div>
                  {!agent && user && <Avatar initials={user.avatarInitials} size="sm" />}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {quickDrafts.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setInput(d)}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-600 hover:bg-ocean-50 hover:text-ocean-700"
              >
                {d}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-2">
            <MessageSquareText className="h-4 w-4 shrink-0 text-slate-400" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder="询问项目、资产、人员或生成草稿..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
            <button
              type="button"
              onClick={send}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ocean-900 text-white hover:bg-ocean-800"
              aria-label="发送"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </Card>
      </div>

      <div className="min-h-[360px] lg:col-span-4 lg:row-span-1 lg:min-h-0">
        <Card
          title="当前上下文"
          subtitle={user ? `${user.name} · ${user.department}` : "加载中"}
          bodyClassName="flex flex-col gap-2 overflow-y-auto pr-1"
        >
          {projects.slice(0, 3).map((p) => (
            <div key={p.id} className="rounded-xl border border-slate-100 bg-slate-50/60 p-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-ocean-950">
                    {p.name}
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-400">
                    {p.id} · {p.category}
                  </div>
                </div>
                <StatusBadge status={p.status} />
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-ocean-600" style={{ width: `${p.progress}%` }} />
              </div>
            </div>
          ))}
        </Card>
      </div>

      <div className="min-h-[280px] lg:col-span-5 lg:row-span-1 lg:min-h-0">
        <Card title="动作确认" subtitle="所有写入操作保留人工确认" bodyClassName="overflow-y-auto pr-1">
          <ul className="space-y-2">
            {actionQueue.map((a) => {
              const Icon = a.icon;
              return (
                <li key={a.id} className="rounded-xl border border-slate-100 p-2.5">
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ocean-50 text-ocean-700">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-ocean-950">{a.title}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ${statusClass(a.status)}`}>
                          {a.status}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{a.desc}</p>
                    </div>
                    {a.status === "待确认" && (
                      <button
                        type="button"
                        onClick={() => toast.success(`${a.title} 已确认`)}
                        className="rounded-md bg-ocean-900 px-2 py-1 text-xs text-white"
                      >
                        确认
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <div className="min-h-[280px] lg:col-span-4 lg:row-span-1 lg:min-h-0">
        <Card title="代办规划" subtitle={`${openTodos.length} 项需要推进`} bodyClassName="overflow-y-auto pr-1">
          <ul className="space-y-2">
            {openTodos.slice(0, 5).map((t) => (
              <li key={t.id} className="rounded-xl bg-slate-50 px-3 py-2">
                <div className="flex items-center gap-2">
                  <PriorityDot p={t.priority} />
                  <span className="truncate text-sm text-ocean-950">{t.text}</span>
                </div>
                <div className="mt-0.5 text-[11px] text-slate-400">{t.due}</div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="min-h-[280px] lg:col-span-3 lg:row-span-1 lg:min-h-0">
        <Card title="审计边界" subtitle="权限、确认与追溯" bodyClassName="overflow-y-auto pr-1">
          <div className="rounded-xl bg-emerald-50 p-3 text-xs leading-relaxed text-emerald-800 ring-1 ring-emerald-100">
            写入类动作必须二次确认，并继承当前用户权限。
          </div>
          <ul className="mt-2 space-y-2">
            {auditLogs.map((log) => (
              <li key={log.id} className="rounded-lg border border-slate-100 px-2.5 py-2">
                <div className="text-xs font-medium text-ocean-950">{log.action}</div>
                <div className="mt-0.5 text-[11px] text-slate-400">
                  {log.actor} · {log.time}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
