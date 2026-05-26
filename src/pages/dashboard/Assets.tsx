import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { Drawer } from "../../components/Drawer";
import { Modal } from "../../components/Modal";
import { Skeleton } from "../../components/Skeleton";
import {
  useApplyAsset,
  useAssets,
  useReturnAsset,
} from "../../hooks/queries";
import type { AssetStatus, MyAsset } from "../../types";
import { Card, StatTile, statsRow4 } from "./shared";

const pending = [
  {
    id: "R-9821",
    item: "GPT Team 共享席位",
    category: "AI 资源",
    submittedAt: "今天 09:14",
    step: 2,
    totalStep: 3,
    currentStage: "安全合规审批",
    priority: "高" as const,
  },
  {
    id: "R-9817",
    item: "8 人会议室 · 周三 15:00",
    category: "空间资源",
    submittedAt: "昨天",
    step: 1,
    totalStep: 3,
    currentStage: "冲突检测",
    priority: "中" as const,
  },
];

const available = [
  {
    id: "S-101",
    name: "MacBook Pro 14''",
    category: "实物资产",
    icon: "💻",
    total: 8,
    available: 3,
    owner: "行政资产部",
    linked: "项目协同中台",
  },
  {
    id: "S-102",
    name: "8 人会议室 A3",
    category: "空间资源",
    icon: "🏢",
    total: 10,
    available: 4,
    owner: "行政资产部",
    linked: "可预订",
  },
  {
    id: "S-103",
    name: "dev-runner 测试环境",
    category: "协同开发",
    icon: "🧩",
    total: 5,
    available: 2,
    owner: "工程部",
    linked: "CI / 构建",
  },
  {
    id: "S-104",
    name: "GPT Team 共享席位",
    category: "AI 资源",
    icon: "🤖",
    total: 12,
    available: 2,
    owner: "安全合规部",
    linked: "需审批",
  },
  {
    id: "S-105",
    name: "设计素材库 license",
    category: "数字资产",
    icon: "🗂️",
    total: 20,
    available: 6,
    owner: "研发平台部",
    linked: "续费 6 月",
  },
];

const categoryDist = [
  { label: "实物资产", value: 38 },
  { label: "空间资源", value: 22 },
  { label: "数字资产", value: 18 },
  { label: "AI 资源", value: 14 },
  { label: "协同开发", value: 8 },
];

const roomSchedule = [
  { room: "A3 会议室", time: "15:00-16:00", project: "协同开发资源联动", state: "可预订" },
  { room: "B1 评审间", time: "16:30-17:30", project: "AI Agent 操作助手", state: "有冲突" },
  { room: "远程会议桥", time: "明天 10:00", project: "项目协同中台", state: "已锁定" },
];

function StatusPill({ s }: { s: AssetStatus }) {
  const map: Record<AssetStatus, string> = {
    在用: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    待归还: "bg-amber-50 text-amber-700 ring-amber-200",
    维修中: "bg-rose-50 text-rose-700 ring-rose-200",
    已归还: "bg-slate-100 text-slate-600 ring-slate-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${map[s]}`}
    >
      {s}
    </span>
  );
}

export default function Assets() {
  const { data: myAssets = [], isLoading } = useAssets();
  const returnAsset = useReturnAsset();
  const applyAsset = useApplyAsset();
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState<MyAsset | null>(null);
  const [applyOpen, setApplyOpen] = useState(false);
  const [returnId, setReturnId] = useState<string | null>(null);
  const [applyItem, setApplyItem] = useState("");
  const [applyReason, setApplyReason] = useState("");

  const filtered = useMemo(
    () =>
      available.filter(
        (a) =>
          a.name.toLowerCase().includes(query.toLowerCase()) ||
          a.category.includes(query),
      ),
    [query],
  );

  const inUse = myAssets.filter((a) => a.status === "在用").length;

  const onReturn = () => {
    if (!returnId) return;
    returnAsset.mutate(returnId, {
      onSuccess: () => {
        toast.success("归还申请已提交");
        setReturnId(null);
        setDetail(null);
      },
    });
  };

  const onApply = () => {
    if (!applyItem.trim()) {
      toast.error("请选择或填写资源名称");
      return;
    }
    applyAsset.mutate(
      { item: applyItem, reason: applyReason },
      {
        onSuccess: () => {
          toast.success("申请已提交");
          setApplyOpen(false);
          setApplyItem("");
          setApplyReason("");
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="grid h-full grid-cols-12 gap-3">
        <Skeleton className="col-span-12 h-16" />
        <Skeleton className="col-span-7 h-full" />
        <Skeleton className="col-span-5 h-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 lg:grid lg:h-full lg:min-h-0 lg:grid-cols-12 lg:grid-rows-[auto_minmax(0,1fr)_minmax(0,1fr)] lg:gap-4">
      <div className={`${statsRow4} lg:col-span-12`}>
        <StatTile label="我关联资源" value={myAssets.length} tone="ocean" />
        <StatTile label="审批中" value={pending.length} hint="AI / 空间资源" tone="amber" />
        <StatTile
          label="在用资源"
          value={inUse}
          hint={`待归还 ${myAssets.filter((a) => a.status === "待归还").length}`}
          tone="rose"
        />
        <StatTile label="资源池可用" value={available.reduce((s, a) => s + a.available, 0)} tone="emerald" />
      </div>

      <div className="min-h-[280px] lg:col-span-7 lg:row-span-1 lg:min-h-0">
        <Card
          title="我的资产"
          subtitle={`${myAssets.length} 件 · 在用 ${inUse} 件`}
          action={
            <button
              type="button"
              onClick={() => setApplyOpen(true)}
              className="rounded-lg bg-ocean-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-ocean-800"
            >
              + 发起申请
            </button>
          }
          bodyClassName="overflow-y-auto pr-1"
        >
          <ul className="space-y-2">
            {myAssets.map((a) => (
              <li
                key={a.id}
                role="button"
                tabIndex={0}
                onClick={() => setDetail(a)}
                onKeyDown={(e) => e.key === "Enter" && setDetail(a)}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/40 px-3 py-2 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl ring-1 ring-slate-100 dark:bg-slate-900">
                  {a.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium text-ocean-950 dark:text-white">
                      {a.name}
                    </span>
                    <StatusPill s={a.status} />
                  </div>
                  <div className="mt-0.5 flex items-center gap-3 text-xs text-slate-400">
                    <span>{a.id}</span>
                    <span>· {a.category}</span>
                  </div>
                </div>
                {a.status !== "已归还" && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setReturnId(a.id);
                    }}
                    className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:border-ocean-300 hover:text-ocean-700 dark:border-slate-600"
                  >
                    归还
                  </button>
                )}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="min-h-[200px] lg:col-span-5 lg:row-span-1 lg:min-h-0">
        <Card title="资源版图" subtitle="实物、空间、数字、AI、协同开发" bodyClassName="h-48 min-h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryDist} layout="vertical" margin={{ left: 8 }}>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="label"
                width={72}
                tick={{ fontSize: 11 }}
              />
              <Tooltip />
              <Bar dataKey="value" fill="#0e3b63" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="min-h-[200px] lg:col-span-7 lg:row-span-1 lg:min-h-0">
        <Card
          title="申请与预订进度"
          subtitle={`${pending.length} 条进行中`}
          bodyClassName="overflow-y-auto pr-1"
        >
          <ul className="space-y-2 overflow-y-auto pr-1">
            {pending.map((p) => (
              <li
                key={p.id}
                className="rounded-xl border border-slate-100 bg-white p-3 dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-ocean-950 dark:text-white">
                      {p.item}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {p.category} · {p.currentStage} · {p.submittedAt}
                    </div>
                  </div>
                  <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                    {p.step}/{p.totalStep}
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-amber-500"
                    style={{ width: `${(p.step / p.totalStep) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-slate-100 pt-2">
            <div className="mb-1.5 text-xs font-medium text-slate-500">
              空间排期
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {roomSchedule.map((r) => (
                <div key={`${r.room}-${r.time}`} className="rounded-lg bg-slate-50 px-2 py-1.5">
                  <div className="truncate text-xs font-medium text-ocean-950">
                    {r.room}
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-400">{r.time}</div>
                  <div className="mt-0.5 flex items-center justify-between gap-2">
                    <span className="truncate text-[11px] text-slate-500">
                      {r.project}
                    </span>
                    <span
                      className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] ${
                        r.state === "有冲突"
                          ? "bg-rose-50 text-rose-700"
                          : r.state === "已锁定"
                            ? "bg-slate-200 text-slate-600"
                            : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {r.state}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="min-h-[240px] lg:col-span-5 lg:row-span-1 lg:min-h-0">
        <Card
          title="资源池"
          subtitle="可领用、可预订、可审批"
          action={
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索..."
              className="w-28 rounded-md border border-slate-200 px-2 py-1 text-[11px] dark:border-slate-600 dark:bg-slate-800"
            />
          }
          bodyClassName="overflow-y-auto pr-1"
        >
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {filtered.map((a) => (
              <li
                key={a.id}
                className="rounded-xl border border-slate-100 p-2.5 dark:border-slate-700"
              >
                <div className="flex items-start gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-lg">
                    {a.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-medium">{a.name}</div>
                    <div className="mt-0.5 text-[11px] text-slate-400">
                      {a.category} · {a.owner}
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-500">
                      可用 {a.available}/{a.total} · {a.linked}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={a.available === 0}
                  onClick={() => {
                    setApplyItem(a.name);
                    setApplyOpen(true);
                  }}
                  className="mt-2 rounded-md bg-ocean-900 px-2 py-0.5 text-[10px] text-white disabled:bg-slate-300"
                >
                  申请
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Drawer
        open={!!detail}
        onClose={() => setDetail(null)}
        title={detail?.name ?? ""}
      >
        {detail && (
          <div className="space-y-3 text-sm">
            <p>
              <span className="text-slate-400">编号</span> {detail.id}
            </p>
            <p>
              <span className="text-slate-400">序列号</span>{" "}
              {detail.serialNo ?? `SN-${detail.id}`}
            </p>
            <StatusPill s={detail.status} />
            <div className="border-l-2 border-ocean-200 pl-3 text-xs text-slate-500">
              <div>领用 {detail.borrowedAt}</div>
              <div>归还期 {detail.due}</div>
            </div>
          </div>
        )}
      </Drawer>

      <Modal open={applyOpen} onClose={() => setApplyOpen(false)} title="发起资产申请">
        <div className="space-y-3 text-sm">
          <label className="block">
            <span className="text-xs text-slate-500">资源名称</span>
            <input
              value={applyItem}
              onChange={(e) => setApplyItem(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-600 dark:bg-slate-800"
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-500">申请理由</span>
            <textarea
              value={applyReason}
              onChange={(e) => setApplyReason(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-600 dark:bg-slate-800"
            />
          </label>
          <button
            type="button"
            onClick={onApply}
            className="w-full rounded-lg bg-ocean-900 py-2 text-white"
          >
            提交申请
          </button>
        </div>
      </Modal>

      <Modal
        open={!!returnId}
        onClose={() => setReturnId(null)}
        title="确认归还"
      >
        <p className="mb-4 text-sm text-slate-600">确认提交归还申请？</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setReturnId(null)}
            className="flex-1 rounded-lg border py-2 text-sm"
          >
            取消
          </button>
          <button
            type="button"
            onClick={onReturn}
            className="flex-1 rounded-lg bg-ocean-900 py-2 text-sm text-white"
          >
            确认归还
          </button>
        </div>
      </Modal>
    </div>
  );
}
