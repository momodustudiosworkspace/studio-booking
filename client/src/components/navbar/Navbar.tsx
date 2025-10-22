"use client";
import React from "react";
// import { useSession } from "next-auth/react";
import UserNavbar from "./UserNavbar";
import LogoBlack from "@/assets/LogoBlack";

const Navbar = (): React.JSX.Element => {
  // const { data: session } = useSession()

  const showUserMenuBar = {
    email: "Testing@gmail.com",
    accessToken: "",
    // refreshToken: string | undefined;
    isMember: true,
    isAdmin: false,
  };
  return (
    <section className='fixed top-0 z-50 flex w-full items-center justify-between bg-white px-5 py-3 sm:w-[1800px] sm:px-20'>
      <div className=''>
        <LogoBlack />
      </div>

      {/* {session?.user ? <UserNavbar user={session.user} /> :  */}
      {showUserMenuBar ? <UserNavbar user={showUserMenuBar} /> : ""}
    </section>
  );
};

export default Navbar;
