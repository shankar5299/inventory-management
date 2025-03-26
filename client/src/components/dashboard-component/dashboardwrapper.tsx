"use client";

import StoreProvider, { useAppSelector } from "@/components/redux";
import { Navbar } from "@/components/navbar"
import { SideBar } from "@/components/sidebar"
import { cn } from "@/lib/utils";
import { useEffect } from "react";

type Props = {
    children: React.ReactNode
}

const Dashboardlayout = ({ children }: Props) => {
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.add("light");
        }
    });
    
    return (
        <div className={cn("flex bg-gray-50 text-gray-900 w-full min-h-screen",
            isDarkMode ? "dark" : "light"
        )}>
            <SideBar />
            <main className={cn("flex flex-col size-full py-7 px-9 bg-gray-50 md:pl-24",
                isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
            )}>
                <Navbar />
                {children}
            </main>
        </div >
    )
}
const Dashboardwrapper = ({ children }: Props) => {
    return (
        <StoreProvider>
            <Dashboardlayout>
                {children}
            </Dashboardlayout>
        </StoreProvider>
    )
}

export default Dashboardwrapper