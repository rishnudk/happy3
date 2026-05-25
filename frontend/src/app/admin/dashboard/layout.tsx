"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import { clearCredentials } from "@/lib/store/features/authSlice";
import { GlobalBackground } from "@/components/landing/GlobalBackground";
import { Shield, LogOut, Activity, Users, Settings, Award } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/Slidebar";

export default function AdminDashboardPage({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, isInitialized, isAdmin } = useAppSelector((state) => state.auth);

    console.log({
        user,
        isAdmin,
        isInitialized,
      });


    // useEffect(() => {
    //     // If auth state has initialized and user is not an admin, redirect them
    //     if (!isInitialized) return;
    //     if (!isAdmin || !user) {
    //         toast.error("Access Denied", {
    //             description: "You do not have administrative clearance to access the operations node.",
    //         });
    //         router.replace("/admin");
    //     }
    // }, [user, isAdmin, isInitialized, router]);

    const handleSignOut = async () => {
        try {
            await fetch("http://localhost:3000/api/auth/logout", {
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

    if (!isInitialized ) {
        return (
            <main className="relative min-h-screen w-full flex items-center justify-center">
                <GlobalBackground />
                <div className="text-center z-10">
                    <Shield className="h-10 w-10 text-primary animate-spin mx-auto mb-4" />
                    <h2 className="text-nature-black/70 font-semibold">Verifying credentials...</h2>
                </div>
            </main>
        );
    }
      // Prevent rendering protected content
  if (!user || !isAdmin) {
    return null;
  }

    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <main>
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarProvider>
        </>
    );
}
