"use client";

import React from "react";
import BookingImageUpload from "@/components/bookings/BookingImageUpload";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  // ✅ Unwrap the Promise using React.use()
  const { id } = React.use(params);


  return (
    <section className='max-w-7xl lg:px-8 mx-auto min-h-screen flex justify-center items-center  p-4'>
        <BookingImageUpload bookingId={id} /> 
    </section>
  );
}
