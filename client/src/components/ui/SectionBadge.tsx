import MomoduBlack from "@/assets/icons/MomoduBlack";
import React from "react";

interface SectionBadgeProps {
  text: string;
  variation: "light" | "dark";
}
const SectionBadge = ({
  text,
  variation = "light",
}: SectionBadgeProps): React.JSX.Element => {
  const variant =
    variation === "dark"
      ? "bg-[#FAFAFA33] text-white"
      : "text-black bg-[#FAFAFA]";
  return (
    <div
      className={`${variant} flex items-center gap-4 rounded-full px-3 py-2`}
    >
      <MomoduBlack />
      <p className='text-md font-semibold'>{text}</p>
    </div>
  );
};

export default SectionBadge;
