import { User } from "./types";

export interface MockUser extends User {
  password?: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "admin_123",
    name: "Admin User",
    email: "admin@test.com",
    password: "Admin@1234",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    role: "admin" as const,
  },
  {
    id: "user_456",
    name: "Standard User",
    email: "user@test.com",
    password: "User@1234",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
    role: "user" as const,
  },
];
