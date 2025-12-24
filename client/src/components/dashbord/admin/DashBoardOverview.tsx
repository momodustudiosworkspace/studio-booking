"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import BookingCardAnalytics from "./cards/BookingCardAnalytics";
import DashboardHeader from "./DashboardHeader";
// import { DashboardIcons } from "@/assets/icons/dashboard/DashboardIcons";
import { useGetAdminDashBoardStatsQuery } from "@/redux/services/admin/dashboard/adminDashboard.api";
import { useGetAllUserBookingsQuery } from "@/redux/services/admin/booking/adminBooking.api";
import { useGetAllUserQuery } from "@/redux/services/admin/user/adminUsers.api";
import DashboardBookingsTable from "./tables/DashboardBookingsTable";
import DashboardClientsTable from "./tables/DashboardClientsTable";

const DashBoardOverview = () => {
  const [bookingPage, _setBookingPage] = useState(1);
  const [userPage, _setUserPage] = useState(1);
  const limit = 10;
  // Call the query hook
  const {
    data: stats,
    error,
    isLoading,
  } = useGetAdminDashBoardStatsQuery(undefined, { pollingInterval: 600000 });
  const {
    data: bookings,
    // error: bookingError,
    isLoading: bookingIsloading,
  } = useGetAllUserBookingsQuery(
    { page: bookingPage, limit },
    { pollingInterval: 600000 }
  );
  const {
    data: users,
    // error: usersError,
    isLoading: usersIsloading,
  } = useGetAllUserQuery(
    { page: userPage, limit },
    { pollingInterval: 600000 }
  );

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
  }, [
    stats?.data.totalBookings,
    stats?.data.totalClients,
    stats?.data.totalRevenue,
  ]);

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

        {isLoading && <p className='text-black'>Loading...</p>}
        {error && <p className='text-black'>Failed to load data</p>}

        {/* Bookings table  */}
        <section className='max-h-auto mb-10 w-full rounded-md border-[1px] border-[#F2F2F2] shadow'>
          {/* header section  */}
          <div className='flex items-center justify-between p-5'>
            <DashboardHeader
              headerText={"Bookings"}
              paragraph={"All bookings record"}
            />
            {/* <div className='flex items-center gap-10'>
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
            </div> */}
          </div>

          {/* booking Table  */}
          <DashboardBookingsTable
            bookings={bookings?.data.bookings || []}
            isLoading={bookingIsloading}
          />
        </section>

        {/* Clients table  */}
        <section className='max-h-auto w-full rounded-md border-[1px] border-[#F2F2F2] shadow'>
          {/* header section  */}
          <div className='flex items-center justify-between p-5'>
            <DashboardHeader
              headerText={"Clients"}
              paragraph={"All clients record"}
            />
          </div>

          {/* client table */}
          <DashboardClientsTable
            users={users?.data || []}
            isLoading={usersIsloading}
          />
        </section>
      </section>
    </DashboardLayout>
  );
};

export default DashBoardOverview;
