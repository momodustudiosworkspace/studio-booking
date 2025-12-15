// src/redux/services/booking.api.ts

import { baseApi } from "../../api";
import {
  BookingSLotsCalendar,
  BookingType,
  BookingTypeRequest,
  BookingTypeResponse,
} from "@/types/booking.types";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getBookings: builder.query<BookingType[], void>({
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

    createBooking: builder.mutation<BookingTypeResponse, Partial<BookingType>>({
      query: body => ({
        url: "/bookings/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Bookings", "AdminStats"],
    }),
    updateBooking: builder.mutation<BookingTypeResponse, BookingTypeRequest>({
      query: ({ id, booking }) => ({
        url: `/bookings/${id}`,
        method: "PUT",
        body: booking,
      }),
      invalidatesTags: ["Bookings"],
    }),

    deleteBooking: builder.mutation<void, string>({
      query: id => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookings"],
    }),
      getCalendarBookings: builder.query<
      BookingSLotsCalendar[],
      { year: number; month: number }
    >({
      query: ({ year, month }) =>
        `/bookings/calendar?year=${year}&month=${month}`,
      providesTags: (_result, _error, arg) => [
        { type: "Bookings", id: `calendar-${arg.year}-${arg.month}` },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  useGetCalendarBookingsQuery,
  usePrefetch,
} = bookingApi;
