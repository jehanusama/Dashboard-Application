"use client";

import React, { useState, useMemo } from "react";
import { MOCK_ACTIVITY_LOGS, ActivityLog, LogStatus, LogModule } from "@/lib/mockData/activityLogs";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import {
  Search,
  Download,
  ClipboardList,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

const STATUS_VARIANT: Record<LogStatus, "success" | "error" | "warning"> = {
  success: "success",
  failed: "error",
  warning: "warning",
};

const MODULE_OPTIONS = [
  { value: "all", label: "All Modules" },
  { value: "Auth", label: "Auth" },
  { value: "Users", label: "Users" },
  { value: "Payments", label: "Payments" },
  { value: "Settings", label: "Settings" },
  { value: "Reports", label: "Reports" },
  { value: "Security", label: "Security" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "success", label: "Success" },
  { value: "failed", label: "Failed" },
  { value: "warning", label: "Warning" },
];

type SortKey = keyof ActivityLog;
type SortDir = "asc" | "desc";

// ─── CSV Export ───────────────────────────────────────────────────────────────

function exportCSV(data: ActivityLog[]) {
  const headers = ["ID", "User", "Email", "Action", "Module", "Date", "Time", "IP Address", "Status"];
  const rows = data.map((l) => [
    l.id, l.user, l.userEmail, l.action, l.module, l.date, l.time, l.ip, l.status,
  ]);
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `activity-logs-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Sort indicator ───────────────────────────────────────────────────────────

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (sortKey !== col) return <ChevronUp size={13} className="opacity-20" />;
  return sortDir === "asc"
    ? <ChevronUp size={13} className="text-primary-500" />
    : <ChevronDown size={13} className="text-primary-500" />;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ActivityLogsPage() {
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
    setCurrentPage(1);
  };

  const filtered = useMemo(() => {
    let data = [...MOCK_ACTIVITY_LOGS];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (l) =>
          l.user.toLowerCase().includes(q) ||
          l.action.toLowerCase().includes(q) ||
          l.ip.includes(q) ||
          l.module.toLowerCase().includes(q)
      );
    }

    if (moduleFilter !== "all") data = data.filter((l) => l.module === moduleFilter);
    if (statusFilter !== "all") data = data.filter((l) => l.status === statusFilter);
    if (dateFrom) data = data.filter((l) => l.date >= dateFrom);
    if (dateTo) data = data.filter((l) => l.date <= dateTo);

    data.sort((a, b) => {
      const av = a[sortKey] as string;
      const bv = b[sortKey] as string;
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return data;
  }, [search, moduleFilter, statusFilter, dateFrom, dateTo, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const resetFilters = () => {
    setSearch("");
    setModuleFilter("all");
    setStatusFilter("all");
    setDateFrom("");
    setDateTo("");
    setCurrentPage(1);
  };

  const hasActiveFilters = search || moduleFilter !== "all" || statusFilter !== "all" || dateFrom || dateTo;

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-primary-500/10 dark:bg-primary-500/20 rounded-lg">
            <ClipboardList className="text-primary-600 dark:text-primary-400" size={18} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Activity Logs</h1>
            <p className="text-sm text-surface-500">
              {filtered.length} log{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<Download size={14} />}
          onClick={() => exportCSV(filtered)}
        >
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3">
        {/* Row 1: Search + dropdowns */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Input
              placeholder="Search user, action, IP, module…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-surface-400 pointer-events-none" />
          </div>
          <div className="flex gap-3 sm:w-auto">
            <Select
              value={moduleFilter}
              onChange={(v) => { setModuleFilter(v as string); setCurrentPage(1); }}
              options={MODULE_OPTIONS}
            />
            <Select
              value={statusFilter}
              onChange={(v) => { setStatusFilter(v as string); setCurrentPage(1); }}
              options={STATUS_OPTIONS}
            />
          </div>
        </div>

        {/* Row 2: Date range + reset */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <span className="text-xs font-semibold text-surface-400 uppercase tracking-wider shrink-0 mt-1 sm:mt-0">
            Date range:
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1); }}
              className="h-9 px-3 text-sm rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
            />
            <span className="text-surface-400 text-sm">to</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1); }}
              className="h-9 px-3 text-sm rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
            />
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-error hover:text-error/80 transition-colors px-2 py-1"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-surface-200 dark:border-surface-800">
        <Table>
          <THead>
            <Tr>
              {([
                ["user", "User"],
                ["action", "Action"],
                ["module", "Module"],
                ["date", "Date"],
                ["time", "Time"],
                ["ip", "IP Address"],
                ["status", "Status"],
              ] as [SortKey, string][]).map(([key, label]) => (
                <Th
                  key={key}
                  sortable
                  onClick={() => handleSort(key)}
                  className="cursor-pointer select-none whitespace-nowrap"
                >
                  <span className="flex items-center gap-1">
                    {label}
                    <SortIcon col={key} sortKey={sortKey} sortDir={sortDir} />
                  </span>
                </Th>
              ))}
            </Tr>
          </THead>
          <TBody>
            {paginated.length > 0 ? (
              paginated.map((log) => (
                <Tr key={log.id} className="hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors">
                  <Td>
                    <div>
                      <p className="font-semibold text-surface-900 dark:text-surface-100 text-sm">{log.user}</p>
                      <p className="text-xs text-surface-400">{log.userEmail}</p>
                    </div>
                  </Td>
                  <Td>
                    <span className="text-sm text-surface-700 dark:text-surface-300">{log.action}</span>
                  </Td>
                  <Td>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400">
                      {log.module}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-sm text-surface-700 dark:text-surface-300 whitespace-nowrap">{log.date}</span>
                  </Td>
                  <Td>
                    <span className="font-mono text-xs text-surface-500">{log.time}</span>
                  </Td>
                  <Td>
                    <span className="font-mono text-xs text-surface-500 whitespace-nowrap">{log.ip}</span>
                  </Td>
                  <Td>
                    <Badge variant={STATUS_VARIANT[log.status]} className="capitalize whitespace-nowrap">
                      {log.status}
                    </Badge>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={7}>
                  <div className="flex flex-col items-center justify-center py-16 text-surface-400">
                    <ClipboardList size={40} className="mb-3 opacity-20" />
                    <p className="font-semibold">No logs found</p>
                    <p className="text-xs mt-1">Try adjusting your filters or date range.</p>
                  </div>
                </Td>
              </Tr>
            )}
          </TBody>
        </Table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={filtered.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={() => {}}
      />
    </div>
  );
}
