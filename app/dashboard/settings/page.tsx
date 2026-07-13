"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export default function GeneralSettingsPage() {
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("utc");
  const [dateFormat, setDateFormat] = useState("mm-dd-yyyy");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-1">General Settings</h1>
        <p className="text-surface-500 text-sm">Manage your basic account preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="max-w-md space-y-5">
            <Select
              label="Language"
              value={language}
              onChange={(val) => setLanguage(val as string)}
              options={[
                { value: "en", label: "English" },
                { value: "es", label: "Spanish" },
                { value: "fr", label: "French" },
                { value: "de", label: "German" },
              ]}
            />

            <Select
              label="Timezone"
              value={timezone}
              onChange={(val) => setTimezone(val as string)}
              options={[
                { value: "utc", label: "UTC (Coordinated Universal Time)" },
                { value: "est", label: "Eastern Standard Time (EST)" },
                { value: "pst", label: "Pacific Standard Time (PST)" },
                { value: "cet", label: "Central European Time (CET)" },
              ]}
            />

            <Select
              label="Date Format"
              value={dateFormat}
              onChange={(val) => setDateFormat(val as string)}
              options={[
                { value: "mm-dd-yyyy", label: "MM/DD/YYYY" },
                { value: "dd-mm-yyyy", label: "DD/MM/YYYY" },
                { value: "yyyy-mm-dd", label: "YYYY-MM-DD" },
              ]}
            />
          </div>

          <div className="pt-4 flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
