import {
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
  UserProfileTypesResponse,
  UserSubscriptionEmailRequest,
  UserSubscriptionEmailResponse,
} from "@/types/user.types";
import { baseApi } from "../../api";

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUserProfile: builder.query<UserProfileTypesResponse, void>({
      query: () => "/user",
      providesTags: ["Profile"],
    }), 
     updateUserProfile: builder.mutation<
      UpdateUserProfileResponse,
      UpdateUserProfileRequest
    >({
      query: (body) => ({
        url: "/user",
        method: "PUT",
        body,
      }),
      
      invalidatesTags: ["Profile"],
    }),
      sendUserSubscriptionEmail: builder.mutation<
      UserSubscriptionEmailResponse,
      UserSubscriptionEmailRequest
    >({
      query: body => ({
        url: "/user/send/newsletter/",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetUserProfileQuery,useUpdateUserProfileMutation, useSendUserSubscriptionEmailMutation } =
  userApi;
