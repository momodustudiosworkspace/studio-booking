// src/types/booking.ts
export interface BookingType {
  _id: string;
  user: string; // or populated user object if you populate
  assignedTo?: number;
  sessionType?: number;
  date?: string;
  startTime?: string;
  endTime?: string;
  studioRoom?: 'A' | 'B';
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  price?: number;
  paymentStatus?: 'pending' | 'paid' | 'refunded';
  paymentReference?: string;
  cancelReason?: string;
  rescheduledFrom?: string;
  createdAt?: string;
  updatedAt?: string;
}
