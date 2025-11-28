import { Request, Response } from "express";
import Payment from "../../models/payment.models";



// Get all bookings 
export const getAllPayment = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query["page"] as string) || 1;
    const limit = parseInt(req.query["limit"] as string) || 10;
    const skip = (page - 1) * limit;

    // ----- TODAYS DATE RANGE -----
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // ----- PARALLEL DB QUERIES -----
    const [
      paginatedPayments,
      totalPayments,
      statusCounts,
      todayPayments,
      pendingBalanceAgg,
      totalAmountAgg
    ] = await Promise.all([
      // Paginated Payments
      Payment.find().populate("user", "first_name last_name").sort({ createdAt: -1 }).skip(skip).limit(limit),

      // Total count for pagination
      Payment.countDocuments(),

      // Count by status
      Payment.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } }
      ]),

      // All payments created today
      Payment.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfToday, $lte: endOfToday },
            status: "success" // optional: sum only successful payments
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" }
          }
        }
      ]),

      // Pending balance
      Payment.aggregate([
        { $match: { status: "pending" } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      // Total payment amount
      Payment.aggregate([
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ])
    ]);

    const totalPayment = totalAmountAgg[0]?.total || 0;
    const todaysRevenue = todayPayments[0]?.total || 0;
    const balance = pendingBalanceAgg[0]?.total || 0;



    return res.status(200).json({
      data: paginatedPayments,

      stats: {
        byStatus: {
          pending: statusCounts.find(s => s._id === "pending")?.count || 0,
          success: statusCounts.find(s => s._id === "success")?.count || 0,
          failed: statusCounts.find(s => s._id === "failed")?.count || 0,
        },

      },
      totalPayment: totalPayment,
      todaysRevenue: todaysRevenue,
      balance: balance,

      pagination: {
        total: totalPayments,
        page,
        limit,
        totalPages: Math.ceil(totalPayments / limit)
      },
    });
  } catch (error) {
    console.error("❌ Error fetching payments:", error);
    return res.status(500).json({ message: "Failed to fetch payments" });
  }
};


// Get single booking
export const getPaymentbyId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Fetch bookings with pagination

    const payment = await Payment.findById(id)
    return res.status(200).json({
      data: payment,
    });
  } catch (error) {
    console.error("❌ Error fetching paginated bookings:", error);
    return res.status(500).json({ message: "Failed to fetch bookings" });
  }
}
