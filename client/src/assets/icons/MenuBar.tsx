"use client";
import React, { useState } from "react";
import { DashboardIcons, IconsType } from "./dashboard/DashboardIcons";
import Link from "next/link";
import LinkButton from "@/components/ui/LinkButton";
import RedirectArrowWhite from "./RedirectArrowWhite";

const MenuBar = () => {
  const [showSideBarmenu, setShowSideBarmenu] = useState<boolean>(false);
  const SIDEBAR_MENU = [
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
      icon: "help-solid-black" as IconsType,
    },
    {
      href: "/dashboard/help",
      label: "Help",
      icon: "help-solid-black" as IconsType,
    },
  ];

  const ROUTES = [
    {
      id: 1,
      text: "Home",
      href: "/web",
    },
    {
      id: 2,
      text: "About Us",
      href: "/web/about-us",
    },
    {
      id: 3,
      text: "Portfolio",
      href: "/web/portfolio",
    },
    {
      id: 4,
      text: "Contact",
      href: "/web/contact",
    },
  ];
  return (
    <div>
      {
        <button
          className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-50'
          onClick={() => setShowSideBarmenu(!showSideBarmenu)}
        >
          {showSideBarmenu ? (
            <DashboardIcons value='cancel-outlined-black' />
          ) : (
            <svg
              width='16'
              height='13'
              viewBox='0 0 16 13'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.5 2.36619V0.699524H15.5V2.36619H0.5ZM0.5 12.3662V10.6995H15.5V12.3662H0.5ZM0.5 7.36619V5.69952H15.5V7.36619H0.5Z'
                fill='#1C1B1F'
              />
            </svg>
          )}
        </button>
      }
      {showSideBarmenu && (
        <div className='absolute left-0 h-screen w-full bg-white'>
          <div className='flex flex-col gap-4 border-b-[1px] border-gray-400 pt-10 pb-10 pl-4'>
            <h3 className='font-bold'>General menu</h3>
            {ROUTES.map(route => {
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className='flex items-center gap-2'
                  onClick={() => setShowSideBarmenu(false)}
                >
                  {" "}
                  {route.text}
                </Link>
              );
            })}
            <LinkButton
              href='/bookings'
              size='md'
              text='Book your session'
              icon={<RedirectArrowWhite />}
              iconPosition='right'
              className='w-[205px] shrink-0'
            />
            <Link href={"https://www.momodustudios.com/pages/merch"}>Studo Merch</Link>
          </div>
          <div className='flex flex-col gap-4 pt-10 pl-4'>
            <h3 className='font-bold'>User menu</h3>
            {SIDEBAR_MENU.map(menu => {
              return (
                <Link
                  key={menu.label}
                  href={menu.href}
                  className='flex items-center gap-2'
                  onClick={() => setShowSideBarmenu(false)}
                >
                  {" "}
                  <DashboardIcons value={menu.icon} />
                  {menu.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
