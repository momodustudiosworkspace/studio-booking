import { DashboardIcons } from "@/assets/icons/dashboard/DashboardIcons";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import LinkButton from "@/components/ui/LinkButton";
import { formatDate } from "@/utils/dateFormatter";
import nairaSymbol from "@/utils/symbols";
import { formatTime } from "@/utils/timeFormatter";
import React from "react";

interface BookingLocationOptions {
  state?: string;
  address?: string;
}
interface BookingCardProps {
  id?: string | null | undefined;
  title?: string | null | undefined;
  location?: BookingLocationOptions | null | undefined;
  date?: string | null | undefined;
  time?: string | null | undefined;
  amount?: number | null | undefined;
  status: "cancelled" | "completed" | "pending" | "confirmed" | undefined;
}
const BookingCard = ({
  id,
  title,
  location,
  date,
  time,
  amount,
  status,
}: BookingCardProps) => {
  const statusStyle =
    status === "cancelled"
      ? "bg-red-500"
      : status === "pending"
        ? "bg-[#0362001A] text-[#036200]"
        : status === "confirmed"
          ? "bg-blue-300 text-blue-600"
          : status === "completed"
            ? "bg-green-700 text-white"
            : "";
  const statusText =
    status === "cancelled"
      ? "cancelled"
      : status === "completed"
        ? "completed"
        : status === "pending"
          ? "pending"
          : status === "confirmed"
            ? "confirmed"
            : "";
  return (
    <div className='flex flex-col justify-between gap-3 rounded-md border-1 border-gray-400 p-4 text-white shadow sm:flex-row sm:items-center sm:gap-0'>
      {/* Booking Details  */}
      <div className='flex shrink-0 gap-4 sm:w-[500px] sm:items-center'>
        <div
          className={`flex h-[48px] w-[48px] items-center justify-center rounded-md bg-[#828282]`}
        >
          <DashboardIcons value='camera-solid-black' />
        </div>
        <div>
          <div className='flex gap-4 sm:mb-1'>
            <h3 className='text-[14px] font-semibold capitalize sm:text-[16px]'>
              {title}
            </h3>
            <span
              className={`${statusStyle} flex items-center justify-center rounded-full px-2 py-1 text-xs font-semibold capitalize`}
            >
              {statusText}
            </span>
          </div>
          <p className='text-[14px] sm:text-[16px]'>
            {location?.address} {location?.state}
          </p>
        </div>
      </div>
      {/* Booking date  */}
      <div className='flex items-center gap-2 sm:w-[200px]'>
        <div
          className={`flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#FAFAFA]`}
        >
          <DashboardIcons value='calendar-grid-outlined-black' />
        </div>
        <div>
          <div className='mb-1 flex gap-2'>
            <h3 className='font-semibold capitalize'>
              {formatDate(date, "short")}
            </h3>
          </div>
          <p className='text-[14px] sm:text-[16px]'>{formatTime(time)}</p>
        </div>
      </div>
      {/* Booking price  */}
      <div className='flex items-center gap-2 sm:w-[200px]'>
        <div
          className={`flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#FAFAFA]`}
        >
          <DashboardIcons value='dollar-sign-outlined-black' />
        </div>
        <div>
          <div className='mb-1 flex gap-2'>
            <h3 className='font-semibold capitalize'>
              {nairaSymbol()}
              {amount?.toLocaleString()}
            </h3>
          </div>
          <p className='text-[14px] sm:text-[16px]'>
            {status === "completed" ? "cancelled" : "completed"}
          </p>
        </div>
      </div>
      {/* View booking details  */}
      <div className='flex gap-2 sm:items-center sm:justify-center'>
        <LinkButton
          href={`/dashboard/booking/${id}`}
          size='md'
          text={"View"}
          icon={<RedirectArrowWhite />}
          iconPosition='right'
          className='w-auto'
        />
      </div>
    </div>
  );
};

export default BookingCard;
