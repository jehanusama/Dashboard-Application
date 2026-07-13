export type NotificationCategory = "system" | "user" | "payment" | "security";

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  category: NotificationCategory;
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif_1",
    title: "New User Registration",
    message: "John Doe has just registered a new account.",
    date: "2024-03-27T10:30:00Z",
    read: false,
    category: "user",
  },
  {
    id: "notif_2",
    title: "Payment Received",
    message: "Payment of $150.50 received from Alice Johnson.",
    date: "2024-03-27T09:15:00Z",
    read: false,
    category: "payment",
  },
  {
    id: "notif_3",
    title: "System Update",
    message: "System maintenance is scheduled for tonight at 2 AM.",
    date: "2024-03-26T18:00:00Z",
    read: true,
    category: "system",
  },
  {
    id: "notif_4",
    title: "Suspicious Login Attempt",
    message: "Failed login attempt from unrecognized device.",
    date: "2024-03-26T14:20:00Z",
    read: false,
    category: "security",
  },
  {
    id: "notif_5",
    title: "Monthly Report Ready",
    message: "Your monthly analytics report for March is ready to view.",
    date: "2024-03-25T08:00:00Z",
    read: true,
    category: "system",
  },
];
