import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  user_fullnames: string;
  assignedTo?: mongoose.Types.ObjectId;
  sessionType: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  studioRoom?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  price: number;
  paymentStatus: "pending" | "paid" | "refunded";
  paymentReference?: string;
  cancelReason?: string;
  rescheduledFrom?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  location: {
    state: string,
    address:string
  },
  images?: {
  url: string;
  public_id: string;
  isSelected?: boolean;
}[];
  
}

const bookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    user_fullnames: { type: String, required: true, trim: true },
    sessionType: { type: String, required: true, trim: true },
    date: { type: Date },
    startTime: { type: Date },
    endTime: { type: Date },
    studioRoom: { type: String, enum: ["A", "B"], default: "A" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    notes: { type: String, trim: true },
    price: { type: Number, },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
    paymentReference: { type: String, trim: true },
    cancelReason: { type: String, trim: true },
    rescheduledFrom: { type: Schema.Types.ObjectId, ref: "Booking" },
    images: [
        {
          url: { type: String },
          public_id: { type: String },
          isSelected: { type: Boolean, default: false },
        },
    ],
   location: {
      state: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
    },
  },
  { timestamps: true }
);

bookingSchema.index({ date: 1, startTime: 1, studioRoom: 1 }, { unique: true });
bookingSchema.index({ user: 1 });
bookingSchema.index({ status: 1 });

export const Booking: Model<IBooking> = mongoose.model("Booking", bookingSchema);
export default Booking;
