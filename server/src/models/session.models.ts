import mongoose, { Schema, Document, Model } from "mongoose";


export interface ISession extends Document {
  title: string;
  imageUrl: string;
  createdAt: Date;
  description: string;
  updatedAt: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    title: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// sessionSchema.index({ date: 1, startTime: 1, }, { unique: true });
// sessionSchema.index({ user: 1 });
sessionSchema.virtual("packages", {
  ref: "Package",
  localField: "_id",
  foreignField: "session",
});

sessionSchema.set("toJSON", { virtuals: true });
sessionSchema.set("toObject", { virtuals: true });

export const Session: Model<ISession> = mongoose.model("Session", sessionSchema);
export default Session;
