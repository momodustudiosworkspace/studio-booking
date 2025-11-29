import { DashboardIcons } from "@/assets/icons/dashboard/DashboardIcons";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import Button from "@/components/ui/Button";
import LinkButton from "@/components/ui/LinkButton";
import Modal from "@/components/ui/Modal";
// import { formatDate } from "@/utils/dateFormatter";
// import nairaSymbol from "@/utils/symbols";
// import { formatTime } from "@/utils/timeFormatter";
import React, { useState } from "react";

interface ClientCardsProps {
  id?: string | null | undefined;
  client_name: string | null | undefined;
  email: string | null | undefined;
  joined_date: string | null | undefined;
  bookings: number | null | undefined;
  status: "inactive" | "active" | undefined;
}
const ClientCards = ({
  id,
  client_name,
  email,
  joined_date,
  bookings,
  status,
}: ClientCardsProps) => {
  const [open, setOpen] = useState<boolean>(false);
  // const [openNotifications, setOpenNotification] = useState<boolean>(false);
  const statusStyle =
    status === "inactive"
      ? "bg-red-200 text-red-500"
      : status === "active"
        ? "bg-[#0362001A] text-[#036200]"
        : status === "confirmed"
          ? "bg-blue-300 text-blue-600"
          : status === "pending"
            ? "bg-[#E595001A] text-[#E59500]"
            : "";
  const statusText =
    status === "inactive"
      ? "inactive"
      : status === "active"
        ? "active"
        : status === "pending"
          ? "pending"
          : status === "confirmed"
            ? "confirmed"
            : "";
  return (
    <div className='flex flex-col justify-between gap-3 sm:flex-row sm:items-center sm:gap-0'>
      {/* Booking Details  */}
      <div className='flex shrink-0 gap-10 sm:w-[690px] sm:items-center'>
        <div>
          <p className='text-[14px] sm:text-[16px]'>{client_name}</p>
        </div>
        <div>
          <p className='w-[120px] truncate text-[14px] sm:text-[16px]'>
            {email}
          </p>
        </div>
        <div className='ml-10 flex items-center gap-2 sm:w-[200px]'>
          <div
            className={`flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#FAFAFA]`}
          >
            <DashboardIcons value='calendar-grid-outlined-black' />
          </div>
          <div>
            <div className='mb-1 flex gap-2'>
              {/* <h3 className='font-semibold capitalize'>{formatDate(date, "short")}</h3> */}
              <h3 className='font-semibold capitalize'>{joined_date}</h3>
            </div>
          </div>
        </div>
      </div>
      {/* Booking date  */}

      <div className='ml-10 flex items-center gap-2 sm:w-[200px]'>
        <p className='text-[14px] sm:text-[16px]'>{bookings}</p>
      </div>
      {/* Booking status  */}
      <div className='flex items-center gap-2 sm:w-[200px]'>
        <span
          className={`${statusStyle} flex items-center justify-center rounded-full px-4 py-1 text-sm font-semibold capitalize`}
        >
          {statusText}
        </span>
      </div>
      {/* View booking details  */}
      <div className='flex gap-2 sm:items-center sm:justify-center'>
        <Button
          // href={`/admin/dashboard/bookings/${id}`}
          size='md'
          text={"View client"}
          icon={<RedirectArrowWhite />}
          iconPosition='right'
          className='w-auto'
          onClick={() => {
            console.log(id);
            setOpen(true);
          }}
        />

        {/* User  profile modal  */}
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          contentClassName='sm:right-10 sm:px-0 px-4 top-44'
        >
          <div className='flex w-full flex-col gap-10 rounded-md bg-white px-5 py-5 sm:w-[383px]'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold'>User profile</h3>
              <button
                className='flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#FAFAFA]'
                onClick={() => setOpen(false)}
              >
                <DashboardIcons value='cancel-outlined-black' />
              </button>
            </div>

            {/* Profile details  */}
            <div className='max-h-[700px] overflow-y-scroll'>
              <div className='mb-7 hidden items-center gap-4 sm:flex'>
                <div className='flex h-[50px] w-[50px] items-center justify-center rounded-full bg-black text-white uppercase'>
                  {email?.[0]}
                  {email?.[1]}
                </div>
                <div>
                  <p className='font-semibold'>{email}</p>
                  <small>{email}</small>
                </div>
              </div>
              <LinkButton
                href={`/admin/dashboard/bookings/${id}`}
                size='md'
                text={"View bookings"}
                icon={<RedirectArrowWhite />}
                iconPosition='right'
                className='mb-7 w-auto'
              />

              {/* profile data  */}

              {/* Personal data  */}
              <div className='mb-5 rounded-md border-[1px] border-[#E5E5E5]'>
                <h2 className='rounded-tl-md rounded-tr-md bg-[#F9FAFB] p-4'>
                  Personal Details
                </h2>
                <div className='flex flex-col gap-3 p-4'>
                  <div className='flex items-center justify-between capitalize'>
                    <p>full name</p>
                    <p>leonard victor</p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <p className='capitalize'>email address</p>
                    <p>user@gmail.com</p>
                  </div>
                  <div className='flex items-center justify-between capitalize'>
                    <p>phone number</p>
                    <p>+234 890 347823</p>
                  </div>
                </div>
              </div>

              {/* Account details  */}
              <div className='rounded-md border-[1px] border-[#E5E5E5]'>
                <h2 className='rounded-tl-md rounded-tr-md bg-[#F9FAFB] p-4'>
                  Account details
                </h2>
                <div className='flex flex-col gap-3 p-4'>
                  <div className='flex items-center justify-between capitalize'>
                    <p>join date</p>
                    <p>22-06-2022</p>
                  </div>
                  <div className='flex items-center justify-between capitalize'>
                    <p>status</p>
                    <p className='flex items-center justify-center rounded-full bg-[#0362001A] px-4 py-1 text-sm font-semibold text-[#036200]'>
                      active
                    </p>
                  </div>
                  <div className='flex items-center justify-between capitalize'>
                    <p>total booking</p>
                    <p className='font-semibold'>20 bookings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ClientCards;
