"use client"

import { useEffect } from "react"

export function AdminThemeManager() {
  useEffect(() => {
    document.body.classList.add("admin-scope")
    return () => document.body.classList.remove("admin-scope")
  }, [])
  return null
}
