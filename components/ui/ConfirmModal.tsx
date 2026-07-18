"use client";

import React, { useEffect } from "react";
import { Button } from "./Button";
import { X, AlertTriangle } from "lucide-react";

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "primary" | "danger" | "secondary";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "danger",
  isLoading = false,
  icon,
}: ConfirmModalProps) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-surface-900/60 dark:bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={() => !isLoading && onClose()}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md bg-white dark:bg-surface-900 rounded-2xl shadow-premium border border-surface-200 dark:border-surface-800 p-6 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors disabled:opacity-50"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center gap-4 mt-2">
          <div
            className={`p-3 rounded-full ${
              confirmVariant === "danger"
                ? "bg-error/10 text-error"
                : "bg-primary-500/10 text-primary-500"
            }`}
          >
            {icon || <AlertTriangle size={28} />}
          </div>
          
          <div className="space-y-2">
            <h2 id="modal-title" className="text-xl font-bold text-surface-900 dark:text-white">
              {title}
            </h2>
            <p id="modal-description" className="text-sm text-surface-500 dark:text-surface-400">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2 w-full">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={confirmVariant}
            className="flex-1"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
