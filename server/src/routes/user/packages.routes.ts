import express from "express";
import authMiddleWare from "../../middlewares/auth.middleware";
import { getBookingSessionPackages } from "../../controllers/user/packages.controllers";

const router = express.Router();



/**
 * @openapi
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []   # 👈 requires Authorization header
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessionType
 *               - date
 *             properties:
 *               sessionType:
 *                 type: string
 *                 example: "Wedding"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-12-24"
 *               timeSlot:
 *                 type: string
 *                 example: "10:00 AM - 12:00 PM"
 *               notes:
 *                 type: string
 *                 example: "Outdoor shoot at Lekki Beach"
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

router.post("/", authMiddleWare, getBookingSessionPackages);

export default router;
