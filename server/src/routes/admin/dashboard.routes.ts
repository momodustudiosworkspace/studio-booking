import { Router } from "express";
import { getAdminDashboardStats } from "../../controllers/admin/dashboard.controllers";
import authMiddleWare from "../../middlewares/auth.middleware";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Admin Dashboard
 *   description: Admin dashboard statistics and analytics endpoints
 */

/**
 * @openapi
 * /api/admin/dashboard/stats:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve comprehensive dashboard statistics including bookings, revenue, users, and other key metrics
 *     responses:
 *       200:
 *         description: Dashboard statistics fetched successfully
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
 *                   example: "Dashboard statistics fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalBookings:
 *                       type: number
 *                       example: 150
 *                     totalRevenue:
 *                       type: number
 *                       example: 7500.00
 *                     totalUsers:
 *                       type: number
 *                       example: 45
 *                     activeBookings:
 *                       type: number
 *                       example: 25
 *                     completedBookings:
 *                       type: number
 *                       example: 100
 *                     cancelledBookings:
 *                       type: number
 *                       example: 10
 *                     pendingBookings:
 *                       type: number
 *                       example: 15
 *                     totalSessions:
 *                       type: number
 *                       example: 8
 *                     totalPackages:
 *                       type: number
 *                       example: 24
 *                     recentBookings:
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
 *                           price:
 *                             type: number
 *                           status:
 *                             type: string
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *       401:
 *         description: Unauthorized - authentication required
 *       500:
 *         description: Server error
 */
router.get('/stats', authMiddleWare, getAdminDashboardStats);

export default router;