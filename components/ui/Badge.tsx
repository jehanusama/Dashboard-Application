import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "error" | "info" | "neutral" | "primary";
}

export const Badge = ({
  className = "",
  variant = "neutral",
  children,
  ...props
}: BadgeProps) => {
  const variants = {
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    error: "bg-error/10 text-error border-error/20",
    info: "bg-info/10 text-info border-info/20",
    neutral:
      "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 border-border",
    primary: "bg-primary/10 text-primary border-primary/20",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
