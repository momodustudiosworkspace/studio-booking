
import dotenv from "dotenv";
import nodemailer from "nodemailer";


dotenv.config();

export const transporter = nodemailer.createTransport({
    // service: "gmail",
    host: "smtp.gmail.com",
  port: 587,
  secure: false, // Required for Render
  auth: {
    user: process.env["NODE_MAILER_EMAIL_USER"],
    pass: process.env["NODE_MAILER_EMAIL_PASS"],
    },
   tls: {
    rejectUnauthorized: false, // Render-specific fix
  },
});