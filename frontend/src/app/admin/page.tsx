"use client";

import { GlobalBackground } from "@/components/landing/GlobalBackground";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <>
      <title>Admin Login | Happiness Coaching Academy</title>
      <meta
        name="description"
        content="Access the Happiness Coaching Academy administrative terminal."
      />

      <main className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 py-16">
        {/* Unified Warm Application Aurora Background */}
        <GlobalBackground />

        {/* Centered Admin Credentials Form */}
        <div className="w-full flex items-center justify-center z-10">
          <AdminLoginForm />
        </div>

        {/* Screen-reader heading */}
        <h1 className="sr-only">Admin Login Portal</h1>
      </main>
    </>
  );
}
