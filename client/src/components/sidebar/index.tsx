"use client";

import { useAppDispatch, useAppSelector } from "@/components/redux";
import { setIsSidebarCollapsed } from "@/app/state";
import { cn } from "@/lib/utils";
import { Archive, CircleDollarSign, Clipboard, Layout, LucideIcon, MenuIcon, SlidersHorizontal, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
    href: string;
    icon: LucideIcon,
    label: string;
    isCollpased: boolean;
};

const Sidebarlink = ({ href, icon: Icon, isCollpased, label }: Props) => {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

    return (
        <Link href={href}>
            <div className={cn("cursor-pointer flex items-center hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors",
                isCollpased ? "justify-center py-4" : "justify-start px-8 py-4",
                isActive ? "bg-blue-200 text-white" : ""
            )}>
                <Icon className="size-6 text-gray-700" />
                <span className={cn("font-medium text-gray-700",
                    isCollpased ? "hidden" : "block"
                )}>
                    {label}
                </span>
            </div>
        </Link>
    )
}

export const SideBar = () => {
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);


    const toogleSidebar = () => {
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
    };
   

    const sidebarClassNames = `fixed flex flex-col ${isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"} 
        bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

    return (
        <div className={sidebarClassNames}>
            {/* top logo */}
            <div className={cn("flex gap-3 justify-between md:justify-normal items-center pt-8",
                isSidebarCollapsed ? "px-5" : "px-8"
            )}>
                <div>logo</div>

                <h1 className={cn("font-extrabold text-2xl",
                    isSidebarCollapsed ? "hidden" : "block"
                )}>
                    SDSTOCK
                </h1>

                <button onClick={toogleSidebar} className="md:hidden px-3 py-3 bg-gray-100 hover:bg-blue-100 rounded-full ">
                    <MenuIcon className="size-4" />
                </button>
            </div>
            {/* Links */}
            <div className="flex-grow mt-8">
                <Sidebarlink href="/dashboard" icon={Layout} label="DashBoard" isCollpased={isSidebarCollapsed} />
                <Sidebarlink href="/inventory" icon={Archive} label="Inventory" isCollpased={isSidebarCollapsed} />
                <Sidebarlink href="/products" icon={Clipboard} label="Products" isCollpased={isSidebarCollapsed} />
                <Sidebarlink href="/users" icon={User} label="Users" isCollpased={isSidebarCollapsed} />
                <Sidebarlink href="/settings" icon={SlidersHorizontal} label="Settings" isCollpased={isSidebarCollapsed} />
                <Sidebarlink href="/expenses" icon={CircleDollarSign} label="Expenses" isCollpased={isSidebarCollapsed} />
            </div>
            {/* Footer */}
            <div className={cn("mb-10", isSidebarCollapsed ? "hidden" : "block")}>
                <p className="text-center text-xs text-gray-500">&copy; 2025 Sdstock</p>
            </div>
        </div>
    )
}