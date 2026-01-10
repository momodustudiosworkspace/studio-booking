"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { resetBookingState } from "@/redux/slices/bookingSlice";
import { useSession } from "next-auth/react";
import { useState } from "react";
// import { toast } from "react-toastify";
// import { AuthToast } from "../toast/ToastMessage";
// import { useInitiateMoniepointPaymentMutation } from "@/redux/services/user/payment/payments.api";

interface BookingPaymentProps {
  setBookingStep: (value: number) => void;
  setPaymentCompleted: (value: string) => void;
}

const BookingPayment = ({
  setBookingStep,
  setPaymentCompleted,
}: BookingPaymentProps) => {
  const { data: session } = useSession();
  console.log(session);
  const dispatch = useAppDispatch();

  const booking = useAppSelector(state => state.booking);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      // Revert the "Copied!" status after a few seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // const [initiatePayment, { isLoading }] =
  //   useInitiateMoniepointPaymentMutation();

  const handlePayment = async () => {
    try {
      if (!booking.bookingId || !booking.package?.price) {
        console.log("Missing booking data");
        return;
      }

      // const payload = {
      //   bookingId: booking.bookingId,
      //   amount: booking.package.price,
      // };

      // const response = await fetch(
      //   "http://localhost:5000/webhooks/moniepoint",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(payload),
      //   }
      // );

      // const data = await response.json();
      // console.log("Backend response:", data);
      dispatch(resetBookingState())
      setBookingStep(6)
      setPaymentCompleted("true")

    } catch (error) {
      console.error("Frontend send error:", error);
    }
  };


  return (
    <div className="">
      <div className="bg-white rounded-2xl p-6">
        {/* <p>Make payment to the account details below:</p>  */}
        <ul className="mb-4">
          <li><strong>Bank name </strong>: Zenith Bank</li>
          <li><strong>Account number</strong>: 1218811149 <button className="border-gray-500 border-[1px] rounded px-2 py-1 ml-2 text-gray-500 text-sm" onClick={() => handleCopy("1218811149")}>{isCopied ? 'Copied! 🎉' : 'Copy'}</button></li>
          <li><strong>Account name</strong>: Momodu Studios Venture Limited</li>
        </ul>
        <hr />
        <div className="mt-10">
          <p><small>After payment, click the button below to confirm payment.</small></p>
          <button onClick={handlePayment} className="rounded-lg bg-green-600 px-4 py-2 text-white mt-3">Payment made</button>
        </div>
        {/* <button */}
        {/* disabled={isLoading}  */}
        {/* onClick={handlePayment}
          className="rounded-lg bg-green-600 px-4 py-2 text-white"
        > */}
        {/* {isLoading ? "Redirecting..." : "Pay Now"}  */}

        {/* </button> */}
      </div>
    </div>
  );
};

export default BookingPayment;
