"use client";

import { TransactionTable } from "@/components/table/TransactionTable";

export default function DataTablePage() {
  return (
    <div className="flex flex-col gap-8 p-dashboard-x py-dashboard-y animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-100 italic tracking-tight underline decoration-primary-500/30 underline-offset-8">
          Transaction Records
        </h1>
        <p className="mt-2 text-surface-500 dark:text-surface-400">
          View and manage all transaction records with sorting and advanced
          filtering.
        </p>
      </div>

      <div className="rounded-3xl bg-white dark:bg-surface-800 border border-surface-100 dark:border-surface-700 p-8 shadow-soft">
        <TransactionTable />
      </div>
    </div>
  );
}
