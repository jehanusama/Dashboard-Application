"use client";

import React, { useState, useRef, useEffect } from "react";

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  label?: string;
  error?: string;
  description?: string;
  options: Option[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const Select = ({
  label,
  error,
  description,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  disabled = false,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: Option) => {
    if (disabled) return;
    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div
      className={`w-full space-y-2 text-left ${className}`}
      ref={containerRef}
    >
      {label && (
        <label className="text-sm font-semibold text-foreground/90 ml-1">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
            w-full h-12 bg-white dark:bg-surface-900 border rounded-xl px-4 
            flex items-center justify-between transition-all duration-200 outline-none
            ${isOpen ? "ring-4 ring-primary/10 border-primary" : "border-border shadow-sm"}
            ${error ? "border-error ring-4 ring-error/10" : "hover:border-primary/50"}
            ${disabled ? "opacity-50 cursor-not-allowed bg-surface-50 dark:bg-surface-950" : "cursor-pointer"}
          `}
        >
          <span
            className={`truncate ${!selectedOption ? "text-surface-400" : "text-foreground"}`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={`w-5 h-5 text-surface-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white dark:bg-zinc-900 border border-border rounded-xl shadow-premium overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="max-h-60 overflow-y-auto p-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`
                    w-full px-3 py-2.5 text-sm text-left rounded-lg transition-colors
                    ${
                      option.value === value
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-foreground hover:bg-surface-100 dark:hover:bg-surface-800"
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-xs font-medium text-error ml-1">{error}</p>}
      {!error && description && (
        <p className="text-xs text-surface-500 dark:text-surface-400 ml-1">
          {description}
        </p>
      )}
    </div>
  );
};

Select.displayName = "Select";
