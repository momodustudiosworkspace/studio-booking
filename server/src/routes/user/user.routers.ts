import { Router } from "express";
import { getUserProfile, sendUserSubscriptionEmail, updateUserProfile } from "../../controllers/user/user.controllers";
import authMiddleWare from "../../middlewares/auth.middleware";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: User Profile
 *   description: User profile management endpoints
 */

/**
 * @openapi
 * /api/user:
 *   get:
 *     summary: Get authenticated user profile
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
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
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     first_name:
 *                       type: string
 *                     last_name:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 *                     phoneNumber:
 *                       type: string
 *                     address:
 *                       type: string
 *                     image:
 *                       type: string
 *                     isVerified:
 *                       type: boolean
 *                     isMember:
 *                       type: boolean
 *                     isAdmin:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                 stats:
 *                   type: object
 *                   properties:
 *                     totalBookings:
 *                       type: number
 *                     totalCompleted:
 *                       type: number
 *                     totalPending:
 *                       type: number
 *                     totalCancelled:
 *                       type: number
 *       401:
 *         description: Unauthorized - authentication required
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/", authMiddleWare, getUserProfile);

/**
 * @openapi
 * /api/user:
 *   put:
 *     summary: Update authenticated user profile
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: "John"
 *               last_name:
 *                 type: string
 *                 example: "Doe"
 *               phoneNumber:
 *                 type: string
 *                 example: "+234 816 524 7800"
 *               address:
 *                 type: string
 *                 example: "123 Main Street, Lagos, Nigeria"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email cannot be changed (read-only)
 *                 example: "john@example.com"
 *     responses:
 *       200:
 *         description: User profile updated successfully
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
 *                   example: "Profile updated successfully"
 *                 user:
 *                   type: object
 *       400:
 *         description: Invalid data or missing required fields
 *       401:
 *         description: Unauthorized - authentication required
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put("/", authMiddleWare, updateUserProfile);

/**
 * @openapi
 * /api/user/send/newsletter:
 *   post:
 *     summary: Subscribe to newsletter
 *     tags: [User Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Newsletter subscription successful
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
 *                   example: "Newsletter email sent successfully"
 *       400:
 *         description: Missing email or invalid format
 *       500:
 *         description: Server error - failed to send email
 */
router.post("/send/newsletter", sendUserSubscriptionEmail);

export default router;