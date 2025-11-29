import {
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
  overrideExisting: false,
});

export const { useGetUserProfileQuery, useSendUserSubscriptionEmailMutation } =
  userApi;
