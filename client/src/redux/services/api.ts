// src/redux/services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';


const baseUrl = process.env["Production"]
  ? process.env["API_BASE_URL"]
  : process.env["API_BASE_URL_LOCAL"];

export const baseApi = createApi({
  reducerPath: 'api', // 👈 unique key in store
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl || 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Bookings', 'User', 'Auth'], // 👈 define tag categories for caching/invalidation
  endpoints: () => ({
   

    // // Example 2: Get a single booking
    // getBookingById: builder.query<any, string>({
    //   query: (id) => `/bookings/${id}`,
    //   providesTags: (result, error, id) => [{ type: 'Booking', id }],
    // }),

    // // Example 3: Create new booking
    // createBooking: builder.mutation<any, Partial<any>>({
    //   query: (body) => ({
    //     url: '/bookings',
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: ['Booking'],
    // }),

    // // Example 4: Delete booking
    // deleteBooking: builder.mutation<void, string>({
    //   query: (id) => ({
    //     url: `/bookings/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['Booking'],
    // }),
  }),
});
