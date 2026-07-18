"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MOCK_MANAGEMENT_USERS, ManagementUser, UserStatus } from "@/lib/mockData/usersList";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Pagination } from "@/components/ui/Pagination";
import { NoSearchResultsState } from "@/components/ui/EmptyState";
import { Search } from "lucide-react";

const STATUS_VARIANTS: Record<UserStatus, "success" | "error" | "warning" | "neutral"> = {
  active: "success",
  inactive: "neutral",
  suspended: "error",
};

export const UsersTable = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "manager" | "user">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | UserStatus>("all");
  const [sortKey, setSortKey] = useState<keyof ManagementUser>("joinDate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filteredData = useMemo(() => {
    let data = [...MOCK_MANAGEMENT_USERS];
    
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.phone.includes(q)
      );
    }
    
    if (roleFilter !== "all") {
      data = data.filter((u) => u.role === roleFilter);
    }
    
    if (statusFilter !== "all") {
      data = data.filter((u) => u.status === statusFilter);
    }
    
    data.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    
    return data;
  }, [search, roleFilter, statusFilter, sortKey, sortDir]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (key: keyof ManagementUser) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-surface-400" />
        </div>
        <div className="flex gap-4">
          <Select
            value={roleFilter}
            onChange={(val) => {
              setRoleFilter(val as "all" | "admin" | "manager" | "user");
              setCurrentPage(1);
            }}
            options={[
              { value: "all", label: "All Roles" },
              { value: "admin", label: "Admin" },
              { value: "manager", label: "Manager" },
              { value: "user", label: "User" },
            ]}
          />
          <Select
            value={statusFilter}
            onChange={(val) => {
              setStatusFilter(val as "all" | UserStatus);
              setCurrentPage(1);
            }}
            options={[
              { value: "all", label: "All Statuses" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
              { value: "suspended", label: "Suspended" },
            ]}
          />
        </div>
      </div>

      {/* Table */}
      <Table>
        <THead>
          <Tr>
            <Th>Avatar</Th>
            <Th sortable onClick={() => handleSort("name")}>Name</Th>
            <Th sortable onClick={() => handleSort("email")}>Email</Th>
            <Th sortable onClick={() => handleSort("role")}>Role</Th>
            <Th sortable onClick={() => handleSort("status")}>Status</Th>
            <Th sortable onClick={() => handleSort("joinDate")}>Join Date</Th>
          </Tr>
        </THead>
        <TBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((user) => (
              <Tr
                key={user.id}
                onClick={() => router.push(`/dashboard/users/${user.id}`)}
                className="cursor-pointer"
              >
                <Td>
                  <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800" />
                </Td>
                <Td className="font-medium text-surface-900 dark:text-surface-100">{user.name}</Td>
                <Td>{user.email}</Td>
                <Td className="capitalize">{user.role}</Td>
                <Td>
                  <Badge variant={STATUS_VARIANTS[user.status]} className="capitalize">
                    {user.status}
                  </Badge>
                </Td>
                <Td>{user.joinDate}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={6}>
                <div className="py-6">
                  <NoSearchResultsState
                    query={search}
                    onAction={
                      search || roleFilter !== "all" || statusFilter !== "all"
                        ? () => {
                            setSearch("");
                            setRoleFilter("all");
                            setStatusFilter("all");
                          }
                        : undefined
                    }
                  />
                </div>
              </Td>
            </Tr>
          )}
        </TBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={filteredData.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={() => {}}
      />
    </div>
  );
};
