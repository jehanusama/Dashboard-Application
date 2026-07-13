export type UserStatus = "active" | "inactive" | "suspended";

export interface ManagementUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "user" | "manager";
  status: UserStatus;
  joinDate: string;
  image: string;
}

export const MOCK_MANAGEMENT_USERS: ManagementUser[] = Array.from({ length: 35 }).map((_, i) => ({
  id: `USR_${(i + 1).toString().padStart(3, "0")}`,
  name: `User Name ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `+1 555-01${i.toString().padStart(2, "0")}`,
  role: i % 5 === 0 ? "admin" : i % 3 === 0 ? "manager" : "user",
  status: i % 7 === 0 ? "inactive" : i % 11 === 0 ? "suspended" : "active",
  joinDate: `2024-${String((i % 12) + 1).padStart(2, "0")}-15`,
  image: `https://api.dicebear.com/7.x/avataaars/svg?seed=User${i + 1}`,
}));
