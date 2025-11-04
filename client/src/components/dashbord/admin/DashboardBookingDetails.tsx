"use client";
import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { DashboardIcons } from "@/assets/icons/dashboard/DashboardIcons";
import DashboardHeader from "./DashboardHeader";
// import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { redirect } from "next/navigation";
import LinkButton from "../../ui/LinkButton";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import DashboardBookingPhotoSelection from "./DashboardBookingPhotoSelection";
import DashboardBookingTimeline from "./DashboardBookingTimeline";
import { BookingType } from "@/types/booking";
import { formatDate } from "@/utils/dateFormatter";
import { formatTime } from "@/utils/timeFormatter";
import nairaSymbol from "@/utils/symbols";


interface DashboardBookingDetailsProps {
  booking?: BookingType;
  isLoading: boolean;
}
const DashboardBookingDetails = ({ booking, isLoading }: DashboardBookingDetailsProps) => {


  const [totalSelectedPhotos, setTotalSelectedPhotos] = useState<number>(0);

  // Set a condition for the link:
  // if upcoming, clinets can cancel if completed clients can rebook and get discount

  // if client is late based on bookign time and checkin time let the checking timeline be red
  const timeLineLevel = 5;
  if (isLoading) return <p>Loading booking details...</p>;
  if (!booking) return <p>No booking found.</p>;

  return (
    <div className='-mt-24'>
      <button
        className='flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white'
        onClick={() => {
          redirect("/dashboard/bookings");
        }}
      >
        <DashboardIcons value='arrow-left-outlined-black' />
      </button>

      <DashboardLayout
        headerProps={{
          // headerText: "potrait session- ms1234",
          headerText: `${booking.sessionType} session - ms${booking._id?.slice(0, 6)}`,
          badge: `${booking.status}`,
          badgeStatus: booking.status,
          badgeClass: "",
          paragraph:
            "sat, sept 13,2025 | Momodu studios, victoria island, Lagos",
          linkText: "Reschedule",
          href: "/",
        }}
      >
        <div className='flex flex-col gap-2 sm:flex-row'>
          {/* Timeline  */}
          <div className='h-[720px] w-full rounded-lg bg-white p-4 shadow sm:h-[610px] sm:w-[50%]'>
            <DashboardHeader
              headerText={"timeline"}
              paragraph={"track every step from booking to delivery"}
            />

            <div className='relative mt-10'>
              <DashboardBookingTimeline />
            </div>
          </div>

          {/* Details  */}
          <div className='h-[610px] w-full rounded-lg bg-white p-4 shadow sm:w-[50%]'>
            <DashboardHeader
              headerText={"booking summary"}
              paragraph={"your session at a glance "}
            />
            <div className='mt-10 flex w-full flex-col gap-7'>
              <div className='flex w-full items-center justify-between capitalize'>
                <p className='font-bold'>service</p>
                <p className='font-medium'>{booking.sessionType} shoot</p>
              </div>
              <div className='flex w-full items-center justify-between capitalize'>
                <p className='font-bold'>date & time</p>
                <p className='font-medium'>{formatDate(booking.date)}, {formatTime(booking.startTime)}</p>
              </div>
              <div className='flex w-full items-center sm:justify-between gap-10 capitalize'>
                <p className='font-bold'>location</p>
                <p className='font-medium'>{booking.location?.address}</p>
              </div>
              <div className='flex w-full items-center justify-end capitalize'>
                {/* <p className='font-bold'>photographer</p> */}
                {/* <p className='font-medium'>ekong emmanuel</p> */}
                {/* <p className='font-bold'></p> */}
                <p className='font-medium'>{booking.location?.state}</p>

              </div>
              <div className='flex flex-col gap-7 rounded-md bg-[#FAFAFA] px-4 py-5'>
                <div className='flex w-full items-center justify-between capitalize'>
                  <p className='font-bold'>total</p>
                  <p className='font-medium'>{nairaSymbol()}{booking.price?.toLocaleString()}</p>
                </div>
                <div className='flex w-full items-center justify-between capitalize'>
                  <p className='font-bold'>paid</p>
                  <p className='font-medium'>{nairaSymbol()}{booking.price?.toLocaleString()}</p>
                </div>

                <div className='flex w-full items-center justify-between capitalize'>
                  <p className='font-bold'>balance</p>
                  <p className='font-medium'>{nairaSymbol()}0.00</p>
                </div>
              </div>
              <div>
                <LinkButton
                  href={`/dashboard/photo-studio/bookings/2`}
                  size='md'
                  text={"Message studio"}
                  icon={<RedirectArrowWhite />}
                  iconPosition='right'
                  className='w-auto'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Photo selection and download  */}
        <div className='rounded-lg bg-white py-5 sm:px-5'>
          <div className='mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
            <DashboardHeader
              headerText={`${timeLineLevel < 6 ? "proof gallery" : "final images"}`}
              paragraph={`${timeLineLevel < 6 ? "select images to be edited from your studio session" : "your images from your session is ready"}`}
            />

            {timeLineLevel >= 6 ? (
              <div className='shrink-0'>
                <LinkButton
                  href={`/dashboard/photo-studio/bookings/2`}
                  size='md'
                  text={"Download all"}
                  icon={<RedirectArrowWhite />}
                  iconPosition='right'
                  className='w-auto'
                />
              </div>
            ) : (
              <div className='shrink-0'>
                <p>
                  {" "}
                  Select <span className='font-semibold'>4</span> pictures{" "}
                </p>
                <p>
                  Total selected:{" "}
                  <span className='font-semibold'>{totalSelectedPhotos}</span>
                </p>
              </div>
            )}
          </div>

          {/* DashboardBookingPhotoSelection  */}
          <div className='max-h-[800px] w-full overflow-y-scroll pt-5'>
            <DashboardBookingPhotoSelection
              setTotalSelectedPhotos={setTotalSelectedPhotos}
            />
          </div>
          <div className='mt-10 flex items-center gap-3'>
            <LinkButton
              href={`/dashboard/photo-studio/bookings/2`}
              size='md'
              text={"Message studio"}
              icon={<RedirectArrowWhite />}
              iconPosition='right'
              className='w-auto'
            />
            {timeLineLevel >= 6 && (
              <div>
                <LinkButton
                  href={`/dashboard/photo-studio/bookings/2`}
                  size='md'
                  text={"Feedback"}
                  variant='outline'
                  iconPosition='right'
                  className='w-auto'
                />
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default DashboardBookingDetails;
