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
    item: "iPad Pro 13'' M4 + Pencil",
    category: "平板",
    submittedAt: "今天 09:14",
    step: 2,
    totalStep: 3,
    currentStage: "部门负责人审批",
    priority: "高" as const,
  },
  {
    id: "R-9817",
    item: "升降办公桌",
    category: "办公家具",
    submittedAt: "昨天",
    step: 1,
    totalStep: 3,
    currentStage: "提交资产组",
    priority: "中" as const,
  },
];

const available = [
  {
    id: "S-101",
    name: "MacBook Pro 14''",
    category: "电脑",
    icon: "💻",
    total: 8,
    available: 3,
  },
  {
    id: "S-102",
    name: "iPad Pro 13''",
    category: "平板",
    icon: "📱",
    total: 6,
    available: 1,
  },
  {
    id: "S-103",
    name: "Sony WH-1000XM5",
    category: "耳机",
    icon: "🎧",
    total: 10,
    available: 7,
  },
];

const categoryDist = [
  { label: "电脑外设", value: 38 },
  { label: "影音设备", value: 22 },
  { label: "办公家具", value: 18 },
  { label: "软件席位", value: 14 },
  { label: "其他", value: 8 },
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
        <StatTile label="持有资产" value={myAssets.length} tone="ocean" />
        <StatTile label="申请中" value={pending.length} tone="amber" />
        <StatTile
          label="在用"
          value={inUse}
          hint={`待归还 ${myAssets.filter((a) => a.status === "待归还").length}`}
          tone="rose"
        />
        <StatTile label="本月已批" value={5} tone="emerald" />
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
        <Card title="资产类型分布" subtitle="全公司视角" bodyClassName="h-48 min-h-[160px]">
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
        <Card title="申请进度" subtitle={`${pending.length} 条进行中`}>
          <ul className="space-y-2 overflow-y-auto pr-1">
            {pending.map((p) => (
              <li
                key={p.id}
                className="rounded-xl border border-slate-100 bg-white p-3 dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="text-sm font-medium text-ocean-950 dark:text-white">
                  {p.item}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {p.currentStage} · {p.submittedAt}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="min-h-[240px] lg:col-span-5 lg:row-span-1 lg:min-h-0">
        <Card
          title="可借用资源"
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
                <div className="text-xs font-medium">{a.icon} {a.name}</div>
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
