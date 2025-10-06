import React from "react";
import LogoBlack from "../assets/LogoBlack";
import MenuBar from "../assets/icons/MenuBar";

const Navbar = (): React.JSX.Element => {
  return (
    <section className="flex justify-between items-center py-3 px-5 fixed z-50 w-full bg-white shadow-sm">
      <LogoBlack />
      <MenuBar />
    </section>
  );
};

export default Navbar;
