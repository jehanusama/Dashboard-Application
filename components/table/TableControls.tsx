import React from "react";
import { Search, Download } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { TransactionStatus } from "@/lib/mockData/types";

const STATUS_OPTIONS = [
  { label: "All Statuses", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Refunded", value: "refunded" },
];

const SEARCH_ICON = <Search size={18} />;
const DOWNLOAD_ICON = <Download size={16} />;

interface TableControlsProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: TransactionStatus | "all";
  onStatusChange: (status: TransactionStatus | "all") => void;
  onExportPDF: () => void;
  onExportExcel: () => void;
}

export const TableControls: React.FC<TableControlsProps> = React.memo(
  ({
    search,
    onSearchChange,
    status,
    onStatusChange,
    onExportPDF,
    onExportExcel,
  }) => {
    return (
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="w-full lg:w-80">
            <Input
              placeholder="Search by name, email or ID..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              leftIcon={SEARCH_ICON}
              className="h-11!"
            />
          </div>

          <div className="w-full lg:w-48">
            <Select
              options={STATUS_OPTIONS}
              value={status}
              onChange={(val) =>
                onStatusChange(val as TransactionStatus | "all")
              }
              placeholder="Filter by Status"
              className="space-y-0!"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:flex lg:items-center gap-3 w-full lg:w-auto">
          <Button
            variant="secondary"
            onClick={onExportExcel}
            leftIcon={DOWNLOAD_ICON}
            className="rounded-xl font-medium w-full lg:w-auto text-xs sm:text-sm"
          >
            Excel
          </Button>
          <Button
            variant="primary"
            onClick={onExportPDF}
            leftIcon={DOWNLOAD_ICON}
            className="rounded-xl font-medium shadow-sm shadow-primary-500/20 w-full lg:w-auto text-xs sm:text-sm"
          >
            PDF
          </Button>
        </div>
      </div>
    );
  },
);

TableControls.displayName = "TableControls";
