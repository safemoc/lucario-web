import React from "react";
import SideNav from "@/app/ui/dashboard/sidenav";

export default function Layout({children}: { children: React.ReactNode }) {

    return (
        <>
            <div className={"flex min-h-screen "}>
            <SideNav/>
            <main>{children}</main>

        </div>

        </>
    )

}
