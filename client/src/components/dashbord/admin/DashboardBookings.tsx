"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "./DashboardLayout";

// import BookingCard from "./cards/BookingCard";
import DashboardHeader from "./DashboardHeader";
import BookingCardAnalytics from "./cards/BookingCardAnalytics";
import {
  useGetAllUserBookingsQuery,
  // usePrefetch,
} from "@/redux/services/admin/booking/adminBooking.api";
// import Pagination from "@/components/Pagination";
import DashboardBookingsTable from "./tables/DashboardBookingsTable";
import { BookingType } from "@/types/booking.types";
// import { formatDate } from "@/utils/dateFormatter";
// import { formatTime } from "@/utils/timeFormatter";

const DashboardBookings = () => {
  const [bookingPage, _setBookingPage] = useState(1);
  const limit = 10;
  const { data: bookings, isLoading } = useGetAllUserBookingsQuery(
    { page: bookingPage, limit },
    { pollingInterval: 600000 }
  );

  console.log("bookings: ", bookings);
  const [currentTab, setCurrentTab] = useState<number>(1);
  // Prefetch hook for single booking
  // const prefetchBooking = usePrefetch("getBookingById");
  // ✅ Compute analytics safely and memoize
  const analytics = useMemo(() => {
    const total = bookings?.data.bookings.length || 0;
    const completed =
      bookings?.data.bookings.filter(b => b.status === "completed").length || 0;
    const upcoming =
      bookings?.data.bookings.filter(b => b.status === "pending").length || 0;
    const cancelled =
      bookings?.data.bookings.filter(b => b.status === "cancelled").length || 0;

    return [
      {
        title: "Total Bookings",
        count: total,
        linkText: "Completed, pending & cancalled",
        href: "/bookings",
        dataType: 0,
      },
      {
        title: "pending",
        count: upcoming,
        linkText: "",
        href: "/bookings",
        dataType: 0,
      },
      {
        title: "confirmed bookings",
        count: completed,
        linkText: "",
        href: "/bookings",
        dataType: 0,
      },
      {
        title: "Cancelled bookings",
        count: cancelled,
        linkText: "",
        href: "/bookings",
        dataType: 0,
      },
      // {
      //   title: "Revenue",
      //   count: bookings?.data.totalRevenue || 0,
      //   linkText: "",
      //   href: "/bookings",
      //   dataType: 1,
      // },
    ];
  }, [bookings?.data]);
  // if (isLoading) return <p className="text-white">Loading...</p>;
  // if (error) return "Failed to load data";

  // 🔹 Compute and format your bookings once
  const formattedBookings: BookingType[] = useMemo(() => {
    if (!bookings) return [];

    return bookings?.data.bookings.map(b => ({
      _id: b._id || null,
      user: b.user || null,
      title: `${b.sessionType} session` || null,
      location: {
        address: b.location?.address || null,
        state: b.location?.state || null,
      },
      assignedTo: b.assignedTo || null,
      user_fullnames: b.user_fullnames?.toLowerCase() || null,
      date: b.date || null, // e.g. "Thu Dec 04 2025"
      startTime: b.startTime || null,
      amount: b.price || null, // e.g. "123,400"
      status: b.status || "pending", // e.g. "pending", "completed"
    }));
  }, [bookings]);

  // const now = new Date();
  // 🔹 Filter bookings based on status or date
  const allBookings = formattedBookings;
  // const upcomingBookings = formattedBookings.filter(b => {
  //   if (b?.date) {
  //     return now < new Date(b.date);
  //   }
  //   return;
  // });

  console.log("formattedBookings: ", formattedBookings);

  if (isLoading) return <p className='text-white'>Loading...</p>;
  // if (error) return "Failed to load data";

  const TABS = [
    { label: "All", index: 1 },
    { label: "Upcoming", index: 2 },
    { label: "Past", index: 3 },
  ];

  const renderBookings = (data: BookingType[]) => {
    if (!data.length)
      return (
        <p className='flex h-[100px] w-full items-center justify-center text-white'>
          No bookings available.
        </p>
      );

    return <DashboardBookingsTable bookings={data} isLoading={isLoading} />;
    // return data.map(b => (
    //   <div
    //     key={b._id}
    //     onMouseEnter={() => prefetchBooking(b._id || "", { ifOlderThan: 60 })} // 👈 Prefetch on hover
    //     onFocus={() => prefetchBooking(b._id || "", { ifOlderThan: 60 })} // 👈 Accessibility
    //   >
    //     <BookingCard
    //       id={b._id}
    //       client_name={`${b.user_fullnames}`}
    //       location={b.location?.address || ""}
    //       date={formatDate(b.date)}
    //       startTime={formatTime(b.startTime)}
    //       status={b.status}
    //     />
    //   </div>
    // ));
  };

  return (
    <DashboardLayout
      headerProps={{
        headerText: "bookings",
        paragraph:
          "track, manage and assign all photo sessions- from pending request to completed deliveries",
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
        <section className='min-h-[670px] w-full rounded-md border-[1px] border-[#F2F2F2] shadow'>
          {/* header section  */}
          <div className='mb-1 flex items-start justify-between p-5'>
            <div className='flex flex-col gap-10'>
              <DashboardHeader
                headerText={"Bookings"}
                paragraph={"All bookings record"}
              />
              {/* Tabs */}
              <div className='relative flex items-center gap-10'>
                {TABS.map(tab => (
                  <button
                    key={tab.index}
                    className={`pb-1 text-sm font-medium capitalize ${
                      currentTab === tab.index
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

            {/* <div className='flex items-center gap-10'>
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
            </div> */}
          </div>

          {/* booking list  */}
          <div className='flex flex-col font-medium'>
            {/* Bookings per tab */}
            <div className='flex flex-col font-medium'>
              {/* Bookings per tab */}
              <div className='flex flex-col gap-4'>
                {currentTab === 1 && renderBookings(allBookings ?? [])}
                {currentTab === 2 &&
                  renderBookings(
                    bookings?.data.bookings.filter(
                      b => b.status === "pending"
                    ) ?? []
                  )}
                {currentTab === 3 &&
                  renderBookings(
                    bookings?.data.bookings.filter(
                      b => b.status === "completed"
                    ) ?? []
                  )}
                {/* <div className='py-6'>
                <Pagination
                  currentPage={bookings?.pagination.page || null}
                  totalPages={bookings?.pagination.totalPages || null}
                  onPageChange={setBookingPage}
                />
              </div> */}
              </div>
            </div>
          </div>
        </section>
      </section>
    </DashboardLayout>
  );
};

export default DashboardBookings;
