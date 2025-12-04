// src/redux/services/booking.api.ts

import { GetAllSessionsResponse } from "@/types/session.types";
import { baseApi } from "../../api";


const ADMIN_BASE_URL = "/admin";
export const sessionAndPackagesApi = baseApi.injectEndpoints({
    endpoints: builder => ({


        createBookingSession: builder.mutation<{ status: number }, { session_title: string }>({
            query: body => ({
                url: `${ADMIN_BASE_URL}/sessions/`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Sessions"],
        }),
        updateSession: builder.mutation<{ id: string }, { id: string, title: string }>({
            query: ({ id, title }) => ({
                url: `${ADMIN_BASE_URL}/sessions/${id}`,
                method: "PUT",
                body: title,
            }),
            invalidatesTags: ["Sessions"],
        }),

        deleteSessions: builder.mutation<void, string>({
            query: id => ({
                url: `${ADMIN_BASE_URL}/sessions/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Sessions"],
        }),
       getAllSessions: builder.query<
    GetAllSessionsResponse,
    { page?: number; limit?: number; search?: string }
>({
    query: ({ page = 1, limit = 20, search = "" }) => ({
        url: `/sessions`,
        params: { page, limit, search },
    }),
    providesTags: ["Sessions"],
}),
        getSessionById: builder.query<any, string>({
            query: (id) => `/sessions/${id}`,
            providesTags: ["Sessions"],
        }),
    }),
    overrideExisting: true,
});

export const {
    useCreateBookingSessionMutation,
    useGetAllSessionsQuery,
    useGetSessionByIdQuery,
    useUpdateSessionMutation,
    useDeleteSessionsMutation

} = sessionAndPackagesApi;
