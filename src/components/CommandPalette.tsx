import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../hooks/queries";
import { useUiStore } from "../stores/ui";

const typeLabels: Record<string, string> = {
  project: "项目",
  asset: "资产",
  knowledge: "文档",
  member: "同事",
  social: "动态",
};

export function CommandPalette() {
  const open = useUiStore((s) => s.commandOpen);
  const setOpen = useUiStore((s) => s.setCommandOpen);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data: results = [] } = useSearch(query, open);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <Command
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        shouldFilter={false}
      >
        <Command.Input
          value={query}
          onValueChange={setQuery}
          placeholder="搜索资产、项目、文档、同事..."
          className="w-full border-b border-slate-200 bg-transparent px-4 py-3 text-sm outline-none dark:border-slate-700 dark:text-white"
        />
        <Command.List className="max-h-72 overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-slate-400">
            {query ? "未找到匹配结果" : "输入关键词开始搜索"}
          </Command.Empty>
          {results.map((r) => (
            <Command.Item
              key={`${r.type}-${r.id}`}
              value={r.id}
              onSelect={() => {
                const path = r.query
                  ? `/${r.tab}?highlight=${r.query}`
                  : `/${r.tab}`;
                navigate(path);
                setOpen(false);
              }}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm aria-selected:bg-ocean-50 dark:aria-selected:bg-ocean-900/40"
            >
              <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {typeLabels[r.type] ?? r.type}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-ocean-950 dark:text-white">
                  {r.title}
                </div>
                {r.subtitle && (
                  <div className="truncate text-xs text-slate-400">
                    {r.subtitle}
                  </div>
                )}
              </div>
            </Command.Item>
          ))}
        </Command.List>
      </Command>
    </div>
  );
}
