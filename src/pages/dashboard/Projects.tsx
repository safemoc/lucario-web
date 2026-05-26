import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState, type ReactNode } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { toast } from "sonner";
import { Drawer } from "../../components/Drawer";
import { Skeleton } from "../../components/Skeleton";
import { useProjects, useUpdateProjectStatus } from "../../hooks/queries";
import {
  Avatar,
  Card,
  StatTile,
  StatusBadge,
  statsRow5,
  type Project,
  type ProjectStatus,
} from "./shared";

const statuses: ProjectStatus[] = ["进行中", "即将延期", "即将完成", "已完成"];

const statusMeta: Record<
  ProjectStatus,
  { bar: string; head: string; soft: string }
> = {
  进行中: { bar: "bg-ocean-500", head: "text-ocean-700", soft: "bg-ocean-50" },
  即将延期: { bar: "bg-rose-500", head: "text-rose-700", soft: "bg-rose-50" },
  即将完成: { bar: "bg-amber-500", head: "text-amber-700", soft: "bg-amber-50" },
  已完成: {
    bar: "bg-emerald-500",
    head: "text-emerald-700",
    soft: "bg-emerald-50",
  },
};

const PIE_COLORS = ["#0e3b63", "#f43f5e", "#f59e0b", "#10b981"];

const projectRelations: Record<
  string,
  {
    requirements: number;
    bugs: number;
    docs: string;
    repo: string;
    env: string;
  }
> = {
  "P-201": {
    requirements: 18,
    bugs: 4,
    docs: "项目协同中台 PRD v2.1",
    repo: "lucario-web",
    env: "staging-web",
  },
  "P-188": {
    requirements: 14,
    bugs: 7,
    docs: "资产资源台账字段表",
    repo: "lucario-assets",
    env: "asset-dev",
  },
  "P-176": {
    requirements: 9,
    bugs: 2,
    docs: "内部动态治理说明",
    repo: "lucario-social",
    env: "social-beta",
  },
  "P-152": {
    requirements: 12,
    bugs: 0,
    docs: "权限模型评审纪要",
    repo: "lucario-auth",
    env: "auth-prod",
  },
  "P-220": {
    requirements: 16,
    bugs: 5,
    docs: "Agent 操作边界草案",
    repo: "lucario-agent",
    env: "agent-lab",
  },
  "P-198": {
    requirements: 10,
    bugs: 3,
    docs: "协同开发资源联动方案",
    repo: "lucario-devops",
    env: "ci-runner-02",
  },
};

function DraggableProject({
  p,
  onClick,
}: {
  p: Project;
  onClick?: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: p.id });
  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={isDragging ? "opacity-40" : ""}
    >
      <ProjectKanbanCard p={p} onClick={onClick} />
    </div>
  );
}

function DroppableColumn({
  status,
  children,
}: {
  status: ProjectStatus;
  children: ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  return (
    <div
      ref={setNodeRef}
      className={`min-h-0 flex-1 space-y-2 overflow-y-auto pr-1 ${isOver ? "rounded-lg ring-2 ring-ocean-400/60" : ""}`}
      data-status={status}
    >
      {children}
    </div>
  );
}

function ProjectKanbanCard({
  p,
  onClick,
}: {
  p: Project;
  onClick?: () => void;
}) {
  const meta = statusMeta[p.status];
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      className="cursor-grab rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm transition hover:border-ocean-200 hover:shadow-md active:cursor-grabbing dark:border-slate-700 dark:bg-slate-800"
    >
      <div className="flex items-center gap-1.5">
        <span className="truncate text-sm font-semibold text-ocean-950 dark:text-white">
          {p.name}
        </span>
        <StatusBadge status={p.status} />
      </div>
      <p className="mt-1 text-[10px] text-slate-400">
        {p.id} · {p.category ?? "项目"} · 截止 {p.due}
      </p>
      <div className="mt-2">
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full ${meta.bar}`}
            style={{ width: `${p.progress}%` }}
          />
        </div>
      </div>
      <div className="mt-2 flex -space-x-2">
        {p.team.map((t) => (
          <Avatar key={t} initials={t} size="sm" />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const { data: projects = [], isLoading } = useProjects();
  const updateStatus = useUpdateProjectStatus();
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"board" | "list">("board");
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeDrag, setActiveDrag] = useState<Project | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (query && !`${p.name}${p.id}`.includes(query)) return false;
      return true;
    });
  }, [projects, query]);

  const grouped = useMemo(() => {
    const g: Record<ProjectStatus, Project[]> = {
      进行中: [],
      即将延期: [],
      即将完成: [],
      已完成: [],
    };
    for (const p of filtered) g[p.status].push(p);
    return g;
  }, [filtered]);

  const pieData = statuses.map((s, i) => ({
    name: s,
    value: grouped[s].length,
    fill: PIE_COLORS[i],
  }));

  const onDragEnd = (e: DragEndEvent) => {
    setActiveDrag(null);
    const projectId = e.active.id as string;
    const newStatus = e.over?.id as ProjectStatus | undefined;
    if (!newStatus || !statuses.includes(newStatus)) return;
    const p = projects.find((x) => x.id === projectId);
    if (!p || p.status === newStatus) return;
    updateStatus.mutate(
      { id: projectId, status: newStatus },
      { onSuccess: () => toast.success(`已移至「${newStatus}」`) },
    );
  };

  const selectedRelation = selected ? projectRelations[selected.id] : undefined;

  if (isLoading) {
    return (
      <div className="grid h-full grid-cols-12 gap-3">
        <Skeleton className="col-span-12 h-20" />
        <Skeleton className="col-span-12 h-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 lg:grid lg:h-full lg:min-h-0 lg:grid-cols-12 lg:grid-rows-[auto_minmax(0,1fr)] lg:gap-4">
      <div className={`${statsRow5} lg:col-span-12`}>
        {statuses.map((s, i) => (
          <StatTile
            key={s}
            label={s}
            value={grouped[s].length}
            tone={(["ocean", "rose", "amber", "emerald"] as const)[i]}
          />
        ))}
        <StatTile label="项目总数" value={filtered.length} tone="indigo" />
      </div>

      <div className="min-h-[400px] flex-1 lg:col-span-12 lg:row-span-1 lg:min-h-0">
        <Card
          title="项目看板"
          subtitle="拖拽卡片可变更状态"
          action={
            <div className="flex flex-wrap items-center gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索..."
                className="w-full min-w-[120px] rounded-md border border-slate-200 px-2 py-1 text-xs outline-none focus:border-ocean-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white sm:w-32"
              />
              <div className="flex rounded-md bg-slate-100 p-0.5 text-[11px] dark:bg-slate-800">
                {(["board", "list"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setView(v)}
                    className={`rounded px-2 py-0.5 ${
                      view === v
                        ? "bg-white font-medium shadow-sm dark:bg-slate-700"
                        : ""
                    }`}
                  >
                    {v === "board" ? "看板" : "列表"}
                  </button>
                ))}
              </div>
            </div>
          }
          bodyClassName="overflow-hidden"
        >
          <div className="mb-3 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={28}
                  outerRadius={40}
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {view === "list" ? (
            <div className="min-h-0 flex-1 overflow-x-auto overflow-y-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead className="text-left text-xs text-slate-400">
                  <tr>
                    <th className="pb-2">项目</th>
                    <th>状态</th>
                    <th>进度</th>
                    <th>截止</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr
                      key={p.id}
                      className="cursor-pointer border-t border-slate-100 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                      onClick={() => setSelected(p)}
                    >
                      <td className="py-2 font-medium text-ocean-950 dark:text-white">
                        {p.name}
                      </td>
                      <td>
                        <StatusBadge status={p.status} />
                      </td>
                      <td>{p.progress}%</td>
                      <td className="text-slate-500">{p.due}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              onDragStart={(e) => {
                const p = projects.find((x) => x.id === e.active.id);
                setActiveDrag(p ?? null);
              }}
              onDragEnd={onDragEnd}
            >
              <div className="flex h-full min-h-0 gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
                {statuses.map((s) => {
                  const list = grouped[s];
                  const meta = statusMeta[s];
                  return (
                    <div
                      key={s}
                      id={s}
                      className={`flex min-h-[280px] w-[min(100%,280px)] shrink-0 flex-col rounded-xl sm:w-[260px] lg:min-h-0 lg:w-auto lg:shrink ${meta.soft} p-2 dark:bg-opacity-20`}
                    >
                      <div className="mb-2 flex items-center gap-2 px-1">
                        <StatusBadge status={s} />
                        <span className="text-xs">{list.length}</span>
                      </div>
                      <DroppableColumn status={s}>
                        {list.map((p) => (
                          <DraggableProject
                            key={p.id}
                            p={p}
                            onClick={() => setSelected(p)}
                          />
                        ))}
                      </DroppableColumn>
                    </div>
                  );
                })}
              </div>
              <DragOverlay>
                {activeDrag ? <ProjectKanbanCard p={activeDrag} /> : null}
              </DragOverlay>
            </DndContext>
          )}
        </Card>
      </div>

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ""}
      >
        {selected && (
          <div className="space-y-3 text-sm">
            <p className="text-slate-500">{selected.description ?? "暂无描述"}</p>
            <div>
              <StatusBadge status={selected.status} />
              <span className="ml-2 text-slate-500">
                {selected.category} · 进度 {selected.progress}%
              </span>
            </div>
            {selectedRelation && (
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-slate-50 p-2">
                  <div className="text-[11px] text-slate-400">需求</div>
                  <div className="mt-0.5 font-semibold text-ocean-950">
                    {selectedRelation.requirements} 条
                  </div>
                </div>
                <div className="rounded-lg bg-slate-50 p-2">
                  <div className="text-[11px] text-slate-400">Bug</div>
                  <div className="mt-0.5 font-semibold text-ocean-950">
                    {selectedRelation.bugs} 个
                  </div>
                </div>
                <div className="rounded-lg bg-slate-50 p-2">
                  <div className="text-[11px] text-slate-400">仓库</div>
                  <div className="mt-0.5 truncate font-semibold text-ocean-950">
                    {selectedRelation.repo}
                  </div>
                </div>
                <div className="rounded-lg bg-slate-50 p-2">
                  <div className="text-[11px] text-slate-400">环境</div>
                  <div className="mt-0.5 truncate font-semibold text-ocean-950">
                    {selectedRelation.env}
                  </div>
                </div>
              </div>
            )}
            <div>
              <div className="text-xs text-slate-400">团队成员</div>
              <div className="mt-1 flex -space-x-2">
                {selected.team.map((t) => (
                  <Avatar key={t} initials={t} size="sm" />
                ))}
              </div>
            </div>
            {selectedRelation && (
              <div className="rounded-lg border border-ocean-100 bg-ocean-50/60 p-2 text-xs text-ocean-800">
                关联文档：{selectedRelation.docs}
              </div>
            )}
            <ul className="space-y-1 text-xs text-slate-600">
              <li>□ 完成需求评审</li>
              <li>□ 核对资源与权限边界</li>
              <li>□ 联调仓库、环境和通知事件</li>
            </ul>
          </div>
        )}
      </Drawer>
    </div>
  );
}
