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
import { BookingType } from "@/types/booking.types";
import { formatDate } from "@/utils/dateFormatter";
import { formatTime } from "@/utils/timeFormatter";
import nairaSymbol from "@/utils/symbols";
import { useUpdateBookingMutation } from "@/redux/services/user/booking/booking.api";
import { toast } from "react-toastify";
import { AuthToast } from "@/components/toast/ToastMessage";
import DashboardAssignStaffDropDown from "./DashboardAssignStaffDropDown";
import { useRemoveStaffFromBookingMutation } from "@/redux/services/admin/booking/adminBooking.api";
import { TrashIcon } from "@heroicons/react/24/outline";

interface DashboardBookingDetailsProps {
  booking: BookingType;
  isLoading: boolean;
}
const DashboardBookingDetails = ({
  booking,
  isLoading,
}: DashboardBookingDetailsProps) => {
  const [totalSelectedPhotos, setTotalSelectedPhotos] = useState<number>(0);



  const [updateBooking, { isLoading: updateBookingLoading }] =
    useUpdateBookingMutation();
  const [removeStaff, { isLoading: removing }] =
    useRemoveStaffFromBookingMutation();

  const handleRemoveStaff = async (staffId: string) => {
    if (!booking._id) return;

    try {
      await removeStaff({
        bookingId: booking._id,
        staffId,
      }).unwrap();

      toast.success("Staff removed from booking");
    } catch (error: any) {
      console.log(error);

      toast.error(error?.data?.message || "Failed to remove staff");
    }
  };

  // Set a condition for the link:
  // if upcoming, clinets can cancel if completed clients can rebook and get discount

  // if client is late based on bookign time and checkin time let the checking timeline be red
  const timeLineLevel = 5;
  // if (isLoading) return <p>Loading booking details...</p>;
  // if (!booking) return <p>No booking found.</p>;

  const handleCancelBooking = async () => {
    if (!booking._id) return;

    try {
      const response = await updateBooking({
        id: booking._id,
        booking: {
          _id: booking._id,
          user: booking._id || null,
          status: "cancelled",
        },
      }).unwrap();
      toast.success(AuthToast, {
        data: {
          title: "Booking cancelled Successfull",
          content: `${response.message || "Booking cancelled!"}`,
        },
        ariaLabel: "Booking session secured",
        icon: false,
        theme: "colored",
      });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <DashboardLayout
      headerProps={{
        // headerText: "potrait session- ms1234",
        headerText: `${booking.sessionTitle} session - ms${booking._id?.slice(0, 6)}`,
        badge: `${booking.status}`,
        badgeStatus: booking.status,
        badgeClass: "",
        paragraph: `${formatDate(booking.date)} at ${formatTime(booking.startTime)} | ${booking.location?.address} ${booking.location?.state}`,
        linkText: "Reschedule",
        href: "/",
      }}
    >
      {/* {isLoading && <p>Loading booking details...</p>}
      {!booking && !isLoading && <p>No booking found.</p>} */}
      <button
        className='mb-5 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-gray-300'
        onClick={() => {
          redirect("/admin/dashboard/bookings");
        }}
      >
        <DashboardIcons value='arrow-left-outlined-black' />
      </button>

      {isLoading ? <p>Loading booking details. ewnpweoinvoewineoivnoi..</p> : (booking.status === "completed" ? <div className='mb-10 w-full rounded-md bg-white p-5 shadow sm:w-[600px]'>
        <div className='flex flex-col-reverse justify-between gap-10 sm:flex-row'>
          <div>
            <p className='mb-2 font-bold sm:mb-0 sm:text-xl'>Staff assigned: </p>
            {booking.assignedTo && booking.assignedTo.length > 0 ? (
              <ul className='sm:mt-5'>
                {booking.assignedTo.map((staff, key) => (
                  <li
                    key={key}
                    className='mb-4 flex items-center justify-between gap-4 capitalize'
                  >
                    <span>
                      <span className='font-semibold'>{staff.role}: </span>
                      {staff.first_name} {staff.last_name}
                    </span>

                    <button
                      onClick={() => handleRemoveStaff(staff._id)}
                      disabled={removing}
                      className='text-xs text-red-500 hover:underline'
                    >
                      <TrashIcon className='h-5 w-5' />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-gray-400'>No staff assigned</p>
            )}
          </div>
          <div>
            <p className='font-semibold'> Assign staff :</p>
            <DashboardAssignStaffDropDown
              bookingId={booking._id || ""}
              assignedStaff={booking.assignedTo || []}
              removingStaff={removing}
            />
          </div>
        </div>
      </div> : <p>No booking found.</p>)}
      <div className='flex flex-col-reverse gap-10 sm:flex-row sm:gap-32'>
        {/* Timeline  */}
        <div className='h-[720px] w-full border-t-[1px] border-gray-50 p-4 shadow sm:h-[610px] sm:w-[50%] sm:border-none'>
          <DashboardHeader
            headerText={"timeline"}
            paragraph={"track every step from booking to delivery"}
          />

          <div className='relative mt-10'>
            <DashboardBookingTimeline />
          </div>
        </div>

        {/* Details  */}
        <div className='sm:h-[610px] w-full border-t-[1px] border-gray-50 p-4 shadow sm:w-[50%] sm:border-none'>
          <DashboardHeader
            headerText={"booking summary"}
            paragraph={"your session at a glance "}
          />
          <div className='mt-10 flex w-full flex-col gap-7'>
            <div className='flex w-full items-center justify-between capitalize'>
              <p className='font-bold'>service</p>
              <p className='font-medium'>{booking.sessionTitle} shoot</p>
            </div>
            <div className='flex w-full items-center justify-between capitalize'>
              <p className='font-bold'>date & time</p>
              <p className='font-medium'>
                {formatDate(booking.date)}, {formatTime(booking.startTime)}
              </p>
            </div>
            <div className='flex w-full items-center gap-10 capitalize sm:justify-between'>
              <p className='font-bold'>location</p>
              <p className='font-medium'>{booking.location?.address}</p>
            </div>
            <div className='flex w-full items-center justify-end capitalize'>
              {/* <p className='font-bold'>photographer</p> */}
              {/* <p className='font-medium'>ekong emmanuel</p> */}
              {/* <p className='font-bold'></p> */}
              <p className='font-medium'>{booking.location?.state}</p>
            </div>
            <div className='flex flex-col gap-7 rounded-md py-5'>
              <div className='flex w-full items-center justify-between capitalize'>
                <p className='font-bold'>total</p>
                <p className='font-medium'>
                  {nairaSymbol()}
                  {booking.price?.toLocaleString()}
                </p>
              </div>
              <div className='flex w-full items-center justify-between capitalize'>
                <p className='font-bold'>paid</p>
                <p className='font-medium'>
                  {nairaSymbol()}
                  {booking.price?.toLocaleString()}
                </p>
              </div>

              <div className='flex w-full items-center justify-between capitalize'>
                <p className='font-bold'>balance</p>
                <p className='font-medium'>{nairaSymbol()}0.00</p>
              </div>
            </div>
            {booking.status !== "cancelled" && (
              <div>
                <button className="rounded-md px-4 py-1 text-white font-medium bg-red-600" onClick={async () => await handleCancelBooking()}>{updateBookingLoading ? "Cancelling..." : "Cancel booking"}</button>
                {/* <Button
                  size='md'
                  variant='danger'
                  text={""}
                  icon={<RedirectArrowWhite />}
                  loading={updateBookingLoading}
                  iconPosition='right'
                  className='w-auto'
                 
                /> */}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo selection and download  */}
      <div className='mt-2 rounded-lg py-5 sm:px-5'>
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
  );
};

export default DashboardBookingDetails;
