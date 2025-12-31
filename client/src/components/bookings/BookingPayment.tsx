"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { resetBookingState } from "@/redux/slices/bookingSlice";
import { useSession } from "next-auth/react";
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

  const booking = useAppSelector(state => state.booking);
  const dispatch = useAppDispatch();

  // const [initiatePayment, { isLoading }] =
  //   useInitiateMoniepointPaymentMutation();

  const handlePayment = async () => {
    try {
      if (!booking.bookingId || !booking.package?.price) {
        console.log("Missing booking data");
        return;
      }

      const payload = {
        bookingId: booking.bookingId,
        amount: booking.package.price,
      };

      const response = await fetch(
        "http://localhost:5000/webhooks/moniepoint",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("Backend response:", data);
      dispatch(resetBookingState())
      setBookingStep(6)
      setPaymentCompleted("true")

    } catch (error) {
      console.error("Frontend send error:", error);
    }
  };


  return (
    <div>
      <button
        // disabled={isLoading} 
        onClick={handlePayment}
        className="rounded-lg bg-green-600 px-4 py-2 text-white"
      >
        {/* {isLoading ? "Redirecting..." : "Pay Now"}  */} Pay now
      </button>
    </div>
  );
};

export default BookingPayment;
