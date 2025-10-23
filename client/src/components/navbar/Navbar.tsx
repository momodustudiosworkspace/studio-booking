"use client";
import React, { useState } from "react";
// import { useSession } from "next-auth/react";
import UserNavbar from "./UserNavbar";
import LogoBlack from "@/assets/LogoBlack";
import Link from "next/link";
import LinkButton from "../ui/LinkButton";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";

const Navbar = (): React.JSX.Element => {
  // const { data: session } = useSession()

  const [currentPage, setCurrentPage] = useState<number>(1)

  const ROUTES = [
    {
      id: 1,
      text: 'Home',
      href: '/web',

    },
    {
      id: 2,
      text: 'About Us',
      href: '/web/about-us',

    },
    {
      id: 3,
      text: 'Portfolio',
      href: '/web/portfolio',

    },
    {
      id: 4,
      text: 'Contact',
      href: '/web/contact',

    },

  ]

  // const showUserMenuBar = {
  //   email: "Testing@gmail.com",
  //   accessToken: "",
  //   // refreshToken: string | undefined;
  //   isMember: true,
  //   isAdmin: false,
  // };
  const showUserMenuBar = false
  return (
    <section className='fixed top-0 z-50 flex w-full items-center px-5 bg-white justify-center py-3 sm:px-20'>
      <div className="sm:w-[1440px] flex w-full items-center justify-between ">
      <div className=''>
        <LogoBlack />
        </div>

        <div className="sm:flex hidden items-center gap-10">
          {ROUTES.map((route) => {
            return <Link key={route.id} href={route.href} className={`mx-4 text-black ${currentPage === route.id ? "font-bold underline" : "font-medium "}`} onClick={() => {
              setCurrentPage(route.id)
            }}>{route.text}</Link>
          })}
        </div>

      {/* {session?.user ? <UserNavbar user={session.user} /> :  */}
        {showUserMenuBar ? <UserNavbar user={showUserMenuBar} /> : <LinkButton
          href='/bookings'
          size='md'
          text='Book your session'
          icon={<RedirectArrowWhite />}
          iconPosition='right'
          className='w-auto shrink-0'
        />}
      </div>
    </section>
  );
};

export default Navbar;
