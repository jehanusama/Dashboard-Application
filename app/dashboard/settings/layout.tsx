import React from "react";
import { SettingsNav } from "@/components/settings/SettingsNav";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto pb-8">
      <SettingsNav />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
