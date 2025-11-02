import { Request, Response } from "express";
import Package from "../models/package.models";


// ✅ Get all packages for booking session
export async function getBookingSessionPackages (req: Request, res: Response) {
  try {
    const session = req.body;
    const packages = await Package.find({ session:session }).sort({ createdAt: -1 });
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch booking session packages", error });
  }
};


