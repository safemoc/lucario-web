import { useMemo, useState } from "react";
import { Avatar, Card, StatTile } from "./shared";

type Category = {
  key: string;
  name: string;
  count: number;
  icon: string;
  color: string;
};

const categories: Category[] = [
  { key: "all", name: "全部文档", count: 248, icon: "📚", color: "bg-slate-500" },
  { key: "onboarding", name: "入职指南", count: 26, icon: "🚀", color: "bg-ocean-500" },
  { key: "design", name: "设计规范", count: 48, icon: "🎨", color: "bg-fuchsia-500" },
  { key: "product", name: "产品文档", count: 62, icon: "📝", color: "bg-indigo-500" },
  { key: "engineering", name: "工程实践", count: 54, icon: "🛠️", color: "bg-emerald-500" },
  { key: "hr", name: "HR 制度", count: 22, icon: "🏢", color: "bg-amber-500" },
  { key: "tools", name: "工具教程", count: 36, icon: "🔧", color: "bg-rose-500" },
];

type Article = {
  id: string;
  title: string;
  category: string;
  author: string;
  avatar: string;
  updatedAt: string;
  views: number;
  reads: number;
  excerpt: string;
  tags: string[];
  pinned?: boolean;
  hot?: boolean;
  starred?: boolean;
};

const articles: Article[] = [
  {
    id: "K-1001",
    title: "Lucario 设计系统 v2 使用手册",
    category: "设计规范",
    author: "林屿",
    avatar: "LY",
    updatedAt: "今天 09:32",
    views: 1245,
    reads: 318,
    excerpt:
      "本手册介绍 Lucario 2.0 设计系统的设计 token、组件用法、可访问性原则以及常见问题。",
    tags: ["设计系统", "组件库", "Token"],
    pinned: true,
    hot: true,
    starred: true,
  },
  {
    id: "K-1056",
    title: "新员工入职 30 天必读清单",
    category: "入职指南",
    author: "苏婉",
    avatar: "SW",
    updatedAt: "昨天",
    views: 982,
    reads: 612,
    excerpt: "从企业文化、IT 工具到团队协作流程，帮助新同学快速度过试用期。",
    tags: ["入职", "新人"],
    pinned: true,
  },
  {
    id: "K-1132",
    title: "前端工程化最佳实践 2026",
    category: "工程实践",
    author: "高骏",
    avatar: "GJ",
    updatedAt: "2 天前",
    views: 712,
    reads: 188,
    excerpt:
      "包括 Vite、TypeScript、Tailwind 在内的现代前端工具链最佳实践与团队约定。",
    tags: ["前端", "工程化", "TypeScript"],
    hot: true,
  },
  {
    id: "K-0998",
    title: "客户门户 PRD v2.1",
    category: "产品文档",
    author: "周岚",
    avatar: "ZL",
    updatedAt: "5 月 20 日",
    views: 410,
    reads: 92,
    excerpt: "客户门户改版需求文档第二版，覆盖核心场景与边界用例。",
    tags: ["PRD", "客户门户"],
  },
  {
    id: "K-0871",
    title: "Figma 团队规范与协作流程",
    category: "工具教程",
    author: "张楠",
    avatar: "ZN",
    updatedAt: "5 月 18 日",
    views: 538,
    reads: 240,
    excerpt:
      "命名规范、组件库管理、批注流程、版本控制，全队 Figma 协作落地手册。",
    tags: ["Figma", "协作"],
    starred: true,
  },
  {
    id: "K-0644",
    title: "考勤、请假与调休制度",
    category: "HR 制度",
    author: "HR 团队",
    avatar: "HR",
    updatedAt: "4 月 12 日",
    views: 1820,
    reads: 1402,
    excerpt: "最新版考勤规则、请假流程与年假折算说明。",
    tags: ["HR", "考勤"],
  },
  {
    id: "K-1188",
    title: "可访问性 (a11y) 检查清单",
    category: "设计规范",
    author: "王诗",
    avatar: "WS",
    updatedAt: "3 天前",
    views: 234,
    reads: 80,
    excerpt:
      "颜色对比度、键盘可达性、屏幕阅读器适配、表单提示等核心检查项。",
    tags: ["a11y", "无障碍"],
    hot: true,
  },
  {
    id: "K-1199",
    title: "618 大促设计交付 SOP",
    category: "产品文档",
    author: "马宁",
    avatar: "MN",
    updatedAt: "今天 11:08",
    views: 168,
    reads: 36,
    excerpt: "覆盖 618 主会场视觉、互动玩法的标准设计交付流程与时间节点。",
    tags: ["618", "运营"],
  },
];

const tagsCloud = [
  { tag: "设计系统", n: 32, tone: "bg-ocean-100 text-ocean-700" },
  { tag: "前端", n: 28, tone: "bg-emerald-100 text-emerald-700" },
  { tag: "PRD", n: 24, tone: "bg-indigo-100 text-indigo-700" },
  { tag: "HR", n: 18, tone: "bg-amber-100 text-amber-700" },
  { tag: "Figma", n: 16, tone: "bg-fuchsia-100 text-fuchsia-700" },
  { tag: "a11y", n: 12, tone: "bg-rose-100 text-rose-700" },
  { tag: "新人入职", n: 11, tone: "bg-slate-100 text-slate-700" },
  { tag: "TypeScript", n: 9, tone: "bg-cyan-100 text-cyan-700" },
];

const myDrafts = [
  { id: "D-21", title: "Lucario Cloud 控制台改版思路", updatedAt: "今天 14:02", words: 1820 },
  { id: "D-22", title: "组件库 v2 → v3 迁移指南", updatedAt: "昨天", words: 632 },
];

const announcements = [
  {
    id: 1,
    title: "知识库 v3 上线：全新检索 + AI 摘要",
    tag: "公告",
    time: "今天",
    tone: "bg-ocean-50 text-ocean-700",
  },
  {
    id: 2,
    title: "下周二 15:00 · 设计系统使用培训",
    tag: "活动",
    time: "5 月 27 日",
    tone: "bg-emerald-50 text-emerald-700",
  },
];

export default function Knowledge() {
  const [activeCat, setActiveCat] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (
        activeCat !== "all" &&
        categories.find((c) => c.key === activeCat)?.name !== a.category
      )
        return false;
      if (
        query &&
        !`${a.title}${a.excerpt}${a.tags.join("")}`.toLowerCase().includes(query.toLowerCase())
      )
        return false;
      return true;
    });
  }, [activeCat, query]);

  const pinned = filtered.filter((a) => a.pinned);
  const others = filtered.filter((a) => !a.pinned);

  return (
    <div className="grid h-full min-h-0 grid-cols-12 grid-rows-[auto_minmax(0,1fr)_minmax(0,1fr)] gap-3 lg:gap-4">
      {/* Row 1: 搜索 + 数据 */}
      <div className="col-span-12 grid grid-cols-12 gap-3 lg:gap-4">
        <div className="col-span-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
          <svg
            className="h-4 w-4 text-slate-400"
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
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索文档、标签、作者..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
            ⌘ K
          </span>
        </div>
        <div className="col-span-8 grid grid-cols-4 gap-3 lg:gap-4">
          <StatTile label="文档总数" value={248} hint="较上月 +12" tone="ocean" />
          <StatTile label="本周更新" value={18} hint="覆盖 6 个分类" tone="emerald" />
          <StatTile label="我的收藏" value={14} hint="2 条新评论" tone="amber" />
          <StatTile label="我的贡献" value={9} hint="本月被阅读 1.2k 次" tone="fuchsia" />
        </div>
      </div>

      {/* Row 2 + 3 left: 分类侧栏 */}
      <div className="col-span-3 row-span-2 min-h-0">
        <Card
          title="分类"
          subtitle="按主题浏览文档"
          bodyClassName="overflow-y-auto pr-1"
        >
          <ul className="space-y-1">
            {categories.map((c) => {
              const active = c.key === activeCat;
              return (
                <li key={c.key}>
                  <button
                    onClick={() => setActiveCat(c.key)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition ${
                      active
                        ? "bg-ocean-50 ring-1 ring-ocean-100"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm text-white ${c.color}`}
                    >
                      {c.icon}
                    </span>
                    <span
                      className={`min-w-0 flex-1 truncate text-sm ${
                        active ? "font-medium text-ocean-900" : "text-slate-700"
                      }`}
                    >
                      {c.name}
                    </span>
                    <span className="shrink-0 rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                      {c.count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-3 rounded-xl bg-gradient-to-br from-ocean-900 to-ocean-700 p-3 text-white">
            <div className="text-xs text-white/70">写点东西</div>
            <div className="mt-0.5 text-sm font-semibold">分享你的知识</div>
            <button className="mt-2 w-full rounded-lg bg-white/15 px-2 py-1.5 text-xs font-medium ring-1 ring-white/20 backdrop-blur transition hover:bg-white/25">
              + 新建文档
            </button>
          </div>
        </Card>
      </div>

      {/* Row 2 center: 置顶 + 最新 */}
      <div className="col-span-6 row-span-2 min-h-0">
        <Card
          title={
            activeCat === "all"
              ? "全部文档"
              : categories.find((c) => c.key === activeCat)?.name || "文档"
          }
          subtitle={`${filtered.length} 篇 · 按更新时间排序`}
          action={
            <div className="flex rounded-md bg-slate-100 p-0.5 text-[11px] text-slate-500">
              <button className="rounded bg-white px-2 py-0.5 font-medium text-ocean-900 shadow-sm">
                最新
              </button>
              <button className="px-2 py-0.5">热门</button>
              <button className="px-2 py-0.5">我读过</button>
            </div>
          }
          bodyClassName="overflow-y-auto pr-1"
        >
          {pinned.length > 0 && (
            <div className="mb-2">
              <div className="mb-1 flex items-center gap-1.5 text-[11px] font-medium text-amber-700">
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
                </svg>
                置顶
              </div>
              <ul className="space-y-1.5">
                {pinned.map((a) => (
                  <ArticleRow key={a.id} a={a} />
                ))}
              </ul>
            </div>
          )}

          <ul className="space-y-1.5">
            {others.map((a) => (
              <ArticleRow key={a.id} a={a} />
            ))}
            {filtered.length === 0 && (
              <li className="py-10 text-center text-xs text-slate-400">
                没有匹配的文档，试试换个关键词
              </li>
            )}
          </ul>
        </Card>
      </div>

      {/* Row 2 right: 热门标签 + 公告 */}
      <div className="col-span-3 row-span-1 min-h-0">
        <Card
          title="热门标签"
          subtitle="点击快速筛选"
          bodyClassName="overflow-y-auto"
        >
          <div className="flex flex-wrap gap-1.5">
            {tagsCloud.map((t) => (
              <button
                key={t.tag}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition hover:opacity-80 ${t.tone}`}
              >
                # {t.tag}
                <span className="ml-1 opacity-60">{t.n}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 3 right: 我的草稿 + 公告 */}
      <div className="col-span-3 row-span-1 min-h-0">
        <Card
          title="我的草稿 & 公告"
          subtitle={`${myDrafts.length} 篇草稿`}
          bodyClassName="flex flex-col gap-2 overflow-y-auto pr-1"
        >
          <div>
            <div className="mb-1 text-[11px] font-medium text-slate-500">
              草稿
            </div>
            <ul className="space-y-1">
              {myDrafts.map((d) => (
                <li
                  key={d.id}
                  className="rounded-lg border border-slate-100 bg-slate-50/40 p-2 transition hover:border-ocean-300 hover:bg-white"
                >
                  <div className="truncate text-xs font-medium text-ocean-950">
                    {d.title}
                  </div>
                  <div className="mt-0.5 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{d.updatedAt}</span>
                    <span>{d.words} 字</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-1 text-[11px] font-medium text-slate-500">
              公告
            </div>
            <ul className="space-y-1">
              {announcements.map((a) => (
                <li
                  key={a.id}
                  className="flex items-start gap-2 rounded-lg p-1.5 transition hover:bg-slate-50"
                >
                  <span
                    className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${a.tone}`}
                  >
                    {a.tag}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs text-ocean-950">
                      {a.title}
                    </div>
                    <div className="mt-0.5 text-[10px] text-slate-400">
                      {a.time}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ArticleRow({ a }: { a: Article }) {
  return (
    <li className="group cursor-pointer rounded-xl border border-transparent p-2.5 transition hover:border-slate-200 hover:bg-slate-50/60">
      <div className="flex items-start gap-3">
        <Avatar initials={a.avatar} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-semibold text-ocean-950 group-hover:text-ocean-700">
              {a.title}
            </span>
            {a.hot && (
              <span className="rounded bg-rose-100 px-1 py-0.5 text-[9px] font-medium text-rose-700">
                热门
              </span>
            )}
            {a.starred && (
              <svg
                className="h-3 w-3 text-amber-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
              </svg>
            )}
          </div>
          <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
            {a.excerpt}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-slate-400">
            <span>{a.author}</span>
            <span>· {a.category}</span>
            <span>· {a.updatedAt}</span>
            <span className="flex items-center gap-0.5">
              <svg
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              {a.views}
            </span>
            <span className="ml-auto flex flex-wrap gap-1">
              {a.tags.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="rounded bg-ocean-50 px-1.5 py-0.5 text-[10px] text-ocean-700"
                >
                  #{t}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
