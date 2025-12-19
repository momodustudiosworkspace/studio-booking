import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStaff extends Document {
  first_name: string;
  last_name: string;
  email: string;
  phoneNumber?: string;
  role: "engineer" | "photographer" | "producer" | "manager" | "admin" | "videographer" | "retoucher" | "lightroom";
  specialization?: string[];
  hire_date?: Date;
  status: "active" | "inactive" | "suspended";
  isInvitationAccepted: boolean;
  hourly_rate?: number;
  bio?: string;
  profile_image?: string;
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  working_hours?: {
    start_time: string; // HH:MM format
    end_time: string;   // HH:MM format
  };
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

const staffSchema: Schema<IStaff> = new Schema<IStaff>(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    phoneNumber: {
      type: String,
      required: false,
      trim: true,
    },
    role: {
      type: String,
      enum: ["engineer", "photographer", "producer", "manager", "admin", "videographer", "retoucher", "lightroom"],
      default: "engineer",
    },
    specialization: {
      type: [String],
      default: [],
    },
    hire_date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "inactive",
    },
    isInvitationAccepted: {
      type: Boolean,
      default: false,
    },
    hourly_rate: {
      type: Number,
      required: false,
      min: 0,
    },
    bio: {
      type: String,
      default: "",
      trim: true,
    },
    profile_image: {
      type: String,
      default: "",
    },
    availability: {
      monday: { type: Boolean, default: true },
      tuesday: { type: Boolean, default: true },
      wednesday: { type: Boolean, default: true },
      thursday: { type: Boolean, default: true },
      friday: { type: Boolean, default: true },
      saturday: { type: Boolean, default: false },
      sunday: { type: Boolean, default: false },
    },
    working_hours: {
      start_time: {
        type: String,
        default: "09:00",
        trim: true,
      },
      end_time: {
        type: String,
        default: "17:00",
        trim: true,
      },
    },
    permissions: {
      type: [String],
      default: ["view_bookings"],
    },
  },
  {
    timestamps: true,
  }
);

staffSchema.index({ role: 1 });
staffSchema.index({ status: 1 });

export const Staff: Model<IStaff> = mongoose.model<IStaff>("Staff", staffSchema);
export default Staff;
