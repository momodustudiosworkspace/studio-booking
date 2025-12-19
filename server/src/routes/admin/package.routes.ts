import express from "express";
import { createOrUpdatePackage, deletePackage, getAllPackages, getPackage, updatePackage } from "../../controllers/admin/package.controller";
import authMiddleWare from "../../middlewares/auth.middleware";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Admin  Packages
 *   description: Package management endpoints (CRUD)
 */

/**
 * @openapi
 * /api/admin/packages:
 *   post:
 *     summary: Create or update a package
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *               - session_id
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Basic Package"
 *               description:
 *                 type: string
 *                 example: "Perfect for beginners"
 *               price:
 *                 type: number
 *                 example: 50
 *               duration:
 *                 type: number
 *                 description: Duration in hours
 *                 example: 2
 *               session_id:
 *                 type: string
 *                 description: Session type ID
 *                 example: "60d5ec49c1234567890abcde"
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Basic editing", "Quick delivery"]
 *               includes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["1 revision", "Final files"]
 *     responses:
 *       200:
 *         description: Package created or updated successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/", authMiddleWare, createOrUpdatePackage);

/**
 * @openapi
 * /api/admin/packages:
 *   get:
 *     summary: Get all packages with pagination
 *     tags: [Packages]
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
 *         name: session_id
 *         schema:
 *           type: string
 *         description: Filter by session ID
 *     responses:
 *       200:
 *         description: List of packages
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
 *                       price:
 *                         type: number
 *                       duration:
 *                         type: number
 *                       session_id:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", authMiddleWare, getAllPackages);

/**
 * @openapi
 * /api/admin/packages/{id}:
 *   get:
 *     summary: Get a specific package by ID
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *     responses:
 *       200:
 *         description: Package details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       404:
 *         description: Package not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/:id", authMiddleWare, getPackage);

/**
 * @openapi
 * /api/admin/packages/{id}:
 *   put:
 *     summary: Update an existing package
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Premium Package"
 *               description:
 *                 type: string
 *                 example: "For professionals"
 *               price:
 *                 type: number
 *                 example: 150
 *               duration:
 *                 type: number
 *                 example: 4
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *               includes:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Package updated successfully
 *       404:
 *         description: Package not found
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put("/:id", authMiddleWare, updatePackage);

/**
 * @openapi
 * /api/admin/packages/{id}:
 *   delete:
 *     summary: Delete a package
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *     responses:
 *       200:
 *         description: Package deleted successfully
 *       404:
 *         description: Package not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete("/:id", authMiddleWare, deletePackage);

export default router;
