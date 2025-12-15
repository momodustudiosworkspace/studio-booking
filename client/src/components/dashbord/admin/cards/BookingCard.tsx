import { DashboardIcons } from "@/assets/icons/dashboard/DashboardIcons";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import LinkButton from "@/components/ui/LinkButton";
// import { formatDate } from "@/utils/dateFormatter";
// import nairaSymbol from "@/utils/symbols";
// import { formatTime } from "@/utils/timeFormatter";
import React from "react";

interface BookingCardProps {
  id?: string | null | undefined;
  location?: string | null | undefined;
  date?: string | null | undefined;
  client_name?: string | null | undefined;
  startTime?: string | null | undefined;
  status: "cancelled" | "completed" | "pending" | "confirmed" | undefined;
}
const BookingCard = ({
  id,
  location,
  date,
  startTime,
  status,
  client_name,
}: BookingCardProps) => {
  const bookingLocation =
    location === "C1 Melita Plaze, Gimbiya street, Garki"
      ? "indoor"
      : "outdoor";
  const statusStyle =
    status === "cancelled"
      ? "bg-red-200 text-red-500"
      : status === "completed"
        ? "bg-[#0362001A] text-[#036200]"
        : status === "confirmed"
          ? "bg-blue-300 text-blue-600"
          : status === "pending"
            ? "bg-[#E595001A] text-[#E59500]"
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
    <div className='flex flex-col justify-between gap-3 sm:flex-row sm:items-center sm:gap-0'>
      {/* Booking Details  */}
      <div className='flex shrink-0 justify-between sm:w-[480px] sm:items-center'>
        <p className=''>#MS-{id?.slice(0, 4)}</p>
        <div>
          <p className='text-[14px] sm:text-[16px] capitalize'>{client_name}</p>
        </div>
        <div>
          <p className='text-[14px] capitalize sm:text-[16px]'>
            {bookingLocation}
          </p>
        </div>
      </div>
      {/* Booking date  */}
      <div className='ml-10 flex items-center gap-2 sm:w-[200px]'>
        <div
          className={`flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#FAFAFA]`}
        >
          <DashboardIcons value='calendar-grid-outlined-black' />
        </div>
        <div>
          <div className='mb-1 flex gap-2'>
            {/* <h3 className='font-semibold capitalize'>{formatDate(date, "short")}</h3> */}
            <h3 className='font-semibold capitalize'>{date}</h3>
          </div>
          {/* <p className='text-[14px] sm:text-[16px]'>{formatTime(time)}</p> */}
          <p className='text-[14px] sm:text-[16px]'>{startTime}</p>
        </div>
      </div>
      {/* Booking status  */}
      <div className='flex items-center gap-2 pl-10 sm:w-[200px]'>
        <span
          className={`${statusStyle} flex items-center justify-center rounded-full px-4 py-1 text-sm font-semibold capitalize`}
        >
          {statusText}
        </span>
      </div>
      {/* View booking details  */}
      <div className='flex gap-2 sm:items-center sm:justify-center'>
        <LinkButton
          href={`/admin/dashboard/bookings/${id}`}
          size='md'
          text={"View booking"}
          icon={<RedirectArrowWhite />}
          iconPosition='right'
          className='w-auto'
        />
      </div>
    </div>
  );
};

export default BookingCard;
