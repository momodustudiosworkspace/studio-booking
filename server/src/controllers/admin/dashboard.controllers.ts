import { Request, Response } from "express";
import Booking from "../../models/booking.models";
import Payment from "../../models/payment.models";
import User from "../../models/user.models";


export const getAdminDashboardStats = async (_req: Request, res: Response) => {
  console.log("got here");
  
  try {
    // Run all counts in parallel (faster)
    const [totalBookings, totalPayments, totalClients] = await Promise.all([
      Booking.countDocuments(),
      Payment.countDocuments(),
      User.countDocuments(), // adjust field if needed
    ]);

   

    // Optional: add other stats (e.g., total revenue)
    const totalRevenueResult = await Payment.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalRevenue = totalRevenueResult[0]?.total || 0;


    return res.status(200).json({
      message: "Data successfull",
      data: {
        totalBookings,
        totalPayments,
        totalClients,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching dashboard stats:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching dashboard stats",
    });
  }
};

