"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { Mail, Smartphone, MessageSquare } from "lucide-react";

export default function NotificationsSettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [smsNotif, setSmsNotif] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-1">Notifications</h1>
        <p className="text-surface-500 text-sm">Choose what we can contact you about.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Communication Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50/50 dark:bg-surface-800/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-500/10 text-primary-600 dark:bg-primary-500/20 dark:text-primary-400 rounded-lg">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-surface-900 dark:text-surface-100">Email Notifications</h3>
                  <p className="text-sm text-surface-500">Receive daily summaries and important updates via email.</p>
                </div>
              </div>
              <Toggle checked={emailNotif} onChange={setEmailNotif} />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50/50 dark:bg-surface-800/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-500/10 text-primary-600 dark:bg-primary-500/20 dark:text-primary-400 rounded-lg">
                  <Smartphone size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-surface-900 dark:text-surface-100">Push Notifications</h3>
                  <p className="text-sm text-surface-500">Get real-time alerts on your device for active sessions.</p>
                </div>
              </div>
              <Toggle checked={pushNotif} onChange={setPushNotif} />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50/50 dark:bg-surface-800/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-500/10 text-primary-600 dark:bg-primary-500/20 dark:text-primary-400 rounded-lg">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-surface-900 dark:text-surface-100">SMS Notifications</h3>
                  <p className="text-sm text-surface-500">Receive text messages for critical alerts only.</p>
                </div>
              </div>
              <Toggle checked={smsNotif} onChange={setSmsNotif} />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button>Save Preferences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
