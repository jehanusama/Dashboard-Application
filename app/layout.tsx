"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { useAppSelector } from "@/hooks/useAppSelector";
import { store, RootState } from "@/store";
import { restoreSession } from "@/store/authSlice";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/Loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function AppInitializer({ children }: { children: React.ReactNode }) {
  const isInitialized = useAppSelector((s: RootState) => s.auth.isInitialized);

  useEffect(() => {
    // restoreSession reads localStorage — must run client-side only
    store.dispatch(restoreSession());
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <AppInitializer>{children}</AppInitializer>
        </Provider>
      </body>
    </html>
  );
}
