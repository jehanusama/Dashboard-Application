"use client";

import React, { useState, useMemo } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { markAsRead, markAllAsRead, deleteNotification } from "@/store/notificationsSlice";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { NoNotificationsState, NoSearchResultsState } from "@/components/ui/EmptyState";
import {
  Bell,
  Search,
  CheckCheck,
  Check,
  Trash2,
  Shield,
  CreditCard,
  User,
  AlertCircle,
} from "lucide-react";
import { NotificationCategory } from "@/lib/mockData/notifications";

const CATEGORY_META: Record<
  NotificationCategory,
  { icon: React.ElementType; label: string; color: string }
> = {
  system: {
    icon: AlertCircle,
    label: "System",
    color: "bg-warning/10 text-warning",
  },
  payment: {
    icon: CreditCard,
    label: "Payment",
    color: "bg-success/10 text-success",
  },
  user: {
    icon: User,
    label: "User",
    color: "bg-primary-500/10 text-primary-600 dark:bg-primary-500/20 dark:text-primary-400",
  },
  security: {
    icon: Shield,
    label: "Security",
    color: "bg-error/10 text-error",
  },
};

type FilterType = "all" | "unread" | "read";
type CategoryFilter = "all" | NotificationCategory;

export default function NotificationsPage() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((s) => s.notifications.items);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  const filtered = useMemo(() => {
    let items = [...notifications].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    if (filter === "unread") items = items.filter((n) => !n.read);
    if (filter === "read") items = items.filter((n) => n.read);
    if (categoryFilter !== "all") items = items.filter((n) => n.category === categoryFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (n) =>
          n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q)
      );
    }
    return items;
  }, [notifications, filter, categoryFilter, search]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filterButtons: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Unread", value: "unread" },
    { label: "Read", value: "read" },
  ];

  const categoryButtons: { label: string; value: CategoryFilter }[] = [
    { label: "All", value: "all" },
    { label: "System", value: "system" },
    { label: "Payment", value: "payment" },
    { label: "User", value: "user" },
    { label: "Security", value: "security" },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-primary-500/10 dark:bg-primary-500/20 rounded-lg">
            <Bell className="text-primary-600 dark:text-primary-400" size={18} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
              Notifications
            </h1>
            <p className="text-sm text-surface-500">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch(markAllAsRead())}
            leftIcon={<CheckCheck size={14} />}
            className="self-start sm:self-auto"
          >
            Mark all as read
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Input
          placeholder="Search notifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-3.5 h-4 w-4 text-surface-400 pointer-events-none" />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                filter === btn.value
                  ? "bg-primary-500 text-white shadow-sm"
                  : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700"
              }`}
            >
              {btn.label}
              {btn.value === "unread" && unreadCount > 0 && (
                <span className="ml-1.5 bg-white/30 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-surface-400 uppercase tracking-wider">Category:</span>
          {categoryButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setCategoryFilter(btn.value)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                categoryFilter === btn.value
                  ? "border-primary-500 bg-primary-500/10 text-primary-600 dark:bg-primary-500/20 dark:text-primary-400"
                  : "border-surface-200 dark:border-surface-700 text-surface-500 hover:border-primary-300 dark:hover:border-primary-700"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="p-0">
              {search || filter !== "all" || categoryFilter !== "all" ? (
                <NoSearchResultsState
                  query={search}
                  onAction={() => {
                    setSearch("");
                    setFilter("all");
                    setCategoryFilter("all");
                  }}
                />
              ) : (
                <NoNotificationsState />
              )}
            </CardContent>
          </Card>
        ) : (
          filtered.map((n) => {
            const meta = CATEGORY_META[n.category];
            const Icon = meta.icon;
            return (
              <div
                key={n.id}
                className={`flex gap-3 p-4 rounded-2xl border transition-all duration-200 ${
                  !n.read
                    ? "bg-primary-500/5 dark:bg-primary-500/10 border-primary-200 dark:border-primary-900"
                    : "bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-800 hover:border-surface-300 dark:hover:border-surface-700"
                }`}
              >
                {/* Icon — compact size */}
                <div className={`shrink-0 self-start p-2 rounded-lg ${meta.color}`}>
                  <Icon size={16} />
                </div>

                {/* Content — takes all remaining space */}
                <div className="flex-1 min-w-0">
                  {/* Title row: title + badge only */}
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <p className={`text-sm leading-snug ${!n.read ? "font-bold text-surface-900 dark:text-white" : "font-medium text-surface-800 dark:text-surface-200"}`}>
                      {n.title}
                    </p>
                    <Badge variant="neutral" className="text-[10px] capitalize shrink-0">
                      {meta.label}
                    </Badge>
                  </div>

                  {/* Message */}
                  <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
                    {n.message}
                  </p>

                  {/* Date + actions — all on the same bottom row */}
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[11px] text-surface-400 font-medium">
                      {new Date(n.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                    {!n.read && (
                      <button
                        onClick={() => dispatch(markAsRead(n.id))}
                        className="flex items-center gap-1 text-[11px] font-semibold text-primary-500 hover:text-primary-600 transition-colors"
                      >
                        <Check size={12} />
                        Mark as read
                      </button>
                    )}
                    <button
                      onClick={() => dispatch(deleteNotification(n.id))}
                      className="flex items-center gap-1 text-[11px] font-semibold text-surface-400 hover:text-error transition-colors"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Right column: unread indicator only, no absolute positioning */}
                <div className="shrink-0 self-start pt-1.5">
                  {!n.read
                    ? <span className="block h-2 w-2 rounded-full bg-primary-500" />
                    : <span className="block h-2 w-2" />
                  }
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
