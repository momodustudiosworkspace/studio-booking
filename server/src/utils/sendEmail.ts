import { paymentSuccessTemplate } from "../templates/bookings/paymentSuccessful";
import { otpEmailTemplate } from "../templates/auth/otpEmail.template";
import { otpForgotPasswordTemplate } from "../templates/auth/otpForgotPassword.template";
import { transporter } from "../config/nodeMailer.config";

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