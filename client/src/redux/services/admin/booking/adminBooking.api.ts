// src/redux/services/booking.api.ts

import { baseApi } from "../../api";
import { BookingType } from "@/types/booking.types";

export const adminBookingApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllUserBookings: builder.query<
      {
        data: { bookings: BookingType[]; totalRevenue: number };
        pagination: {
          total: number;
          page: number;
          limit: number;
          totalPages: number;
        };
      },
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) =>
        `/admin/bookings/all?page=${page}&limit=${limit}`,
      providesTags: result =>
        result?.data?.bookings
          ? [
              ...result.data.bookings
                .filter(b => b._id) // 🔥 remove nulls
                .map(b => ({
                  type: "Bookings" as const,
                  id: b._id as string,
                })),
              { type: "Bookings", id: "LIST" },
            ]
          : [{ type: "Bookings", id: "LIST" }],
    }),
    getBookingById: builder.query<BookingType, string>({
      query: id => `/bookings/${id}`,
      providesTags: (result, _error, id) =>
        result
          ? [{ type: "Bookings", id: result._id ?? id }]
          : [{ type: "Bookings", id }],
    }),
    assignStaffToBooking: builder.mutation<
      BookingType,
      { bookingId: string; staffId: string }
    >({
      query: ({ bookingId, staffId }) => ({
        url: `/admin/bookings/${bookingId}/assign-staff`,
        method: "PATCH",
        body: { staffId },
      }),
      invalidatesTags: (_result, _error, { bookingId }) => [
        { type: "Bookings", id: bookingId }, // 🔥 update booking detail
        { type: "Bookings", id: "LIST" }, // 🔥 update bookings list
      ],
    }),
    removeStaffFromBooking: builder.mutation<
  BookingType,
  { bookingId: string; staffId: string }
>({
  query: ({ bookingId, staffId }) => ({
    url: `/admin/bookings/${bookingId}/remove-staff`,
    method: "PATCH",
    body: { staffId },
  }),
  invalidatesTags: (_result, _error, { bookingId }) => [
    { type: "Bookings", id: bookingId },
    { type: "Bookings", id: "LIST" },
  ],
}),
  }),
  overrideExisting: true,
});

export const {
  useGetAllUserBookingsQuery,
  useRemoveStaffFromBookingMutation,
  useAssignStaffToBookingMutation,
  usePrefetch,
} = adminBookingApi;
