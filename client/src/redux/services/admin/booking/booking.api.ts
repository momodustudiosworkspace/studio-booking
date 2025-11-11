// src/redux/services/booking.api.ts

import { baseApi } from "../../api";
import { BookingType,  BookingTypeResponse } from "@/types/booking.types";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getBookings: builder.query<BookingTypeResponse[], void>({
      query: () => "/bookings",
      providesTags: ["Bookings"],
    }),

    getBookingById: builder.query<BookingType, string>({
      query: id => `/bookings/${id}`,
      providesTags: (result, _error, id) =>
        result
          ? [{ type: "Bookings", id: result._id ?? id }]
          : [{ type: "Bookings", id }],
    }),  
  }),
  overrideExisting: false,
});

export const {
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  usePrefetch,
} = bookingApi;
