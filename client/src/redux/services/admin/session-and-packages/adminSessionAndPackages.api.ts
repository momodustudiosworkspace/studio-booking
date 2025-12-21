// src/redux/services/booking.api.ts

import { GetAllSessionsResponse } from "@/types/session.types";
import { baseApi } from "../../api";

const ADMIN_BASE_URL = "/admin";

export const sessionAndPackagesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // CREATE
    createBookingSession: builder.mutation<
      { status: number },
      { session_title: string }
    >({
      query: body => ({
        url: `${ADMIN_BASE_URL}/sessions/`,
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: "Sessions", id: "LIST" },
        { type: "Sessions", id: "COUNT" },
      ],
    }),

    // UPDATE
    updateSession: builder.mutation<
      { id: string },
      { id: string; title: string }
    >({
      query: ({ id, title }) => ({
        url: `${ADMIN_BASE_URL}/sessions/${id}`,
        method: "PUT",
        body: { title }, // FIX
      }),
      invalidatesTags: [{ type: "Sessions", id: "LIST" }],
    }),

    // DELETE
    deleteSessions: builder.mutation<void, string>({
      query: id => ({
        url: `${ADMIN_BASE_URL}/sessions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Sessions", id: "LIST" },
        { type: "Sessions", id: "COUNT" },
      ],
    }),

    // GET ALL
    getAllSessions: builder.query<
      GetAllSessionsResponse,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 20, search = "" }) => ({
        url: `${ADMIN_BASE_URL}/sessions`,
        params: { page, limit, search },
      }),
      providesTags: result =>
        result?.data
          ? [
              ...result.data.map(s => ({
                type: "Sessions" as const,
                id: s._id,
              })),
              { type: "Sessions", id: "LIST" },
            ]
          : [{ type: "Sessions", id: "LIST" }],
    }),

    // GET ONE
    getSessionById: builder.query<any, string>({
      query: id => `${ADMIN_BASE_URL}/sessions/${id}`, // FIX URL
      providesTags: (_result, _error, id) => [{ type: "Sessions", id }],
    }),

    getSessionAndPackagesCount: builder.query<
      { data: { totalSessions: number; totalPackages: number } },
      void
    >({
      query: () => `${ADMIN_BASE_URL}/sessions/sessions-and-packages/count`,
      providesTags: [{ type: "Sessions", id: "COUNT" }],
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateBookingSessionMutation,
  useUpdateSessionMutation,
  useDeleteSessionsMutation,
  useGetAllSessionsQuery,
  useGetSessionByIdQuery,
  useGetSessionAndPackagesCountQuery,
} = sessionAndPackagesApi;
