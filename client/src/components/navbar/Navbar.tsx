'use client'
import React from "react";
import Logo from "../../assets/Logo";
import MenuBar from "../../assets/icons/MenuBar";
import { useSession } from "next-auth/react";
import UserNavbar from "./UserNavbar";

const Navbar = (): React.JSX.Element => {

  const {data:session} = useSession()
  return (
    <section className="flex justify-between items-center py-3 px-5 sm:px-20 fixed z-50 w-full bg-white shadow-sm">
      <Logo />

      {session?.user ? <UserNavbar user={session.user} /> : 
      
      <MenuBar />
      }
    </section>
  );
};

export default Navbar;
