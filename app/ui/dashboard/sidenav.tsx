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

        <div className={"flex-y shrink-0 items-top py-5  bg-green-50 min-h-screen w-auto"}>

            <SystemCard fold={fold} setFold={()=>setFold(!fold)}/>
            <nav className={"flex-1 space-y-1 overflow-y-auto"}>
                {navItems.map((item) => (
                    <Link key={item.path} href={item.path} title={item.label}
                          className={"group relative flex items-center rounded-xl text-sm transition "}>
                        <item.icon className={"h-5 w-5 shrink-0"} strokeWidth={1.8}/>
                        {
                            fold && <span className={"truncate"}>{item.label}</span>
                        }
                    </Link>
                ))}

            </nav>
        </div>


    )
}