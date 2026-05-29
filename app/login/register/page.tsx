'use client'
import React, {useState} from "react";
import ShowPassword from "@/app/login/register/（common)/showPassword";
import {NextResponse} from "next/server";
import {useRouter} from "next/navigation";
export default function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [invite, setInvite] = useState("")
    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        const router = useRouter()
        e.preventDefault();
        setLoading(true)
        let result = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({
                username: "",
                email: email,
                password: password,
                real_name: "",
                invite: invite
            })
        })

        if (result) {

            router.back()
            setLoading(false)
        }
    }


    return (

        <section className={"flex min-h-screen items-center justify-center"}>
            <div className="absolute left-1/2 top-8 flex -translate-x-1/2 items-center gap-3 lg:hidden">
                <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 backdrop-blur">
                    <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M2 12c2.5-2 5 2 7.5 0S14.5 10 17 12s5-2 5-2"/>
                        <path d="M2 17c2.5-2 5 2 7.5 0S14.5 15 17 17s5-2 5-2"/>
                        <path d="M2 7c2.5-2 5 2 7.5 0S14.5 5 17 7s5-2 5-2"/>
                    </svg>
                </div>
                <span className="text-lg font-semibold text-white">Lucario</span>
            </div>
            <div
                className="relative w-full max-w-md rounded-3xl border border-white/60 bg-white p-8 text-ocean-900 shadow-[0_30px_80px_-20px_rgba(3,16,29,0.6)] ring-1 ring-ocean-900/5 sm:p-10">
                <header className="mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-ocean-950 text-center">
                        注册账户
                    </h2>
                    <p className="mt-2 text-sm text-slate-500 text-center">
                        欢迎来到Lucario
                    </p>
                </header>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                        <label htmlFor="email" className="text-sm font-medium text-ocean-900">
                            邮箱
                        </label>
                        <div className="relative">
                                <span
                                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                    <rect x="3" y="5" width="18" height="14" rx="2"/>
                                     <path d="M3 7l9 6 9-6"/>
                                    </svg>
                                </span>
                            <input
                                id="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                autoComplete="username"
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 text-ocean-950 placeholder:text-slate-400 outline-none transition focus:border-ocean-700 focus:ring-4 focus:ring-ocean-700/10"/>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label htmlFor="password" className="text-sm font-medium text-ocean-900">
                            密码
                        </label>
                        <div className="relative">
                            <span
                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                      <rect x="4" y="11" width="16" height="9" rx="2"/>
                                      <path d="M8 11V8a4 4 0 018 0v3"/>
                                    </svg>
                                 </span>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="请输入密码"
                                required
                                autoComplete="current-password"
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 pr-11 text-ocean-950 placeholder:text-slate-400 outline-none transition focus:border-ocean-700 focus:ring-4 focus:ring-ocean-700/10"/>
                            <ShowPassword show={showPassword} onToggle={() => setShowPassword(!showPassword)}/>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="password" className="text-sm font-medium text-ocean-900">
                            再次输入密码
                        </label>
                        <div className="relative">
                            <span
                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                      <rect x="4" y="11" width="16" height="9" rx="2"/>
                                      <path d="M8 11V8a4 4 0 018 0v3"/>
                                    </svg>
                                 </span>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={passwordAgain}
                                onChange={(e) => setPasswordAgain(e.target.value)}
                                placeholder="请再次输入密码"
                                required
                                autoComplete="current-password"
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 pr-11 text-ocean-950 placeholder:text-slate-400 outline-none transition focus:border-ocean-700 focus:ring-4 focus:ring-ocean-700/10"/>
                            <ShowPassword show={showPassword} onToggle={() => setShowPassword(!showPassword)}/>
                        </div>
                    </div>


                    <div className="space-y-1.5">
                        <label htmlFor="invite" className="text-sm font-medium text-ocean-900">
                            邀请码
                        </label>
                        <div className="relative">
                            <span
                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                {/*TODO: 邀请码前 svg 样式修改*/}
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                      <rect x="4" y="11" width="16" height="9" rx="2"/>
                                      <path d="M8 11V8a4 4 0 018 0v3"/>
                                    </svg>
                                 </span>
                            <input
                                id="invite"
                                type={"text"}
                                value={invite}
                                onChange={(e) => setInvite(e.target.value)}
                                placeholder="邀请码"
                                required
                                autoComplete="current-invite"
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 pr-11 text-ocean-950 placeholder:text-slate-400 outline-none transition focus:border-ocean-700 focus:ring-4 focus:ring-ocean-700/10"/>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full overflow-hidden rounded-xl bg-ocean-900 px-4 py-3 font-medium text-white shadow-lg shadow-ocean-900/30 transition hover:bg-ocean-800 active:bg-ocean-950 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading && (
                      <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                      >
                          <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeOpacity="0.25"
                              strokeWidth="4"
                          />
                          <path
                              d="M22 12a10 10 0 01-10 10"
                              stroke="currentColor"
                              strokeWidth="4"
                              strokeLinecap="round"
                          />
                      </svg>
                  )}
                    {loading ? "注 册中..." : "注 册"}
                </span></button>
                </form>
            </div>
        </section>


    )
}