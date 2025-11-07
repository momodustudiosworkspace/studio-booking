import express, { Request, Response } from "express";
import axios from "axios";
import Payment from "../models/payment.models";
import Booking from "../models/booking.models";

const router = express.Router();

// Verify Paystack Transaction
export const verifyPayment =  async (req:Request, res:Response) => {
  const { reference, bookingId } = req.body;
  if (!reference || !bookingId) {
    return res.status(400).json({ success: false, message: "Missing reference or bookingId" });
  }

  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env['PAYSTACK_SECRET_KEY']}`,
      },
    });

    const result = response.data;
    if (!result.status) {
      return res.status(400).json({ success: false, message: "Verification failed" });
    }

    const paymentData = result.data;
    const amount = paymentData.amount / 100; // convert back from kobo
    const status = paymentData.status;

    // Create Payment record
    const payment = await Payment.create({
      booking: bookingId,
      reference,
      amount,
      status,
      gateway_response: paymentData.gateway_response,
      paidAt: new Date(paymentData.paidAt),
    });

    // Update booking with payment
    await Booking.findByIdAndUpdate(bookingId, { payment: payment._id });

   return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data: payment,
    });
  } catch (error: any) {
    console.error("Verification error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export default router;
