
import { AllPaymentResponse } from "@/types/payment.types";
import { baseApi } from "../../api";
import { BookingType,  } from "@/types/booking.types";

export const adminBookingApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllPayment: builder.query<{
      data: AllPaymentResponse[];
      pagination: { total: number; page: number; limit: number; totalPages: number };
    }, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => `/admin/payments/all?page=${page}&limit=${limit}`,
      providesTags: ["Payments"],
    }),
      getPaymentById: builder.query<BookingType, string>({
      query: id => `/payment/${id}`,
      providesTags: (result, _error, id) =>
        result
          ? [{ type: "Payments", id: result._id ?? id }]
          : [{ type: "Payments", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllPaymentQuery,
  useGetPaymentByIdQuery,
  usePrefetch
} = adminBookingApi;
