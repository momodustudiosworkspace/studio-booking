import React from "react";
import SectionBadge from "./ui/SectionBadge";

interface SectionHeaderProps {
  badgeWidth?: string;
  badgeText?: string;
  headerText?: string;
  paragraphText?: string;variation?: "light" | "dark";
}
const SectionHeader = ({
  badgeWidth,
  badgeText = '',
  headerText,
  paragraphText,
  variation="light"
}: SectionHeaderProps): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-4">
      <div className={badgeWidth}>
        {badgeText && <SectionBadge text={badgeText} variation={variation} />}
      </div>
      <h1 className="text-[25px] font-bold">{headerText}</h1>
      <p>{paragraphText}</p>
    </div>
  );
};

export default SectionHeader;
