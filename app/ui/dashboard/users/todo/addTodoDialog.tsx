'use client'

import {useState, useTransition} from "react";
import {addTodoAction} from "@/app/ui/dashboard/users/todo/actions";

export default function AddTodoDialog() {
    const [open, setOpen] = useState(false);
    const [pending, startTransition] = useTransition();

    function handleSubmit(formData: FormData) {
        startTransition(async () => {
            await addTodoAction(formData);
            setOpen(false);
        });
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200/70 text-xs text-slate-400 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600"
            >
                新增
            </button>
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="w-full max-w-md rounded-2xl border border-slate-200/70 bg-white p-5 shadow-xl dark:border-slate-700 dark:bg-slate-900"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h4 className="mb-4 text-base font-semibold text-ocean-950 dark:text-white">
                            新增待办
                        </h4>
                        <form action={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="todo-title"
                                    className="text-sm font-medium text-ocean-900 dark:text-slate-200"
                                >
                                    标题
                                </label>
                                <input
                                    id="todo-title"
                                    name="title"
                                    type="text"
                                    placeholder="请输入待办标题"
                                    required
                                    autoFocus
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-ocean-950 placeholder:text-slate-400 outline-none transition focus:border-ocean-700 focus:ring-4 focus:ring-ocean-700/10 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    htmlFor="todo-description"
                                    className="text-sm font-medium text-ocean-900 dark:text-slate-200"
                                >
                                    描述
                                </label>
                                <textarea
                                    id="todo-description"
                                    name="description"
                                    placeholder="可选"
                                    rows={3}
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-ocean-950 placeholder:text-slate-400 outline-none transition focus:border-ocean-700 focus:ring-4 focus:ring-ocean-700/10 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    htmlFor="todo-priority"
                                    className="text-sm font-medium text-ocean-900 dark:text-slate-200"
                                >
                                    优先级
                                </label>
                                <select
                                    id="todo-priority"
                                    name="priority"
                                    defaultValue="MEDIUM"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-ocean-950 outline-none transition focus:border-ocean-700 focus:ring-4 focus:ring-ocean-700/10 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                                >
                                    <option value="LOW">低</option>
                                    <option value="MEDIUM">中</option>
                                    <option value="HIGH">高</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-2 pt-1">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="rounded-xl px-4 py-2 text-sm text-slate-500 transition hover:text-ocean-900 dark:hover:text-white"
                                >
                                    取消
                                </button>
                                <button
                                    type="submit"
                                    disabled={pending}
                                    className="rounded-xl bg-ocean-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-ocean-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-ocean-700 dark:hover:bg-ocean-600"
                                >
                                    {pending ? "提交中..." : "提交"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
