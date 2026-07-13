export type LogStatus = "success" | "failed" | "warning";
export type LogModule = "Auth" | "Users" | "Payments" | "Settings" | "Reports" | "Security";

export interface ActivityLog {
  id: string;
  user: string;
  userEmail: string;
  action: string;
  module: LogModule;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM:SS
  ip: string;
  status: LogStatus;
}

const modules: LogModule[] = ["Auth", "Users", "Payments", "Settings", "Reports", "Security"];

const entries: Omit<ActivityLog, "id">[] = [
  { user: "Alice Johnson",   userEmail: "alice@example.com",   action: "Logged in",              module: "Auth",      date: "2024-03-27", time: "14:32:05", ip: "192.168.1.10", status: "success" },
  { user: "Bob Smith",       userEmail: "bob@example.com",     action: "Updated user profile",   module: "Users",     date: "2024-03-27", time: "13:18:44", ip: "10.0.0.5",     status: "success" },
  { user: "Carol White",     userEmail: "carol@example.com",   action: "Failed login attempt",   module: "Auth",      date: "2024-03-27", time: "12:05:30", ip: "203.0.113.42", status: "failed"  },
  { user: "David Lee",       userEmail: "david@example.com",   action: "Exported report",        module: "Reports",   date: "2024-03-27", time: "11:50:12", ip: "192.168.1.22", status: "success" },
  { user: "Eve Martinez",    userEmail: "eve@example.com",     action: "Changed password",       module: "Security",  date: "2024-03-26", time: "17:33:08", ip: "10.0.0.8",     status: "success" },
  { user: "Frank Brown",     userEmail: "frank@example.com",   action: "Processed payment",      module: "Payments",  date: "2024-03-26", time: "16:12:55", ip: "192.168.1.30", status: "success" },
  { user: "Grace Kim",       userEmail: "grace@example.com",   action: "Disabled 2FA",           module: "Security",  date: "2024-03-26", time: "15:45:00", ip: "10.0.0.12",    status: "warning" },
  { user: "Hank Wilson",     userEmail: "hank@example.com",    action: "Deleted user account",   module: "Users",     date: "2024-03-26", time: "14:20:17", ip: "192.168.1.15", status: "success" },
  { user: "Irene Davis",     userEmail: "irene@example.com",   action: "Updated settings",       module: "Settings",  date: "2024-03-26", time: "13:08:40", ip: "10.0.0.20",    status: "success" },
  { user: "Jack Taylor",     userEmail: "jack@example.com",    action: "Payment failed",         module: "Payments",  date: "2024-03-25", time: "18:55:02", ip: "203.0.113.15", status: "failed"  },
  { user: "Karen Anderson",  userEmail: "karen@example.com",   action: "Generated report",       module: "Reports",   date: "2024-03-25", time: "17:40:29", ip: "192.168.1.40", status: "success" },
  { user: "Leo Thomas",      userEmail: "leo@example.com",     action: "Logged in",              module: "Auth",      date: "2024-03-25", time: "16:22:14", ip: "10.0.0.25",    status: "success" },
  { user: "Mia Jackson",     userEmail: "mia@example.com",     action: "Invited new user",       module: "Users",     date: "2024-03-25", time: "15:10:48", ip: "192.168.1.50", status: "success" },
  { user: "Noah Harris",     userEmail: "noah@example.com",    action: "Unauthorized access",    module: "Security",  date: "2024-03-25", time: "14:05:33", ip: "198.51.100.7", status: "failed"  },
  { user: "Olivia Clark",    userEmail: "olivia@example.com",  action: "Updated billing info",   module: "Payments",  date: "2024-03-24", time: "11:30:59", ip: "10.0.0.30",    status: "success" },
  { user: "Paul Lewis",      userEmail: "paul@example.com",    action: "Reset password",         module: "Security",  date: "2024-03-24", time: "10:15:07", ip: "192.168.1.60", status: "warning" },
  { user: "Quinn Robinson",  userEmail: "quinn@example.com",   action: "Logged out",             module: "Auth",      date: "2024-03-24", time: "09:55:21", ip: "10.0.0.35",    status: "success" },
  { user: "Rachel Walker",   userEmail: "rachel@example.com",  action: "Exported CSV",           module: "Reports",   date: "2024-03-24", time: "09:02:45", ip: "192.168.1.70", status: "success" },
  { user: "Sam Young",       userEmail: "sam@example.com",     action: "Rate limit exceeded",    module: "Auth",      date: "2024-03-23", time: "22:48:13", ip: "203.0.113.88", status: "failed"  },
  { user: "Tina Hall",       userEmail: "tina@example.com",    action: "Bulk delete users",      module: "Users",     date: "2024-03-23", time: "16:30:00", ip: "10.0.0.40",    status: "warning" },
  { user: "Uma Allen",       userEmail: "uma@example.com",     action: "Logged in",              module: "Auth",      date: "2024-03-23", time: "08:14:55", ip: "192.168.1.80", status: "success" },
  { user: "Victor Scott",    userEmail: "victor@example.com",  action: "Refunded payment",       module: "Payments",  date: "2024-03-22", time: "14:42:30", ip: "10.0.0.45",    status: "success" },
  { user: "Wendy Green",     userEmail: "wendy@example.com",   action: "Permission denied",      module: "Security",  date: "2024-03-22", time: "11:20:19", ip: "198.51.100.22",status: "failed"  },
  { user: "Xander Adams",    userEmail: "xander@example.com",  action: "Updated API key",        module: "Settings",  date: "2024-03-21", time: "15:05:42", ip: "192.168.1.90", status: "success" },
  { user: "Yara Nelson",     userEmail: "yara@example.com",    action: "Scheduled report",       module: "Reports",   date: "2024-03-21", time: "09:33:10", ip: "10.0.0.50",    status: "success" },
  { user: "Zoe Carter",      userEmail: "zoe@example.com",     action: "Enabled 2FA",            module: "Security",  date: "2024-03-20", time: "13:17:28", ip: "192.168.1.100",status: "success" },
  { user: "Alice Johnson",   userEmail: "alice@example.com",   action: "Suspended user",         module: "Users",     date: "2024-03-20", time: "10:45:00", ip: "192.168.1.10", status: "warning" },
  { user: "Bob Smith",       userEmail: "bob@example.com",     action: "Login from new device",  module: "Auth",      date: "2024-03-19", time: "18:02:35", ip: "172.16.0.5",   status: "warning" },
  { user: "Carol White",     userEmail: "carol@example.com",   action: "Logged in",              module: "Auth",      date: "2024-03-19", time: "09:11:52", ip: "192.168.2.10", status: "success" },
  { user: "David Lee",       userEmail: "david@example.com",   action: "Created webhook",        module: "Settings",  date: "2024-03-18", time: "14:28:06", ip: "10.0.0.55",    status: "success" },
];

export const MOCK_ACTIVITY_LOGS: ActivityLog[] = entries.map((e, i) => ({
  ...e,
  id: `log_${String(i + 1).padStart(3, "0")}`,
}));
