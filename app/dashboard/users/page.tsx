import React from "react";
import { UsersTable } from "@/components/users/UsersTable";
import { Users } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
          <Users className="text-primary-500" />
          Users Management
        </h1>
      </div>
      <UsersTable />
    </div>
  );
}
