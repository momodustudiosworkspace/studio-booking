"use client";
import React, { useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/hooks/hooks";
import { setToken } from "@/redux/slices/authSlice";

interface DashboardLayoutProps {
  children: React.ReactNode;
  headerProps: {
    headerText: string;
    paragraph: string;
    linkText: string;
    badge?: string;
    badgeStatus?:
      | undefined
      | "pending"
      | "confirmed"
      | "completed"
      | "cancelled";
    badgeClass?: string;
    href: string;
  };
}
const DashboardLayout = ({ children, headerProps }: DashboardLayoutProps) => {
  const { data: session } = useSession();
  const tokenDispatch = useAppDispatch();

  useEffect(() => {
    if (session?.user.accessToken) {
      tokenDispatch(
        setToken({ isLoggedIn: true, token: session.user.accessToken })
      );
    }
  }, [session, tokenDispatch]);

  return (
    <div className="min-h-full bg-black">
      <header className="relative after:pointer-events-none after:absolute after:inset-x-0 after:inset-y-0 after:border-y after:border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="tracking-tight text-white">
            <DashboardHeader
              badge={headerProps.badge}
              badgeStatus={headerProps.badgeStatus}
              badgeClass={headerProps.badgeClass}
              headerText={headerProps.headerText}
              paragraph={headerProps.paragraph}
              linkText={headerProps.linkText}
              href={headerProps.href}
            />
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
