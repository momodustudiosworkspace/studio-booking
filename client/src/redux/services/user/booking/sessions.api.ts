// src/redux/services/booking.api.ts

import { GetAllSessionsResponse } from "@/types/session.types";
import { baseApi } from "../../api";

export const sessionAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSessions: builder.query<GetAllSessionsResponse, void>({
      query: () => "/admin/sessions",
      providesTags: ["Sessions"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSessionsQuery,
  // useGetBookingByIdQuery,
  // useCreateBookingMutation,
  // useDeleteBookingMutation,
} = sessionAPI;
