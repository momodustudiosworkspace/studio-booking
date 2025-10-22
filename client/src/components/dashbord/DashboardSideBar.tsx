"use client"
import { DashboardIcons, IconsType } from '@/assets/icons/dashboard/DashboardIcons';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const DashboardSideBar = () => {
    const SIDEBAR_LINKS = [
        { href: "/dashboard", label: "Home", icon:'home-solid-black' as IconsType },
        { href: "/dashboard/bookings", label: "Bookings", icon:'camera-solid-black' as IconsType},
        { href: "/dashboard/profile-settings", label: "Profile", icon: 'help-solid-black' as IconsType },
        { href: "/dashboard/help", label: "Help", icon:'help-solid-black' as IconsType },
       
    ];
    const pathname = usePathname();

  return (
      <div className='min-h-[200px] sm:flex hidden rounded-md w-[247px] bg-white px-4 py-5 shadow-sm'>
          <nav className="space-y-2 w-full">
              {SIDEBAR_LINKS.map((link) => (
                  <Link
                      key={link.href}
                      href={link.href}
                      className={
                          ` rounded-md px-3 py-2 hover:bg-gray-100 flex items-center gap-2
                          ${pathname === link.href && "bg-gray-200 font-semibold"}
                      `}
                  >
                      <DashboardIcons value={link.icon} />
                      <span className='mt-[3px]'>{link.label}</span>
                  </Link>
              ))}
              <button className='flex mt-4 hover:cursor-pointer items-center gap-2 text-[#C50000] bg-[#C500001A] rounded-md px-2 py-2 w-full' onClick={() => signOut({ callbackUrl: "/auth" })}><DashboardIcons value='logout-danger'/>Log Out</button>
          </nav>
    </div>
  )
}

export default DashboardSideBar