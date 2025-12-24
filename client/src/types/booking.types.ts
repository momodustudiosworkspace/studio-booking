// src/types/booking.ts

export interface BookingLocationOptions {
  address?: string | null;
  state?: string | null;
}

export interface BookingAssignedTo {
  _id: string;
  first_name?: string | null;
  last_name?: string | null;
  role?: string | null;
}
export interface BookingType {
  _id: string | null;
  user?: string | null; // or populated user object if you populate
  user_fullnames?: string | null;
  assignedTo?: BookingAssignedTo[];
  sessionTitle?: string | null;
  sessionType?: string | null;
  package?: string | null;
  date?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  studioRoom?: "A" | "B" | null;
  location?: BookingLocationOptions | null;
  status?: undefined | "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string | null;
  price?: number | null;
  paymentStatus?: "pending" | "paid" | "refunded";
  paymentReference?: string | null;
  cancelReason?: string | null;
  rescheduledFrom?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface BookingTypeResponse {
  booking: BookingType;
  message: string;
}
export interface BookingTypeRequest {
  booking: BookingType;
  id: string;
}

export interface BookingSLotsCalendar {
  date: string;
  times: string[];
  isFull: boolean;
}
