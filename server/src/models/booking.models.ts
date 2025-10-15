import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  sessionType: string; // e.g. "Wedding", "Birthday", "Studio", etc.
  date: Date;
  timeSlot: string; // optional: "10:00 AM - 12:00 PM"
  status: 0 | 1 | 2 | 3;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema: Schema<IBooking> = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sessionType: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: false },
    status: {
      type: Number,
      enum: [0,1,2,3],
      default: 0,
    },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Booking: Model<IBooking> = mongoose.model<IBooking>("Booking", bookingSchema);
export default Booking;
