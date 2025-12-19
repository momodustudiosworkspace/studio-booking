import express from "express"
import { getUsersWithBookingCount } from "../../controllers/admin/users.controllers"
import authMiddleWare from "../../middlewares/auth.middleware"

const router = express.Router()

/**
 * @openapi
 * tags:
 *   name: Admin Users
 *   description: Admin user management and analytics endpoints
 */

/**
 * @openapi
 * /api/admin/users/all:
 *   get:
 *     summary: Get all users with booking statistics
 *     tags: [Admin Users]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve all users with their booking count and profile information
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
 *         description: Number of users per page
 *       - in: query
 *         name: isVerified
 *         schema:
 *           type: boolean
 *         description: Filter users by verification status
 *       - in: query
 *         name: isMember
 *         schema:
 *           type: boolean
 *         description: Filter users by membership status
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search users by name or email
 *     responses:
 *       200:
 *         description: Users retrieved successfully with booking statistics
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
 *                       first_name:
 *                         type: string
 *                       last_name:
 *                         type: string
 *                       email:
 *                         type: string
 *                         format: email
 *                       phoneNumber:
 *                         type: string
 *                       address:
 *                         type: string
 *                       image:
 *                         type: string
 *                       isVerified:
 *                         type: boolean
 *                       isMember:
 *                         type: boolean
 *                       isAdmin:
 *                         type: boolean
 *                       bookingCount:
 *                         type: number
 *                         description: Total number of bookings by the user
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
 *                       description: Total number of users
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
router.get("/all", authMiddleWare, getUsersWithBookingCount)

export default router