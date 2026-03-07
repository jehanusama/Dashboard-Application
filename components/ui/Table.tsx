import React from "react";

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className = "" }) => (
  <div className="group relative w-full overflow-x-auto rounded-xl border border-surface-100 dark:border-surface-700 bg-white dark:bg-surface-800 scrollbar-hide sm:scrollbar-default">
    <table
      className={`w-full text-left text-sm whitespace-nowrap lg:whitespace-normal ${className}`}
    >
      {children}
    </table>
  </div>
);

export const THead: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <thead className="bg-surface-50/50 dark:bg-surface-900/50 text-surface-500 font-medium border-b border-surface-100 dark:border-surface-700">
    {children}
  </thead>
);

export const TBody: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <tbody className="divide-y divide-surface-100 dark:divide-surface-700">
    {children}
  </tbody>
);

export const Tr: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <tr
    className={`hover:bg-surface-50/50 dark:hover:bg-surface-900/10 transition-colors ${className}`}
  >
    {children}
  </tr>
);

export const Th: React.FC<
  React.ThHTMLAttributes<HTMLTableCellElement> & {
    sortable?: boolean;
  }
> = ({ children, className = "", onClick, sortable, ...props }) => (
  <th
    className={`px-6 py-4 font-semibold text-surface-600 dark:text-surface-300 ${sortable ? "cursor-pointer select-none hover:text-primary-500" : ""} ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </th>
);

export const Td: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <td
    className={`px-6 py-4 text-surface-600 dark:text-surface-300 ${className}`}
    {...props}
  >
    {children}
  </td>
);
