"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Table2,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { toggleSidebar, closeMobileSidebar } from "@/store/uiSlice";
import { useAuth } from "@/hooks/useAuth";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Data Table", href: "/dashboard/table", icon: Table2 },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const { sidebarCollapsed, mobileSidebarOpen } = useAppSelector((s) => s.ui);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const [isDark, setIsDark] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const shouldBeDark =
      savedTheme === "dark" || (!savedTheme && systemPrefersDark);

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const timer = setTimeout(() => {
      setIsDark(shouldBeDark);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const toggleDark = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <>
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => dispatch(closeMobileSidebar())}
        />
      )}

      <aside
        className={[
          "fixed z-30 flex flex-col transition-all duration-300",
          "bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100",
          "inset-y-0 left-0 lg:top-4 lg:bottom-4 lg:left-4 lg:h-[calc(100vh-2rem)]",
          "border-r lg:border border-surface-200 dark:border-surface-800",
          "lg:rounded-2xl lg:shadow-md",
          sidebarCollapsed ? "w-64 lg:w-[72px]" : "w-64",
          mobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <div
          className={[
            "flex h-16 shrink-0 items-center border-b border-surface-200 dark:border-surface-700 px-4",
            sidebarCollapsed ? "justify-center" : "justify-between",
          ].join(" ")}
        >
          {!sidebarCollapsed && (
            <span className="text-gradient text-xl font-bold tracking-tight select-none">
              DataDash
            </span>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(closeMobileSidebar())}
              className="rounded-lg p-1.5 text-surface-500 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors lg:hidden"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="hidden lg:flex rounded-lg p-1.5 text-surface-500 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              aria-label={
                sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
              }
            >
              {sidebarCollapsed ? (
                <ChevronRight size={18} />
              ) : (
                <ChevronLeft size={18} />
              )}
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2">
          <ul className="space-y-1">
            {navItems.map(({ label, href, icon: Icon }) => {
              const isActive =
                href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(href);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => dispatch(closeMobileSidebar())}
                    className={[
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                      "transition-all duration-150",
                      isActive
                        ? "bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-300 shadow-inner-glow"
                        : "text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-surface-100",
                      sidebarCollapsed ? "justify-center px-2" : "",
                    ].join(" ")}
                    title={sidebarCollapsed ? label : undefined}
                  >
                    <Icon
                      size={20}
                      className={
                        isActive ? "text-primary-600 dark:text-primary-400" : ""
                      }
                    />
                    {!sidebarCollapsed && <span>{label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-surface-200 dark:border-surface-700 p-4">
          <div
            className={[
              "flex",
              sidebarCollapsed
                ? "flex-col items-center gap-4"
                : "items-center justify-between",
            ].join(" ")}
          >
            <div
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={[
                "relative flex items-center gap-3 cursor-pointer",
                !sidebarCollapsed
                  ? "flex-1 min-w-0 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 p-2 -ml-2 mr-2 transition-colors"
                  : "",
              ].join(" ")}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary-500 to-primary-600 text-sm font-bold text-white shadow-sm ring-2 ring-white dark:ring-surface-900 transition-all hover:scale-105">
                {initials}
              </div>

              {!sidebarCollapsed && (
                <div className="overflow-hidden flex-1">
                  <p className="text-sm font-semibold truncate text-surface-900 dark:text-surface-100">
                    {user?.name}
                  </p>
                  <p className="text-xs text-surface-500 dark:text-surface-400 truncate">
                    {user?.email}
                  </p>
                </div>
              )}

              <div
                onClick={(e) => e.stopPropagation()}
                className={[
                  "absolute bottom-full mb-2 w-48 origin-bottom transition-all duration-150 rounded-xl bg-white dark:bg-surface-800 shadow-premium border border-surface-200 dark:border-surface-700 overflow-hidden z-50",
                  isProfileOpen
                    ? "scale-100 opacity-100 pointer-events-auto"
                    : "scale-95 opacity-0 pointer-events-none",
                  sidebarCollapsed ? "left-10" : "left-0",
                ].join(" ")}
              >
                {sidebarCollapsed && (
                  <div className="px-4 py-3 border-b border-surface-100 dark:border-surface-700">
                    <p className="text-sm font-semibold text-surface-800 dark:text-surface-100 truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-surface-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                )}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-left text-sm text-error hover:bg-error/10 transition-colors"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            </div>

            <button
              onClick={toggleDark}
              className="shrink-0 flex items-center justify-center h-9 w-9 rounded-full text-surface-500 dark:text-surface-400 bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
