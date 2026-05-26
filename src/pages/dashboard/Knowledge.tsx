import Fuse from "fuse.js";
import { Star } from "lucide-react";
import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Drawer } from "../../components/Drawer";
import { Skeleton } from "../../components/Skeleton";
import { useKnowledge, useToggleStar } from "../../hooks/queries";
import type { KnowledgeArticle } from "../../types";
import { Avatar, Card, StatTile, statsRow4 } from "./shared";

const categories = [
  { key: "all", name: "全部文档", icon: "📚" },
  { key: "设计规范", name: "设计规范", icon: "🎨" },
  { key: "项目文档", name: "项目文档", icon: "📝" },
  { key: "工程实践", name: "工程实践", icon: "🛠️" },
  { key: "安全规范", name: "安全规范", icon: "🛡️" },
  { key: "入职指南", name: "入职指南", icon: "🚀" },
];

export default function Knowledge() {
  const [params] = useSearchParams();
  const qParam = params.get("q") ?? "";
  const { data: articles = [], isLoading } = useKnowledge();
  const toggleStar = useToggleStar();
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState(qParam);
  const [detail, setDetail] = useState<KnowledgeArticle | null>(null);

  const fuse = useMemo(
    () =>
      new Fuse(articles, {
        keys: ["title", "excerpt", "tags", "category"],
        threshold: 0.35,
      }),
    [articles],
  );

  const filtered = useMemo(() => {
    let list = articles;
    if (cat !== "all") list = list.filter((a) => a.category === cat);
    if (query.trim()) return fuse.search(query).map((r) => r.item);
    return list;
  }, [articles, cat, query, fuse]);

  const starred = articles.filter((a) => a.starred).length;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 lg:grid lg:h-full lg:grid-cols-12">
        <Skeleton className="h-16 lg:col-span-12" />
        <Skeleton className="h-24 lg:col-span-3" />
        <Skeleton className="min-h-[280px] lg:col-span-9" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 lg:grid lg:h-full lg:min-h-0 lg:grid-cols-12 lg:gap-4">
      <div className={`${statsRow4} lg:col-span-12`}>
        <StatTile label="文档总数" value={articles.length} tone="ocean" />
        <StatTile label="收藏" value={starred} tone="amber" />
        <StatTile label="本周更新" value={3} tone="emerald" />
        <StatTile label="阅读量" value="2.4k" tone="indigo" />
      </div>

      <div className="shrink-0 lg:col-span-3 lg:min-h-0">
        <Card title="分类" bodyClassName="overflow-x-auto lg:overflow-y-auto">
          <div className="flex gap-2 lg:flex-col lg:gap-1">
            {categories.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setCat(c.key)}
                className={`shrink-0 rounded-lg px-3 py-2 text-left text-sm whitespace-nowrap lg:w-full lg:whitespace-normal ${
                  cat === c.key
                    ? "bg-ocean-50 font-medium text-ocean-900 dark:bg-ocean-950/40"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700"
                }`}
              >
                <span className="mr-1.5">{c.icon}</span>
                {c.name}
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div className="min-h-[360px] flex-1 lg:col-span-9 lg:min-h-0">
        <Card
          title="知识库"
          action={
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索文档..."
              className="w-full min-w-[140px] rounded-md border border-slate-200 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-800 sm:w-48"
            />
          }
          bodyClassName="overflow-y-auto pr-1"
        >
          <ul className="space-y-2">
            {filtered.map((a) => (
              <li
                key={a.id}
                role="button"
                tabIndex={0}
                onClick={() => setDetail(a)}
                onKeyDown={(e) => e.key === "Enter" && setDetail(a)}
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-transparent p-2.5 hover:border-slate-200 hover:bg-slate-50/60 dark:hover:bg-slate-800"
              >
                <Avatar initials={a.avatar} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-semibold text-ocean-950 dark:text-white">
                      {a.title}
                    </span>
                    <button
                      type="button"
                      className="shrink-0"
                      aria-label={a.starred ? "取消收藏" : "收藏"}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar.mutate(a.id, {
                          onSuccess: () =>
                            toast.success(a.starred ? "已取消收藏" : "已收藏"),
                        });
                      }}
                    >
                      <Star
                        className={`h-4 w-4 ${a.starred ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
                      />
                    </button>
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">
                    {a.excerpt}
                  </p>
                  <div className="mt-1 text-[11px] text-slate-400">
                    {a.author} · {a.updatedAt}
                  </div>
                </div>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="py-8 text-center text-sm text-slate-400">
                暂无匹配文档
              </li>
            )}
          </ul>
        </Card>
      </div>

      <Drawer
        open={!!detail}
        onClose={() => setDetail(null)}
        title={detail?.title ?? ""}
      >
        {detail && (
          <article className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown>{detail.content}</ReactMarkdown>
          </article>
        )}
      </Drawer>
    </div>
  );
}
