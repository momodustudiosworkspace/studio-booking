"use client";

import React from "react";
import { useGetBookingByIdQuery } from "@/redux/services/user/booking/booking.api";
import DashboardBookingDetails from "@/components/dashbord/admin/DashboardBookingDetails";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  // ✅ Unwrap the Promise using React.use()
  const { id } = React.use(params);

  // ✅ Fetch booking data
  const { data: booking, isLoading } = useGetBookingByIdQuery(id, {
    skip: !id, // avoid query if id is undefined/null
  });

  console.log("Booking id:", id);
  console.log("Booking:", booking);

  if (!booking) return <p>No booking found.</p>;

  return (
    <section className='max-w-7xl px-6 lg:px-8 mx-auto '>
      {isLoading && <p>Loading booking details...</p>}
      {!isLoading && booking && (
        <DashboardBookingDetails booking={booking} isLoading={isLoading} />
      )}
    </section>
  );
}
