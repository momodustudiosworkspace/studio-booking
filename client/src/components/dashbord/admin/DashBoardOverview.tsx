"use client"
import React, { useMemo } from "react";
import DashboardLayout from "./DashboardLayout";
// import { useGetBookingsQuery } from "@/redux/services/booking/booking.api";
import BookingCardAnalytics from "./cards/BookingCardAnalytics";
import DashboardHeader from "./DashboardHeader";
import { DashboardIcons } from "@/assets/icons/dashboard/DashboardIcons";

const DashBoardOverview = () => {

  // Call the query hook
  // const { data: bookings, error, isLoading, } = useGetBookingsQuery();

  // ✅ Compute analytics safely and memoize
  const analytics = useMemo(() => {
    // const total = bookings?.length || 2000;
    // const completed = bookings?.filter(b => b.status === "completed").length || 0;
    // const upcoming = bookings?.filter(b => b.status === "pending").length || 0;
    // const cancelled = bookings?.filter(b => b.status === "cancelled").length || 0;

    return [
      {
       
        title: "Total Bookings",
        count: 2000,
        linkText: "From 2025",
        href: "/bookings",
        dataType: 0,
      },
      {
       
        title: "Total clients",
        count: 500,
        linkText: "100 new users",
        href: "/bookings",
        dataType: 0,
      },
      {
       
        title: "Total revenue",
        count: 15000000,
        linkText: "Next session soon",
        href: "/bookings",
        dataType: 1,
      },
      {
        title: "upcoming bookings",
        count: 20,
        linkText: "View all",
        href: "/bookings",
        dataType: 0,
      },
    ];
  }, []);
  // if (isLoading) return "Loading...";
  // if (error) return "Failed to load data";


  return (
    <DashboardLayout
      headerProps={{
        headerText: "dashboard",
        paragraph:
          "Overview of admin booking records",
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

        
        {/* Bookings table  */}
        <section className="h-[125px] w-full rounded-md bg-red-400 p-5 shadow">

          {/* header section  */}
          <div className="flex justify-between items-center">
            <DashboardHeader
              headerText={"Bookings"}
              paragraph={"All bookings record"}

            />
            <div className="flex items-center gap-10">
              <div className='relative w-full'>
                <div className="">
                  <div className='absolute top-3 left-1 text-[14px] font-semibold capitalize underline'>
                    <DashboardIcons value="search-outlined-black" />
                  </div>
                  <input
                    type='text'
                    placeholder='Search'
                    name="discount_code"
                    className='h-[37px] w-full border-b-[1px] border-white bg-white pl-7 pr-2 text-[14px] outline-0 transition-all ease-in-out focus:border-b-2 sm:w-[224px] sm:border-black'
                  />
               </div>
              </div>
              <div className='relative w-full'>
                <button className="flex items-center gap-2 bg-[#FAFAFA] px-4 rounded-md py-2">
                  <DashboardIcons value="filter-outlined-black" />
                  <p>Filter</p>
                  <DashboardIcons value="down-arrow-outlined-black" />
               </button>
              </div>
             
            </div>
          </div>
       </section>
      </section>
    </DashboardLayout>
  );
};

export default DashBoardOverview;
