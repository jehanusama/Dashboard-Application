"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Table2,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  X,
  Sun,
  Moon,
  LogOut,
  Users,
  Settings,
  Bell,
  ClipboardList,
} from "lucide-react";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
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
  { label: "Users", href: "/dashboard/users", icon: Users },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Activity Logs", href: "/dashboard/activity", icon: ClipboardList },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const { sidebarCollapsed, mobileSidebarOpen } = useAppSelector((s) => s.ui);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const unreadNotifCount = useAppSelector((s) =>
    s.notifications.items.filter((n) => !n.read).length
  );

  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    // Add artificial delay for animation
    await new Promise(r => setTimeout(r, 600));
    logout();
  };

  useEffect(() => {
    const initTheme = () => {
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

      setIsDark(shouldBeDark);
      setMounted(true);
    };

    initTheme();
    
    window.addEventListener("theme-change", initTheme);
    return () => window.removeEventListener("theme-change", initTheme);
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
    window.dispatchEvent(new Event("theme-change"));
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
          "fixed z-30 flex flex-col transition-[width,transform] duration-300 will-change-[width,transform]",
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
            sidebarCollapsed
              ? "lg:justify-center justify-between"
              : "justify-between",
          ].join(" ")}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="text-gradient text-xl font-bold tracking-tight select-none lg:hidden">
              DataDash
            </span>
            {!sidebarCollapsed && (
              <span className="text-gradient text-xl font-bold tracking-tight select-none hidden lg:block">
                DataDash
              </span>
            )}
          </div>
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
                    <span className={sidebarCollapsed ? "lg:hidden" : ""}>
                      {label}
                    </span>
                    {label === "Notifications" && unreadNotifCount > 0 && (
                      <span className={[
                        "ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-error text-[10px] font-bold text-white px-1",
                        sidebarCollapsed ? "lg:hidden" : "",
                      ].join(" ")}>
                        {unreadNotifCount}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-surface-200 dark:border-surface-700 p-4 space-y-4">
          <div
            className={[
              "flex items-center gap-3",
              sidebarCollapsed
                ? "lg:flex-col justify-center"
                : "justify-between",
            ].join(" ")}
          >
            <div
              className={[
                "flex items-center gap-3 min-w-0",
                sidebarCollapsed ? "lg:justify-center" : "flex-1 mr-2",
              ].join(" ")}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary-500 to-primary-600 text-sm font-bold text-white shadow-sm ring-2 ring-white dark:ring-surface-900 transition-all hover:scale-105">
                {initials}
              </div>
              <div
                className={[
                  "overflow-hidden",
                  sidebarCollapsed ? "lg:hidden" : "",
                ].join(" ")}
              >
                <p className="text-sm font-semibold truncate text-surface-900 dark:text-surface-100 uppercase tracking-tight">
                  {user?.name}
                </p>
                <p className="text-[10px] text-surface-500 dark:text-surface-400 truncate font-medium">
                  {user?.email}
                </p>
              </div>
            </div>

            <button
              onClick={toggleDark}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-surface-500 dark:text-surface-400 bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors shadow-sm"
              aria-label="Toggle theme"
            >
              {mounted && (isDark ? <Sun size={18} /> : <Moon size={18} />)}
            </button>
          </div>

          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className={[
              "flex h-9 items-center gap-3 w-full rounded-xl transition-all duration-200",
              sidebarCollapsed
                ? "justify-center text-error bg-error/10 hover:bg-error/20"
                : "px-4 text-sm font-bold text-error bg-error/5 hover:bg-error/10 border border-error/10 hover:border-error/20",
            ].join(" ")}
          >
            <LogOut size={16} />
            <span className={sidebarCollapsed ? "lg:hidden" : ""}>
              Sign out
            </span>
          </button>
        </div>
      </aside>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Sign Out"
        description="Are you sure you want to sign out of your account? You will need to log back in to access the dashboard."
        confirmText="Sign Out"
        confirmVariant="danger"
        isLoading={isLoggingOut}
        icon={<LogOut size={28} />}
      />
    </>
  );
}
