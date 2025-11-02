import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPackage extends Document {
  session: mongoose.Types.ObjectId;
  title: string;
  price: number;
  services: string[];
  createdAt: Date;
  updatedAt: Date;
}

const packageSchema = new Schema<IPackage>(
  {
    session: { type: Schema.Types.ObjectId, ref:"Session", required: true },
    title : {type: String, required: true },
    price: { type: Number, },
    services : []
 
  },
  { timestamps: true }
);

packageSchema.index({ date: 1, startTime: 1, }, { unique: true });
packageSchema.index({ user: 1 });


export const Package: Model<IPackage> = mongoose.model("Package", packageSchema);
export default Package;
