"use client";

import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { toggleMobileSidebar } from "@/store/uiSlice";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { GlobalSearch } from "@/components/layout/GlobalSearch";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const sidebarCollapsed = useAppSelector((s) => s.ui.sidebarCollapsed);
  const dispatch = useAppDispatch();

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950/50">
      <Sidebar />
      <main
        className={[
          "flex flex-col min-h-screen transition-[padding] duration-300 will-change-[padding]",
          sidebarCollapsed ? "lg:pl-[104px]" : "lg:pl-72",
        ].join(" ")}
      >
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900">
          <span className="text-gradient text-xl font-bold tracking-tight select-none">
            DataDash
          </span>
          <div className="flex items-center gap-1">
            <GlobalSearch />
            <NotificationBell />
            <button
              onClick={() => dispatch(toggleMobileSidebar())}
              className="rounded-lg p-2 text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col p-4 lg:py-4 lg:pr-4 lg:pl-0">
          {/* Desktop top bar */}
          <div className="hidden lg:flex items-center justify-between mb-4 px-2">
            <Breadcrumbs />
            <div className="flex items-center gap-2">
              <GlobalSearch />
              <NotificationBell />
            </div>
          </div>
          
          {/* Mobile breadcrumbs */}
          <div className="lg:hidden mb-4 px-1">
            <Breadcrumbs />
          </div>

          <div className="flex-1 bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 shadow-sm p-4 lg:p-6 overflow-x-hidden">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
