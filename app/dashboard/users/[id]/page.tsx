import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_MANAGEMENT_USERS, UserStatus } from "@/lib/mockData/usersList";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Clock, Activity, Shield, LogIn } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
interface PageProps {
  params: Promise<{ id: string }>;
}

const STATUS_VARIANTS: Record<UserStatus, "success" | "error" | "warning" | "neutral"> = {
  active: "success",
  inactive: "neutral",
  suspended: "error",
};

export default async function UserDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const user = MOCK_MANAGEMENT_USERS.find((u) => u.id === id);

  if (!user) {
    notFound();
  }

  const address = "123 Management St, Tech City, TC 90210";
  const lastLogin = "2024-03-27 14:32:00";
  const activityTimeline = [
    { action: "Updated profile picture", date: "2024-03-27 14:35:00" },
    { action: "Logged in successfully", date: "2024-03-27 14:32:00" },
    { action: "Changed password", date: "2024-03-20 09:15:00" },
    { action: "Account created", date: user.joinDate + " 10:00:00" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <img src={user.image} alt={user.name} className="w-16 h-16 rounded-full border-2 border-primary-500 bg-surface-100 dark:bg-surface-800" />
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white flex items-center gap-3">
              {user.name}
              <Badge variant={STATUS_VARIANTS[user.status]} className="capitalize text-sm">
                {user.status}
              </Badge>
            </h1>
            <p className="text-surface-500 font-mono text-sm">{user.id}</p>
          </div>
        </div>
        <Link
          href="/dashboard/users"
          className="inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98] border-2 border-primary-500 text-primary-500 hover:bg-primary-500/5 h-11 px-6 text-sm gap-2"
        >
          <ArrowLeft size={16} />
          <span>Back to Users</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Orders" value={14} icon={Activity} trend={{ value: "12", isPositive: true }} secondaryText="from last month" />
        <StatCard label="Total Spent" value="$1,240" icon={Activity} />
        <StatCard label="Support Tickets" value={2} icon={Activity} trend={{ value: "-1", isPositive: true }} secondaryText="from last month" />
        <StatCard label="Loyalty Points" value={450} icon={Activity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-surface-600 dark:text-surface-300">
                <Mail size={18} className="text-primary-500" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-surface-600 dark:text-surface-300">
                <Phone size={18} className="text-primary-500" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-surface-600 dark:text-surface-300">
                <MapPin size={18} className="text-primary-500" />
                <span>{address}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-surface-600 dark:text-surface-300">
                <Shield size={18} className="text-primary-500" />
                <span className="capitalize">Role: <strong className="font-semibold">{user.role}</strong></span>
              </div>
              <div className="flex items-center gap-3 text-surface-600 dark:text-surface-300">
                <Calendar size={18} className="text-primary-500" />
                <span>Joined: <strong className="font-semibold">{user.joinDate}</strong></span>
              </div>
              <div className="flex items-center gap-3 text-surface-600 dark:text-surface-300">
                <LogIn size={18} className="text-primary-500" />
                <span>Last Login: <strong className="font-semibold">{lastLogin}</strong></span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock size={18} className="text-primary-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-surface-200 dark:before:via-surface-700 before:to-transparent">
                {activityTimeline.map((event, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-surface-900 bg-surface-100 dark:bg-surface-800 text-surface-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                      <Activity className="w-5 h-5 text-primary-500" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface-50 dark:bg-surface-800/50 p-4 rounded border border-surface-200 dark:border-surface-700 shadow-sm">
                      <div className="font-medium text-surface-900 dark:text-white mb-1">{event.action}</div>
                      <div className="text-sm text-surface-500">{event.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
