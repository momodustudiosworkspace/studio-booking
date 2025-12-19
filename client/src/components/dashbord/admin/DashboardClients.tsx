"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "./DashboardLayout";
// import { useGetBookingsQuery } from "@/redux/services/booking/booking.api";
import BookingCardAnalytics from "./cards/BookingCardAnalytics";
import DashboardHeader from "./DashboardHeader";
import { DashboardIcons } from "@/assets/icons/dashboard/DashboardIcons";
import ClientCards from "./cards/BookingClientCards";
import { useGetAllUserQuery } from "@/redux/services/admin/user/adminUsers.api";
import { formatDate } from "@/utils/dateFormatter";
import Pagination from "@/components/Pagination";

const DashBoardClients = () => {
  const [userPage, setUserPage] = useState(1);
  const limit = 10;
  // Call the query hook
  const {
    data: users,
    error: usersError,
    isLoading: usersIsloading,
  } = useGetAllUserQuery({ page: userPage, limit });
  console.log("users data:", users);

  // ✅ Compute analytics safely and memoize
  const analytics = useMemo(() => {
    // const total = bookings?.length || 2000;
    // const completed = bookings?.filter(b => b.status === "completed").length || 0;
    // const upcoming = bookings?.filter(b => b.status === "pending").length || 0;
    // const cancelled = bookings?.filter(b => b.status === "cancelled").length || 0;

    return [
      {
        title: "Total clients",
        count: users?.pagination.total || 0,
        linkText: "From 2025",
        href: "/bookings",
        dataType: 0,
      },
      {
        title: "active clients",
        count: users?.pagination.total || 0,
        linkText: "100 new users",
        href: "/bookings",
        dataType: 0,
      },
      // {
      //     title: "Total revenue",
      //     count: 15000000,
      //     linkText: "Next session soon",
      //     href: "/bookings",
      //     dataType: 1,
      // },
      // {
      //     title: "upcoming bookings",
      //     count: 20,
      //     linkText: "View all",
      //     href: "/bookings",
      //     dataType: 0,
      // },
    ];
  }, [users?.pagination.total]);
  // if (isLoading) return <p className="text-white">Loading...</p>;
  // if (error) return "Failed to load data";

  return (
    <DashboardLayout
      headerProps={{
        headerText: "Clients",
        paragraph:
          "Manage all client relationships — view profiles, track bookings, and stay connected.",
        linkText: "",
        href: "",
      }}
    >
      <section className='w-full'>
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

        {/* Clients table  */}
        <section className='max-h-[670px] w-full rounded-md border-[1px] border-[#F2F2F2] shadow'>
          {/* header section  */}
          <div className='mb-10 flex items-center justify-between p-5'>
            <DashboardHeader
              headerText={"Clients"}
              paragraph={"All clients record"}
            />
            <div className='flex items-center gap-10'>
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

          {/* client list  */}
          <div className='flex flex-col font-medium'>
            <div className='flex items-center gap-[150px] rounded-tl-2xl rounded-tr-2xl bg-[#F9FAFB] p-4 font-semibold'>
              <div className='flex w-[550px] shrink-0 justify-between sm:items-center'>
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
            {usersIsloading ? (
              "Loading data"
            ) : usersError ? (
              "error loading"
            ) : (
              <div className='flex flex-col gap-10 py-5 pr-6 pl-4'>
                {users?.data.map(user => {
                  return (
                    <ClientCards
                      key={user._id}
                      id={user._id}
                      client_name={`${user.first_name} ${user.last_name}`}
                      email={user.email}
                      joined_date={formatDate(user.createdAt)}
                      bookings={user.totalBookings}
                      status={user.isMember ? "active" : "inactive"}
                    />
                  );
                })}
              </div>
            )}
            <div className='p-6'>
              <Pagination
                currentPage={users?.pagination.page || null}
                totalPages={users?.pagination.totalPages || null}
                onPageChange={setUserPage}
              />
            </div>
          </div>
        </section>
      </section>
    </DashboardLayout>
  );
};

export default DashBoardClients;
