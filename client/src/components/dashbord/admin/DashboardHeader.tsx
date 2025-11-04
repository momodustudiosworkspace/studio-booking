import React from "react";
import LinkButton from "../../ui/LinkButton";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";

interface DashboardHeaderProps {
  headerText: string;
  paragraph: string;
  linkText?: string;
  badge?: string | undefined;
  badgeStatus?: "pending" | "confirmed" | "completed" | "cancelled" | undefined;
  badgeClass?: string | undefined;
  href?: string;
}
const DashboardHeader = ({
  headerText,
  paragraph,
  linkText,
  href,
  badge,
  badgeStatus,
  badgeClass,
}: DashboardHeaderProps) => {
  const bagdeStatusStyle =
    badgeStatus === "cancelled"
      ? "bg-red-200 text-red-500"
      : badgeStatus === "completed"
        ? "bg-[#0362001A] text-[#036200]"
        : badgeStatus === "pending"
          ? "bg-blue-300 text-blue-600"
          : badgeStatus === undefined
            ? "bg-[#E595001A] text-[#E59500]"
            : "";
  return (
    <div className='flex w-full flex-col gap-5 sm:flex-row sm:items-end sm:justify-between'>
      <div>
        <div className='flex items-center gap-3'>
          <h1 className='text-[22px] font-bold capitalize sm:text-[24px]'>
            {headerText}
          </h1>
          {badge && (
            <span
              className={`${badgeClass} ${bagdeStatusStyle} flex items-center justify-center rounded-full px-2 py-1 text-xs font-semibold capitalize`}
            >
              {badge}
            </span>
          )}
        </div>
        <p className='capitalize'>{paragraph}</p>
      </div>
      {linkText && (
        <div className='h-[40px]'>
          <LinkButton
            href={href}
            size='md'
            text={linkText}
            icon={<RedirectArrowWhite />}
            iconPosition='right'
            className='w-auto'
          />
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
