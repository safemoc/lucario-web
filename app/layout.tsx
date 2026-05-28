import "@/app/ui/global.css"

import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import React from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "Lucario",
        template: "%s | Lucario",
    },

    description:
        "企业权限、部门、项目与知识库管理平台",

    applicationName: "Lucario",

    keywords: [
        "后台管理",
        "RBAC",
        "权限系统",
        "知识库",
        "项目管理"
    ],

    icons: {
        icon: "@/public/favicon.png",
    },

    authors: [
        {
            name: "Lyke",
        }
    ]
};
export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
        <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}
