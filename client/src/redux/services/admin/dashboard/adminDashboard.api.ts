// src/redux/services/booking.api.ts

import { AdminDashBoardStatsTypeResponse } from "@/types/admin/adminDashboard.types";
import { baseApi } from "../../api";
// import {   BookingTypeResponse } from "@/types/booking.types";

const ADMIN_BASE_URL = "/admin/dashboard"
export const adminDashboardApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAdminDashBoardStats: builder.query<AdminDashBoardStatsTypeResponse, void>({
      query: () => `${ADMIN_BASE_URL}/stats`,
      providesTags: ["AdminStats"],
    }),

   
  }),
  overrideExisting: false,
});

export const {
  useGetAdminDashBoardStatsQuery,
} = adminDashboardApi;
