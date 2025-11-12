import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  user: mongoose.Types.ObjectId;
  booking: mongoose.Types.ObjectId;
  reference: string;
  email: string;
  amount: number;
  status: "pending" | "success" | "failed";
  // gateway_response?: string;
  paidAt?: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    booking: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
    reference: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    // gateway_response: String,
    paidAt: Date,
  },
  { timestamps: true }
);

export const Payment =  mongoose.model<IPayment>("Payment", paymentSchema);
export default Payment