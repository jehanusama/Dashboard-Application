"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, Palette, Bell, Shield } from "lucide-react";

const navItems = [
  { href: "/dashboard/settings", label: "General", icon: Settings },
  { href: "/dashboard/settings/appearance", label: "Appearance", icon: Palette },
  { href: "/dashboard/settings/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/settings/security", label: "Security", icon: Shield },
];

export const SettingsNav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 w-full md:w-64 shrink-0">
      <h2 className="px-4 text-lg font-bold text-surface-900 dark:text-white mb-2">Settings</h2>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
              isActive
                ? "bg-primary-500/10 text-primary-600 dark:bg-primary-500/20 dark:text-primary-400"
                : "text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
            }`}
          >
            <item.icon size={18} className={isActive ? "text-primary-500" : ""} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
