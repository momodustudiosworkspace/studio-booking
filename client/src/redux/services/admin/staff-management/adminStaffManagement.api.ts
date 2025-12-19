import { baseApi } from "../../api";
import {
  IStaff,
  StaffRequest,
  StaffResponse,
  StaffListResponse,
  StaffStatisticsResponse,
  StaffApiResponse,
  InviteStaffRequest,
  AcceptInvitationRequest,
} from "@/types/staff.types";

export const adminStaffManagementApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // ✅ Invite staff member
    inviteStaff: builder.mutation<StaffApiResponse<InviteStaffRequest>, InviteStaffRequest>({
      query: (data) => ({
        url: "/admin/staff/invite",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),

    // ✅ Accept staff invitation
    acceptInvitation: builder.mutation<StaffApiResponse<StaffResponse>, AcceptInvitationRequest>({
      query: (data) => ({
        url: "/admin/staff/accept-invitation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),

    // ✅ Get staff statistics
    getStaffStatistics: builder.query<StaffStatisticsResponse, void>({
      query: () => "/admin/staff/statistics",
      providesTags: ["Staff"],
    }),

    // ✅ Get all staff members with pagination
    getAllStaff: builder.query<
      StaffListResponse,
      { page?: number; limit?: number; status?: string; role?: string }
    >({
      query: ({ page = 1, limit = 10, status, role }) => {
        const params = new URLSearchParams();
        params.append("page", String(page));
        params.append("limit", String(limit));
        if (status) params.append("status", status);
        if (role) params.append("role", role);
        return `/admin/staff?${params.toString()}`;
      },
      providesTags: ["Staff"],
    }),

    // ✅ Get staff member by ID
    getStaffById: builder.query<StaffApiResponse<StaffResponse>, string>({
      query: (id) => `/admin/staff/${id}`,
      providesTags: (result, _error, id) =>
        result
          ? [{ type: "Staff", id: result.data?._id ?? id }]
          : [{ type: "Staff", id }],
    }),

    // ✅ Update staff member
    updateStaff: builder.mutation<
      StaffApiResponse<StaffResponse>,
      { id: string; data: Partial<StaffRequest> }
    >({
      query: ({ id, data }) => ({
        url: `/admin/staff/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Staff",
        { type: "Staff", id },
      ],
    }),

    // ✅ Update staff availability
    updateStaffAvailability: builder.mutation<
      StaffApiResponse<StaffResponse>,
      { id: string; availability: IStaff["availability"] }
    >({
      query: ({ id, availability }) => ({
        url: `/admin/staff/${id}/availability`,
        method: "PUT",
        body: { availability },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Staff",
        { type: "Staff", id },
      ],
    }),

    // ✅ Update staff permissions
    updateStaffPermissions: builder.mutation<
      StaffApiResponse<StaffResponse>,
      { id: string; permissions: string[] }
    >({
      query: ({ id, permissions }) => ({
        url: `/admin/staff/${id}/permissions`,
        method: "PUT",
        body: { permissions },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Staff",
        { type: "Staff", id },
      ],
    }),

    // ✅ Delete/Deactivate staff member
    deleteStaff: builder.mutation<StaffApiResponse<void>, string>({
      query: (id) => ({
        url: `/admin/staff/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Staff"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useInviteStaffMutation,
  useAcceptInvitationMutation,
  useGetStaffStatisticsQuery,
  useGetAllStaffQuery,
  useGetStaffByIdQuery,
  useUpdateStaffMutation,
  useUpdateStaffAvailabilityMutation,
  useUpdateStaffPermissionsMutation,
  useDeleteStaffMutation,
} = adminStaffManagementApi;
