import React from "react";
import { HomeIcons } from "./home/HomeIcons";

const CopyRight = () => {
  return (
    <div>
      <div className="sm:hidden flex">
        <HomeIcons value="mobile-trade-mark-c" />
      </div>
      <div className="hidden sm:flex">
        <HomeIcons value="desktop-trade-mark-c" />
      </div>
    </div>
  );
};

export default CopyRight;
