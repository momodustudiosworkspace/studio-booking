// src/types/booking.ts
export interface BookingType {
  _id: string | null;
  user: string | null; // or populated user object if you populate
  assignedTo?: number | null;
  sessionType?: number | null;
  date?: string | null;
  startTime?: Date | null;
  endTime?: string | null;
  studioRoom?: 'A' | 'B' | null;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string | null;
  price?: number | null;
  paymentStatus?: 'pending' | 'paid' | 'refunded';
  paymentReference?: string | null;
  cancelReason?: string | null;
  rescheduledFrom?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
