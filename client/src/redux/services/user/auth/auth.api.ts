// src/redux/services/booking.api.ts

import { VerifyOtpTypesRequest, VerifyOtpTypesResponse } from "@/types/otp.types";
import { baseApi } from "../../api";

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    verifyOtp: builder.mutation<VerifyOtpTypesResponse, VerifyOtpTypesRequest>({
      query: body => ({
        url: "/auth/verify-opt",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
    useVerifyOtpMutation
} = authApi;
