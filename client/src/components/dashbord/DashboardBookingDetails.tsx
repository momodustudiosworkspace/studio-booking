"use client";
import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { DashboardIcons } from "@/assets/icons/dashboard/DashboardIcons";
import DashboardHeader from "./DashboardHeader";
// import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { redirect } from "next/navigation";
import LinkButton from "../ui/LinkButton";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import DashboardBookingPhotoSelection from "./DashboardBookingPhotoSelection";
import DashboardBookingTimeline from "./DashboardBookingTimeline";

const DashboardBookingDetails = () => {
  const [totalSelectedPhotos, setTotalSelectedPhotos] = useState<number>(0);

  // Set a condition for the link:
  // if upcoming, clinets can cancel if completed clients can rebook and get discount

  // if client is late based on bookign time and checkin time let the checking timeline be red
  const timeLineLevel = 5;

  // const BOOKING_TIMELINE = [
  //     {
  //         id: 1,
  //         text: "booking",
  //         date: "wednesday october 12th, 2025 at 3:00pm",
  //     },
  //     {
  //         id: 2,
  //         text: "Checking",
  //         date: "wednesday october 12th, 2025 at 3:00pm",
  //     },
  //     {
  //         id: 3,
  //         text: "session",
  //         date: "wednesday october 12th, 2025 at 3:00pm",
  //     },
  //     {
  //         id: 4,
  //         text: "session completed",
  //         date: "wednesday october 12th, 2025 at 3:00pm",
  //     },
  //     {
  //         id: 5,
  //         text: "photo selection",
  //         date: "wednesday october 12th, 2025 at 3:00pm",
  //     },
  //     {
  //         id: 6,
  //         text: "final delivery",
  //         date: "wednesday october 12th, 2025 at 3:00pm",
  //     },

  // ]

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
          headerText: "potrait session- ms1234",
          badge: "Upcoming",
          badgeStatus: 1,
          badgeClass: "",
          paragraph:
            "sat, sept 13,2025 | Momodu studios, victoria island, Lagos",
          linkText: "Reschedule",
          href: "/",
        }}
      >
        <div className='flex flex-col gap-2 sm:flex-row'>
          {/* Timeline  */}
          <div className='h-[680px] w-full rounded-lg bg-white p-4 shadow sm:h-[610px] sm:w-[50%]'>
            <DashboardHeader
              headerText={"timeline"}
              paragraph={"track every step from booking to delivery"}
            />

            <div className='relative mt-10 max-h-[510px] overflow-y-scroll'>
              <DashboardBookingTimeline />
              {/* <VerticalTimeline layout='1-column-left' lineColor='#DFDFDF' >
                                {BOOKING_TIMELINE.map((timeLine) => {

                                    return <VerticalTimelineElement key={timeLine.id}
                                        className="vertical-timeline-element--work"
                                        contentStyle={{ color: `black` }}
                                        contentArrowStyle={{ color: `#fff` }}
                                        // date="2011 - present"
                                        iconStyle={{ background: `#fff`, color: `black`, border: 'none' }}
                                        icon={<DashboardIcons value="check-solid-black" />}


                                    >
                                        <h3 className="vertical-timeline-element-title capitalize font-bold">Studio {timeLine.text}</h3>
                                        <p className='capitalize'>
                                            {timeLine.date}
                                        </p>
                                    </VerticalTimelineElement>
                                })}

                            </VerticalTimeline> */}
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
                <p className='font-medium'>Personal shoot</p>
              </div>
              <div className='flex w-full items-center justify-between capitalize'>
                <p className='font-bold'>date & time</p>
                <p className='font-medium'>Personal shoot</p>
              </div>
              <div className='flex w-full items-center justify-between capitalize'>
                <p className='font-bold'>location</p>
                <p className='font-medium'>momodu studios</p>
              </div>
              <div className='flex w-full items-center justify-between capitalize'>
                <p className='font-bold'>photographer</p>
                <p className='font-medium'>ekong emmanuel</p>
              </div>
              <div className='flex flex-col gap-7 rounded-md bg-[#FAFAFA] px-4 py-5'>
                <div className='flex w-full items-center justify-between capitalize'>
                  <p className='font-bold'>total</p>
                  <p className='font-medium'>n500,000.00</p>
                </div>
                <div className='flex w-full items-center justify-between capitalize'>
                  <p className='font-bold'>paid</p>
                  <p className='font-medium'>n500,000.00</p>
                </div>

                <div className='flex w-full items-center justify-between capitalize'>
                  <p className='font-bold'>balance</p>
                  <p className='font-medium'>n0.00</p>
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
