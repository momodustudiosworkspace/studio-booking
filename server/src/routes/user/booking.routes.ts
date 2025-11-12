import express from "express";
import {
  createBooking,
  deleteBooking,
  getBookingById,
  getUserBookings,
  updateBooking,
  bookingImagesUpload,
  uploadBookingImages,
} from "../../controllers/user/booking.controllers";
import authMiddleWare from "../../middlewares/auth.middleware";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Bookings
 *   description: Booking management endpoints (CRUD)
 */

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
router.post("/", authMiddleWare, createBooking);

/**
 * @openapi
 * /api/bookings:
 *   get:
 *     summary: Get all bookings for the authenticated user
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   sessionType:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *                   status:
 *                     type: string
 *                     enum: [pending, confirmed, completed, cancelled]
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", authMiddleWare, getUserBookings);

/**
 * @openapi
 * /api/bookings/{id}:
 *   get:
 *     summary: Get a specific booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking details
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authMiddleWare, getBookingById);

/**
 * @openapi
 * /api/bookings/{id}:
 *   put:
 *     summary: Update an existing booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionType:
 *                 type: string
 *                 example: "Birthday"
 *               date:
 *                 type: string
 *                 example: "2025-12-25"
 *               timeSlot:
 *                 type: string
 *                 example: "2:00 PM - 4:00 PM"
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, completed, cancelled]
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put("/:id", authMiddleWare, updateBooking);

/**
 * @openapi
 * /api/bookings/{id}:
 *   delete:
 *     summary: Delete a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete("/:id", authMiddleWare, deleteBooking);
/**
 * @openapi
 * /api/bookings/{id}:
 *   post:
 *     summary: Uplaod booking images
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/:id", authMiddleWare, uploadBookingImages);
router.post("/:id/upload", authMiddleWare, bookingImagesUpload.array("images", 10), uploadBookingImages);

export default router;
