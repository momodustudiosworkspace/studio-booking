"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import {
  useGetBookingsQuery,
  usePrefetch,
} from "@/redux/services/booking/booking.api";
import BookingCard from "./cards/BookingCard";
import DashboardHeader from "./DashboardHeader";
import { DashboardIcons } from "@/assets/icons/dashboard/DashboardIcons";
import BookingCardAnalytics from "./cards/BookingCardAnalytics";

const DashboardBookings = () => {
  const { data: bookings, isLoading } = useGetBookingsQuery();
  const [currentTab, setCurrentTab] = useState<number>(1);
  // Prefetch hook for single booking
  const prefetchBooking = usePrefetch("getBookingById");
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
        linkText: "Completed, pending & cancalled",
        href: "/bookings",
        dataType: 0,
      },
      {
        title: "pending",
        count: 500,
        linkText: "",
        href: "/bookings",
        dataType: 0,
      },
      {
        title: "confirmed bookings",
        count: 20,
        linkText: "",
        href: "/bookings",
        dataType: 0,
      },
      {
        title: "Revenue",
        count: 15000000,
        linkText: "",
        href: "/bookings",
        dataType: 1,
      },
    ];
  }, []);
  // if (isLoading) return "Loading...";
  // if (error) return "Failed to load data";

  // 🔹 Compute and format your bookings once
  const formattedBookings = useMemo(() => {
    if (!bookings) return [];

    return bookings.map(b => ({
      id: b._id,
      title: `${b.sessionType} session`,
      location: b.location,
      date: b.date, // e.g. "Thu Dec 04 2025"
      time: b.startTime,
      amount: b.price, // e.g. "123,400"
      status: b.status, // e.g. "pending", "completed"
    }));
  }, [bookings]);

  // 🔹 Filter bookings based on status or date
  const allBookings = formattedBookings;
  // const now = new Date();
  const upcomingBookings = formattedBookings.filter(b => {
    // const bookingDate = b.date;
    return b.date;
  });

  const pastBookings = formattedBookings.filter(b => {
    // const bookingDate = b.date;
    return b.date;
  });
  if (isLoading) return "Loading...";
  // if (error) return "Failed to load data";


  const TABS = [
    { label: "All", index: 1 },
    { label: "Upcoming", index: 2 },
    { label: "Past", index: 3 },
  ];

  const renderBookings = (data: typeof formattedBookings) => {
    if (!data.length) return <p className="flex w-full h-[100px] items-center justify-center">No bookings available.</p>;
    return data.map(b => (
      <div
        key={b.id}
        onMouseEnter={() => prefetchBooking(b.id || "", { ifOlderThan: 60 })} // 👈 Prefetch on hover
        onFocus={() => prefetchBooking(b.id || "", { ifOlderThan: 60 })} // 👈 Accessibility
      >
        <BookingCard
          id={"jwjwhwhweje"}
          client_name={"Ekong Emmanuel"}
          location={"outdoor"}
          date={"19th October, 2025"}
          time={""}
          status='completed'
        />
      </div>
    ));
  };

  return (
    <DashboardLayout
      headerProps={{
        headerText: "bookings",
        paragraph: "track, manage and assign all photo sessions- from pending request to completed deliveries",
        linkText: "",
        href: "",
      }}
    >
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
      <section className='w-full'>
        {/* Bookings table  */}
        <section className='max-h-[670px] w-full rounded-md border-[1px] border-[#F2F2F2] shadow'>
          {/* header section  */}
          <div className='p-5 flex items-start justify-between mb-1'>
            <div className="flex flex-col gap-10">
              <DashboardHeader
                headerText={"Bookings"}
                paragraph={"All bookings record"}
              />
              {/* Tabs */}
              <div className='relative mb-5 flex items-center gap-10'>
                {TABS.map(tab => (
                  <button
                    key={tab.index}
                    className={`pb-1 text-sm font-medium capitalize ${currentTab === tab.index
                      ? "border-b-[3px] border-black font-semibold"
                      : ""
                      }`}
                    onClick={() => setCurrentTab(tab.index)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className='flex items-center gap-10 '>
              <div className='relative w-full'>
                <div className=''>
                  <div className='absolute top-3 left-1 text-[14px] font-semibold capitalize underline'>
                    <DashboardIcons value='search-outlined-black' />
                  </div>
                  <input
                    type='text'
                    placeholder='Search'
                    name='search'
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

            {/* Bookings per tab */}
            <div className='flex flex-col gap-4'>
              {currentTab === 1 && renderBookings(allBookings)}
              {currentTab === 2 && renderBookings(upcomingBookings)}
              {currentTab === 3 && renderBookings(pastBookings)}
            </div>

          </div>
        </section>


      </section>
    </DashboardLayout>
  );
};

export default DashboardBookings;
