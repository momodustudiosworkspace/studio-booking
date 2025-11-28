"use client";
import {
  DashboardIcons,
  IconsType,
} from "@/assets/icons/dashboard/DashboardIcons";
import { useAppDispatch } from "@/hooks/hooks";
// import { baseApi } from "@/redux/services/api";
import { userLogOut } from "@/redux/slices/authSlice";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardSideBar = () => {
  const dispatch = useAppDispatch();
  const SIDEBAR_LINKS = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: "home-solid-black" as IconsType,
    },
    {
      href: "/admin/dashboard/clients",
      label: "Clients",
      icon: "person-solid-black" as IconsType,
    },
    {
      href: "/admin/dashboard/bookings",
      label: "Bookings",
      icon: "camera-marker-solid-black" as IconsType,
    },
    {
      href: "/admin/dashboard/payments",
      label: "Payments",
      icon: "cash-solid-black" as IconsType,
    },
    // {
    //   href: "/admin/dashboard/report-and-analytics",
    //   label: "Report & Analysis",
    //   icon: "report-analytics-solid-black" as IconsType,
    // },
    {
      href: "/dashboard/help",
      label: "Help",
      icon: "help-solid-black" as IconsType,
    },
    {
      href: "/admin/dashboard/settings",
      label: "Settings",
      icon: "settings-solid-black" as IconsType,
    },
  ];

  const pathname = usePathname();

  return (
    <div className='z-40 -mt-[120px] h-screen w-[300px] border-r-[1px] border-gray-200 pt-[130px] pr-4 sm:flex'>
      <nav className='w-full space-y-4'>
        {SIDEBAR_LINKS.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100 ${pathname === link.href && "bg-gray-200 font-semibold"} `}
          >
            <DashboardIcons value={link.icon} />
            <span className='mt-[3px]'>{link.label}</span>
          </Link>
        ))}
        <button
          className='mt-4 flex w-full items-center gap-2 rounded-md bg-[#C500001A] px-2 py-2 text-[#C50000] hover:cursor-pointer'
          onClick={() => {
            // setTimeout(() => {
            //   dispatch(baseApi.util.resetApiState()) // 🧹 Clear all cached queries
            // }, 500)
            dispatch(userLogOut());

            signOut({ callbackUrl: "/auth" });
          }}
        >
          <DashboardIcons value='logout-danger' />
          Log Out
        </button>
      </nav>
    </div>
  );
};

export default DashboardSideBar;
