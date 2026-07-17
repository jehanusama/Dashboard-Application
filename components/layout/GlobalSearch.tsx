"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, Users, CreditCard, FileText, ArrowRight, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { MOCK_MANAGEMENT_USERS } from "@/lib/mockData/usersList";
import { MOCK_TRANSACTIONS } from "@/lib/mockData/transactions";

type SearchResult = {
  id: string;
  type: "user" | "transaction" | "report";
  title: string;
  subtitle: string;
  href: string;
};

export const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Lazy initializer — reads localStorage once, no effect needed
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("recentSearches");
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Open handler
  const open = () => setIsOpen(true);

  // Close handler — resets query here, not inside an effect
  const close = () => {
    setIsOpen(false);
    setQuery("");
  };

  // Toggle handler used by Ctrl+K
  const toggle = () => {
    if (isOpen) {
      close();
    } else {
      setIsOpen(true);
    }
  };

  // Keyboard shortcut listener — only subscribes/unsubscribes, no setState in body
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape") {
        close();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  // toggle and close are stable within the closure; deps array intentionally empty
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Focus effect — only DOM interaction, no setState → allowed by the rule
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Execute search
  const results = React.useMemo(() => {
    if (!query.trim()) return [];
    
    const q = query.toLowerCase();
    const found: SearchResult[] = [];

    // Search Users
    const users = MOCK_MANAGEMENT_USERS.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    ).slice(0, 3);
    
    users.forEach((u) => {
      found.push({
        id: `usr-${u.id}`,
        type: "user",
        title: u.name,
        subtitle: u.email,
        href: `/dashboard/users/${u.id}`,
      });
    });

    // Search Transactions
    const txs = MOCK_TRANSACTIONS.filter(
      (t) => t.id.toLowerCase().includes(q) || t.customerName.toLowerCase().includes(q)
    ).slice(0, 3);
    
    txs.forEach((t) => {
      found.push({
        id: `tx-${t.id}`,
        type: "transaction",
        title: `Transaction ${t.id}`,
        subtitle: `${t.customerName} - $${t.amount.toFixed(2)}`,
        href: `/dashboard/transactions/${t.id}`,
      });
    });

    // Mock Reports Search
    const mockReports = ["Monthly Summary", "User Growth Report", "Revenue Q1", "Security Audit"];
    const reports = mockReports.filter((r) => r.toLowerCase().includes(q)).slice(0, 2);
    
    reports.forEach((r, i) => {
      found.push({
        id: `rpt-${i}`,
        type: "report",
        title: r,
        subtitle: "Report document",
        href: `/dashboard/analytics`, // Just route somewhere
      });
    });

    return found;
  }, [query]);

  const handleSelect = (href: string, title: string) => {
    // Save to recent
    const updated = [title, ...recentSearches.filter((s) => s !== title)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    
    setIsOpen(false);
    router.push(href);
  };

  const getIcon = (type: string) => {
    if (type === "user") return <Users size={18} className="text-primary-500" />;
    if (type === "transaction") return <CreditCard size={18} className="text-success" />;
    return <FileText size={18} className="text-warning" />;
  };

  return (
    <>
      <button
        onClick={open}
        className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 text-surface-500 hover:text-surface-900 dark:hover:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg transition-colors"
      >
        <Search size={20} />
        <span className="hidden sm:inline text-sm font-medium">Search...</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 pb-4">
          <div
            className="fixed inset-0 bg-surface-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={close}
          />
          
          <div className="relative w-full max-w-xl bg-white dark:bg-surface-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-surface-200 dark:border-surface-800 flex flex-col max-h-[80vh]">
            
            {/* Search Input */}
            <div className="flex items-center px-4 py-3 border-b border-surface-200 dark:border-surface-800 shrink-0">
              <Search className="text-surface-400 shrink-0" size={20} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search users, transactions, reports..."
                className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-surface-900 dark:text-surface-100 placeholder:text-surface-400"
              />
              <button
                onClick={close}
                className="p-1 rounded-md text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-surface-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Results Body */}
            <div className="overflow-y-auto flex-1">
              {!query.trim() ? (
                <div className="p-4">
                  {recentSearches.length > 0 ? (
                    <div>
                      <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3 px-2">
                        Recent Searches
                      </h3>
                      <ul className="space-y-1">
                        {recentSearches.map((term, idx) => (
                          <li key={idx}>
                            <button
                              onClick={() => setQuery(term)}
                              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors text-left"
                            >
                              <Clock size={16} className="text-surface-400" />
                              {term}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="py-12 text-center text-surface-400">
                      <p className="text-sm">Start typing to search...</p>
                    </div>
                  )}
                </div>
              ) : results.length > 0 ? (
                <ul className="p-2 space-y-1">
                  {results.map((res) => (
                    <li key={res.id}>
                      <button
                        onClick={() => handleSelect(res.href, res.title)}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors text-left group"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className={`shrink-0 p-2 rounded-lg ${
                            res.type === "user" ? "bg-primary-500/10" : 
                            res.type === "transaction" ? "bg-success/10" : "bg-warning/10"
                          }`}>
                            {getIcon(res.type)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-surface-900 dark:text-white truncate">
                              {res.title}
                            </p>
                            <p className="text-xs text-surface-500 truncate">
                              {res.subtitle}
                            </p>
                          </div>
                        </div>
                        <ArrowRight size={16} className="text-surface-300 dark:text-surface-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-16 px-6 text-center flex flex-col items-center text-surface-500">
                  <Search size={40} className="mb-4 text-surface-300 dark:text-surface-600" />
                  <p className="text-base font-semibold text-surface-900 dark:text-white">
                    No results found for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-sm mt-1">
                    Try searching for something else or check your spelling.
                  </p>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="p-3 border-t border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/50 flex items-center justify-between shrink-0">
              <div className="flex gap-4 text-[10px] text-surface-400 font-medium">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded border border-surface-300 dark:border-surface-700 bg-white dark:bg-surface-800">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded border border-surface-300 dark:border-surface-700 bg-white dark:bg-surface-800">↓</kbd>
                  to navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded border border-surface-300 dark:border-surface-700 bg-white dark:bg-surface-800 text-[9px]">ENTER</kbd>
                  to select
                </span>
                <span className="flex items-center gap-1 hidden sm:flex">
                  <kbd className="px-1.5 py-0.5 rounded border border-surface-300 dark:border-surface-700 bg-white dark:bg-surface-800 text-[9px]">ESC</kbd>
                  to close
                </span>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
