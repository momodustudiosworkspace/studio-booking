"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import BookingCard from "../user/cards/BookingCard";
import { useGetBookingsQuery, usePrefetch } from "@/redux/services/booking/booking.api";

const DashboardBookings = () => {
  const { data: bookings, error, isLoading } = useGetBookingsQuery();
  const [currentTab, setCurrentTab] = useState<number>(1);
  // Prefetch hook for single booking
  const prefetchBooking = usePrefetch("getBookingById");

  // 🔹 Compute and format your bookings once
  const formattedBookings = useMemo(() => {
    if (!bookings) return [];

    return bookings.map((b) => ({
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
  const upcomingBookings = formattedBookings.filter((b) => {

    // const bookingDate = b.date;
    return b.date
  });

  const pastBookings = formattedBookings.filter((b) => {
    // const bookingDate = b.date;
    return b.date;
  });
  if (isLoading) return "Loading...";
  if (error) return "Failed to load data";


  const TABS = [
    { label: "All", index: 1 },
    { label: "Upcoming", index: 2 },
    { label: "Past", index: 3 },
  ];

  const renderBookings = (data: typeof formattedBookings) => {
    if (!data.length) return <p>No bookings available.</p>;
    return data.map((b) => (
      <div key={b.id} onMouseEnter={() => prefetchBooking(b.id || "", { ifOlderThan: 60 })} // 👈 Prefetch on hover
        onFocus={() => prefetchBooking(b.id || "", { ifOlderThan: 60 })} // 👈 Accessibility
      >

        <BookingCard
          key={b.id}
          id={b.id}
          title={b.title}
          location={b.location}
          date={b.date}
          time={b.time}
          amount={b.amount}
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
      <section className="w-full">
        {/* Tabs */}
        <div className="relative mb-5 flex items-center gap-10">
          {TABS.map((tab) => (
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

        {/* Bookings per tab */}
        <div className="flex flex-col gap-4">
          {currentTab === 1 && renderBookings(allBookings)}
          {currentTab === 2 && renderBookings(upcomingBookings)}
          {currentTab === 3 && renderBookings(pastBookings)}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DashboardBookings;
