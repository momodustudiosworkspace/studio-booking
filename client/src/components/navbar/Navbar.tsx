'use client'
import React from "react";
// import { useSession } from "next-auth/react";
import UserNavbar from "./UserNavbar";
import LogoBlack from "@/assets/LogoBlack";

const Navbar = (): React.JSX.Element => {

  // const { data: session } = useSession()


  const showUserMenuBar = {
    email: 'Testing@gmail.com',
    accessToken: '',
    // refreshToken: string | undefined;
    isMember: true,
    isAdmin: false
  }
  return (
    <section className="flex justify-between items-center py-3 px-5  sm:px-20 fixed top-0  sm:w-[1800px] w-full z-50  bg-white">

      <div className="">
        <LogoBlack />
      </div>

      {/* {session?.user ? <UserNavbar user={session.user} /> :  */}
      {showUserMenuBar ? <UserNavbar user={showUserMenuBar} /> :
      
        ''
      }
    </section>
  );
};

export default Navbar;
