"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { Smartphone, MonitorSmartphone, Laptop } from "lucide-react";

export default function SecuritySettingsPage() {
  const [twoFactor, setTwoFactor] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const activeSessions = [
    { id: 1, device: "MacBook Pro", browser: "Chrome", location: "New York, USA", date: "Active now", icon: Laptop, isCurrent: true },
    { id: 2, device: "iPhone 14", browser: "Safari", location: "New York, USA", date: "2 hours ago", icon: Smartphone, isCurrent: false },
    { id: 3, device: "Windows Desktop", browser: "Edge", location: "London, UK", date: "Yesterday", icon: MonitorSmartphone, isCurrent: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-1">Security</h1>
        <p className="text-surface-500 text-sm">Manage your password and secure your account.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Change Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              label="Current Password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              type="password"
              label="New Password"
              placeholder="Create new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              type="password"
              label="Confirm New Password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="pt-2">
              <Button>Update Password</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50/50 dark:bg-surface-800/50">
                <div>
                  <h3 className="font-semibold text-surface-900 dark:text-surface-100">Require 2FA for login</h3>
                  <p className="text-sm text-surface-500 mt-1">Enhance your account security by requiring an extra verification step.</p>
                </div>
                <Toggle checked={twoFactor} onChange={setTwoFactor} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeSessions.map((session) => (
                  <div key={session.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors">
                    <div className="mt-1 p-2 bg-surface-100 dark:bg-surface-800 rounded-lg text-surface-600 dark:text-surface-300">
                      <session.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-surface-900 dark:text-surface-100 flex items-center gap-2">
                        {session.device}
                        {session.isCurrent && (
                          <span className="text-[10px] uppercase font-bold tracking-wider text-primary-600 bg-primary-500/10 px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-surface-500 mt-0.5">
                        {session.browser} • {session.location}
                      </p>
                      <p className="text-xs text-surface-400 mt-0.5">{session.date}</p>
                    </div>
                    {!session.isCurrent && (
                      <button className="text-sm font-medium text-error hover:text-error/80 transition-colors">
                        Revoke
                      </button>
                    )}
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
