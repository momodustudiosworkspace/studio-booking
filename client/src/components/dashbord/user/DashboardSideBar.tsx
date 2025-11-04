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
      href: "/dashboard",
      label: "Dashboard",
      icon: "home-solid-black" as IconsType,
    },
    {
      href: "/dashboard/bookings",
      label: "Bookings",
      icon: "camera-solid-black" as IconsType,
    },
    {
      href: "/dashboard/profile-settings",
      label: "Profile",
      icon: "person-solid-black" as IconsType,
    },
    {
      href: "/dashboard/help",
      label: "Help",
      icon: "help-solid-black" as IconsType,
    },
  ];

  const pathname = usePathname();

  return (
    <div className='hidden min-h-[200px] w-[247px] rounded-md bg-white px-4 py-5 shadow-sm sm:flex'>
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
            dispatch(userLogOut())

            signOut({ callbackUrl: "/auth" }
            )
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
