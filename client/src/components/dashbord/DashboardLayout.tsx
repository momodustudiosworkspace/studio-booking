'use client'
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
    badgeStatus?: number;
    badgeClass?: string;
    href: string;
  };
}
const DashboardLayout = ({ children, headerProps }: DashboardLayoutProps) => {

  const { data: session } = useSession()
  const tokenDispatch = useAppDispatch()

  useEffect(() => {
    if (session?.user.accessToken) {

      tokenDispatch(setToken({ isLoggedIn: true, token: session.user.accessToken }))
    }
  }, [session, tokenDispatch])

  return (
    <section className='flex w-full flex-col gap-10'>
      <DashboardHeader
        badge={headerProps.badge}
        badgeStatus={headerProps.badgeStatus}
        badgeClass={headerProps.badgeClass}
        headerText={headerProps.headerText}
        paragraph={headerProps.paragraph}
        linkText={headerProps.linkText}
        href={headerProps.href}
      />
      {children}
    </section>
  );
};

export default DashboardLayout;
