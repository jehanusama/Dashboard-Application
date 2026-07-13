"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { markAsRead } from "@/store/notificationsSlice";
import { Bell, Check, Shield, CreditCard, User, AlertCircle, Inbox } from "lucide-react";
import { NotificationCategory } from "@/lib/mockData/notifications";

const iconMap: Record<NotificationCategory, React.ElementType> = {
  system: AlertCircle,
  payment: CreditCard,
  user: User,
  security: Shield,
};

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const notifications = useAppSelector((s) => s.notifications.items);
  const dispatch = useAppDispatch();
  
  const unreadCount = notifications.filter((n) => !n.read).length;
  const recentNotifications = [...notifications]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleMarkAsRead = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(markAsRead(id));
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-surface-500 hover:text-surface-900 dark:hover:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-error text-[9px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-surface-900">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-2xl shadow-premium z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
          <div className="p-4 border-b border-surface-200 dark:border-surface-800 flex items-center justify-between">
            <h3 className="font-bold text-surface-900 dark:text-surface-100 flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <span className="bg-primary-500/10 text-primary-600 dark:bg-primary-500/20 dark:text-primary-400 text-xs px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </h3>
            <Link
              href="/dashboard/notifications"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-primary-500 hover:text-primary-600 transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {recentNotifications.length > 0 ? (
              <div className="divide-y divide-surface-100 dark:divide-surface-800">
                {recentNotifications.map((n) => {
                  const Icon = iconMap[n.category];
                  return (
                    <Link
                      key={n.id}
                      href="/dashboard/notifications"
                      onClick={() => {
                        dispatch(markAsRead(n.id));
                        setIsOpen(false);
                      }}
                      className={`block p-4 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors ${!n.read ? "bg-primary-500/5 dark:bg-primary-500/10" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-lg ${!n.read ? "bg-primary-500 text-white shadow-sm" : "bg-surface-100 dark:bg-surface-800 text-surface-500"}`}>
                          <Icon size={15} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm mb-0.5 truncate ${!n.read ? "font-bold text-surface-900 dark:text-white" : "font-medium text-surface-700 dark:text-surface-300"}`}>
                            {n.title}
                          </p>
                          <p className="text-xs text-surface-500 line-clamp-2 leading-relaxed">
                            {n.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[10px] text-surface-400 font-medium tracking-wide">
                              {new Date(n.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                            </span>
                            {!n.read && (
                              <button
                                onClick={(e) => handleMarkAsRead(e, n.id)}
                                className="text-[10px] flex items-center gap-1 font-semibold text-primary-500 hover:text-primary-600"
                              >
                                <Check size={12} /> Mark read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center flex flex-col items-center justify-center text-surface-400">
                <Inbox size={40} className="mb-3 opacity-20" />
                <p className="text-sm font-medium">No notifications</p>
                <p className="text-xs mt-1">You&apos;re all caught up!</p>
              </div>
            )}
          </div>
          
          {recentNotifications.length > 0 && (
            <div className="p-2 border-t border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-950/50">
              <Link
                href="/dashboard/notifications"
                onClick={() => setIsOpen(false)}
                className="block text-center text-xs font-semibold py-2 text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white transition-colors"
              >
                See all activity
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
