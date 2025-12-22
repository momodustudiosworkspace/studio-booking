"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import BookingCard from "./cards/BookingCard";
import {
  useGetBookingsQuery,
  usePrefetch,
} from "@/redux/services/user/booking/booking.api";
// import DashboardBookingsTable from "../admin/tables/DashboardBookingsTable"; 
import { BookingType } from "@/types/booking.types";

const DashboardBookings = () => {
  const { data: bookings, error, isLoading } = useGetBookingsQuery();
  const [currentTab, setCurrentTab] = useState<number>(1);
  // Prefetch hook for single booking
  const prefetchBooking = usePrefetch("getBookingById");

  // 🔹 Compute and format your bookings once
  const formattedBookings: BookingType[] = useMemo(() => {
    if (!bookings) return [];

    return bookings?.map(b => ({
      _id: b._id || null,
      user: b.user || null,
      sessionTitle: `${b.sessionTitle} session` || null,
      location: {
        address: b.location?.address || null,
        state: b.location?.state || null,
      },
      assignedTo: b.assignedTo || null,
      user_fullnames: b.user_fullnames?.toLowerCase() || null,
      date: b.date || null, // e.g. "Thu Dec 04 2025"
      startTime: b.startTime || null,
      price: b.price || null, // e.g. "123,400"
      status: b.status || "pending", // e.g. "pending", "completed"
    }));
  }, [bookings]);
  // 🔹 Filter bookings based on status or date
  const allBookings = formattedBookings;
  // const now = new Date();

  // const pastBookings = formattedBookings.filter(b => {
  //   // const bookingDate = b.date;
  //   return b.date;
  // });
  if (isLoading) return <p className='text-white'>Loading...</p>;
  if (error) return "Failed to load data";

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

    // return <DashboardBookingsTable bookings={data} isLoading={isLoading} role={'user'} />;

  // if (!data.length) return <p>No bookings available.</p>;
    return data.map(b => (
      <div
        key={b._id}
        onMouseEnter={() => prefetchBooking(b._id || "", { ifOlderThan: 60 })} // 👈 Prefetch on hover
        onFocus={() => prefetchBooking(b._id || "", { ifOlderThan: 60 })} // 👈 Accessibility
      >
        <BookingCard
          key={b._id}
          id={b._id}
          title={b.sessionTitle}
          location={{
            address: b.location?.address || "",
            state: b.location?.state || "",
          }}
          date={b.date}
          time={b.startTime}
          price={b.price}
          status={b.status}
        />
      </div>
    ));
  };

  return (
    <DashboardLayout
      headerProps={{
        headerText: "My bookings",
        paragraph: "View, manage, and download everything in one place",
        linkText: "Book your session",
        href: "/bookings",
      }}
    >
      <section className='w-full'>
        {/* Tabs */}
        <div className='relative mb-5 flex items-center gap-10'>
          {TABS.map(tab => (
            <button
              key={tab.index}
              className={`pb-1 text-sm font-medium text-white capitalize ${
                currentTab === tab.index
                  ? "border-b-[3px] border-white font-semibold"
                  : ""
              }`}
              onClick={() => setCurrentTab(tab.index)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bookings per tab */}
        <div className='flex flex-col gap-4'>
          {currentTab === 1 && renderBookings(allBookings)}
          {currentTab === 2 &&
            renderBookings(
              formattedBookings.filter(b => b.status === "pending")
            )}
          {currentTab === 3 &&
            renderBookings(
              formattedBookings.filter(b => b.status === "completed")
            )}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DashboardBookings;
