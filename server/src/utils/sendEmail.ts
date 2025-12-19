import { sendEmail } from "../config/sendGrid.config";
import { paymentSuccessTemplate } from "../templates/bookings/paymentSuccessful";
import { otpEmailTemplate } from "../templates/auth/otpEmail.template";
import { otpForgotPasswordTemplate } from "../templates/auth/otpForgotPassword.template";
import { newsLetterTemplate } from "../templates/user/newsLetter.template";
import { staffInivitationEmailTemplate } from "../templates/staff/staffInivitationEmail";

export const sendOtpEmail = async (to: string, otp: string, purpose: string) => {
  await sendEmail({
    to,
    subject: `${purpose} Code`,
    html: otpEmailTemplate(otp, purpose),
  });
};

export const sendBookingPaymentEmail = async (
  to: string,
  amount: number,
  sessionType: string
) => {
  await sendEmail({
    to,
    subject: `${sessionType} Session Payment`,
    html: paymentSuccessTemplate({ amount, sessionType }),
  });
};

export const sendOtpForgotPasswordEmail = async (
  to: string,
  otp: string,
  purpose: string
) => {
  await sendEmail({
    to,
    subject: `Password Reset Code`,
    html: otpForgotPasswordTemplate(otp, purpose),
  });
};

export const sendNewsletterEmail = async (to: string,) => {
  await sendEmail({
    to,
    subject: `Newsletter Subscription`,
    html: newsLetterTemplate(),
  })
}



export const sendStaffInivitationEmail = async (
  to: string,
  firstName: string,
  invitationLink: string
) => {
  await sendEmail({
    to,
    subject: `Invitation to Join Momodust Studios Team`,
    html: staffInivitationEmailTemplate({firstName, invitationLink }),
  });
};