import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import User from "../../models/user.models";
import { sendOtpEmail } from "../../utils/sendEmail";
import Opt from "../../models/otp.models";
import { generateOTP } from "../../utils/generateOTP";
import { generateAuthTokens } from "../../utils/generateAuthToken";


// register a new user 
export async function register(req: Request, res: Response) {
    try {
        const { first_name, last_name, email, password } = req.body as {
            first_name: string;
            last_name: string;
            email: string;
            password: string
        }


        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            console.log("existing user: ", existingUser);

            return res.status(400).json({ message: "User already exist." })
        }


        const passwordHash = await bcrypt.hash(password, 10)



        const user = await User.create({ first_name, last_name, email, passwordHash })
        const otp = generateOTP()


        // Hash OTP before saving (for security)
        const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

        const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        await Opt.create({
            email: user.email,
            otp: hashedOtp,
            expiresAt,
            purpose: "user_registration"
        })

        // Send OTP to user (email/SMS)
        await sendOtpEmail(email, otp, "User account creation");
        // const { accessToken, refreshAccessToken } = generateAuthTokens(user.id)
        // return res.status(201).json({ message: "User created successfully!", accessToken: accessToken, refreshToken: refreshAccessToken, user: { id: String(user._id), first_name, last_name, email } })
        return res.status(201).json({ message: "User created successfully!", user: { id: String(user._id), password, email } })

    } catch (error) {
        return res.status(500).json({ message: `Server error: ${error}` })
    }
}

// Google auth 
export async function googleAuth(req: Request, res: Response) {
    try {
        const { email, name } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ email, name });
        }


        const { accessToken, refreshAccessToken } = generateAuthTokens(user.id)
        return res.json({ message: "Sign In successful", user, accessToken: accessToken, refreshToken: refreshAccessToken });

    } catch (error) {
        return res.status(500).json({ message: `Server error: ${error}` })
    }
}

// login user 
export async function login(req: Request, res: Response) {
    try {

        const { email, password } = req.body as { email: string, password: string }

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }
        const passwordValid = await bcrypt.compare(password, user.passwordHash)

        if (!passwordValid || !user.passwordHash) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const { accessToken, refreshAccessToken } = generateAuthTokens(user.id)
        return res.json({ message: "User logged in successfully!", user, accessToken: accessToken, refreshToken: refreshAccessToken });


    } catch (error) {
        return res.status(500).json({ message: `Sign In failed, please try again.` })
    }
}
// Refresh toekn user 
export async function getRefreshAccessToken(req: Request, res: Response) {
    const { refreshToken } = req.body;

    if (!refreshToken)
        return res.status(401).json({ message: "No refresh token provided" });

    try {
        // ✅ Verify refresh token
        const decoded = jwt.verify(
            refreshToken,
            process.env["JWT_REFRESH_SECRET"] as string
        ) as { userId: string };

        // ✅ Issue new access token
        const { accessToken, refreshAccessToken } = generateAuthTokens(decoded.userId);

        return res.json({ accessToken: accessToken, refreshToken: refreshAccessToken });
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
}

// Generate Auth OTP 
export const sendOPT = async (req: Request, res: Response) => {
    const { email, purpose } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate OTP
    const otp = generateOTP();

    // Hash OTP before saving (for security)
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    await Opt.create({
        email: user.email,
        otp: hashedOtp,
        expiresAt,
        purpose: purpose
    })

    // Send OTP to user (email/SMS)
    await sendOtpEmail(user.email, otp, "Password Reset");

    return res.status(201).json({ message: `OTP sent to ${user.email}` })
};


// Verify OTP 
export const verifyOtp = async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    const getOTP = await Opt.findOne({ email });

    if (getOTP?.otp !== hashedOtp) {
        return res.status(404).json({ message: "OTP is invalid." });
    }
    if (getOTP.expiresAt.getTime() < Date.now()) {
        return res.status(404).json({ message: "OTP has expired." });
    }
    user.isVerified = true

    await user.save()

    return res.status(200).json({ message: "OTP verified successfully" });
};

export default { register, login, googleAuth, sendOPT, verifyOtp, getRefreshAccessToken }