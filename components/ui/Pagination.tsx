import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Select } from "./Select";
import { Button } from "./Button";

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
          <span className="hidden sm:inline">Showing </span>
          <span className="font-medium text-surface-700 dark:text-surface-200">
            {startItem}
          </span>{" "}
          to{" "}
          <span className="font-medium text-surface-700 dark:text-surface-200">
            {endItem}
          </span>{" "}
          <span className="hidden sm:inline">of </span>
          <span className="inline sm:hidden">/ </span>
          <span className="font-medium text-surface-700 dark:text-surface-200">
            {totalItems}
          </span>{" "}
          <span className="hidden sm:inline">results</span>
        </div>
      )}

      <div className="flex items-center gap-2 justify-center w-full sm:w-auto">
        {onPageSizeChange && pageSize !== undefined && (
          <div className="w-32">
            <Select
              size="sm"
              direction="up"
              value={pageSize}
              options={[
                { label: "8 per page", value: 8 },
                { label: "10 per page", value: 10 },
                { label: "20 per page", value: 20 },
                { label: "50 per page", value: 50 },
              ]}
              onChange={(val: string | number) => onPageSizeChange(Number(val))}
              className="space-y-0!"
            />
          </div>
        )}

        <div className="flex items-center gap-1 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl overflow-hidden shrink-0 shadow-sm p-0.5 ml-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="w-9 h-9 p-0 rounded-lg hidden sm:flex"
          >
            <ChevronsLeft size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-9 h-9 p-0 rounded-lg text-surface-600 dark:text-surface-400"
          >
            <ChevronLeft size={16} />
          </Button>

          <div className="px-3 sm:px-4 text-xs sm:text-sm font-semibold text-foreground h-9 flex items-center bg-surface-50 dark:bg-surface-800/50 rounded-lg border border-surface-200/50 dark:border-surface-700/50 mx-0.5 min-w-14 justify-center">
            {currentPage}{" "}
            <span className="mx-1.5 text-surface-400 font-normal">/</span>{" "}
            {totalPages}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-9 h-9 p-0 rounded-lg text-surface-600 dark:text-surface-400"
          >
            <ChevronRight size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="w-9 h-9 p-0 rounded-lg hidden sm:flex"
          >
            <ChevronsRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
