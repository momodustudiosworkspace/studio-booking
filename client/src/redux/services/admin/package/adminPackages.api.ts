// src/redux/services/booking.api.ts

import { PackagesResponse } from "@/types/packages.types";
import { baseApi } from "../../api";
// import {   BookingTypeResponse } from "@/types/booking.types";

const ADMIN_BASE_URL = "/admin";
export const adminPackagesAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPackages: builder.query<PackagesResponse, { sessionId: string }>({
      query: ({ sessionId }) => ({
        url: `${ADMIN_BASE_URL}/packages`,
        params: { sessionId },
      }),
      providesTags: ["Packages"],
    }),

    createPackage: builder.mutation({
      query: body => ({
        url: `${ADMIN_BASE_URL}/packages`,
        method: "POST",
        body,
      }),

      invalidatesTags: [
        "Packages",
        { type: "Sessions", id: "LIST" },
        { type: "Sessions", id: "COUNT" },
      ],
    }),

    updatePackage: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${ADMIN_BASE_URL}/packages/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Packages"],
    }),

    deletePackage: builder.mutation({
      query: id => ({
        url: `${ADMIN_BASE_URL}/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Packages"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreatePackageMutation,
  useDeletePackageMutation,
  useGetPackagesQuery,
  useUpdatePackageMutation,
} = adminPackagesAPI;
