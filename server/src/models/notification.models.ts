import mongoose, { Schema, Document, Model } from "mongoose";

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;      // who receives it
  title: string;                        // short headline
  message: string;                      // main message text
  type?: "payment" | "booking" | "system" | "promotion";  // category
  bookingId?: mongoose.Types.ObjectId;  // optional reference (if related)
  isRead: boolean;                      // read/unread flag
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["payment", "booking", "system", "promotion"],
      default: "system",
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Notification : Model<INotification> = mongoose.model("Notification", NotificationSchema);
export default Notification