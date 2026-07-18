"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export const Breadcrumbs = () => {
  const pathname = usePathname();

  // If we are at the root, no need to show breadcrumbs
  if (!pathname || pathname === "/") return null;

  // Split path into segments, filtering out empty ones
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="flex overflow-x-auto whitespace-nowrap scrollbar-hide py-2">
      <ol className="flex items-center gap-1 sm:gap-2 text-sm text-surface-500 dark:text-surface-400">
        <li>
          <Link
            href="/dashboard"
            className="flex items-center justify-center p-1 hover:text-primary-500 transition-colors rounded-md hover:bg-surface-100 dark:hover:bg-surface-800"
            aria-label="Home"
          >
            <Home size={16} />
          </Link>
        </li>

        {segments.map((segment, index) => {
          // If the very first segment is "dashboard", skip rendering it
          // since the Home icon already represents it conceptually
          if (index === 0 && segment.toLowerCase() === "dashboard") {
            return null;
          }

          const isLast = index === segments.length - 1;
          
          // Reconstruct the URL for this segment
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          
          // Format label (e.g., "settings" -> "Settings", "my-page" -> "My Page")
          const label = segment
            .replace(/-/g, " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          return (
            <li key={href} className="flex items-center gap-1 sm:gap-2">
              <ChevronRight size={14} className="text-surface-300 dark:text-surface-600 shrink-0" />
              {isLast ? (
                <span
                  className="font-semibold text-surface-900 dark:text-surface-100 px-1"
                  aria-current="page"
                >
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="px-1 hover:text-primary-500 transition-colors rounded-md hover:bg-surface-100 dark:hover:bg-surface-800"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
