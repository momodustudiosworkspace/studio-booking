// src/redux/services/booking.api.ts
import { baseApi } from "../api";
import { BookingType } from "@/types/booking.types";

export const bookingPackagesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getBookingPackages: builder.query<BookingType[], void>({
      query: () => "/bookings/packages",
      providesTags: ["Bookings"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBookingPackagesQuery,
  // useGetBookingByIdQuery,
  // useCreateBookingMutation,
  // useDeleteBookingMutation,
} = bookingPackagesApi;
