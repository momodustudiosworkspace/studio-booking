import { Request, Response } from "express";
import mongoose from "mongoose";
import Booking from "../models/booking.models";

// Extend Express Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// ✅ Create Booking
export async function createBooking (req: Request, res: Response) {
  try {
    const { sessionType, date, timeSlot, notes } = req.body;
    const userId = req.userId; // assuming user is attached from auth middleware

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const booking = await Booking.create({
      user: userId,
      sessionType,
      date,
      timeSlot,
      notes,
    });

    return res.status(201).json(booking);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create booking", error });
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
