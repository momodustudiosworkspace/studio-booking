import express from "express";
import { getBookingSessionPackages } from "../../controllers/user/packages.controllers";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: User Packages
 *   description: Package retrieval endpoints for user bookings
 */

/**
 * @openapi
 * /api/bookings/packages:
 *   post:
 *     summary: Get packages for a specific session
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve all available packages for a selected session type during the booking process
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - session_id
 *             properties:
 *               session_id:
 *                 type: string
 *                 description: The ID of the session type
 *                 example: "60d5ec49c1234567890abcde"
 *     responses:
 *       200:
 *         description: Packages retrieved successfully
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
 *                       title:
 *                         type: string
 *                         example: "Basic Package"
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                         example: 50
 *                       duration:
 *                         type: number
 *                         description: Duration in hours
 *                         example: 2
 *                       session_id:
 *                         type: string
 *                       features:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Basic editing", "Quick delivery"]
 *                       includes:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["1 revision", "Final files"]
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Missing session_id or invalid data
 *       401:
 *         description: Unauthorized - authentication required
 *       404:
 *         description: Session not found or no packages available
 *       500:
 *         description: Server error
 */
router.post("/", getBookingSessionPackages);

export default router;
