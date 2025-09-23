import MomoduBlack from "@/assets/icons/MomoduBlack";
import React from "react";

interface SectionBadgeProps {
  text: string;
  variation: "light" | "dark";
}
const SectionBadge = ({ text, variation = "light" }: SectionBadgeProps) => {
  const variant =
    variation === "dark" ? "bg-[#FAFAFA33] text-white" : "text-black bg-[#FAFAFA]";
  return (
    <div
      className={`${variant} flex gap-4 items-center rounded-full px-3 py-2`}
    >
      <MomoduBlack />
      <p className="font-semibold text-md">{text}</p>
    </div>
  );
};

export default SectionBadge;
