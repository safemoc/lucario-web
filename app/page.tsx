import Link from 'next/link'

export default function Home() {
    return (
        <main className="mx-auto flex min-h-full max-w-2xl flex-col justify-center gap-6 px-6 py-16">
            <div>
                <h1 className="text-4xl font-semibold tracking-tight">Lucario</h1>
                <p className="mt-2 text-zinc-500">企业权限、部门、项目与知识库管理平台</p>
            </div>
            <Link
                href="/login"
                className="inline-flex w-fit rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
                登录
            </Link>
        </main>
    )
}