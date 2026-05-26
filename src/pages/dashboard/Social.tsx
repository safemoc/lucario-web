import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Drawer } from "../../components/Drawer";
import { Skeleton } from "../../components/Skeleton";
import { useCreatePost, useSocial, useUser } from "../../hooks/queries";
import type { SocialPost } from "../../types";
import { Avatar, Card, StatTile, statsRow4 } from "./shared";

const filters = ["全部", "我关注", "本部门", "热门"] as const;

const mockComments = [
  { id: 1, author: "张楠", text: "写得太好了！", time: "10 分钟前" },
  { id: 2, author: "王诗", text: "期待后续更新～", time: "1 小时前" },
];

export default function Social() {
  const { data: user } = useUser();
  const { data: posts = [], isLoading } = useSocial();
  const createPost = useCreatePost();
  const [filter, setFilter] = useState<(typeof filters)[number]>("全部");
  const [text, setText] = useState("");
  const [detail, setDetail] = useState<SocialPost | null>(null);
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const visible = useMemo(() => {
    if (filter === "热门")
      return [...posts].sort((a, b) => b.reactions - a.reactions);
    if (filter === "本部门")
      return posts.filter((p) =>
        ["LY", "ZN", "WS", "HD", "MN", "GX", "LX", "SM"].includes(p.avatar),
      );
    if (filter === "我关注")
      return posts.filter((p) => ["ZL", "GJ", "SW", "CB"].includes(p.avatar));
    return posts;
  }, [filter, posts]);

  const publish = () => {
    const t = text.trim();
    if (!t) return;
    createPost.mutate(t, {
      onSuccess: () => {
        toast.success("动态已发布");
        setText("");
      },
    });
  };

  if (isLoading || !user) {
    return (
      <div className="grid h-full grid-cols-12 gap-3">
        <Skeleton className="col-span-12 h-16" />
        <Skeleton className="col-span-8 h-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 lg:grid lg:h-full lg:min-h-0 lg:grid-cols-12 lg:grid-rows-[auto_minmax(0,1fr)] lg:gap-4">
      <div className={statsRow4}>
        <StatTile label="动态" value={posts.length} tone="ocean" />
        <StatTile label="互动" value={posts.reduce((s, p) => s + p.reactions, 0)} tone="rose" />
        <StatTile label="评论" value={posts.reduce((s, p) => s + p.comments, 0)} tone="amber" />
        <StatTile label="话题" value={6} tone="emerald" />
      </div>

      <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm sm:flex-row sm:items-center dark:border-slate-700 dark:bg-slate-900 lg:col-span-12">
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
          className="min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
        <button
          type="button"
          onClick={publish}
          className="rounded-lg bg-ocean-900 px-3 py-1.5 text-xs font-medium text-white"
        >
          发布
        </button>
      </div>

      <div className="min-h-[360px] flex-1 lg:col-span-12 lg:min-h-0">
        <Card
          title="社交圈"
          action={
            <div className="flex gap-1 text-[11px]">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`rounded-md px-2 py-0.5 ${
                    filter === f
                      ? "bg-ocean-900 text-white"
                      : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          }
          bodyClassName="overflow-y-auto pr-1"
        >
          <ul className="space-y-3">
            {visible.map((p) => (
              <li
                key={p.id}
                role="button"
                tabIndex={0}
                onClick={() => setDetail(p)}
                onKeyDown={(e) => e.key === "Enter" && setDetail(p)}
                className="cursor-pointer rounded-xl border border-slate-100 p-3 dark:border-slate-700"
              >
                <div className="flex items-center gap-2">
                  <Avatar initials={p.avatar} size="sm" />
                  <div>
                    <span className="text-sm font-medium">{p.author}</span>
                    <span className="ml-2 text-xs text-slate-400">{p.time}</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  {p.content}
                </p>
                <div className="mt-2 flex gap-4 text-xs text-slate-500">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLiked((x) => ({ ...x, [p.id]: !x[p.id] }));
                    }}
                  >
                    {liked[p.id] ? "已赞" : "赞"} {p.reactions + (liked[p.id] ? 1 : 0)}
                  </button>
                  <span>{p.comments} 评论</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Drawer
        open={!!detail}
        onClose={() => setDetail(null)}
        title={detail ? `${detail.author} · ${detail.topic}` : ""}
      >
        {detail && (
          <div className="space-y-4 text-sm">
            <p className="text-slate-700 dark:text-slate-300">{detail.content}</p>
            <div>
              <div className="mb-2 text-xs font-medium text-slate-400">评论</div>
              <ul className="space-y-2">
                {mockComments.map((c) => (
                  <li
                    key={c.id}
                    className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800"
                  >
                    <span className="font-medium">{c.author}</span>
                    <span className="ml-2 text-xs text-slate-400">{c.time}</span>
                    <p className="mt-1">{c.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
