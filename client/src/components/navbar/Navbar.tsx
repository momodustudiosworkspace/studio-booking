"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import UserNavbar from "./UserNavbar";
import LogoBlack from "@/assets/LogoBlack";
import Link from "next/link";
import LinkButton from "../ui/LinkButton";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import { usePathname } from "next/navigation";
import MenuBar from "@/assets/icons/MenuBar";

interface NavbarProps {
  navBarWidth?: string;
}
const Navbar = ({
  navBarWidth = "sm:w-[1440px]",
}: NavbarProps): React.JSX.Element => {
  const { data: session } = useSession()

  const [currentPage, setCurrentPage] = useState<number | null>(null);

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

  const pathName = usePathname();


  // const showUserMenuBar = {
  //   email: "Testing@gmail.com",
  //   accessToken: "",
  //   // refreshToken: string | undefined;
  //   isMember: true,
  //   isAdmin: false,
  // };
  // const showUserMenuBar = false;
  return (
    <section className='fixed top-0 z-50 flex w-full items-center justify-center bg-white px-5 py-3 sm:px-20 sm:py-5'>
      <div
        className={`flex w-full ${navBarWidth} items-center justify-between`}
      >
        <div className=''>
          <LogoBlack />
        </div>

        {pathName.split("/")[1] !== "dashboard" && (
          <div className='hidden items-center gap-10 sm:flex'>
            {ROUTES.map(route => {
              return (
                <Link
                  key={route.id}
                  href={route.href}
                  className={`mx-4 text-black ${currentPage === route.id ? "font-bold underline" : "font-medium"}`}
                  onClick={() => {
                    setCurrentPage(route.id);
                  }}
                >
                  {route.text}
                </Link>
              );
            })}
          </div>
        )}

        {/* {session?.user ? <UserNavbar user={session.user} /> :  */}
        {session?.user ? (
          <UserNavbar user={session.user} />
        ) : (
          <div>
            <div className='hidden items-center gap-5 font-medium sm:flex'>
              <div className='flex items-center gap-2'>
                <Link href={"/auth"}>Log In</Link>/
                <Link href={"/auth"}>Sign Up</Link>
              </div>
              <LinkButton
                href='/bookings'
                size='md'
                text='Book your session'
                icon={<RedirectArrowWhite />}
                iconPosition='right'
                className='w-auto shrink-0'
              />
            </div>
            <div className='flex sm:hidden'>
              <MenuBar />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Navbar;
