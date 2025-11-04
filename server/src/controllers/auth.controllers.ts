import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import User from "../models/user.models";
import { sendOtpEmail } from "../utils/sendEmail";
import Opt from "../models/otp.models";
import { generateOTP } from "../utils/generateOTP";


// register a new user 
export async function register(req: Request, res: Response) {
    try {
        const { first_name, last_name, email, password } = req.body as {
            first_name: string;
            last_name: string;
            email: string;
            password:string
        }


        if (!email || !password) {
           return res.status(400).json({message:"All fields are required"})
        }

        const existingUser = await User.findOne({ email })
        
        if (existingUser) {
            console.log("existing user: ", existingUser);
            
            return res.status(400).json({message:"User already exist."})
        }

    
        const passwordHash = await bcrypt.hash(password, 10)
        const user = await User.create({first_name, last_name, email, passwordHash})
        
        const token = jwt.sign({ userId: String(user._id) }, process.env['JWT_SECRET'] as string, { expiresIn: '7d' })
        return res.status(201).json({message:"User created successfully!",token, user:{id:String(user._id), first_name,last_name,email}})

     
    } catch (error) {
        return res.status(500).json({message:`Server error: ${error}`})
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

    const token = jwt.sign({ userId: String(user._id) }, process.env['JWT_SECRET'] as string, { expiresIn: '7d' })
    return res.json({ message: "Sign In successful", user, token });
     
    } catch (error) {
        return res.status(500).json({message:`Server error: ${error}`})
    }
}


// login user 
export async function login (req: Request, res: Response) {
    try {

        const { email, password } = req.body as { email: string, password: string }
        
        if (!email || !password) {
            return res.status(400).json({message:""})
        }
        
        const user = await User.findOne({ email })
        
        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }
        const passwordValid = await bcrypt.compare(password, user.passwordHash)
        
        if (!passwordValid) {
            return res.status(401).json({message:"Invalid credentials"})
        }
        const token = jwt.sign({ userId: String(user._id) }, process.env['JWT_SECRET'] as string, { expiresIn: '7d' })
        return res.status(200).json({message:"User logged in successfully!",token, user:user})

     
    } catch (error) {
        return res.status(500).json({message:`${error}`})
    }
}

// Generate Auth OTP 
export const sendOPT = async (req: Request, res: Response) => {
  const { email } = req.body;

    const user = await User.findOne({ email });
   
  if (!user) return res.status(404).json({ message: "User not found" });

  // Generate OTP
  const otp = generateOTP();

  // Hash OTP before saving (for security)
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
   
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

   await Opt.create({
     email: user.email,
     otp:hashedOtp,
     expiresAt,
     purpose: "verify_email"
    })

    // Send OTP to user (email/SMS)
    await sendOtpEmail(user.email, otp, "Password Reset");
    
    return res.status(201).json({message:`OTP sent to ${user.email}`})
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
   
    return  res.status(200).json({ message: "OTP verified successfully" }); 
};

export default {register, login, googleAuth}