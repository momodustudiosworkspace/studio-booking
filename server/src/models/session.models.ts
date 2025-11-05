import mongoose, { Schema, Document, Model } from "mongoose";


export interface ISession extends Document {
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    title: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// sessionSchema.index({ date: 1, startTime: 1, }, { unique: true });
// sessionSchema.index({ user: 1 });


export const Session: Model<ISession> = mongoose.model("Session", sessionSchema);
export default Session;
