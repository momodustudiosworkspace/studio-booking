import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  passwordHash: string;
  isVerified: boolean;
  isMember: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    first_name: { type: String, required: false, trim: true },
    last_name: { type: String, required: false, trim: true }, // 👈 added
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    isMember: { type: Boolean, required: false, default: true },
    isAdmin: { type: Boolean, required: false, default: false },
    passwordHash: { type: String, required: false },
    isVerified: { type: Boolean, required: false, default:false },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
