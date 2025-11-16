import { Router } from "express";
import { register, login, googleAuth, verifyOtp } from "../../controllers/user/auth.controllers";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               -first_name
 *               -last_name
 *               - email
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: test@example.com
 *               last_name:
 *                 type: string
 *                 example: test@example.com
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post("/register", register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful, returns access token
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);


/**
 * @openapi
 * /api/auth/google-login:
 *   post:
 *     summary: Handle Google OAuth login or signup
 *     tags: [Auth]
 *     description: Accepts user data from Google OAuth via NextAuth and creates or logs in a user automatically.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               name:
 *                 type: string
 *                 example: John Doe
 *               image:
 *                 type: string
 *                 example: https://lh3.googleusercontent.com/photo.jpg
 *               provider:
 *                 type: string
 *                 example: google
 *     responses:
 *       200:
 *         description: Login successful
 *       500:
 *         description: Server error
 */
router.post("/google-login", googleAuth);

router.post("/verify-opt", verifyOtp)

export default router;
