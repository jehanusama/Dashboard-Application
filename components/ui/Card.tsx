"use client";

import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "bordered";
  hoverable?: boolean;
}

export const Card = ({
  className = "",
  variant = "default",
  hoverable = false,
  children,
  ...props
}: CardProps) => {
  const baseStyles = "rounded-2xl transition-all duration-300 overflow-hidden";

  const variants = {
    default: "bg-card text-card-foreground border border-border shadow-soft",
    glass: "glass",
    bordered: "border-2 border-border bg-transparent",
  };

  const hoverStyles = hoverable
    ? "hover:shadow-premium hover:-translate-y-1"
    : "";

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 pb-3 ${className}`} {...props} />
);

export const CardTitle = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`text-xl font-bold tracking-tight ${className}`} {...props} />
);

export const CardDescription = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={`text-sm text-surface-500 dark:text-surface-400 ${className}`}
    {...props}
  />
);

export const CardContent = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
);

export const CardFooter = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`p-6 pt-0 flex items-center border-t border-border/50 mt-4 ${className}`}
    {...props}
  />
);
