// src/redux/services/booking.api.ts
import { baseApi } from "../api";
import { BookingType } from "@/types/booking";

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

    createBooking: builder.mutation<BookingType, Partial<BookingType>>({
      query: body => ({
        url: "/bookings/",
        method: "POST",
        body,
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
  }),
  overrideExisting: false,
});

export const {
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useCreateBookingMutation,
  useDeleteBookingMutation,
  usePrefetch,
} = bookingApi;
