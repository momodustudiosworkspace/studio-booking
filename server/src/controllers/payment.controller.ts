import express, { Request, Response } from "express";
// import axios from "axios";
import Payment from "../models/payment.models";
import Booking from "../models/booking.models";
import { bookingNotification } from "../utils/notifications";
import { sendBookingPaymentEmail } from "../utils/sendEmail";

const router = express.Router();


export const createPayment = async (req: Request, res: Response) => {

  const { email,
    amount,
    bookingId,
    reference,
    status } = req.body
  try {
    const payment = await Payment.create({
      email: email,
      booking: bookingId,
      user: req.userId,
      reference,
      amount,
      status: status,
      paidAt: new Date(),
    });

    // ✅ Update the booking with the payment reference if needed
    const findBookingId = await Booking.findByIdAndUpdate(bookingId, {
      paymentStatus: status,
      paymentReference: reference
    });

    if (!findBookingId) {
      return res.status(404).json({ message: "Error occured restart booking" })
    }
    
    if (findBookingId) {
      
      const notification = await bookingNotification({ userId: req.userId, title: `You are booked! ${findBookingId.sessionType} confirmed`, message: `You booking for ${findBookingId.startTime} has been been confirmed!`, type: "payment", bookingId: bookingId })
      console.log(notification);

      await sendBookingPaymentEmail(email,amount, findBookingId.sessionType)
      
    }
    return res.status(201).json({ message: "Payment successful!", data: payment })

  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ success: false, message: "Server error during verification" });
  }
}


export default router;
