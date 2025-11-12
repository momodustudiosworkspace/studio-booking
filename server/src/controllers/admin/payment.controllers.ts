import { Request, Response } from "express";
import Payment from "../../models/payment.models";



// Get all bookings 
export const getAllPayment = async (req: Request, res: Response)=> {
  try {
    const page = parseInt(req.query['page'] as string)|| 1;
    const limit =  parseInt(req.query['limit'] as string) || 10;
    const skip = (page - 1) * limit;

    // Fetch bookings with pagination
    const [bookings, total] = await Promise.all([
      Payment.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Payment.countDocuments(),
    ]);

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
// Get single booking
export const getPaymentbyId = async (req: Request, res: Response)=> {
  try {
     const { id } = req.params;

    // Fetch bookings with pagination
   
const payment = await Payment.findById(id)
    return res.status(200).json({
      data: payment,
    });
  } catch (error) {
    console.error("❌ Error fetching paginated bookings:", error);
   return  res.status(500).json({ message: "Failed to fetch bookings" });
  }
}
