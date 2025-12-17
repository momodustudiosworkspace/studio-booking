"use client";
import React, { useMemo } from "react";
import DashboardLayout from "./DashboardLayout";
import { IconsType } from "@/assets/icons/dashboard/DashboardIcons";
import BookingCardAnalytics from "./cards/BookingCardAnalytics";
import DashboardHeader from "./DashboardHeader";
import BookingCardQuickAtion from "./cards/BookingCardQuickAction";
import BookingCardService from "./cards/BookingCardService";
import { useGetBookingsQuery } from "@/redux/services/user/booking/booking.api";
import { useSession } from "next-auth/react";

const DashBoardOverview = () => {
  // Call the query hook
  const { data: bookings, error, isLoading } = useGetBookingsQuery();
  const { data: session } = useSession();

  console.log("bookings: ", bookings);
  console.log("isLoading: ", isLoading);

  // ✅ Compute analytics safely and memoize
  const analytics = useMemo(() => {
    const total = bookings?.length || 0;
    const completed =
      bookings?.filter(b => b.status === "completed").length || 0;
    const upcoming = bookings?.filter(b => b.status === "pending").length || 0;
    const cancelled =
      bookings?.filter(b => b.status === "cancelled").length || 0;

    return [
      {
        icon: "camera-outlined-black" as IconsType,
        title: "Total Bookings",
        count: total,
        linkText: "View bookings",
        href: "/bookings",
        status: "total",
      },
      {
        icon: "calendar-check-outlined-black" as IconsType,
        title: "Completed Bookings",
        count: completed,
        linkText: "View images",
        href: "/bookings",
        status: "completed",
      },
      {
        icon: "camera-outlined-black" as IconsType,
        title: "Upcoming Sessions",
        count: upcoming,
        linkText: "Next session soon",
        href: "/bookings",
        status: "upcoming",
      },
      {
        icon: "camera-outlined-black" as IconsType,
        title: "Cancelled Bookings",
        count: cancelled,
        linkText: "View all",
        href: "/bookings",
        status: "cancelled",
      },
    ];
  }, [bookings]);
  if (isLoading) return "Loading...";
  if (error) return "Failed to load data";

  const BOOKING_QUICK_LINKS_CARDS = [
    {
      icon: "camera-outlined-black" as IconsType,
      title: "Book a session",
      count: 50,
      linkText: "Book a session",
      href: "/bookings",
    },
    {
      icon: "calendar-check-outlined-black" as IconsType,
      title: "Request a quote",
      count: 50,
      linkText: "Request a quote",
      href: "/",
    },
    {
      icon: "camera-outlined-black" as IconsType,
      title: "Message studio",
      count: 3,
      linkText: "next session: 5th june 2025",
      href: "/",
    },
  ];
  const BOOKING_SERVICES_CARDS = [
    {
      title: "Wedding & engagements",
      paragraph: "Lorem ipsum dolor sit amet consectetur.",
      href: "/",
    },
    {
      title: "Wedding & engagements",
      paragraph: "Lorem ipsum dolor sit amet consectetur.",
      href: "/",
    },
    {
      title: "Wedding & engagements",
      paragraph: "Lorem ipsum dolor sit amet consectetur.",
      href: "/",
    },
    {
      title: "Wedding & engagements",
      paragraph: "Lorem ipsum dolor sit amet consectetur.",
      href: "/",
    },
    {
      title: "Wedding & engagements",
      paragraph: "Lorem ipsum dolor sit amet consectetur.",
      href: "/",
    },
    {
      title: "Wedding & engagements",
      paragraph: "Lorem ipsum dolor sit amet consectetur.",
      href: "/",
    },
  ];
  return (
    <DashboardLayout
      headerProps={{
        headerText: `Welcome back ${session?.user.first_name}`,
        paragraph:
          "Book in minutes, manage everything from scheduling to delivery",
        linkText: "Book your session",
        href: "/bookings",
      }}
    >
      <section className='w-full'>
        {/* Booking analytics  */}
        <div className='mb-14 flex w-full flex-col items-center gap-4 sm:flex-row'>
          {analytics.map((card, key) => (
            <BookingCardAnalytics
              key={key}
              status={card.status}
              icon={card.icon}
              title={card.title}
              count={card.count}
              linkText={card.linkText}
              href={card.href}
            />
          ))}
        </div>

        {/* Quick links  */}
        <div className='flex flex-col gap-4'>
          <DashboardHeader
            headerText='quick actions'
            paragraph='Book, get quotations and send messages to studio quickly'
          />
          <div className='mb-14 flex flex-col items-center gap-4 sm:flex-row'>
            {BOOKING_QUICK_LINKS_CARDS.map((card, key) => {
              return (
                <BookingCardQuickAtion
                  key={key}
                  icon={card.icon}
                  title={card.title}
                  linkText={card.linkText}
                  href={card?.href}
                />
              );
            })}
          </div>
        </div>

        {/* Services  */}
        <div className='flex flex-col gap-4'>
          <DashboardHeader
            headerText='our services'
            paragraph='Pick a session type you’ll love for us to cover'
          />
          <div className='mb-14 grid grid-cols-1 gap-y-4 sm:grid-cols-4'>
            {BOOKING_SERVICES_CARDS.map((card, key) => {
              return (
                <BookingCardService
                  key={key}
                  title={card.title}
                  paragraph={card.paragraph}
                  href={card?.href}
                />
              );
            })}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DashBoardOverview;
