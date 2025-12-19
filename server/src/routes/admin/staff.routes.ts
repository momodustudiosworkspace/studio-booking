import express from "express";
import {
  inviteStaff,
  acceptInvitation,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  getStaffStatistics,
  updateStaffAvailability,
  updateStaffPermissions,
} from "../../controllers/admin/staff.controllers";
import authMiddleWare from "../../middlewares/auth.middleware";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Admin Staff Management
 *   description: Staff management endpoints (CRUD, invitations, permissions)
 */

/**
 * @openapi
 * /api/admin/staff/statistics:
 *   get:
 *     summary: Get staff statistics for dashboard
 *     tags: [Staff Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Staff statistics fetched successfully
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
 *                     totalStaff:
 *                       type: number
 *                     activeStaff:
 *                       type: number
 *                     inactiveStaff:
 *                       type: number
 *                     staffByRole:
 *                       type: array
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/statistics", authMiddleWare, getStaffStatistics);

/**
 * @openapi
 * /api/admin/staff/invite:
 *   post:
 *     summary: Send invitation to new staff member
 *     tags: [Staff Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - role
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: "John"
 *               last_name:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               role:
 *                 type: string
 *                 enum: [engineer, photographer, producer, manager, admin]
 *                 example: "photographer"
 *     responses:
 *       200:
 *         description: Invitation sent successfully
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: Staff member already exists
 *       500:
 *         description: Server error
 */
router.post("/invite", authMiddleWare, inviteStaff);

/**
 * @openapi
 * /api/admin/staff/accept-invitation:
 *   post:
 *     summary: Accept staff invitation and complete profile setup
 *     tags: [Staff Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - phoneNumber
 *               - hourly_rate
 *             properties:
 *               token:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               phoneNumber:
 *                 type: string
 *                 example: "+234 816 524 7800"
 *               hourly_rate:
 *                 type: number
 *                 example: 50
 *               specialization:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Wedding Photography", "Portrait"]
 *               bio:
 *                 type: string
 *                 example: "Professional photographer with 5 years experience"
 *     responses:
 *       200:
 *         description: Staff profile created successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Invalid or expired invitation
 *       409:
 *         description: Staff profile already exists
 *       500:
 *         description: Server error
 */
router.post("/accept-invitation", acceptInvitation);

/**
 * @openapi
 * /api/admin/staff:
 *   get:
 *     summary: Get all staff members with pagination
 *     tags: [Staff Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive, suspended]
 *         description: Filter by status
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [engineer, photographer, producer, manager, admin]
 *         description: Filter by role
 *     responses:
 *       200:
 *         description: List of staff members
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
 *                       role:
 *                         type: string
 *                       status:
 *                         type: string
 *                       createdAt:
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
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", authMiddleWare, getAllStaff);

/**
 * @openapi
 * /api/admin/staff/{id}:
 *   get:
 *     summary: Get staff member details by ID
 *     tags: [Staff Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Staff ID
 *     responses:
 *       200:
 *         description: Staff member details
 *       404:
 *         description: Staff member not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/:id", authMiddleWare, getStaffById);

/**
 * @openapi
 * /api/admin/staff/{id}:
 *   put:
 *     summary: Update staff member information
 *     tags: [Staff Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Staff ID
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
 *               role:
 *                 type: string
 *                 enum: [engineer, photographer, producer, manager, admin]
 *               hourly_rate:
 *                 type: number
 *                 example: 50
 *               specialization:
 *                 type: array
 *                 items:
 *                   type: string
 *               bio:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive, suspended]
 *               working_hours:
 *                 type: object
 *                 properties:
 *                   start_time:
 *                     type: string
 *                     example: "09:00"
 *                   end_time:
 *                     type: string
 *                     example: "17:00"
 *     responses:
 *       200:
 *         description: Staff member updated successfully
 *       404:
 *         description: Staff member not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put("/:id", authMiddleWare, updateStaff);

/**
 * @openapi
 * /api/admin/staff/{id}/availability:
 *   put:
 *     summary: Update staff member availability schedule
 *     tags: [Staff Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Staff ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - availability
 *             properties:
 *               availability:
 *                 type: object
 *                 properties:
 *                   monday:
 *                     type: boolean
 *                   tuesday:
 *                     type: boolean
 *                   wednesday:
 *                     type: boolean
 *                   thursday:
 *                     type: boolean
 *                   friday:
 *                     type: boolean
 *                   saturday:
 *                     type: boolean
 *                   sunday:
 *                     type: boolean
 *                 example:
 *                   monday: true
 *                   tuesday: true
 *                   wednesday: true
 *                   thursday: true
 *                   friday: true
 *                   saturday: false
 *                   sunday: false
 *     responses:
 *       200:
 *         description: Staff availability updated successfully
 *       404:
 *         description: Staff member not found
 *       400:
 *         description: Invalid availability data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put("/:id/availability", authMiddleWare, updateStaffAvailability);

/**
 * @openapi
 * /api/admin/staff/{id}/permissions:
 *   put:
 *     summary: Update staff member permissions
 *     tags: [Staff Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Staff ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - permissions
 *             properties:
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "view_bookings"
 *                   - "manage_bookings"
 *                   - "view_payments"
 *                   - "view_reports"
 *     responses:
 *       200:
 *         description: Staff permissions updated successfully
 *       404:
 *         description: Staff member not found
 *       400:
 *         description: Invalid permissions data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put("/:id/permissions", authMiddleWare, updateStaffPermissions);

/**
 * @openapi
 * /api/admin/staff/{id}:
 *   delete:
 *     summary: Deactivate a staff member (soft delete)
 *     tags: [Staff Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Staff ID
 *     responses:
 *       200:
 *         description: Staff member deactivated successfully
 *       404:
 *         description: Staff member not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete("/:id", authMiddleWare, deleteStaff);

export default router;
