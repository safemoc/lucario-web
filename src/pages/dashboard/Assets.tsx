import { useMemo, useState } from "react";
import { Card, StatTile } from "./shared";

type AssetStatus = "在用" | "待归还" | "维修中" | "已归还";

type MyAsset = {
  id: string;
  name: string;
  category: string;
  icon: string;
  borrowedAt: string;
  due: string;
  status: AssetStatus;
};

const myAssets: MyAsset[] = [
  { id: "A-2031", name: "MacBook Pro 16'' M3 Max", category: "电脑", icon: "💻", borrowedAt: "2024-03-15", due: "长期", status: "在用" },
  { id: "A-2147", name: "Studio Display 27''", category: "显示器", icon: "🖥️", borrowedAt: "2024-03-15", due: "长期", status: "在用" },
  { id: "A-3092", name: "Wacom Cintiq Pro 27", category: "数位屏", icon: "🎨", borrowedAt: "2025-09-02", due: "2026-06-30", status: "待归还" },
  { id: "A-4087", name: "AirPods Max", category: "耳机", icon: "🎧", borrowedAt: "2025-11-10", due: "长期", status: "在用" },
];

type Pending = {
  id: string;
  item: string;
  category: string;
  submittedAt: string;
  step: number;
  totalStep: number;
  currentStage: string;
  priority: "高" | "中" | "低";
};

const pending: Pending[] = [
  { id: "R-9821", item: "iPad Pro 13'' M4 + Pencil", category: "平板", submittedAt: "今天 09:14", step: 2, totalStep: 3, currentStage: "部门负责人审批", priority: "高" },
  { id: "R-9817", item: "升降办公桌", category: "办公家具", submittedAt: "昨天", step: 1, totalStep: 3, currentStage: "提交资产组", priority: "中" },
  { id: "R-9802", item: "Adobe CC 团队席位", category: "软件", submittedAt: "5 月 18 日", step: 3, totalStep: 3, currentStage: "已通过 · 待发放", priority: "中" },
];

type Available = {
  id: string;
  name: string;
  category: string;
  icon: string;
  total: number;
  available: number;
  tag?: "热门" | "新品" | "紧俏";
};

const available: Available[] = [
  { id: "S-101", name: "MacBook Pro 14''", category: "电脑", icon: "💻", total: 8, available: 3, tag: "热门" },
  { id: "S-102", name: "iPad Pro 13''", category: "平板", icon: "📱", total: 6, available: 1, tag: "紧俏" },
  { id: "S-103", name: "Sony WH-1000XM5", category: "耳机", icon: "🎧", total: 10, available: 7 },
  { id: "S-104", name: "Logitech MX Master 3S", category: "外设", icon: "🖱️", total: 20, available: 12 },
  { id: "S-105", name: "Aeron 人体工学椅", category: "办公家具", icon: "🪑", total: 4, available: 2, tag: "新品" },
  { id: "S-106", name: "Figma 企业席位", category: "软件", icon: "✏️", total: 30, available: 8 },
];

const categoryDist = [
  { label: "电脑外设", value: 38, color: "bg-ocean-500" },
  { label: "影音设备", value: 22, color: "bg-emerald-500" },
  { label: "办公家具", value: 18, color: "bg-amber-500" },
  { label: "软件席位", value: 14, color: "bg-indigo-500" },
  { label: "其他", value: 8, color: "bg-rose-500" },
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
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      available.filter(
        (a) =>
          a.name.toLowerCase().includes(query.toLowerCase()) ||
          a.category.includes(query),
      ),
    [query],
  );

  return (
    <div className="grid h-full min-h-0 grid-cols-12 grid-rows-[auto_minmax(0,1fr)_minmax(0,1fr)] gap-3 lg:gap-4">
      {/* Row 1: Stats */}
      <div className="col-span-12 grid grid-cols-4 gap-3 lg:gap-4">
        <StatTile label="持有资产" value={4} hint="价值 ¥ 68,420" tone="ocean" />
        <StatTile label="申请中" value={2} hint="1 项部门审批" tone="amber" />
        <StatTile label="即将到期" value={1} hint="6 月 30 日归还" tone="rose" />
        <StatTile label="本月已批" value={5} hint="同比 +25%" tone="emerald" />
      </div>

      {/* Row 2 */}
      <div className="col-span-7 row-span-1 min-h-0">
        <Card
          title="我的资产"
          subtitle={`${myAssets.length} 件 · 在用 ${myAssets.filter((a) => a.status === "在用").length} 件`}
          action={
            <button className="rounded-lg bg-ocean-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-ocean-800">
              + 发起申请
            </button>
          }
          bodyClassName="overflow-y-auto pr-1"
        >
          <ul className="space-y-2">
            {myAssets.map((a) => (
              <li
                key={a.id}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/40 px-3 py-2 transition hover:bg-slate-50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl ring-1 ring-slate-100">
                  {a.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium text-ocean-950">
                      {a.name}
                    </span>
                    <StatusPill s={a.status} />
                  </div>
                  <div className="mt-0.5 flex items-center gap-3 text-xs text-slate-400">
                    <span>{a.id}</span>
                    <span>· {a.category}</span>
                    <span>领用 {a.borrowedAt}</span>
                    <span>· 归还期 {a.due}</span>
                  </div>
                </div>
                <button className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:border-ocean-300 hover:text-ocean-700">
                  归还
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="col-span-5 row-span-1 min-h-0">
        <Card
          title="资产类型分布"
          subtitle="部门 / 全公司视角"
          action={
            <div className="flex rounded-md bg-slate-100 p-0.5 text-[11px] text-slate-500">
              <button className="rounded bg-white px-2 py-0.5 font-medium text-ocean-900 shadow-sm">
                全公司
              </button>
              <button className="px-2 py-0.5">部门</button>
            </div>
          }
          bodyClassName="flex flex-col gap-2"
        >
          {categoryDist.map((c) => (
            <div key={c.label}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-slate-600">{c.label}</span>
                <span className="font-medium text-ocean-900">{c.value}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${c.color}`}
                  style={{ width: `${c.value}%` }}
                />
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Row 3 */}
      <div className="col-span-7 row-span-1 min-h-0">
        <Card
          title="申请进度"
          subtitle={`${pending.length} 条进行中`}
          action={
            <button className="text-xs text-ocean-700 hover:text-ocean-900">
              申请历史
            </button>
          }
          bodyClassName="overflow-y-auto pr-1"
        >
          <ul className="space-y-2.5">
            {pending.map((p) => (
              <li
                key={p.id}
                className="rounded-xl border border-slate-100 bg-white p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-ocean-950">
                        {p.item}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          p.priority === "高"
                            ? "bg-rose-50 text-rose-700"
                            : p.priority === "中"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {p.priority}优先
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-3 text-xs text-slate-400">
                      <span>{p.id}</span>
                      <span>· {p.category}</span>
                      <span>提交 {p.submittedAt}</span>
                    </div>
                  </div>
                  <span className="shrink-0 text-xs text-slate-500">
                    {p.step} / {p.totalStep} 步
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-1.5">
                  {Array.from({ length: p.totalStep }).map((_, i) => {
                    const done = i < p.step - 1;
                    const current = i === p.step - 1;
                    return (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full ${
                          done
                            ? "bg-emerald-500"
                            : current
                              ? "bg-gradient-to-r from-ocean-700 to-ocean-400"
                              : "bg-slate-100"
                        }`}
                      />
                    );
                  })}
                </div>
                <div className="mt-1.5 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    当前阶段：
                    <span className="ml-1 font-medium text-ocean-800">
                      {p.currentStage}
                    </span>
                  </span>
                  <button className="text-ocean-700 hover:text-ocean-900">
                    催办 →
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="col-span-5 row-span-1 min-h-0">
        <Card
          title="可借用资源"
          subtitle={`${available.length} 类资源 · 实时余量`}
          action={
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索资源..."
              className="w-28 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/15"
            />
          }
          bodyClassName="overflow-y-auto pr-1"
        >
          <ul className="grid grid-cols-2 gap-2">
            {filtered.map((a) => (
              <li
                key={a.id}
                className="group cursor-pointer rounded-xl border border-slate-100 bg-white p-2.5 transition hover:border-ocean-300 hover:shadow-sm"
              >
                <div className="flex items-start gap-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-lg ring-1 ring-slate-100">
                    {a.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-xs font-medium text-ocean-950">
                        {a.name}
                      </span>
                      {a.tag && (
                        <span
                          className={`shrink-0 rounded-sm px-1 py-0.5 text-[9px] font-medium ${
                            a.tag === "热门"
                              ? "bg-rose-100 text-rose-700"
                              : a.tag === "新品"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {a.tag}
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-[10px] text-slate-400">
                      {a.category}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span
                    className={`font-medium ${
                      a.available === 0
                        ? "text-rose-600"
                        : a.available / a.total < 0.3
                          ? "text-amber-600"
                          : "text-emerald-600"
                    }`}
                  >
                    可用 {a.available} / {a.total}
                  </span>
                  <button
                    disabled={a.available === 0}
                    className="rounded-md bg-ocean-900 px-2 py-0.5 text-[10px] font-medium text-white transition hover:bg-ocean-800 disabled:bg-slate-300"
                  >
                    申请
                  </button>
                </div>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="col-span-2 py-6 text-center text-xs text-slate-400">
                未找到匹配的资源
              </li>
            )}
          </ul>
        </Card>
      </div>
    </div>
  );
}
