import React, { useCallback, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { RootState } from "@/store";
import {
  setSearch,
  setStatusFilter,
  setSort,
  setPage,
  setPageSize,
  setLoading,
} from "@/store/dataSlice";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { LoadingOverlay } from "@/components/ui/Loading";
import { TableControls } from "./TableControls";
import { NoTransactionsState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Transaction, TransactionStatus } from "@/lib/mockData/types";
import { exportToPDF, exportToExcel } from "@/lib/utils/exportUtils";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const STATUS_VARIANTS: Record<
  string,
  "success" | "warning" | "error" | "neutral"
> = {
  completed: "success",
  pending: "warning",
  cancelled: "error",
  refunded: "neutral",
};

interface TransactionRowProps {
  transaction: Transaction;
}

const TransactionRow = React.memo(({ transaction: t }: TransactionRowProps) => {
  const router = useRouter();

  return (
    <Tr
      onClick={() => router.push(`/dashboard/transactions/${t.id}`)}
      className="cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
    >
      <Td className="font-mono text-xs font-semibold">{t.id}</Td>
      <Td>{t.date}</Td>
      <Td>
        <div className="flex flex-col">
          <span className="font-medium text-surface-900 dark:text-surface-100">
            {t.customerName}
          </span>
          <span className="text-xs text-surface-500">{t.customerEmail}</span>
        </div>
      </Td>
      <Td className="font-semibold text-surface-900 dark:text-surface-100">
        {currencyFormatter.format(t.amount)}
      </Td>
      <Td>
        <Badge variant={STATUS_VARIANTS[t.status]} className="capitalize">
          {t.status}
        </Badge>
      </Td>
      <Td className="capitalize text-xs font-medium">
        {t.method.replace("_", " ")}
      </Td>
    </Tr>
  );
});
TransactionRow.displayName = "TransactionRow";

export const TransactionTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filteredTransactions, filters, sort, pagination, isLoading } =
    useAppSelector((state: RootState) => state.data);
  useEffect(() => {
    dispatch(setLoading(true));
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);
    return () => clearTimeout(timer);
  }, [dispatch, filters, sort]);

  const totalPages = useMemo(
    () => Math.ceil(filteredTransactions.length / pagination.pageSize) || 1,
    [filteredTransactions.length, pagination.pageSize],
  );

  const paginatedData = useMemo(
    () =>
      filteredTransactions.slice(
        (pagination.currentPage - 1) * pagination.pageSize,
        pagination.currentPage * pagination.pageSize,
      ),
    [filteredTransactions, pagination.currentPage, pagination.pageSize],
  );

  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = useCallback(
    (val: string) => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
      searchTimerRef.current = setTimeout(() => {
        dispatch(setSearch(val));
      }, 300);
    },
    [dispatch],
  );

  const handleStatusChange = useCallback(
    (status: TransactionStatus | "all") => dispatch(setStatusFilter(status)),
    [dispatch],
  );

  const handleSort = useCallback(
    (key: keyof Transaction) => dispatch(setSort(key)),
    [dispatch],
  );

  const handlePageChange = useCallback(
    (page: number) => dispatch(setPage(page)),
    [dispatch],
  );

  const handlePageSizeChange = useCallback(
    (size: number) => dispatch(setPageSize(size)),
    [dispatch],
  );

  const handleExportPDF = useCallback(
    () => exportToPDF(filteredTransactions),
    [filteredTransactions],
  );

  const handleExportExcel = useCallback(
    () => exportToExcel(filteredTransactions),
    [filteredTransactions],
  );

  const getSortIcon = useCallback(
    (key: keyof Transaction) => {
      if (sort.key !== key) return null;
      return sort.direction === "asc" ? (
        <ArrowUp size={14} className="inline ml-1 text-primary-500" />
      ) : (
        <ArrowDown size={14} className="inline ml-1 text-primary-500" />
      );
    },
    [sort.key, sort.direction],
  );

  return (
    <div className="space-y-4 relative">
      {isLoading && <LoadingOverlay />}

      <TableControls
        search={filters.search}
        onSearchChange={handleSearchChange}
        status={filters.status}
        onStatusChange={handleStatusChange}
        onExportPDF={handleExportPDF}
        onExportExcel={handleExportExcel}
      />

      <Table>
        <THead>
          <Tr>
            <Th sortable onClick={() => handleSort("id")}>
              ID {getSortIcon("id")}
            </Th>
            <Th sortable onClick={() => handleSort("date")}>
              Date {getSortIcon("date")}
            </Th>
            <Th sortable onClick={() => handleSort("customerName")}>
              Customer {getSortIcon("customerName")}
            </Th>
            <Th sortable onClick={() => handleSort("amount")}>
              Amount {getSortIcon("amount")}
            </Th>
            <Th sortable onClick={() => handleSort("status")}>
              Status {getSortIcon("status")}
            </Th>
            <Th>Method</Th>
          </Tr>
        </THead>
        <TBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((t) => (
              <TransactionRow key={t.id} transaction={t} />
            ))
          ) : (
            <Tr>
              <Td colSpan={6}>
                <div className="py-6">
                  <NoTransactionsState
                    onAction={() => {
                      dispatch(setSearch(""));
                      dispatch(setStatusFilter("all"));
                    }}
                  />
                </div>
              </Td>
            </Tr>
          )}
        </TBody>
      </Table>

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={totalPages}
        totalItems={filteredTransactions.length}
        pageSize={pagination.pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};
