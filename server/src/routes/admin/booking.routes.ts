import express from "express";
import { assignStaffToBooking, getAllUserBookings, removeStaffFromBooking } from "../../controllers/admin/booking.controllers";
import authMiddleWare from "../../middlewares/auth.middleware";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Admin Bookings
 *   description: Admin booking management and analytics endpoints
 */

/**
 * @openapi
 * /api/admin/bookings/all:
 *   get:
 *     summary: Get all bookings with pagination and analytics
 *     tags: [Admin Bookings]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve all bookings with pagination, total revenue, and booking metrics
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
 *         description: Number of bookings per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, confirmed, completed, cancelled]
 *         description: Filter bookings by status
 *       - in: query
 *         name: session
 *         schema:
 *           type: string
 *         description: Filter bookings by session type
 *     responses:
 *       200:
 *         description: Bookings retrieved successfully with analytics
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
 *                     bookings:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           user_fullnames:
 *                             type: string
 *                           sessionTitle:
 *                             type: string
 *                           sessionType:
 *                             type: string
 *                           date:
 *                             type: string
 *                             format: date
 *                           startTime:
 *                             type: string
 *                             format: date-time
 *                           price:
 *                             type: number
 *                           status:
 *                             type: string
 *                             enum: [pending, confirmed, completed, cancelled]
 *                           paymentStatus:
 *                             type: string
 *                             enum: [pending, paid, refunded]
 *                           location:
 *                             type: object
 *                             properties:
 *                               state:
 *                                 type: string
 *                               address:
 *                                 type: string
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                     totalRevenue:
 *                       type: number
 *                       description: Total revenue from paid bookings
 *                       example: 15000.00
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       description: Total number of bookings
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
router.get("/all", authMiddleWare, getAllUserBookings);

router.patch("/:id/assign-staff", authMiddleWare, assignStaffToBooking);
router.patch( "/:id/remove-staff",authMiddleWare, removeStaffFromBooking);

export default router;
