import React from "react";
import { Button } from "@/components/ui/Button";

// ─── Illustrations ────────────────────────────────────────────────────────────
// SVG illustrations inline so there's no external dependency.

const illustrations = {
  users: (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="100" cy="55" r="30" className="fill-primary-100 dark:fill-primary-900/40" />
      <circle cx="100" cy="45" r="18" className="fill-primary-200 dark:fill-primary-800/60" />
      <path d="M60 130 Q100 95 140 130" className="stroke-primary-300 dark:stroke-primary-700" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <circle cx="55" cy="70" r="14" className="fill-surface-200 dark:fill-surface-700" />
      <circle cx="55" cy="63" r="8" className="fill-surface-300 dark:fill-surface-600" />
      <path d="M35 110 Q55 88 75 110" className="stroke-surface-300 dark:stroke-surface-600" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="145" cy="70" r="14" className="fill-surface-200 dark:fill-surface-700" />
      <circle cx="145" cy="63" r="8" className="fill-surface-300 dark:fill-surface-600" />
      <path d="M125 110 Q145 88 165 110" className="stroke-surface-300 dark:stroke-surface-600" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <rect x="30" y="140" width="140" height="6" rx="3" className="fill-surface-100 dark:fill-surface-800" />
    </svg>
  ),

  transactions: (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="30" y="30" width="140" height="100" rx="12" className="fill-surface-100 dark:fill-surface-800" />
      <rect x="44" y="50" width="112" height="12" rx="4" className="fill-primary-200 dark:fill-primary-800/60" />
      <rect x="44" y="72" width="80" height="8" rx="4" className="fill-surface-200 dark:fill-surface-700" />
      <rect x="44" y="88" width="60" height="8" rx="4" className="fill-surface-200 dark:fill-surface-700" />
      <circle cx="152" cy="108" r="20" className="fill-primary-500/20 dark:fill-primary-500/30" />
      <path d="M145 108 L152 101 L159 108M145 108 L152 115 L159 108" className="stroke-primary-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="30" y="140" width="140" height="6" rx="3" className="fill-surface-100 dark:fill-surface-800" />
    </svg>
  ),

  reports: (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="25" y="20" width="150" height="120" rx="10" className="fill-surface-100 dark:fill-surface-800" />
      <rect x="40" y="38" width="80" height="10" rx="4" className="fill-primary-200 dark:fill-primary-800/60" />
      {[0,1,2,3].map((i) => (
        <React.Fragment key={i}>
          <rect x="40" y={60 + i * 18} width="120" height="7" rx="3" className="fill-surface-200 dark:fill-surface-700" style={{width: `${120 - i * 20}px`}} />
        </React.Fragment>
      ))}
      <rect x="40" y="60" width="120" height="7" rx="3" className="fill-surface-200 dark:fill-surface-700" />
      <rect x="40" y="76" width="100" height="7" rx="3" className="fill-surface-200 dark:fill-surface-700" />
      <rect x="40" y="92" width="80" height="7" rx="3" className="fill-surface-200 dark:fill-surface-700" />
      <rect x="40" y="108" width="60" height="7" rx="3" className="fill-surface-200 dark:fill-surface-700" />
      <path d="M135 90 L155 90 M135 100 L145 100" className="stroke-primary-400 dark:stroke-primary-500" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="155" cy="115" r="18" className="fill-primary-500/15 dark:fill-primary-500/25" />
      <path d="M150 115 L153 118 L160 111" className="stroke-primary-500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="25" y="148" width="150" height="6" rx="3" className="fill-surface-100 dark:fill-surface-800" />
    </svg>
  ),

  notifications: (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M100 20 L100 32" className="stroke-primary-400 dark:stroke-primary-500" strokeWidth="3" strokeLinecap="round"/>
      <path d="M70 40 Q70 25 100 25 Q130 25 130 40 L130 90 L70 90 Z" className="fill-primary-100 dark:fill-primary-900/40 stroke-primary-300 dark:stroke-primary-700" strokeWidth="2"/>
      <rect x="70" y="88" width="60" height="10" rx="2" className="fill-primary-200 dark:fill-primary-800/50"/>
      <circle cx="100" cy="110" r="9" className="fill-primary-300 dark:fill-primary-700"/>
      <circle cx="160" cy="35" r="12" className="fill-surface-200 dark:fill-surface-700"/>
      <path d="M155 35 L158 38 L165 31" className="stroke-success" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="25" y="148" width="150" height="6" rx="3" className="fill-surface-100 dark:fill-surface-800"/>
    </svg>
  ),

  search: (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="88" cy="72" r="42" className="fill-surface-100 dark:fill-surface-800 stroke-surface-200 dark:stroke-surface-700" strokeWidth="3"/>
      <circle cx="88" cy="72" r="28" className="fill-surface-50 dark:fill-surface-900"/>
      <path d="M88 60 Q88 52 80 56" className="stroke-surface-300 dark:stroke-surface-600" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M120 104 L150 134" className="stroke-surface-300 dark:stroke-surface-700" strokeWidth="6" strokeLinecap="round"/>
      <path d="M115 109 L145 139" className="stroke-surface-400 dark:stroke-surface-600" strokeWidth="3" strokeLinecap="round"/>
      <path d="M78 68 L88 78 L100 62" className="stroke-surface-400 dark:stroke-surface-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      <rect x="25" y="148" width="150" height="6" rx="3" className="fill-surface-100 dark:fill-surface-800"/>
    </svg>
  ),
} as const;

export type EmptyStateVariant = keyof typeof illustrations;

// ─── General EmptyState Component ────────────────────────────────────────────

export interface EmptyStateProps {
  /** Which illustration to show */
  variant?: EmptyStateVariant;
  /** Custom illustration override */
  illustration?: React.ReactNode;
  title: string;
  description: string;
  /** Label for the primary CTA button */
  actionLabel?: string;
  /** Handler for the primary CTA */
  onAction?: () => void;
  /** Optional secondary link / node rendered below the button */
  secondaryAction?: React.ReactNode;
  /** Extra wrapper className */
  className?: string;
}

export const EmptyState = ({
  variant = "search",
  illustration,
  title,
  description,
  actionLabel,
  onAction,
  secondaryAction,
  className = "",
}: EmptyStateProps) => (
  <div
    className={[
      "flex flex-col items-center justify-center text-center px-6 py-16 sm:py-20",
      className,
    ].join(" ")}
  >
    {/* Illustration */}
    <div className="w-36 h-28 sm:w-44 sm:h-36 mb-6 opacity-90">
      {illustration ?? illustrations[variant]}
    </div>

    {/* Text */}
    <h3 className="text-lg sm:text-xl font-bold text-surface-900 dark:text-white mb-2">
      {title}
    </h3>
    <p className="text-sm text-surface-500 dark:text-surface-400 max-w-sm leading-relaxed mb-6">
      {description}
    </p>

    {/* Primary action */}
    {actionLabel && onAction && (
      <Button variant="primary" size="md" onClick={onAction}>
        {actionLabel}
      </Button>
    )}

    {/* Secondary action */}
    {secondaryAction && (
      <div className="mt-3 text-sm text-surface-400">{secondaryAction}</div>
    )}
  </div>
);

// ─── Pre-configured presets ───────────────────────────────────────────────────

type PresetProps = {
  onAction?: () => void;
  className?: string;
};

export const NoUsersState = ({ onAction, className }: PresetProps) => (
  <EmptyState
    variant="users"
    title="No users yet"
    description="Your user directory is empty. Add your first user to get started managing your team."
    actionLabel="Add User"
    onAction={onAction}
    className={className}
  />
);

export const NoTransactionsState = ({ onAction, className }: PresetProps) => (
  <EmptyState
    variant="transactions"
    title="No transactions found"
    description="There are no transactions matching your current filters. Try adjusting your search or date range."
    actionLabel="Clear Filters"
    onAction={onAction}
    className={className}
  />
);

export const NoReportsState = ({ onAction, className }: PresetProps) => (
  <EmptyState
    variant="reports"
    title="No reports available"
    description="No reports have been generated yet. Create your first report to start tracking analytics and insights."
    actionLabel="Generate Report"
    onAction={onAction}
    className={className}
  />
);

export const NoNotificationsState = ({ onAction, className }: PresetProps) => (
  <EmptyState
    variant="notifications"
    title="All caught up!"
    description="You have no notifications right now. We'll let you know when something important happens."
    actionLabel="Adjust Preferences"
    onAction={onAction}
    className={className}
  />
);

export const NoSearchResultsState = ({
  query,
  onAction,
  className,
}: PresetProps & { query?: string }) => (
  <EmptyState
    variant="search"
    title="No results found"
    description={
      query
        ? `We couldn't find anything for "${query}". Check the spelling or try different keywords.`
        : "Your search returned no results. Try different keywords or clear the filters."
    }
    actionLabel="Clear Search"
    onAction={onAction}
    className={className}
  />
);
