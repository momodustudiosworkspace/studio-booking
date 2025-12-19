import express from "express"
import { getAllPayment, getPaymentbyId } from "../../controllers/admin/payment.controllers"
import authMiddleWare from "../../middlewares/auth.middleware"

const router = express.Router()

/**
 * @openapi
 * tags:
 *   name: Admin Payments
 *   description: Admin payment management and analytics endpoints
 */

/**
 * @openapi
 * /api/admin/payments/all:
 *   get:
 *     summary: Get all payments with pagination
 *     tags: [Admin Payments]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve all payments with pagination and filtering options
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 10
 *         description: Number of payments per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, success, failed, refunded]
 *         description: Filter payments by status
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter payments from this date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter payments until this date
 *     responses:
 *       200:
 *         description: Payments retrieved successfully
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
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       booking_id:
 *                         type: string
 *                       user_id:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       currency:
 *                         type: string
 *                         example: "NGN"
 *                       status:
 *                         type: string
 *                         enum: [pending, success, failed, refunded]
 *                       payment_method:
 *                         type: string
 *                         example: "paystack"
 *                       reference:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                     page:
 *                       type: number
 *                     limit:
 *                       type: number
 *                     totalPages:
 *                       type: number
 *       401:
 *         description: Unauthorized - authentication required
 *       500:
 *         description: Server error
 */
router.get("/all", authMiddleWare, getAllPayment)

/**
 * @openapi
 * /api/admin/payments/{id}:
 *   get:
 *     summary: Get a specific payment by ID
 *     tags: [Admin Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment details fetched successfully
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     booking_id:
 *                       type: string
 *                     user_id:
 *                       type: string
 *                     amount:
 *                       type: number
 *                     currency:
 *                       type: string
 *                     status:
 *                       type: string
 *                       enum: [pending, success, failed, refunded]
 *                     payment_method:
 *                       type: string
 *                     reference:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized - authentication required
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */
router.get("/:id", authMiddleWare, getPaymentbyId)

export default router