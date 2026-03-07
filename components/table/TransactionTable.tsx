import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { Badge } from "@/components/ui/Badge";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Transaction } from "@/lib/mockData/types";
import { exportToPDF, exportToExcel } from "@/lib/utils/exportUtils";

export const TransactionTable: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredTransactions, filters, sort, pagination, isLoading } =
    useSelector((state: RootState) => state.data);

  
  useEffect(() => {
    dispatch(setLoading(true));
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);
    return () => clearTimeout(timer);
  }, [dispatch, filters, sort]);

  
  const totalPages = Math.ceil(
    filteredTransactions.length / pagination.pageSize,
  );
  const paginatedData = filteredTransactions.slice(
    (pagination.currentPage - 1) * pagination.pageSize,
    pagination.currentPage * pagination.pageSize,
  );

  const handleSort = (key: keyof Transaction) => {
    dispatch(setSort(key));
  };

  const getSortIcon = (key: keyof Transaction) => {
    if (sort.key !== key) return null;
    return sort.direction === "asc" ? (
      <ArrowUp size={14} className="inline ml-1 text-primary-500" />
    ) : (
      <ArrowDown size={14} className="inline ml-1 text-primary-500" />
    );
  };

  const statusVariants: Record<
    string,
    "success" | "warning" | "error" | "neutral"
  > = {
    completed: "success",
    pending: "warning",
    cancelled: "error",
    refunded: "neutral",
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="space-y-4 relative">
      
      {isLoading && <LoadingOverlay />}

      <TableControls
        search={filters.search}
        onSearchChange={(val) => dispatch(setSearch(val))}
        status={filters.status}
        onStatusChange={(status) => dispatch(setStatusFilter(status))}
        onExportPDF={() => exportToPDF(filteredTransactions)}
        onExportExcel={() => exportToExcel(filteredTransactions)}
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
              <Tr key={t.id}>
                <Td className="font-mono text-xs font-semibold">{t.id}</Td>
                <Td>{t.date}</Td>
                <Td>
                  <div className="flex flex-col">
                    <span className="font-medium text-surface-900 dark:text-surface-100">
                      {t.customerName}
                    </span>
                    <span className="text-xs text-surface-500">
                      {t.customerEmail}
                    </span>
                  </div>
                </Td>
                <Td className="font-semibold text-surface-900 dark:text-surface-100">
                  {formatCurrency(t.amount)}
                </Td>
                <Td>
                  <Badge
                    variant={statusVariants[t.status]}
                    className="capitalize"
                  >
                    {t.status}
                  </Badge>
                </Td>
                <Td className="capitalize text-xs font-medium">
                  {t.method.replace("_", " ")}
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={6} className="h-48 text-center text-surface-400">
                No transactions found matching your filters.
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
        onPageChange={(page) => dispatch(setPage(page))}
        onPageSizeChange={(size) => dispatch(setPageSize(size))}
      />
    </div>
  );
};
