import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Select } from "./Select";
import { Button } from "./Button";

const PAGE_SIZE_OPTIONS = [
  { label: "8 per page", value: 8 },
  { label: "10 per page", value: 10 },
  { label: "20 per page", value: 20 },
  { label: "50 per page", value: 50 },
];

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  totalItems?: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalItems,
}: PaginationProps) => {
  if (totalPages <= 0) return null;

  const startItem = pageSize ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = pageSize
    ? Math.min(currentPage * pageSize, totalItems || 0)
    : 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2">
      {totalItems !== undefined && pageSize !== undefined && (
        <div className="text-sm text-surface-500 text-center sm:text-left">
          <span>Showing </span>
          <span className="font-medium text-surface-900 dark:text-surface-100">
            {startItem}
          </span>{" "}
          to{" "}
          <span className="font-medium text-surface-900 dark:text-surface-100">
            {endItem}
          </span>{" "}
          <span>of </span>
          <span className="font-medium text-surface-900 dark:text-surface-100">
            {totalItems}
          </span>{" "}
          <span>results</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        {onPageSizeChange && pageSize !== undefined && (
          <div className="w-full sm:w-32">
            <Select
              size="sm"
              direction="up"
              value={pageSize}
              options={PAGE_SIZE_OPTIONS}
              onChange={(val: string | number) => onPageSizeChange(Number(val))}
              className="space-y-0!"
            />
          </div>
        )}

        <div className="flex items-center gap-1 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl overflow-hidden shrink-0 shadow-sm p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="w-8 h-8 sm:w-9 sm:h-9 p-0 rounded-lg"
          >
            <ChevronsLeft size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 sm:w-9 sm:h-9 p-0 rounded-lg text-surface-600 dark:text-surface-400"
          >
            <ChevronLeft size={16} />
          </Button>

          <div className="px-3 sm:px-4 text-xs sm:text-sm font-bold text-surface-900 dark:text-surface-100 h-8 sm:h-9 flex items-center bg-surface-50 dark:bg-surface-800/50 rounded-lg border border-surface-100 dark:border-surface-700/50 mx-0.5 min-w-[60px] justify-center italic">
            {currentPage}{" "}
            <span className="mx-1.5 text-surface-400 font-normal">/</span>{" "}
            {totalPages}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 sm:w-9 sm:h-9 p-0 rounded-lg text-surface-600 dark:text-surface-400"
          >
            <ChevronRight size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 sm:w-9 sm:h-9 p-0 rounded-lg"
          >
            <ChevronsRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
