"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Sun, Moon, Laptop } from "lucide-react";

export default function AppearanceSettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const syncTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark" || savedTheme === "light") {
        setTheme(savedTheme);
      } else {
        setTheme("system");
      }
    };
    
    syncTheme();
    
    window.addEventListener("theme-change", syncTheme);
    return () => window.removeEventListener("theme-change", syncTheme);
  }, []);

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    const html = document.documentElement;

    if (newTheme === "system") {
      localStorage.removeItem("theme");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemPrefersDark) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    } else {
      localStorage.setItem("theme", newTheme);
      if (newTheme === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    }
    
    // Dispatch a custom event to sync other components like the Sidebar
    window.dispatchEvent(new Event("theme-change"));
  };

  const themes = [
    { id: "light", label: "Light", icon: Sun, description: "Clean and bright" },
    { id: "dark", label: "Dark", icon: Moon, description: "Easy on the eyes" },
    { id: "system", label: "System", icon: Laptop, description: "Follows system preference" },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-1">Appearance</h1>
        <p className="text-surface-500 text-sm">Customize how the dashboard looks and feels.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Theme</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themes.map((t) => {
              const isActive = theme === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => handleThemeChange(t.id)}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    isActive
                      ? "border-primary-500 bg-primary-500/5 dark:bg-primary-500/10"
                      : "border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-700"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <t.icon size={20} className={isActive ? "text-primary-600 dark:text-primary-400" : "text-surface-500"} />
                    <span className={`font-semibold ${isActive ? "text-primary-600 dark:text-primary-400" : "text-surface-900 dark:text-surface-100"}`}>
                      {t.label}
                    </span>
                  </div>
                  <p className="text-xs text-surface-500 dark:text-surface-400">{t.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
