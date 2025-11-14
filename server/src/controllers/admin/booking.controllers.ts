import { Request, Response } from "express";

import Booking from "../../models/booking.models";
// import Payment from "../../models/payment.models";



// Get all bookings 
export const getAllUserBookings = async (req: Request, res: Response)=> {
  try {
    const page = parseInt(req.query['page'] as string)|| 1;
    const limit =  parseInt(req.query['limit'] as string) || 10;
    const skip = (page - 1) * limit;

    // Fetch bookings with pagination
    const [bookings, total] = await Promise.all([
      Booking.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Booking.countDocuments(),
    ]);
      //  const totalRevenueResult = await Booking.aggregate([
      //     { $match: { status: "success" } },
      //     { $group: { _id: null, total: { $sum: "$amount" } } },
      //   ]);
        // const totalRevenue = totalRevenueResult[0]?.total || 0;
    
    

    return res.status(200).json({
      data: bookings,
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
