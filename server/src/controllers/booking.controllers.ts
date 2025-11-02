import { Request, Response } from "express";
import mongoose from "mongoose";
import Booking from "../models/booking.models";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config";
import multer from "multer";

// import { isSlotAvailable } from "../utils/isSlotAvailable"; 

// Extend Express Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

  // 🧩 Define multer + Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req: any, file) => {
    // Find booking + user to dynamically set folder
    const booking = await Booking.findById(req.params.id).populate("user", "first_name last_name");
    if (!booking || !booking.user) throw new Error("Booking not found");

    const user = booking.user as any;
    const clientName = `${user.first_name}_${user.last_name}`.replace(/\s+/g, "_");

    return {
      folder: `bookings/${clientName}/${booking._id}/images`,
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png"],
      public_id: file.originalname.split(".")[0],
    };
  },
});

export const bookingImagesUpload = multer({ storage });

// ✅ Create Booking
export async function createBooking (req: Request, res: Response) {
  try {
    // const { sessionType, date, timeSlot, notes } = req.body;
    const userId = req.userId; // assuming user is attached from auth middleware

    
    const { date, startTime, sessionType, studioRoom, price=25000 } = req.body;

    // The system will calculate end time endTime, based on number of outfits 
    
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    // const isAvailable = await isSlotAvailable({
    //   date: new Date(date),
    //   startTime: new Date(startTime),
    //   // endTime: new Date(endTime),
    //   studioRoom,
    // });

    // if (!isAvailable) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "This time slot is already booked. Please choose another.",
    //   });
    // }

    const booking = await Booking.create({
      user: userId,
      sessionType,
      date,
      startTime,
      price,
     studioRoom
    });

    return res.status(201).json(booking);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create booking, please try again", error });
  }
};

// ✅ Get all bookings for logged-in user
export async function getUserBookings (req: Request, res: Response) {
  try {
    const userId = req.userId;
    const bookings = await Booking.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error });
  }
};

// ✅ Get single booking
export async function getBookingById (req: Request, res: Response)  {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(Number(id)))
      return res.status(400).json({ message: "Invalid booking ID" });

    const booking = await Booking.findById(id).populate("user", "first_name last_name email");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    return res.status(200).json(booking);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch booking", error });
  }
};

// ✅ Update booking
export async function updateBooking (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const booking = await Booking.findByIdAndUpdate(id, updates, { new: true });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    return res.status(200).json(booking);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update booking", error });
  }
};

// ✅ Delete booking
export async function deleteBooking (req: Request, res: Response)  {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete booking", error });
  }
};
// ✅ Upload booking Images
export async function uploadBookingImages(req: any, res: Response) {


   try {
const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const images = files.map((file) => ({
      url: (file as any).path,
      public_id: (file as any).filename,
    }));

    // Optionally store image URLs in booking record
    await Booking.findByIdAndUpdate(req.params.id, {
      $push: { images: { $each: images } },
    });

    return res.status(200).json({ message: "Images uploaded successfully", images });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Image upload failed", error });
  }
};
