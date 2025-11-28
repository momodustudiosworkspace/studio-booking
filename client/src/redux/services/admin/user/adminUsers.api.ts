// src/redux/services/booking.api.ts

import { UserTypesResponse } from "@/types/user.types";
import { baseApi } from "../../api";

export const adminUserApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllUser: builder.query<
      {
        data: UserTypesResponse[];
        pagination: {
          total: number;
          page: number;
          limit: number;
          totalPages: number;
        };
      },
      { page?: number; limit?: number }
      >
      ({
      query: ({ page = 1, limit = 10 }) =>
        `/admin/users/all?page=${page}&limit=${limit}`,
      providesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllUserQuery } = adminUserApi;
