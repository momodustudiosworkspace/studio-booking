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
  overrideExisting: true,
});

export const { useGetAllUserBookingsQuery, usePrefetch } = adminBookingApi;
