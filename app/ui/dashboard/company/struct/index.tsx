import {Building2, ChevronUp, Users} from "lucide-react";
import {getDepartmentStructure, type DeptNode, type DepartmentMember} from "./actions";

function DeptCard({
                        dept,
                        variant,
                    }: {
    dept: DeptNode;
    variant: "ancestor" | "current" | "child";
}) {
    const styles = {
        ancestor:
            "border-slate-200/80 bg-slate-50 text-slate-700 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-200",
        current:
            "border-ocean-400 bg-ocean-50 text-ocean-900 shadow-[0_0_0_3px_rgba(31,100,153,0.15)] dark:border-ocean-500 dark:bg-ocean-950/40 dark:text-white dark:shadow-[0_0_0_3px_rgba(62,130,184,0.2)]",
        child:
            "border-slate-200/80 bg-white text-slate-700 dark:border-slate-600 dark:bg-slate-800/40 dark:text-slate-200",
    }[variant];

    return (
        <div
            className={`flex min-w-[7.5rem] max-w-[10rem] flex-col items-center rounded-xl border px-4 py-3 text-center transition ${styles}`}>
            <Building2
                className={`mb-1.5 h-4 w-4 shrink-0 ${variant === "current" ? "text-ocean-500" : "text-slate-400"}`}
                strokeWidth={1.5}
            />
            <span className="line-clamp-2 text-sm font-medium leading-snug">{dept.name}</span>
            {dept.code && (
                <span className="mt-1 text-[10px] tracking-wide text-slate-400 dark:text-slate-500">
                    {dept.code}
                </span>
            )}
        </div>
    );
}

function Connector({height = "h-5"}: { height?: string }) {
    return <div className={`w-px ${height} bg-slate-300 dark:bg-slate-600`}/>;
}

function OrgChart({
                      ancestors,
                      current,
                      children,
                  }: {
    ancestors: DeptNode[];
    current: DeptNode;
    children: DeptNode[];
}) {
    return (
        <div className="flex min-h-[12rem] flex-col items-center justify-center py-2">
            {ancestors.map((ancestor) => (
                <div key={ancestor.id} className="flex flex-col items-center">
                    <DeptCard dept={ancestor} variant="ancestor"/>
                    <Connector/>
                </div>
            ))}

            <div className="relative flex flex-col items-center">
                {ancestors.length > 0 && (
                    <div
                        className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center gap-1 text-[10px] text-slate-400">
                        <ChevronUp className="h-3 w-3"/>
                        <span>上级部门</span>
                    </div>
                )}
                <DeptCard dept={current} variant="current"/>
            </div>

            {children.length > 0 && (
                <div className="flex w-full flex-col items-center">
                    <Connector/>
                    <div className="mb-2 text-[10px] text-slate-400">下级部门</div>
                    <div className="relative flex w-full flex-wrap items-start justify-center gap-3 px-2">
                        {children.length > 1 && (
                            <div
                                className="absolute top-0 left-1/2 h-px w-[calc(100%-4rem)] max-w-full -translate-x-1/2 -translate-y-px bg-slate-300 dark:bg-slate-600"/>
                        )}
                        {children.map((child) => (
                            <div key={child.id} className="flex flex-col items-center">
                                {children.length > 1 && <Connector height="h-3"/>}
                                <DeptCard dept={child} variant="child"/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function MemberAvatar({name, avatar}: { name: string; avatar: string }) {
    if (avatar) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={avatar}
                alt={name}
                className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
            />
        );
    }

    const initials = name.slice(0, 2);
    return (
        <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ocean-100 text-xs font-semibold text-ocean-700 ring-2 ring-white dark:bg-ocean-900 dark:text-ocean-200 dark:ring-slate-800">
            {initials}
        </div>
    );
}

function MemberRow({member}: { member: DepartmentMember }) {
    return (
        <li
            className="flex items-center gap-3 rounded-xl border border-transparent px-2 py-2.5 transition hover:border-slate-200/80 hover:bg-slate-50/80 dark:hover:border-slate-700 dark:hover:bg-slate-800/40">
            <MemberAvatar name={member.real_name} avatar={member.avatar}/>
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ocean-950 dark:text-white">
                    {member.real_name}
                </p>
                {member.position && (
                    <p className="truncate text-xs text-slate-400">{member.position}</p>
                )}
            </div>
            {member.role_name && (
                <span
                    className="shrink-0 rounded-full bg-ocean-50 px-2.5 py-0.5 text-[11px] font-medium text-ocean-600 dark:bg-ocean-950/60 dark:text-ocean-300">
                    {member.role_name}
                </span>
            )}
        </li>
    );
}

function EmptyState({message}: { message: string }) {
    return (
        <div
            className="flex h-full min-h-[10rem] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200/80 bg-slate-50/50 p-6 text-center dark:border-slate-700 dark:bg-slate-800/20">
            <Users className="h-8 w-8 text-slate-300 dark:text-slate-600" strokeWidth={1.5}/>
            <p className="text-sm text-slate-400">{message}</p>
        </div>
    );
}

export default async function Structure() {
    const data = await getDepartmentStructure();

    return (
        <section
            className="relative flex h-auto min-h-0 flex-col rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_8px_24px_-12px_rgba(6,29,51,0.12)] transition hover:shadow-[0_14px_32px_-16px_rgba(6,29,51,0.2)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
            <header className="mb-4 flex shrink-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-base font-semibold text-ocean-950 dark:text-white">
                    公司架构
                </h3>
                {data && (
                    <p className="text-xs text-slate-400">
                        {data.companyName} · {data.current.name}
                    </p>
                )}
            </header>

            {!data ? (
                <EmptyState message="暂未分配部门，无法展示架构信息"/>
            ) : (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
                    <div
                        className="flex flex-col rounded-xl border border-slate-100 bg-slate-50/40 p-4 dark:border-slate-700/60 dark:bg-slate-800/20">
                        <h4 className="mb-3 text-xs font-medium tracking-wide text-slate-400 uppercase">
                            部门架构图
                        </h4>
                        <OrgChart
                            ancestors={data.ancestors}
                            current={data.current}
                            children={data.children}
                        />
                    </div>

                    <div
                        className="flex min-h-[12rem] flex-col rounded-xl border border-slate-100 bg-slate-50/40 p-4 dark:border-slate-700/60 dark:bg-slate-800/20">
                        <div className="mb-3 flex items-center justify-between">
                            <h4 className="text-xs font-medium tracking-wide text-slate-400 uppercase">
                                部门概览
                            </h4>
                            <span
                                className="rounded-full bg-slate-200/60 px-2 py-0.5 text-[11px] text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                                {data.members.length} 人
                            </span>
                        </div>

                        {data.members.length === 0 ? (
                            <EmptyState message="该部门暂无成员"/>
                        ) : (
                            <ul className="flex-1 space-y-0.5 overflow-y-auto">
                                {data.members.map((member) => (
                                    <MemberRow key={member.id} member={member}/>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
