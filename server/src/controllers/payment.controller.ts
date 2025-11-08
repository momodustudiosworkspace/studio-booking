import express, { Request, Response } from "express";
// import axios from "axios";
import Payment from "../models/payment.models";
import Booking from "../models/booking.models";

const router = express.Router();


// init payment 

// export const initPayment =  async (req: Request, res: Response) => {
//    const { amount, email, bookingId } = req.body;

//   try {
//     const response = await axios.post(
//       `${process.env['PAYSTACK_BASE_API_URL']}/initialize`,
//       {
//         amount: amount * 100, // kobo
//         email,
//         metadata: { bookingId },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env["PAYSTACK_SECRET_KEY"]}`,
//         },
//       }
//     );

//     const { access_code, reference } = response.data.data;

//     return res.status(201).json({message:"Payment initiated successfully!", accessCode: access_code, reference });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Payment initialization failed" });
//   }
// }

// // Verify Paystack Transaction
// export const verifyPayment = async (req: Request, res: Response) => {
//   const { reference, bookingId } = req.body;

//   if (!reference || !bookingId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Missing reference or bookingId" });
//   }

//   try {
//     // ✅ Verify the transaction with Paystack
//     const response = await axios.get(
//       `${process.env['PAYSTACK_BASE_API_URL']}/verify/${reference}`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env["PAYSTACK_SECRET_KEY"]}`,
//         },
//       }
//     );

//     const result = response.data;
//     if (!result.status) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Verification failed" });
//     }

//     const paymentData = result.data;
//     const amount = paymentData.amount / 100; // convert from kobo to naira
//     const status = paymentData.status;

//      const payment = await Payment.create({
//       booking: bookingId,
//       user:req.userId,
//       reference,
//       amount,
//        status: status,
//     
//           paidAt: new Date(paymentData.paidAt),
//     });

//     // ✅ Update the booking with the payment reference if needed
//     await Booking.findByIdAndUpdate(bookingId, {
//       paymentReference: reference,
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Payment verified successfully",
//       data: payment,
//     });
//   } catch (error: any) {
//     console.error("Verification error:", error.message);
//     return res
//       .status(500)
//       .json({ success: false, message: "Server error during verification" });
//   }
// };

export const createPayment = async (req: Request, res: Response) => {

  const {email,
amount,
bookingId,
reference,
status } = req.body
  try {
    const payment = await Payment.create({
       email:email,
      booking: bookingId,
      user:req.userId,
      reference,
      amount,
      status: status,
      paidAt: new Date(),
    });

     // ✅ Update the booking with the payment reference if needed
    await Booking.findByIdAndUpdate(bookingId, {
      paymentStatus: status,
      paymentReference: reference
    });

    return res.status(201).json({message:"Payment successful", data: payment})

  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error during verification" });
  }
}


export default router;
