import React from "react";
import SectionBadge from "./ui/SectionBadge";

interface SectionHeaderProps {
  badgeWidth?: string;
  badgeText: string;
  headerText?: string;
  paragraphText?: string;
}
const SectionHeader = ({
  badgeWidth,
  badgeText,
  headerText,
  paragraphText,
}: SectionHeaderProps) => {
  return (
    <div>
      <div className={badgeWidth}>
        <SectionBadge text={badgeText} variation="light" />
      </div>
      <h1 className="text-[25px] font-bold font-sans">{headerText}</h1>
      <p>{paragraphText}</p>
    </div>
  );
};

export default SectionHeader;
