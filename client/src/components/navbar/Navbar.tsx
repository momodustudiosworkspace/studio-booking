'use client'
import React from "react";
import Logo from "../../assets/LogoBlack";
import MenuBar from "../../assets/icons/MenuBar";
import { useSession } from "next-auth/react";
import UserNavbar from "./UserNavbar";

const Navbar = (): React.JSX.Element => {

  const {data:session} = useSession()
  return (
    <section className="flex justify-between items-center py-3 px-5  sm:px-20 fixed top-0  w-[1800px] z-50  bg-white">
      <Logo />

      {session?.user ? <UserNavbar user={session.user} /> : 
      
      <MenuBar />
      }
    </section>
  );
};

export default Navbar;
