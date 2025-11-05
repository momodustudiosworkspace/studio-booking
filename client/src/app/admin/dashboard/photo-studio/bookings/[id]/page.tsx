"use client";

import React from "react";
import DashboardBookingDetails from "@/components/dashbord/user/DashboardBookingDetails";
import { useGetBookingByIdQuery } from "@/redux/services/booking/booking.api";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  // ✅ Unwrap the Promise using React.use()
  const { id } = React.use(params);

  // ✅ Fetch booking data
  const { data: booking, isLoading } = useGetBookingByIdQuery(id, {
    skip: !id, // avoid query if id is undefined/null
  });

  console.log("Booking id:", id);
  console.log("Booking:", booking);

  if (isLoading) return <p>Loading booking details...</p>;
  if (!booking) return <p>No booking found.</p>;

  return (
    <section className='w-full pt-24'>
      <DashboardBookingDetails booking={booking} isLoading={isLoading} />
    </section>
  );
}
