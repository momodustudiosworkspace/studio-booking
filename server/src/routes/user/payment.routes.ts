import express from "express";

import authMiddleWare from "../../middlewares/auth.middleware";
import { createPayment } from "../../controllers/user/payment.controller";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name:  User Payments
 *   description: Payment processing endpoints
 */

/**
 * @openapi
 * /api/payment/create:
 *   post:
 *     summary: Create a payment for booking
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - booking_id
 *               - amount
 *             properties:
 *               booking_id:
 *                 type: string
 *                 description: ID of the booking to pay for
 *                 example: "60d5ec49c1234567890abcde"
 *               amount:
 *                 type: number
 *                 description: Payment amount in currency units
 *                 example: 50.00
 *               payment_method:
 *                 type: string
 *                 enum: [card, paystack, bank_transfer]
 *                 description: Preferred payment method
 *                 example: "paystack"
 *               reference:
 *                 type: string
 *                 description: Unique payment reference
 *                 example: "PAY_12345_BOOKING"
 *     responses:
 *       200:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Payment created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     booking_id:
 *                       type: string
 *                     amount:
 *                       type: number
 *                     status:
 *                       type: string
 *                       enum: [pending, success, failed, cancelled]
 *                     payment_method:
 *                       type: string
 *                     reference:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Missing required fields or invalid data
 *       401:
 *         description: Unauthorized - authentication required
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.post("/create", authMiddleWare, createPayment);

export default router;