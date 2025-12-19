"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "./DashboardLayout";

// import BookingCard from "./cards/BookingCard";
import DashboardHeader from "./DashboardHeader";
import { DashboardIcons } from "@/assets/icons/dashboard/DashboardIcons";
import BookingCardAnalytics from "./cards/BookingCardAnalytics";
import {
  useGetAllUserBookingsQuery,
  usePrefetch,
} from "@/redux/services/admin/booking/adminBooking.api";
import Pagination from "@/components/Pagination";
import { formatDate } from "@/utils/dateFormatter";
import { formatTime } from "@/utils/timeFormatter";
import DashboardAssignStaffDropDown from "./DashboardAssignStaffDropDown";
// import { formatDate } from "@/utils/dateFormatter";
// import { formatTime } from "@/utils/timeFormatter";

const DashboardBookings = () => {
  const [bookingPage, setBookingPage] = useState(1);
  const limit = 10;
  const { data: bookings, isLoading } = useGetAllUserBookingsQuery(
    { page: bookingPage, limit },
    { pollingInterval: 600000 }
  );

  console.log("bookings: ", bookings);
  const [currentTab, setCurrentTab] = useState<number>(1);
  // Prefetch hook for single booking
  const prefetchBooking = usePrefetch("getBookingById");
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
  const formattedBookings = useMemo(() => {
    if (!bookings) return [];

    return bookings?.data.bookings.map(b => ({
      _id: b._id,
      user: b.user,
      title: `${b.sessionType} session`,
      location: {
        address: b.location?.address,
        state: b.location?.state,
      },
      assignedTo: b.assignedTo,
      user_fullnames: b.user_fullnames?.toLowerCase(),
      date: b.date || null, // e.g. "Thu Dec 04 2025"
      startTime: b.startTime,
      amount: b.price, // e.g. "123,400"
      status: b.status, // e.g. "pending", "completed"
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

  if (isLoading) return <p className="text-white">Loading...</p>;
  // if (error) return "Failed to load data";

  const TABS = [
    { label: "All", index: 1 },
    { label: "Upcoming", index: 2 },
    { label: "Past", index: 3 },
  ];

  const renderBookings = (data: any) => {
    if (!data.length)
      return (
        <p className='flex h-[100px] w-full items-center justify-center text-white'>
          No bookings available.
        </p>
      );

    return (
      <table className='w-full border-collapse text-left'>
        <thead>
          <tr className='border-b bg-gray-50'>
            <th className='px-4 py-5'>Client Name</th>
            <th className='px-4 py-5'>Location</th>
            <th className='px-4 py-5'>Date</th>
            <th className='px-4 py-5'>Status</th>
            <th className='px-4 py-5'>Assigned to</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            [...Array(limit)].map((_, i) => (
              <tr key={i} className='animate-pulse border-b'>
                <td className='px-4 py-5'>
                  <div className='h-4 w-40 rounded bg-gray-200' />
                </td>
                <td className='px-4 py-5'>
                  <div className='h-4 w-48 rounded bg-gray-200' />
                </td>
                <td className='px-4 py-5'>
                  <div className='h-4 w-24 rounded bg-gray-200' />
                </td>
                <td className='px-4 py-5'>
                  <div className='h-4 w-20 rounded bg-gray-200' />
                </td>
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={4} className='py-6 text-center text-gray-500'>
                No data found
              </td>
            </tr>
          ) : (
            data.map(data => (
              <tr
                key={data._id}
                className='border-b hover:bg-gray-50'
                onMouseEnter={() =>
                  prefetchBooking(data._id || "", { ifOlderThan: 60 })
                } // 👈 Prefetch on hover
                onFocus={() =>
                  prefetchBooking(data._id || "", { ifOlderThan: 60 })
                } // 👈 Accessibility
              >
                <td className='px-4 py-5 font-medium capitalize'>
                  {data.user_fullnames}
                </td>

                <td className='px-4 py-5'>
                  {data.location.address ===
                  "C1 Melita Plaze, Gimbiya street, Garki"
                    ? "indoor"
                    : "outdoor"}
                </td>

                <td className='px-4 py-5 capitalize'>
                  <div className='flex items-center gap-2 sm:w-[200px]'>
                    <div
                      className={`flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#FAFAFA]`}
                    >
                      <DashboardIcons value='calendar-grid-outlined-black' />
                    </div>
                    <div>
                      <div className='mb-1 flex gap-2'>
                        {/* <h3 className='font-semibold capitalize'>{formatDate(date, "short")}</h3> */}
                        <h3 className='font-semibold capitalize'>
                          {formatDate(data.date)}
                        </h3>
                      </div>
                      {/* <p className='text-[14px] sm:text-[16px]'>{formatTime(time)}</p> */}
                      <p className='text-[14px] sm:text-[16px]'>
                        {formatTime(data.startTime)}
                      </p>
                    </div>
                  </div>
                </td>

                <td className='px-4 py-5'>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      data.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {data.status}
                  </span>
                </td>
                <td className='px-4 py-5'>
                  <DashboardAssignStaffDropDown
                    assignedStaffId={data.assignedTo}
                    bookingId={data._id}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
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
        <section className='max-h-[670px] w-full rounded-md border-[1px] border-[#F2F2F2] shadow'>
          {/* header section  */}
          <div className='mb-1 flex items-start justify-between p-5'>
            <div className='flex flex-col gap-10'>
              <DashboardHeader
                headerText={"Bookings"}
                paragraph={"All bookings record"}
              />
              {/* Tabs */}
              <div className='relative mb-5 flex items-center gap-10'>
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

            <div className='flex items-center gap-10'>
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
            {/* <div className='flex items-center gap-[120px] rounded-tl-2xl rounded-tr-2xl bg-[#F9FAFB] p-4 font-semibold'>
              <div className='flex shrink-0 justify-between sm:w-[490px] sm:items-center'>
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
            </div> */}

            {/* Bookings lists */}
            {/* Bookings per tab */}
            <div className='flex flex-col gap-4 p-6'>
              {currentTab === 1 && renderBookings(allBookings)}
              {currentTab === 2 &&
                renderBookings(
                  bookings?.data.bookings.filter(b => b.status === "pending")
                )}
              {currentTab === 3 &&
                renderBookings(
                  bookings?.data.bookings.filter(b => b.status === "completed")
                )}
              <div className='py-6'>
                <Pagination
                  currentPage={bookings?.pagination.page || null}
                  totalPages={bookings?.pagination.totalPages || null}
                  onPageChange={setBookingPage}
                />
              </div>
            </div>
          </div>
        </section>
      </section>
    </DashboardLayout>
  );
};

export default DashboardBookings;
