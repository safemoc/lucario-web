import SystemOperationStatus from "@/app/ui/system";
import {MottoCard, SystemCard} from "@/app/ui/cards";
import LoginForm from "@/app/ui/login";
import React from "react";


export default function Page() {
    return (
        <>
            <div className={"relative flex min-h-screen flex-col lg:flex-row"}>
                <section className={"hidden lg:flex lg:w-3/5 flex-col justify-between p-12 xl:p-16"}>
                    <SystemCard unfold={true}/>
                    <div className={"max-w-xl space-y-7"}>
                        <h1 className={"text-5xl font-bold leading-tight"}>
                            欢迎回来
                            <br/>
                            <span
                                className={"bg-linear-to-r from-white to-ocean-200 bg-clip-text text-transparent"}>深邃入海，自在如风</span>

                        </h1>
                        <p className={"max-w-md text-base leading-relaxed text-ocean-100/85"}>登录你的账户，开启一段沉浸式的工作体验。我们用细节守护效率，用设计陪伴你的每一刻。</p>
                        <MottoCard/>
                    </div>


                    <SystemOperationStatus/>
                </section>

                <section
                    className="flex flex-1 items-center justify-center px-6 py-12 sm:px-12 lg:w-2/5 lg:justify-end lg:pr-16 xl:pr-24">
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
                    <LoginCard/>
                </section>
            </div>
        </>
    )
}


function LoginHeader() {
    return (
        <header className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-ocean-950">
                登录账户
            </h2>
            <p className="mt-2 text-sm text-slate-500">
                输入你的邮箱与密码，继续未完成的旅程。
            </p>
        </header>
    )
}


function LoginCard() {
    return (
        <div
            className="relative w-full max-w-md rounded-3xl border border-white/60 bg-white p-8 text-ocean-900 shadow-[0_30px_80px_-20px_rgba(3,16,29,0.6)] ring-1 ring-ocean-900/5 sm:p-10">
            <LoginHeader/>
            <LoginForm/>
        </div>
    )
}