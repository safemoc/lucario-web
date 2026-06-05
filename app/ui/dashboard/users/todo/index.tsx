import {allTodo} from "@/app/ui/dashboard/users/todo/actions";
import AddTodoDialog from "@/app/ui/dashboard/users/todo/addTodoDialog";

export default async function Todo() {
    const todos = await allTodo();
    const remaining = todos.length;

    return (
        <section
            className={"relative flex h-auto  max-h-1/3 min-h-0 flex-col rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_8px_24px_-12px_rgba(6,29,51,0.12)] transition hover:shadow-[0_14px_32px_-16px_rgba(6,29,51,0.2)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"}>
            <header className={"mb-3 flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-center"}>
                <h3 className={"text-base font-semibold text-ocean-950 dark:text-white"}>
                    我的代办
                </h3>
                <p className={"mt-5 text-xs text-slate-400"}>
                    还有{remaining} 项未完成
                </p>

            </header>
            <div className={"flex justify-end"}>
                <AddTodoDialog/>
            </div>


            <main className={"flex-1"}>
                <ul>
                    {todos.map(
                        (todo)=>{
                            return(
                                // TODO: 列表内容填充
                                <li key={todo.id}>{todo.title}</li>
                            )
                        }
                    )}
                </ul>
            </main>
        </section>
    )
}


