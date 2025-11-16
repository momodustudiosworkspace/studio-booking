"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import BookingCardAnalytics from "./cards/BookingCardAnalytics";
import DashboardHeader from "./DashboardHeader";
import { DashboardIcons } from "@/assets/icons/dashboard/DashboardIcons";
import BookingCard from "./cards/BookingCard";
import { useGetAdminDashBoardStatsQuery } from "@/redux/services/admin/dashboard/adminDashboard.api";
import { useGetAllUserBookingsQuery } from "@/redux/services/admin/booking/adminBooking.api";
import Pagination from "@/components/Pagination";
import { formatDate } from "@/utils/dateFormatter";
import { formatTime } from "@/utils/timeFormatter";
import { useGetAllUserQuery } from "@/redux/services/admin/user/adminUsers.api";
import ClientCards from "./cards/BookingClientCards";

const DashBoardOverview = () => {
  const [bookingPage, setBookingPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const limit = 10;
  // Call the query hook
  const { data: stats, error, isLoading, } = useGetAdminDashBoardStatsQuery(undefined, { pollingInterval: 600000, });
  const { data: bookings, error: bookingError, isLoading: bookingIsloading, } = useGetAllUserBookingsQuery({ page: bookingPage, limit }, { pollingInterval: 600000, });
  const { data: users, error: usersError, isLoading: usersIsloading, } = useGetAllUserQuery({ page: userPage, limit }, { pollingInterval: 600000, });

  console.log("bookings: ", bookings);
  console.log("users: ", users);


  // ✅ Compute analytics safely and memoize
  const analytics = useMemo(() => {
    // const total = bookings?.length || 2000;
    // const completed = bookings?.filter(b => b.status === "completed").length || 0;
    // const upcoming = bookings?.filter(b => b.status === "pending").length || 0;
    // const cancelled = bookings?.filter(b => b.status === "cancelled").length || 0;

    return [
      {
        title: "Total Bookings",
        count: stats?.data.totalBookings || 0,
        linkText: "From 2025",
        href: "/bookings",
        dataType: 0,
      },
      {
        title: "Total clients",
        count: stats?.data.totalClients || 0,
        linkText: "100 new users",
        href: "/bookings",
        dataType: 0,
      },
      {
        title: "Total revenue",
        count: stats?.data.totalRevenue || 0,
        linkText: "Next session soon",
        href: "/bookings",
        dataType: 1,
      },
      {
        title: "upcoming bookings",
        count: stats?.data.totalClients || 0,
        linkText: "View all",
        href: "/bookings",
        dataType: 0,
      },
    ];
  }, [stats?.data.totalBookings, stats?.data.totalClients, stats?.data.totalRevenue]);
  if (isLoading) return "Loading...";
  if (error) return "Failed to load data";

  return (
    <DashboardLayout
      headerProps={{
        headerText: "dashboard",
        paragraph: "Overview of admin booking records",
        linkText: "",
        href: "",
      }}
    >
      <section className='w-full pb-52'>
        {/* Booking analytics  */}
        <div className='mb-14 flex w-full flex-col items-center gap-4 sm:flex-row'>
          {analytics.map((card, key) => (
            <BookingCardAnalytics
              key={key}
              title={card.title}
              count={card.count}
              text={card.linkText}
              dataType={card.dataType}
            />
          ))}
        </div>

        {/* Bookings table  */}
        <section className='max-h-[870px] w-full rounded-md border-[1px] border-[#F2F2F2] shadow mb-10'>
          {/* header section  */}
          <div className='mb-10 p-5 flex items-center justify-between'>
            <DashboardHeader
              headerText={"Bookings"}
              paragraph={"All bookings record"}
            />
            <div className='flex items-center gap-10 '>
              <div className='relative w-full'>
                <div className=''>
                  <div className='absolute top-3 left-1 text-[14px] font-semibold capitalize underline'>
                    <DashboardIcons value='search-outlined-black' />
                  </div>
                  <input
                    type='text'
                    placeholder='Search'
                    name='discount_code'
                    className='h-[37px] w-full border-b-[1px] border-white bg-white pr-2 pl-7 text-[14px] outline-0 transition-all ease-in-out focus:border-b-2 sm:w-[224px] sm:border-black'
                  />
                </div>
              </div>
              <div className='relative w-full'>
                <button className='flex items-center gap-2 rounded-md bg-[#FAFAFA] px-4 py-2'>
                  <DashboardIcons value='filter-outlined-black' />
                  <p>Filter</p>
                  <DashboardIcons value='down-arrow-outlined-black' />
                </button>
              </div>
            </div>
          </div>

          {/* booking list  */}
          <div className='flex flex-col font-medium'>
            <div className="flex items-center font-semibold gap-[120px] rounded-tl-2xl rounded-tr-2xl bg-[#F9FAFB] p-4">
              <div className='flex shrink-0 justify-between sm:w-[480px] sm:items-center'>
                <p>Booking ID</p>
                <p>Client Name</p>
                <p>Location</p>
              </div>
              <div className='flex items-center justify-center gap-2 sm:w-[200px]'>
                <p>Date</p>
              </div>
              <div className='flex items-center gap-2 sm:w-[200px]'>
                <p>Status</p>
              </div>
              <div className='flex gap-2 sm:items-center sm:justify-center'>
                <p>Action</p>
              </div>

            </div>

            {/* Bookings lists */}
            {bookingIsloading ? 'Loading data' : bookingError ? "error loading" : <div className="flex flex-col gap-10 py-5 pl-4 pr-6">
              {bookings?.data.map((booking) => {
                return <BookingCard key={booking._id}
                  id={booking._id}
                  client_name={booking.user}
                  location={booking.location?.address}
                  date={formatDate(booking.startTime)}
                  startTime={formatTime(booking.startTime)}
                  status={booking.status}
                />

              })}

            </div>}
            <div className="p-6">
              <Pagination
                currentPage={users?.pagination.page || null}
                totalPages={users?.pagination.totalPages || null}
                onPageChange={setBookingPage}
              />
            </div>
          </div>
        </section>


        {/* Clients table  */}
        <section className='max-h-[870px] w-full rounded-md border-[1px] border-[#F2F2F2] shadow'>
          {/* header section  */}
          <div className='mb-10 p-5 flex items-center justify-between'>
            <DashboardHeader
              headerText={"Clients"}
              paragraph={"All clients record"}
            />

          </div>

          {/* client list  */}
          <div className='flex flex-col font-medium'>
            <div className="flex items-center font-semibold gap-[150px] rounded-tl-2xl rounded-tr-2xl bg-[#F9FAFB] p-4">
              <div className='flex shrink-0 justify-between w-[550px] sm:items-center'>
                <p>Name</p>
                <p>Email</p>
                <p>Joined Date</p>
              </div>
              <div className='flex items-center justify-center gap-2 sm:w-[200px]'>
                <p>Bookings</p>
              </div>
              <div className='flex items-center gap-2 sm:w-[200px]'>
                <p>Status</p>
              </div>
              <div className='flex gap-2 sm:items-center sm:justify-center'>
                <p>Action</p>
              </div>

            </div>

            {/* Users lists */}
            {usersIsloading ? 'Loading data' : usersError ? "error loading" : <div className="flex flex-col gap-10 py-5 pl-4 pr-6">
              {users?.data.map((user) => {
                return <ClientCards key={user._id}
                  id={user._id}
                  client_name={`${user.first_name} ${user.last_name}`}
                  email={user.email}
                  joined_date={formatDate(user.createdAt)}
                  bookings={"200"}
                  status={user.isMember ? "active" : 'inactive'}
                />

              })}

            </div>}
            <div className="p-6">
              <Pagination
                currentPage={bookings?.pagination.page || null}
                totalPages={bookings?.pagination.totalPages || null}
                onPageChange={setUserPage}
              />

            </div>
          </div>
        </section>
      </section>
    </DashboardLayout>
  );
};

export default DashBoardOverview;
