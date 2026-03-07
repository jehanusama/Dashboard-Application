"use client";

import { TransactionTable } from "@/components/table/TransactionTable";

export default function DataTablePage() {
  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-surface-800 dark:text-surface-100">
          Data Table
        </h1>
        <p className="mt-1 text-sm text-surface-500">
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
