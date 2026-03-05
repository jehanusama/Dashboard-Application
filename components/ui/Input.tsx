"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  description?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      label,
      error,
      description,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-semibold text-foreground/90 ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400 group-focus-within:text-primary transition-colors">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={`
              w-full h-12 bg-white dark:bg-surface-900 border rounded-xl px-4 
              transition-all duration-200 outline-none
              ${leftIcon ? "pl-11" : ""} 
              ${rightIcon ? "pr-11" : ""}
              ${
                error
                  ? "border-error focus:ring-4 focus:ring-error/10"
                  : "border-border focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-sm"
              }
              disabled:opacity-50 disabled:bg-surface-50 dark:disabled:bg-surface-950
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs font-medium text-error ml-1 animate-shake">
            {error}
          </p>
        )}
        {!error && description && (
          <p className="text-xs text-surface-500 dark:text-surface-400 ml-1">
            {description}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
