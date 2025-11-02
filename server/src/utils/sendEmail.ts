import { otpEmailTemplate } from "../templates/otpEmail.template";
import nodemailer from "nodemailer";

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