import { paymentSuccessTemplate } from "../templates/bookings/paymentSuccessful";
import { otpEmailTemplate } from "../templates/auth/otpEmail.template";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { otpForgotPasswordTemplate } from "../templates/auth/otpForgotPassword.template";
// sgMail.setApiKey(process.env['SENDGRID_API_KEY']!);

// export const sendOtpEmail = async (to:string, otp:string, purpose:string = "Verification") => {
//   const msg = {
//     to,
//     from: process.env['FROM_EMAIL']!,
//     subject: `${purpose} Code`,
//     html: otpEmailTemplate(otp, purpose),
//   };

//   await sgMail.send(msg);
// };



dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env["NODE_MAILER_EMAIL_USER"],
    pass: process.env["NODE_MAILER_EMAIL_PASS"],
  },
});

export const sendOtpEmail = async (to:string, otp:string, purpose:string) => {
  await transporter.sendMail({
    from: `"Booking System" <${process.env["NODE_MAILER_EMAIL_USER"]}>`,
    to,
    subject: `${purpose} Code`,
    html: otpEmailTemplate(otp, purpose),
  });
};

export const sendBookingPaymentEmail = async (to: string,amount:number, sessionType: string) => {
   await transporter.sendMail({
    from: `"Booking System" <${process.env["NODE_MAILER_EMAIL_USER"]}>`,
    to,
    subject: `${sessionType} session Payment`,
    html: paymentSuccessTemplate({amount:amount, sessionType:sessionType}),
  });
}
export const sendOtpForgotPasswordEmail = async (to:string, otp:string, purpose:string) => {
   await transporter.sendMail({
    from: `"Booking System" <${process.env["NODE_MAILER_EMAIL_USER"]}>`,
    to,
    subject: `Password reset code`,
    html: otpForgotPasswordTemplate(otp, purpose),
  });
}