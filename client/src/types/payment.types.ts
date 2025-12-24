// src/types/payment.ts

export interface CreatePaymentRequest {
  email: string | null;
  amount: number | null;
  bookingId: string | null;
  reference: string | null;
  status: "success" | "failed";
}

export interface CreatePaymentResponse {
  message: string;
  data?: {
    booking: string;
    reference: string;
    amount: number;
    status: "pending" | "success" | "failed";
    gateway_response: string;
    paidAt: string;
  };
}

export interface VerifyPaymentRequest {
  reference: string | null;
  bookingId: string | null;
}

export interface VerifyPaymentResponse {
  status: "success" | "failed";
  data?: {
    booking: string;
    reference: string;
    amount: number;
    status: string;
    gateway_response: string;
    paidAt: string;
  };
}

export interface AllPaymentResponse {
  user: {
    first_name: string;
    last_name: string;
  }
  booking: string;
  reference: string;
  amount: number;
  status: "pending" | "success" | "failed";
  // gateway_response: string;
  paidAt: string;
}
