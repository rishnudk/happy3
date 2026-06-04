"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/lib/store/auth";
import { API_BASE } from "@/lib/api";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setInitialized = useAuthStore((state) => state.setInitialized);
  const setCredentials = useAuthStore((state) => state.setCredentials);

  useEffect(() => {
    const initializeAuth = async () => {
      const hasSessionUser = localStorage.getItem("user");
      const isAdminSession = localStorage.getItem("isAdmin") === "true";

      if (hasSessionUser) {
        try {
          const response = await fetch(`${API_BASE}/api/auth/refresh`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          if (response.ok) {
            const data = await response.json();
            try {
              const parsedUser = data.user || JSON.parse(localStorage.getItem("user") || "null");
              setCredentials({
                user: parsedUser,
                isAdmin: isAdminSession,
              });
            } catch {
              localStorage.removeItem("user");
              localStorage.removeItem("isAdmin");
            }
          } else {
            localStorage.removeItem("user");
            localStorage.removeItem("isAdmin");
          }
        } catch (error) {
          console.error("Silent refresh connection error:", error);
          const token = localStorage.getItem("accessToken");
          if (token && token.includes("demo")) {
            try {
              const parsedUser = JSON.parse(localStorage.getItem("user") || "null");
              setCredentials({
                user: parsedUser,
                isAdmin: isAdminSession,
              });
            } catch {}
          }
        }
      }
      setInitialized(true);
    };

    initializeAuth();
  }, [setCredentials, setInitialized]);

  return <>{children}</>;
}
