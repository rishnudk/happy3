"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, Check, ArrowRight, User, Lock } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch } from "@/lib/store/store";
import { setCredentials } from "@/lib/store/features/authSlice";

export function AdminLoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // State variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  // UI Actions State
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validation
  const validateForm = () => {
    const tempErrors: { username?: string; password?: string } = {};
    let isValid = true;

    if (!username.trim()) {
      tempErrors.username = "Username is required";
      isValid = false;
    }
    if (!password) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please enter your admin credentials.");
      return;
    }

    setIsLoading(true);

    try {
      // Connect to backend API with credentials included (cookies are stored automatically)
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials.");
      }

      const { user } = data;

      // Dispatch credentials strictly in-memory (Redux) - Note: accessToken is omitted!
      dispatch(setCredentials({ user, isAdmin: true }));

      // Save public metadata in localStorage as hints for silent refresh on reload
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAdmin", "true");

      setIsSuccess(true);
      toast.success("Login successful!", {
        description: "Entering administrative dashboard.",
      });

      // Dispatch storage event to notify other layout parts (like Navbar)
      window.dispatchEvent(new Event("storage"));

      setTimeout(() => {
        router.replace("/admin/dashboard");
      }, 1200);

    } catch (error: any) {
      console.error("Admin Auth Error:", error);

      let errorMsg = error.message || "Access denied.";

      // Developer offline bypass safeguard
      if (error instanceof TypeError && error.message.includes("fetch")) {
        if (username === "admin" && password === "admin") {
          setIsSuccess(true);
          toast.success("Demo Mode Login successful!", {
            description: "Bypassing server connection.",
          });

          const demoUser = { id: 99, username: "admin", name: "System Administrator" };
          dispatch(setCredentials({ user: demoUser, isAdmin: true }));

          localStorage.setItem("user", JSON.stringify(demoUser));
          localStorage.setItem("isAdmin", "true");

          window.dispatchEvent(new Event("storage"));

          setTimeout(() => {
            router.replace("/admin/dashboard");
          }, 1200);
          return;
        }

        errorMsg = "Unable to connect to the authentication server. Ensure backend is running on port .";
      }

      toast.error("Access Denied", {
        description: errorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-surface w-full max-w-[420px] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl border border-white/30"
    >
      {/* Subtle decorative glowing background blurs */}
      <div className="absolute top-[-30px] right-[-30px] w-[160px] h-[160px] rounded-full bg-primary/10 blur-2xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-30px] left-[-30px] w-[160px] h-[160px] rounded-full bg-secondary/15 blur-2xl pointer-events-none animate-pulse" style={{ animationDelay: "1.5s" }} />

      {/* Header with Logo */}
      <div className="flex flex-col items-center text-center mb-7 relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
          whileHover={{ rotate: 12, scale: 1.08 }}
          className="mb-3.5 cursor-pointer select-none drop-shadow-[0_4px_10px_rgba(128,0,128,0.15)]"
        >
          <Image
            src="/home/logo.svg"
            alt="Happiness Coaching Academy Logo"
            width={60}
            height={60}
            className="h-14 w-14 sm:h-16 sm:w-16 object-contain animate-float-slow"
            priority
          />
        </motion.div>

        <div className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-primary/80 mb-1.5 font-sans">
          Happiness Coaching Academy
        </div>

        <h2 className="font-display text-2xl font-black tracking-tight text-nature-black/90">
          Admin Terminal
        </h2>
        <p className="text-xs text-muted-foreground mt-1 max-w-[280px] leading-relaxed">
          Provide your administrative ID and password to access the operations node.
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        {/* Username Field */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-nature-black/70 flex items-center justify-between">
            <span>Operator Username</span>
            {errors.username && (
              <span className="text-[10px] text-red-500 font-normal lowercase tracking-normal animate-shake">
                {errors.username}
              </span>
            )}
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-nature-black/40 group-focus-within:text-primary transition-colors duration-300">
              <User className="h-4.5 w-4.5" />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) setErrors(prev => ({ ...prev, username: undefined }));
              }}
              placeholder="Enter operator username"
              disabled={isLoading || isSuccess}
              className="
                w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200/80 bg-white/45 text-sm text-nature-black
                placeholder:text-gray-400 backdrop-blur-sm transition-all duration-300
                focus:outline-none focus:bg-white/80 focus:border-primary/50 focus:ring-4 focus:ring-primary/5
                disabled:opacity-60
              "
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-nature-black/70 flex items-center justify-between">
            <span>Security Password</span>
            {errors.password && (
              <span className="text-[10px] text-red-500 font-normal lowercase tracking-normal animate-shake">
                {errors.password}
              </span>
            )}
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-nature-black/40 group-focus-within:text-primary transition-colors duration-300">
              <Lock className="h-4.5 w-4.5" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
              }}
              placeholder="Enter password"
              disabled={isLoading || isSuccess}
              className="
                w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200/80 bg-white/45 text-sm text-nature-black
                placeholder:text-gray-400 backdrop-blur-sm transition-all duration-300
                focus:outline-none focus:bg-white/80 focus:border-primary/50 focus:ring-4 focus:ring-primary/5
                disabled:opacity-60
              "
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <motion.button
            type="submit"
            disabled={isLoading || isSuccess}
            whileHover={{ scale: 1.015, y: -0.5 }}
            whileTap={{ scale: 0.985 }}
            className={`
              w-full py-3.5 rounded-2xl text-sm font-black tracking-wide text-white shadow-lg
              flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer
              ${isSuccess
                ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20"
                : "bg-primary hover:bg-primary/95 shadow-[0_8px_24px_-4px_rgba(128,0,128,0.3)] hover:shadow-[0_12px_28px_-4px_rgba(128,0,128,0.45)]"
              }
            `}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isLoading ? (
                <motion.span
                  key="verifying"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Authorizing Node...</span>
                </motion.span>
              ) : isSuccess ? (
                <motion.span
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5"
                >
                  <Check className="h-4.5 w-4.5 text-white" />
                  <span>Credentials Accepted</span>
                </motion.span>
              ) : (
                <motion.span
                  key="ready"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1.5"
                >
                  <span>Authenticate Operator</span>
                  <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
