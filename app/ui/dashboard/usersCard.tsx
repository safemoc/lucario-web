import {ReactNode} from "react";

export function Card({
                         title,
                         subtitle,
                         action,
                         children,
                         className = "",
                         bodyClassName = "",
                     }: {
    title: string;
    subtitle?: string;
    action?: ReactNode;
    children: ReactNode;
    className?: string;
    bodyClassName?: string;
}) {
    return (
        <section
            className={`relative flex h-full min-h-0 flex-col rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_8px_24px_-12px_rgba(6,29,51,0.12)] transition hover:shadow-[0_14px_32px_-16px_rgba(6,29,51,0.2)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-none ${className}`}
        >
            <header className="mb-3 flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                    <h3 className="text-base font-semibold text-ocean-950 dark:text-white">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
                    )}
                </div>
                {action && <div className="shrink-0 sm:max-w-[55%]">{action}</div>}
            </header>
            <div className={`min-h-0 flex-1 ${bodyClassName}`}>{children}</div>
        </section>
    );
}
export function Skeleton({
                             className = "",
                         }: {
    className?: string;
}) {
    return (
        <div
            className={`animate-pulse rounded-lg bg-slate-200/80 dark:bg-slate-700/50 ${className}`}
        />
    );
}
export function PriorityDot({ p }: { p: Priority }) {
    const map = {
        high: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]",
        medium: "bg-amber-500",
        low: "bg-slate-300",
    };
    return <span className={`inline-block h-2 w-2 rounded-full ${map[p]}`} />;
}

function TodosCard() {
    const { data: todos = [], isLoading } = useTodos();
    const toggle = useToggleTodo();
    const remaining = todos.filter((t) => !t.done).length;
    return (
        <Card
            title="我的待办"
            subtitle={`还有 ${remaining} 项未完成`}
            action={
                <button className="text-xs text-ocean-700 hover:text-ocean-900">
                    + 新增
                </button>
            }
            bodyClassName="overflow-y-auto pr-1"
        >
            {isLoading ? (
                <Skeleton className="h-24 w-full" />
            ) : (
                <ul className="space-y-1">
                    {todos.map((t) => (
                        <li
                            key={t.id}
                            className="flex items-center gap-2.5 rounded-lg px-1.5 py-1.5 transition hover:bg-slate-50"
                        >
                            <button
                                type="button"
                                onClick={() => toggle.mutate(t.id)}
                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                                    t.done
                                        ? "border-ocean-700 bg-ocean-700 text-white"
                                        : "border-slate-300 bg-white hover:border-ocean-500"
                                }`}
                                aria-label={t.done ? "标记为未完成" : "标记为已完成"}
                            >
                                {t.done && (
                                    <svg
                                        className="h-3 w-3"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                )}
                            </button>
                            <div className="min-w-0 flex-1">
                                <div
                                    className={`truncate text-sm ${
                                        t.done ? "text-slate-400 line-through" : "text-ocean-900"
                                    }`}
                                >
                                    {t.text}
                                </div>
                                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
                                    <PriorityDot p={t.priority} />
                                    <span>{t.due}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </Card>
    );
}
