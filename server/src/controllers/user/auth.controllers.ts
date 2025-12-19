import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import User from "../../models/user.models";
import { sendOtpEmail } from "../../utils/sendEmail";
import Otp from "../../models/otp.models";
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

        await Otp.create({
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
        const { email, name,
            image } = req.body;
        console.log("Google body: ", req.body);
        // Split full name
        let first_name = "";
        let last_name = "";

        if (name) {
            const parts = name.trim().split(" ");
            first_name = parts.shift();         // First element
            last_name = parts.join(" ");        // Remaining elements (handles middle names)
        }


        let user = await User.findOne({ email });
        if (!user) {

            user = await User.create({ email, first_name, last_name, image });
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
export const sendOtp = async (req: Request, res: Response) => {
    const { email, purpose } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate OTP
    const otp = generateOTP();

    // Hash OTP before saving (for security)
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    await Otp.create({
        email: user.email,
        otp: hashedOtp,
        expiresAt,
        purpose: purpose
    })

    // Send OTP to user (email/SMS)
    await sendOtpEmail(user.email, otp, "Password Reset");

    return res.status(201).json({ message: `OTP sent to ${user.email}`, status: 200 })
};


// Verify OTP 
export const verifyOtp = async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    console.log(email,otp);
    

    const user = await User.findOne({ email });
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    console.log("user: ", user);
    console.log("hashedOtp: ", hashedOtp);
    if (!user) return res.status(404).json({ message: "User not found" });


    const otpRecords = await Otp.find({ email })
        .sort({ createdAt: -1 })
        .limit(1);

    const getOTP = otpRecords[0];
    if (!getOTP) {
        return res.status(404).json({ message: "OTP not found." });
    }

    if (getOTP.otp !== hashedOtp) {
        return res.status(400).json({ message: "OTP is invalid." });
    }

    if (getOTP.expiresAt.getTime() < Date.now()) {
        await Otp.deleteMany({ email });
        return res.status(400).json({ message: "OTP has expired." });
    }

    user.isVerified = true;
    await user.save();

    await Otp.deleteMany({ email });

    return res.status(200).json({
        message: "OTP verified successfully",
        status: 200
    });
};

// Update password 
export const upDatePassword = async (req: Request, res: Response) => {
    try {
        const { password, email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash new password
        const passwordHash = await bcrypt.hash(password, 10);

        user.passwordHash = passwordHash;

        // IMPORTANT: Save changes
        await user.save();

        return res.status(200).json({
            message: "Password updated successfully",
            status: 200
        });

    } catch (error) {
        console.error("Password update error:", error);
        return res.status(500).json({ message: "Error updating password" });
    }
};




export default { register, login, googleAuth, sendOtp, verifyOtp, getRefreshAccessToken }