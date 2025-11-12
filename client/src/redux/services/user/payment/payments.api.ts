// src/redux/services/payment.api.ts
import { baseApi } from "../../api";
import {

  CreatePaymentRequest,
  CreatePaymentResponse,
  VerifyPaymentRequest,
  VerifyPaymentResponse,
} from "@/types/payment.types";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1️⃣ Initialize payment
    createPayment: builder.mutation<CreatePaymentResponse, CreatePaymentRequest>({
      query: (body) => ({
        url: "/payment/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payments"],
    }),

    // 2️⃣ Verify payment
    verifyPayment: builder.mutation<VerifyPaymentResponse, VerifyPaymentRequest>({
      query: (body) => ({
        url: "/payment/verify",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payments"],
    }),
  }),

  overrideExisting: false,
});

export const { useCreatePaymentMutation, useVerifyPaymentMutation } = paymentApi;
