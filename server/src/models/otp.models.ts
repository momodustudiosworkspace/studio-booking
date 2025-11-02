
import mongoose, { Schema, Document, Model } from "mongoose";


export interface IOtp extends Document {
 email: string,
  otp: string,
  purpose: { type: string, enum: ["password_reset", "verify_email"] },
  expiresAt: Date,
}

const otpSchema = new Schema<IOtp>(
  {
    email: String,
  otp: String,
  purpose: { type: String, enum: ["password_reset", "verify_email"] },
  expiresAt: Date,
  },
  { timestamps: true }
);


otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // auto-delete
otpSchema.index({ email: 1 });


export const Opt: Model<IOtp> = mongoose.model("Otp", otpSchema);
export default Opt;


