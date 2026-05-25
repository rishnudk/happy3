"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/store";
import { clearCredentials } from "@/lib/store/features/authSlice";
import { toast } from "sonner";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Shield, LayoutDashboard, PlusCircle, LogOut } from "lucide-react"

export function AppSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const menuItems = [
        {
            title: "Dashboard",
            url: "/admin/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Add Questions",
            url: "/admin/add-questions",
            icon: PlusCircle,
        },
    ];

    const handleSignOut = async () => {
        try {
            await fetch("http://localhost:5000/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
        } catch (err) {
            console.error("Sign out database sync error:", err);
        }

        dispatch(clearCredentials());
        localStorage.removeItem("user");
        localStorage.removeItem("isAdmin");

        // Clear cookies legacy
        document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict; Secure";

        window.dispatchEvent(new Event("storage"));
        toast.success("Logged out successfully");
        router.replace("/admin");
    };

    return (
        <Sidebar>
            <SidebarHeader className="border-b border-sidebar-border/40 p-4">
                <div className="flex items-center gap-2.5 px-2 py-1.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/20 transition-transform duration-300 hover:scale-105">
                        <Shield className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-sans font-black tracking-wider text-sm uppercase text-nature-black/90">
                            HCA Admin
                        </span>
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-muted-foreground">
                            Operations Node
                        </span>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className="p-3">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground/80 mb-2 px-3">
                        Management
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => {
                                const isActive = pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            className={`
                                                w-full rounded-xl px-4 py-3 flex items-center gap-3 transition-all duration-200
                                                ${isActive 
                                                    ? "bg-primary/10 text-primary font-bold shadow-sm shadow-primary/5" 
                                                    : "hover:bg-nature-black/5 text-muted-foreground hover:text-nature-black"
                                                }
                                            `}
                                        >
                                            <Link href={item.url} className="flex items-center gap-3">
                                                <item.icon className={`h-4.5 w-4.5 ${isActive ? "text-primary" : ""}`} />
                                                <span className="text-sm">{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-3 border-t border-sidebar-border/40 flex flex-col gap-2.5">
                <button
                    onClick={handleSignOut}
                    className="
                        w-full flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-black text-white 
                        bg-red-500 hover:bg-red-600 shadow-md hover:shadow-red-500/10 cursor-pointer transition-all duration-300
                    "
                >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out Terminal</span>
                </button>
                <p className="text-[10px] text-center text-muted-foreground font-semibold">
                    HCA Admin Panel v1.0
                </p>
            </SidebarFooter>
        </Sidebar>
    )
}


