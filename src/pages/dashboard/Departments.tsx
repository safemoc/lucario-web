import { useMemo, useState } from "react";
import { Avatar, Card, StatTile, company, department } from "./shared";

type MemberStatus = "在职" | "请假" | "出差" | "试用期";

type Member = {
  id: number;
  name: string;
  initials: string;
  role: string;
  level: string;
  joinedAt: string;
  projects: number;
  email: string;
  status: MemberStatus;
};

const members: Member[] = [
  { id: 1, name: "林屿", initials: "LY", role: "高级产品设计师", level: "P5", joinedAt: "2024-03-15", projects: 4, email: "linyu@lucario.dev", status: "在职" },
  { id: 2, name: "张楠", initials: "ZN", role: "视觉设计师", level: "P4", joinedAt: "2024-07-01", projects: 3, email: "zhangnan@lucario.dev", status: "在职" },
  { id: 3, name: "王诗", initials: "WS", role: "交互设计师", level: "P4", joinedAt: "2024-09-20", projects: 3, email: "wangshi@lucario.dev", status: "出差" },
  { id: 4, name: "韩冬", initials: "HD", role: "用户研究员", level: "P3", joinedAt: "2025-01-08", projects: 2, email: "handong@lucario.dev", status: "在职" },
  { id: 5, name: "马宁", initials: "MN", role: "品牌设计师", level: "P4", joinedAt: "2024-05-10", projects: 3, email: "maning@lucario.dev", status: "在职" },
  { id: 6, name: "高欣", initials: "GX", role: "运营设计师", level: "P3", joinedAt: "2025-03-22", projects: 2, email: "gaoxin@lucario.dev", status: "请假" },
  { id: 7, name: "陈雨", initials: "CY", role: "设计实习生", level: "P1", joinedAt: "2026-04-05", projects: 1, email: "chenyu@lucario.dev", status: "试用期" },
  { id: 8, name: "刘星", initials: "LX", role: "动效设计师", level: "P4", joinedAt: "2024-11-12", projects: 2, email: "liuxing@lucario.dev", status: "在职" },
  { id: 9, name: "苏明", initials: "SM", role: "插画设计师", level: "P3", joinedAt: "2025-06-14", projects: 2, email: "suming@lucario.dev", status: "在职" },
];

type DeptEvent = {
  id: number;
  type: "招聘" | "项目" | "公告" | "里程碑";
  title: string;
  time: string;
  by: string;
};

const events: DeptEvent[] = [
  { id: 1, type: "项目", title: "Lucario 2.0 设计系统进入 Beta 阶段", time: "今天 10:24", by: "林屿" },
  { id: 2, type: "招聘", title: "新增 2 个岗位：交互设计师 (P5)、用研 (P4)", time: "昨天", by: "HR 苏婉" },
  { id: 3, type: "公告", title: "5 月 25 日全员设计 Workshop", time: "5 月 20 日", by: "林屿" },
  { id: 4, type: "里程碑", title: "品牌 VI 升级项目正式交付", time: "5 月 10 日", by: "马宁" },
  { id: 5, type: "项目", title: "客户门户改版评审通过 v2", time: "5 月 8 日", by: "王诗" },
];

const recruit = [
  { id: "J-21", title: "高级交互设计师", level: "P5", urgent: true, applicants: 12, days: 8 },
  { id: "J-22", title: "用户研究员", level: "P4", urgent: false, applicants: 7, days: 15 },
];

function StatusDot({ s }: { s: MemberStatus }) {
  const map: Record<MemberStatus, string> = {
    在职: "bg-emerald-500",
    请假: "bg-amber-500",
    出差: "bg-indigo-500",
    试用期: "bg-fuchsia-500",
  };
  return (
    <span
      className={`inline-block h-1.5 w-1.5 rounded-full ${map[s]}`}
      title={s}
    />
  );
}

const filters = ["全部", "在职", "请假", "出差", "试用期"] as const;

export default function Departments() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("全部");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    return members.filter((m) => {
      if (filter !== "全部" && m.status !== filter) return false;
      if (query && !`${m.name}${m.role}${m.email}`.includes(query)) return false;
      return true;
    });
  }, [filter, query]);

  return (
    <div className="grid h-full min-h-0 grid-cols-12 grid-rows-[auto_minmax(0,1fr)_minmax(0,1fr)] gap-3 lg:gap-4">
      {/* Row 1 stats */}
      <div className="col-span-12 grid grid-cols-4 gap-3 lg:gap-4">
        <StatTile label="部门人数" value={department.members} hint="设计部" tone="ocean" />
        <StatTile label="在研项目" value={department.ongoingProjects} hint="2 项即将延期" tone="amber" />
        <StatTile
          label="本周交付"
          value={department.weeklyDelivered}
          hint="同比 +18%"
          tone="emerald"
        />
        <StatTile
          label="岗位空缺"
          value={department.vacancies}
          hint="平均 11 天填补"
          tone="rose"
        />
      </div>

      {/* Row 2: 成员列表 + 部门概览 */}
      <div className="col-span-8 row-span-2 min-h-0">
        <Card
          title="部门成员"
          subtitle={`${department.name} · ${visible.length} / ${members.length} 人`}
          action={
            <div className="flex items-center gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索姓名 / 邮箱..."
                className="w-32 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/15"
              />
              <button className="rounded-lg bg-ocean-900 px-3 py-1 text-xs font-medium text-white transition hover:bg-ocean-800">
                + 邀请
              </button>
            </div>
          }
          bodyClassName="flex flex-col gap-2 overflow-hidden"
        >
          <div className="flex shrink-0 flex-wrap gap-1.5">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-2.5 py-0.5 text-xs transition ${
                  filter === f
                    ? "bg-ocean-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 bg-white text-left text-xs text-slate-400">
                <tr>
                  <th className="pb-1.5 pr-2 font-normal">成员</th>
                  <th className="pb-1.5 pr-2 font-normal">职级</th>
                  <th className="pb-1.5 pr-2 font-normal">入职</th>
                  <th className="pb-1.5 pr-2 font-normal">项目</th>
                  <th className="pb-1.5 pr-2 font-normal">状态</th>
                  <th className="pb-1.5 font-normal" />
                </tr>
              </thead>
              <tbody>
                {visible.map((m) => (
                  <tr
                    key={m.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50/60"
                  >
                    <td className="py-1.5 pr-2">
                      <div className="flex items-center gap-2">
                        <Avatar initials={m.initials} size="sm" />
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium text-ocean-950">
                            {m.name}
                          </div>
                          <div className="truncate text-[11px] text-slate-400">
                            {m.role}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-1.5 pr-2">
                      <span className="rounded bg-ocean-50 px-1.5 py-0.5 text-[11px] font-medium text-ocean-700">
                        {m.level}
                      </span>
                    </td>
                    <td className="py-1.5 pr-2 text-xs text-slate-500">
                      {m.joinedAt}
                    </td>
                    <td className="py-1.5 pr-2 text-xs text-slate-500">
                      {m.projects} 项
                    </td>
                    <td className="py-1.5 pr-2">
                      <span className="inline-flex items-center gap-1 text-xs text-slate-600">
                        <StatusDot s={m.status} />
                        {m.status}
                      </span>
                    </td>
                    <td className="py-1.5 text-right">
                      <button className="text-xs text-ocean-700 hover:text-ocean-900">
                        详情
                      </button>
                    </td>
                  </tr>
                ))}
                {visible.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-xs text-slate-400"
                    >
                      没有匹配的成员
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Row 2 right: 部门概览 */}
      <div className="col-span-4 row-span-1 min-h-0">
        <Card
          title="部门概览"
          subtitle={`负责人 ${department.head}`}
          action={
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
              运转良好
            </span>
          }
          bodyClassName="flex flex-col gap-2"
        >
          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-slate-500">职级分布</span>
              <span className="text-slate-400">{members.length} 人</span>
            </div>
            <div className="flex h-2 overflow-hidden rounded-full bg-slate-100">
              {[
                { lv: "P5", count: 1, color: "bg-ocean-700" },
                { lv: "P4", count: 4, color: "bg-ocean-500" },
                { lv: "P3", count: 3, color: "bg-emerald-500" },
                { lv: "P1", count: 1, color: "bg-amber-500" },
              ].map((s) => (
                <div
                  key={s.lv}
                  className={`${s.color}`}
                  style={{ width: `${(s.count / members.length) * 100}%` }}
                  title={`${s.lv}: ${s.count}`}
                />
              ))}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-ocean-700" /> P5 ×1
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-ocean-500" /> P4 ×4
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> P3
                ×3
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> P1 ×1
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-2.5">
            <div className="text-xs text-slate-500">公司中的位置</div>
            <div className="mt-1.5 grid grid-cols-5 gap-1">
              {company.departments.map((d) => (
                <div
                  key={d.name}
                  className={`flex flex-col items-center gap-1 rounded-lg p-1 ${
                    d.mine ? "bg-white ring-2 ring-ocean-300" : ""
                  }`}
                  title={`${d.name} · ${d.count} 人`}
                >
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold text-white ${d.color}`}
                  >
                    {d.head}
                  </div>
                  <span className="text-[10px] text-slate-600">{d.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-amber-50/60 px-2.5 py-2 text-xs text-amber-800">
            本月新入职 1 人 · 上月离职 0 人
          </div>
        </Card>
      </div>

      {/* Row 3 right: 招聘 + 动态 */}
      <div className="col-span-4 row-span-1 min-h-0">
        <Card
          title="招聘进度"
          subtitle={`${recruit.length} 个开放岗位`}
          action={
            <button className="text-xs text-ocean-700 hover:text-ocean-900">
              发起招聘
            </button>
          }
          bodyClassName="flex flex-col gap-2 overflow-y-auto pr-1"
        >
          {recruit.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border border-slate-100 bg-white p-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-ocean-950">
                      {r.title}
                    </span>
                    <span className="rounded bg-ocean-50 px-1.5 py-0.5 text-[11px] font-medium text-ocean-700">
                      {r.level}
                    </span>
                    {r.urgent && (
                      <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-[10px] font-medium text-rose-700">
                        紧急
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-400">
                    {r.id} · 开放 {r.days} 天 · {r.applicants} 份简历
                  </div>
                </div>
                <button className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:border-ocean-300 hover:text-ocean-700">
                  看简历
                </button>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Row 3 left wide: 部门动态 */}
      <div className="col-span-8 row-span-1 min-h-0">
        <Card
          title="部门动态"
          subtitle="最近 30 天"
          action={
            <button className="text-xs text-ocean-700 hover:text-ocean-900">
              查看全部
            </button>
          }
          bodyClassName="overflow-y-auto pr-1"
        >
          <ol className="relative ml-2 border-l border-slate-200 pl-4">
            {events.map((e) => (
              <li key={e.id} className="mb-2.5 last:mb-0">
                <span
                  className={`absolute -left-[5px] mt-1 h-2.5 w-2.5 rounded-full ring-2 ring-white ${
                    e.type === "项目"
                      ? "bg-ocean-500"
                      : e.type === "招聘"
                        ? "bg-indigo-500"
                        : e.type === "公告"
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                  }`}
                />
                <div className="flex items-baseline gap-2">
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                    {e.type}
                  </span>
                  <span className="text-sm text-ocean-900">{e.title}</span>
                </div>
                <div className="mt-0.5 text-[11px] text-slate-400">
                  {e.by} · {e.time}
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  );
}
