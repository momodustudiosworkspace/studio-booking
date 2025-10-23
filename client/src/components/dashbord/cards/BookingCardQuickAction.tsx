import {
  DashboardIcons,
  IconsType,
} from "@/assets/icons/dashboard/DashboardIcons";
import Link from "next/link";
import React from "react";

interface BookingCardQuickAtionProps {
  icon: IconsType;
  title: string;
  linkText: string;
  href: string;
}
const BookingCardQuickAtion = ({
  icon,
  title,
  href,
}: BookingCardQuickAtionProps) => {
  return (
    <Link
      href={href}
      className='flex w-full items-center justify-center gap-3 rounded-md bg-white py-6 shadow'
    >
      <div className='flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#FAFAFA]'>
        <DashboardIcons value={icon} />
      </div>
      <p className='text-sm font-semibold'>{title}</p>
    </Link>
  );
};

export default BookingCardQuickAtion;
