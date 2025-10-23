import { DashboardIcons } from "@/assets/icons/dashboard/DashboardIcons";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import LinkButton from "@/components/ui/LinkButton";
import React from "react";

interface BookingCardProps {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  amount: string;
  status: number;
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
    status === 0
      ? "bg-red-200 text-red-500"
      : status === 1
        ? "bg-[#0362001A] text-[#036200]"
        : status === 2
          ? "bg-blue-300 text-blue-600"
          : status === 3
            ? "bg-[#E595001A] text-[#E59500]"
            : "";
  const statusText =
    status === 0
      ? "cancelled"
      : status === 1
        ? "completed"
        : status === 2
          ? "upcoming"
          : status === 3
            ? "past"
            : "";
  return (
    <div
      key={id}
      className='flex flex-col justify-between gap-3 rounded-md bg-white p-4 shadow sm:flex-row sm:items-center sm:gap-0'
    >
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
          <p className='text-[14px] sm:text-[16px]'>{location}</p>
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
            <h3 className='font-semibold capitalize'>{date}</h3>
          </div>
          <p className='text-[14px] sm:text-[16px]'>{time}</p>
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
            <h3 className='font-semibold capitalize'>{amount}</h3>
          </div>
          <p className='text-[14px] sm:text-[16px]'>
            {status === 0 ? "cancelled" : "completed"}
          </p>
        </div>
      </div>
      {/* View booking details  */}
      <div className='flex gap-2 sm:items-center sm:justify-center'>
        <LinkButton
          href={`/dashboard/photo-studio/bookings/${id}`}
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
