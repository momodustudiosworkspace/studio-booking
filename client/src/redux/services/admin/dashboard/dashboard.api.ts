// src/redux/services/booking.api.ts

import { baseApi } from "../../api";
// import {   BookingTypeResponse } from "@/types/booking.types";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getBookings: builder.query<Response, void>({
      query: () => "/bookings",
      providesTags: ["Bookings"],
    }),

   
  }),
  overrideExisting: false,
});

export const {
  useGetBookingsQuery,
  usePrefetch,
} = bookingApi;
