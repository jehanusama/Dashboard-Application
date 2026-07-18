"use client";

import React, { useState } from "react";
import { Button } from "./Button";
import { Trash2 } from "lucide-react";
import { ConfirmModal } from "./ConfirmModal";
import { useRouter } from "next/navigation";

interface DeleteActionProps {
  id: string;
  entityType: "user" | "transaction";
  returnUrl: string;
}

export const DeleteAction = ({ id, entityType, returnUrl }: DeleteActionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    // Artificial delay for mock deletion
    await new Promise(r => setTimeout(r, 600));
    setIsOpen(false);
    setIsDeleting(false);
    
    // Redirect after delete
    router.push(returnUrl);
  };

  const title = `Delete ${entityType.charAt(0).toUpperCase() + entityType.slice(1)}`;
  const description = `Are you sure you want to delete this ${entityType}? This action cannot be undone and all associated data will be permanently removed.`;

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setIsOpen(true)}
        className="border-error/20 text-error hover:bg-error/10 hover:border-error/30 transition-colors"
        leftIcon={<Trash2 size={16} />}
      >
        Delete
      </Button>

      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        title={title}
        description={description}
        confirmText="Delete"
        confirmVariant="danger"
        isLoading={isDeleting}
        icon={<Trash2 size={28} />}
      />
    </>
  );
};
