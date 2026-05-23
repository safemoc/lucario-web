import { useMemo, useState } from "react";
import {
  Avatar,
  Card,
  StatTile,
  socialPosts,
  user,
  type SocialPost,
} from "./shared";

const extraPosts: SocialPost[] = [
  {
    id: 101,
    author: "韩冬",
    avatar: "HD",
    time: "今天 14:25",
    topic: "用研周记",
    content:
      "本周完成 8 位深度访谈，关于自助门户的核心痛点已经汇总到知识库，欢迎评审～",
    reactions: 14,
    comments: 5,
    accent: "bg-cyan-500",
  },
  {
    id: 102,
    author: "刘星",
    avatar: "LX",
    time: "今天 12:08",
    topic: "动效分享",
    content:
      "做了一组登录页过场动画的探索，文件已传 Figma，期待大家的反馈！",
    reactions: 22,
    comments: 7,
    accent: "bg-fuchsia-500",
  },
  {
    id: 103,
    author: "苏明",
    avatar: "SM",
    time: "昨天 21:14",
    topic: "插画灵感",
    content: "周末画了几张春日小品，分享给大家治愈一下。",
    reactions: 38,
    comments: 11,
    accent: "bg-emerald-500",
  },
];

const allPosts: SocialPost[] = [...socialPosts, ...extraPosts].sort(
  (a, b) => b.id - a.id,
);

const filters = ["全部", "我关注", "本部门", "热门"] as const;

type Topic = { name: string; count: number; trend: "up" | "flat" | "down" };

const topics: Topic[] = [
  { name: "618 大促", count: 28, trend: "up" },
  { name: "Lucario 2.0", count: 24, trend: "up" },
  { name: "团建合照", count: 18, trend: "up" },
  { name: "Q2 总结", count: 12, trend: "flat" },
  { name: "新工位", count: 9, trend: "flat" },
  { name: "内训招募", count: 6, trend: "down" },
];

type Suggested = {
  id: number;
  name: string;
  initials: string;
  dept: string;
  bio: string;
};

const suggested: Suggested[] = [
  { id: 1, name: "周岚", initials: "ZL", dept: "产品部", bio: "产品负责人 · 写需求也写诗" },
  { id: 2, name: "高骏", initials: "GJ", dept: "工程部", bio: "全栈工程师 · 咖啡爱好者" },
  { id: 3, name: "陈博", initials: "CB", dept: "CEO 办公室", bio: "陪大家一起飞" },
];

const upcomingEvents = [
  { id: 1, title: "5 月 25 日 · 设计部 Workshop", tag: "活动", tone: "bg-ocean-50 text-ocean-700" },
  { id: 2, title: "5 月 27 日 · 设计系统培训", tag: "培训", tone: "bg-emerald-50 text-emerald-700" },
  { id: 3, title: "6 月 1 日 · 全员家庭日", tag: "公告", tone: "bg-amber-50 text-amber-700" },
];

function Trend({ t }: { t: Topic["trend"] }) {
  const map = {
    up: { c: "text-rose-500", d: "M5 12l5-5 5 5M10 7v12" },
    flat: { c: "text-slate-400", d: "M5 12h14" },
    down: { c: "text-emerald-500", d: "M5 12l5 5 5-5M10 17V5" },
  };
  const it = map[t];
  return (
    <svg
      className={`h-3 w-3 ${it.c}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={it.d} />
    </svg>
  );
}

export default function Social() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("全部");
  const [text, setText] = useState("");
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [local, setLocal] = useState<SocialPost[]>(allPosts);

  const visible = useMemo(() => {
    if (filter === "热门") return [...local].sort((a, b) => b.reactions - a.reactions);
    if (filter === "本部门") return local.filter((p) => ["LY", "ZN", "WS", "HD", "MN", "GX", "LX", "SM"].includes(p.avatar));
    if (filter === "我关注") return local.filter((p) => ["ZL", "GJ", "SW", "CB"].includes(p.avatar));
    return local;
  }, [filter, local]);

  const publish = () => {
    const t = text.trim();
    if (!t) return;
    setLocal((prev) => [
      {
        id: Date.now(),
        author: user.name,
        avatar: user.avatarInitials,
        time: "刚刚",
        topic: "随想",
        content: t,
        reactions: 0,
        comments: 0,
        accent: "bg-ocean-500",
      },
      ...prev,
    ]);
    setText("");
  };

  return (
    <div className="grid h-full min-h-0 grid-cols-12 grid-rows-[auto_minmax(0,1fr)_minmax(0,1fr)] gap-3 lg:gap-4">
      {/* Row 1 stats + composer */}
      <div className="col-span-12 grid grid-cols-12 gap-3 lg:gap-4">
        <div className="col-span-8 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
          <Avatar initials={user.avatarInitials} size="md" />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                publish();
              }
            }}
            placeholder={`${user.name}，今天想说点什么？`}
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
          <button className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-ocean-700">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </button>
          <button className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-ocean-700">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
            </svg>
          </button>
          <button
            onClick={publish}
            disabled={!text.trim()}
            className="rounded-lg bg-ocean-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-ocean-800 disabled:bg-slate-300"
          >
            发布
          </button>
        </div>
        <div className="col-span-4 grid grid-cols-3 gap-3 lg:gap-4">
          <StatTile label="本周动态" value={local.length} hint="同事更新" tone="ocean" />
          <StatTile label="我的获赞" value={86} hint="本月" tone="rose" />
          <StatTile label="我的关注" value={42} hint="同事" tone="emerald" />
        </div>
      </div>

      {/* Row 2 left: 动态流 */}
      <div className="col-span-8 row-span-2 min-h-0">
        <Card
          title="动态广场"
          subtitle={`${visible.length} 条动态`}
          action={
            <div className="flex rounded-md bg-slate-100 p-0.5 text-[11px] text-slate-500">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded px-2 py-0.5 transition ${
                    filter === f
                      ? "bg-white font-medium text-ocean-900 shadow-sm"
                      : "hover:text-ocean-700"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          }
          bodyClassName="overflow-y-auto pr-1"
        >
          <ul className="space-y-2.5">
            {visible.map((p) => {
              const isLiked = liked[p.id] ?? false;
              return (
                <li
                  key={p.id}
                  className="rounded-xl border border-slate-100 bg-white p-3 transition hover:border-ocean-200 hover:shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <Avatar initials={p.avatar} size="md" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium text-ocean-950">
                          {p.author}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium text-white ${p.accent}`}
                        >
                          {p.topic}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {p.time}
                      </div>
                    </div>
                    <button className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="5" r="1.5" />
                        <circle cx="12" cy="12" r="1.5" />
                        <circle cx="12" cy="19" r="1.5" />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ocean-900">
                    {p.content}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-xs">
                    <button
                      onClick={() =>
                        setLiked((m) => ({ ...m, [p.id]: !m[p.id] }))
                      }
                      className={`flex items-center gap-1 rounded-md px-2 py-1 transition ${
                        isLiked
                          ? "bg-rose-50 text-rose-700"
                          : "text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill={isLiked ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 21s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 11c0 5.5-7 10-7 10z" />
                      </svg>
                      {p.reactions + (isLiked ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1 rounded-md px-2 py-1 text-slate-500 hover:bg-slate-50">
                      <svg
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                      </svg>
                      {p.comments}
                    </button>
                    <button className="flex items-center gap-1 rounded-md px-2 py-1 text-slate-500 hover:bg-slate-50">
                      <svg
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                      </svg>
                      分享
                    </button>
                    <button className="ml-auto text-slate-400 hover:text-ocean-700">
                      收藏
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      {/* Row 2 right: 热门话题 */}
      <div className="col-span-4 row-span-1 min-h-0">
        <Card
          title="热门话题"
          subtitle="本周大家在讨论"
          bodyClassName="overflow-y-auto pr-1"
        >
          <ol className="space-y-1.5">
            {topics.map((t, i) => (
              <li
                key={t.name}
                className="flex items-center gap-2.5 rounded-lg px-1.5 py-1.5 transition hover:bg-slate-50"
              >
                <span
                  className={`w-5 shrink-0 text-center text-sm font-semibold ${
                    i < 3 ? "text-rose-500" : "text-slate-400"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-ocean-900">
                    # {t.name}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {t.count} 条动态
                  </div>
                </div>
                <Trend t={t.trend} />
              </li>
            ))}
          </ol>
        </Card>
      </div>

      {/* Row 3 right: 推荐关注 + 活动 */}
      <div className="col-span-4 row-span-1 min-h-0">
        <Card
          title="推荐关注 · 活动"
          subtitle="拓展你的同事网络"
          bodyClassName="flex flex-col gap-2 overflow-y-auto pr-1"
        >
          <div>
            <div className="mb-1 text-[11px] font-medium text-slate-500">
              你可能想认识
            </div>
            <ul className="space-y-1.5">
              {suggested.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center gap-2.5 rounded-lg px-1.5 py-1.5 transition hover:bg-slate-50"
                >
                  <Avatar initials={s.initials} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-ocean-950">
                      {s.name}{" "}
                      <span className="ml-1 text-[11px] text-slate-400">
                        · {s.dept}
                      </span>
                    </div>
                    <div className="truncate text-[11px] text-slate-500">
                      {s.bio}
                    </div>
                  </div>
                  <button className="shrink-0 rounded-md border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-600 transition hover:border-ocean-300 hover:text-ocean-700">
                    + 关注
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-1 text-[11px] font-medium text-slate-500">
              近期活动
            </div>
            <ul className="space-y-1">
              {upcomingEvents.map((e) => (
                <li
                  key={e.id}
                  className="flex items-start gap-2 rounded-lg p-1.5 transition hover:bg-slate-50"
                >
                  <span
                    className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${e.tone}`}
                  >
                    {e.tag}
                  </span>
                  <span className="text-xs text-ocean-950">{e.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
