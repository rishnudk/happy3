"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store, useAppDispatch, useAppSelector } from "./store";
import { setCredentials, setInitialized } from "./features/authSlice";

function StoreInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector((state) => state.auth.isInitialized);

  useEffect(() => {
    const initializeAuth = async () => {
      const hasSessionUser = localStorage.getItem("user");
      const isAdminSession = localStorage.getItem("isAdmin") === "true";

      // If we have local state hints of an active session, trigger silent refresh
      if (hasSessionUser) {
        try {
          const response = await fetch("http://localhost:5000/api/auth/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // credentials: "include" sends the HttpOnly secure cookie to the backend
            credentials: "include",
          });

          if (response.ok) {
            const data = await response.json();

            try {
              const parsedUser = data.user || JSON.parse(localStorage.getItem("user") || "null");
              dispatch(
                setCredentials({
                  user: parsedUser,
                  isAdmin: isAdminSession,
                })
              );
            } catch {
              // Local user state corrupt
              localStorage.removeItem("user");
              localStorage.removeItem("isAdmin");
            }
          } else {
            // Cookie expired or invalid
            localStorage.removeItem("user");
            localStorage.removeItem("isAdmin");
          }
        } catch (error) {
          console.error("Silent refresh connection error:", error);
          // If network is offline, but we are in offline demo bypass mode, restore simulated keys
          const token = localStorage.getItem("accessToken");
          if (token && token.includes("demo")) {
            try {
              const parsedUser = JSON.parse(localStorage.getItem("user") || "null");
              dispatch(
                setCredentials({
                  user: parsedUser,
                  isAdmin: isAdminSession,
                })
              );
            } catch {}
          }
        }
      }
      dispatch(setInitialized(true));
    };

    initializeAuth();
  }, [dispatch]);

  // We can let guest pages render immediately and only show a subtle loading spinner for secure routers
  return <>{children}</>;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <StoreInitializer>{children}</StoreInitializer>
    </Provider>
  );
}
