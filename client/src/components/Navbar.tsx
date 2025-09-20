import React from "react";
import Logo from "../assets/Logo";
import MenuBar from "../assets/icons/MenuBar";

const Navbar = () => {
  return (
    <section className="flex justify-between items-center py-3 px-5">
      <Logo />
      <MenuBar />
    </section>
  );
};

export default Navbar;
