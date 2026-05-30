'use client'
import {SystemCard} from "@/app/ui/cards";
import React, {useState} from "react";
import {BookOpen, Bot, LayoutDashboard, MessageCircle, Settings, Users, Wallet, Waves} from "lucide-react";
import Link from "next/link";

const navItems = [
    {path: "/dashboard", label: "个人看板", icon: LayoutDashboard},
    {path: "/assets", label: "资产申请", icon: Wallet},
    {path: "/departments", label: "部门管理", icon: Users},
    {path: "/projects", label: "项目管理", icon: Waves},
    {path: "/knowledge", label: "知识库", icon: BookOpen},
    {path: "/social", label: "社交圈", icon: MessageCircle},
    {path: "/agent", label: "AI 助手", icon: Bot},
    {path: "/settings", label: "设置", icon: Settings},
] as const;
export default function SideNav() {
    const [fold, setFold] = useState(false);
    return (

        <div
            className={"flex-y items-top py-5 min-h-screen w-auto dark-scroll hidden h-screen shrink-0 flex-col overflow-hidden bg-linear-to-b from-ocean-950 via-ocean-900 to-ocean-800 text-white transition-[width] duration-300 lg:flex "}>

            <SystemCard fold={fold} setFold={() => setFold(!fold)}/>
            <div className={"h-8"}></div>
            <nav className={"flex-1 space-y-1 overflow-y-auto"}>
                {navItems.map((item) => (
                    <Link key={item.path} href={item.path} title={item.label}
                          className={"group relative flex items-center rounded-xl text-sm transition pl-3 pb-2 pt-2 hover:bg-gray-500"} >
                        <item.icon className={"h-5 w-5 shrink-0  mr-3"} strokeWidth={1.8}/>
                        {
                            fold && <span
                                className={"truncate text-xl font-semibold tracking-wide text-gray-300"}>{item.label}</span>
                        }
                    </Link>
                ))}

            </nav>
        </div>


    )
}