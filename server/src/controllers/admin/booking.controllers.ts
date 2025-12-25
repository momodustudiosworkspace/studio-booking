import { Request, Response } from "express";

import Booking from "../../models/booking.models";
import Staff from "../../models/staff.models";

// import Payment from "../../models/payment.models";



// Get all bookings 
export const getAllUserBookings = async (req: Request, res: Response)=> {
  try {
    const page = parseInt(req.query['page'] as string)|| 1;
    const limit =  parseInt(req.query['limit'] as string) || 10;
    const skip = (page - 1) * limit;

    // Fetch bookings with pagination
    const [bookings, total] = await Promise.all([
      Booking.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate("assignedTo", "first_name last_name email role"),
      Booking.countDocuments(),
    ]);
       const totalRevenueResult = await Booking.aggregate([
          { $match: { paymentStatus: "success" } },
          { $group: { _id: null, total: { $sum: "$price" } } },
        ]);
        const totalRevenue = totalRevenueResult[0]?.total || 0;
    
    return res.status(200).json({
      data:  {bookings,totalRevenue},
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("❌ Error fetching paginated bookings:", error);
   return  res.status(500).json({ message: "Failed to fetch bookings" });
  }
}

// Assign staff to bookings 
export async function assignStaffToBooking(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { staffId } = req.body;

    if (!staffId) {
      return res.status(400).json({
        status: 400,
        message: "Staff ID is required",
      });
    }

    // Ensure staff exists
    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).json({
        status: 404,
        message: "Staff member not found",
      });
    }

    // Add staff to assignedTo array
    const booking = await Booking.findByIdAndUpdate(
      id,
      { $addToSet: { assignedTo: staffId } }, // 👈 key change
      { new: true }
    ).populate("assignedTo", "first_name last_name email role");

    if (!booking) {
      return res.status(404).json({
        status: 404,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Staff assigned to booking successfully",
      data: booking,
    });
  } catch (error: any) {
    console.error("Assign staff error:", error);

    return res.status(500).json({
      status: 500,
      message: "Failed to assign staff to booking",
      error: error.message,
    });
  }
}

// Remove staff from bookings 
export async function removeStaffFromBooking(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { staffId } = req.body;

    if (!staffId) {
      return res.status(400).json({ status: 400, message: "Staff ID is required" });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { $pull: { assignedTo: staffId } }, // 🔹 removes staff safely
      { new: true }
    ).populate("assignedTo", "first_name last_name email role");

    if (!booking) {
      return res.status(404).json({ status: 404, message: "Booking not found" });
    }

    return res.status(200).json({
      status: 200,
      message: "Staff removed from booking successfully",
      data: booking,
    });
  } catch (error: any) {
    console.error("Remove staff error:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to remove staff from booking",
      error: error.message,
    });
  }
}

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






