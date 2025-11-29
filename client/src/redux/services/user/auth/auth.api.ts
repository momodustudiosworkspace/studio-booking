// src/redux/services/booking.api.ts

import {
  SendOtpTypesRequest,
  SendOtpTypesResponse,
  UpdatePasswordTypesRequest,
  UpdatePasswordTypesResponse,
  VerifyOtpTypesRequest,
  VerifyOtpTypesResponse,
} from "@/types/otp.types";
import { baseApi } from "../../api";

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    sendOtp: builder.mutation<SendOtpTypesResponse, SendOtpTypesRequest>({
      query: body => ({
        url: "/auth/send-otp",
        method: "POST",
        body,
      }),
    }),
    verifyOtp: builder.mutation<VerifyOtpTypesResponse, VerifyOtpTypesRequest>({
      query: body => ({
        url: "/auth/verify-opt",
        method: "POST",
        body,
      }),
    }),
    upDatePassword: builder.mutation<
      UpdatePasswordTypesResponse,
      UpdatePasswordTypesRequest
    >({
      query: body => ({
        url: "/auth/update-password",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useVerifyOtpMutation,
  useSendOtpMutation,
  useUpDatePasswordMutation,
} = authApi;
