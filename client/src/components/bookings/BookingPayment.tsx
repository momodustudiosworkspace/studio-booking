"use client";
import payStackInline from "@/config/paystackConfig";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { resetBookingState } from "@/redux/slices/bookingSlice";
import { CreatePaymentRequest } from "@/types/payment.types";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { AuthToast } from "../toast/ToastMessage";
import { useCreatePaymentMutation } from "@/redux/services/user/payment/payments.api";

interface BookingPaymentProps {
  setBookingStep: (value: number) => void;
  setPaymentCompleted: (value: string) => void;
}
const BookingPayment = ({
  setBookingStep,
  setPaymentCompleted,
}: BookingPaymentProps) => {
  const { data: session } = useSession();
  const booking = useAppSelector(state => state.booking);
  const dispatch = useAppDispatch();

  const [createPayment, { isLoading: createPaymentLoading }] =
    useCreatePaymentMutation();

  const handlePayment = async () => {
    console.log(session?.user.email);

    try {
      payStackInline.newTransaction({
        key: `${process.env["NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY"]!}`,
        amount: 10000, // you can use booking.package?.price
        email: session?.user.email || "",
        onSuccess: async ({ id, reference, message }) => {
          console.log(id, reference, message);
          setPaymentCompleted(message);
          // setBookingStep(6)

          const payload: CreatePaymentRequest = {
            bookingId: booking.bookingId || null,
            amount: booking.package?.price || null, // you can use booking.package?.price
            email: session?.user.email || null,
            reference: reference,
            status: "success",
          };

          try {
            const response = await createPayment(payload).unwrap();
            const { message: resMsg, data } = response;
            console.log("create payment", resMsg, data);
            toast.success(AuthToast, {
              data: {
                title: "Payment",
                content: `${response.message || "Payment successful!"}`,
              },
              ariaLabel: "Booking session secured",
              icon: false,
              theme: "colored",
            });
            setBookingStep(6);
            dispatch(resetBookingState());
          } catch (error) {
            console.log(error);
          }
        },
        onCancel: () => {
          return;
        },
        onError: ({ type, message }) => {
          toast.error(AuthToast, {
            data: {
              title: type,
              content: `${message || "Payment failed!"}`,
            },
            ariaLabel: "Payment couldn't be made",
            icon: false,
            theme: "colored",
          });
        },
      });

      // 1️⃣ Initialize payment with backend
      // const { accessCode, reference } = await createPayment(payload).unwrap();
      // console.log("💳 AccessCode:", accessCode, "Reference:", reference);

      // if (!accessCode) {
      //     alert("Could not initialize payment");
      //     setLoading(createPaymentLoading);
      //     return;
      // }

      // 2️⃣ Resume Paystack transaction with callback
      // payStackInline.resumeTransaction(accessCode, {
      //     "onSuccess": async (transaction) => {
      //         try {
      //                 // 3️⃣ Verify the transaction on your backend
      //                 const verifyRes = await verifyPayment({
      //                     reference: transaction.reference,
      //                     bookingId: booking.bookingId || null,
      //                 }).unwrap();

      //                 console.log("🔍 Verify result:", verifyRes);

      //                 if (verifyRes?.data) {
      //                     alert("✅ Payment verified successfully!");
      //                     dispatch(resetBookingState());
      //                 } else {
      //                     alert("❌ Payment verification failed.");
      //                 }
      //             } catch (error) {
      //                 console.error("Verification error:", error);
      //                 alert("Verification error");
      //             } finally {
      //                 setLoading(false);
      //             }
      //     },
      //      onCancel: () => {
      //         console.log("🚫 User canceled the transaction");
      //     },
      //     onError: (error) => {
      //         console.log("❌ Paystack error:", error);
      //     },
      // });

      // async (transaction: any) => {
      //     console.log("✅ Transaction completed:", transaction);

      //     try {
      //         // 3️⃣ Verify the transaction on your backend
      //         const verifyRes = await verifyPayment({
      //             reference: transaction.reference,
      //             bookingId: booking.bookingId || null,
      //         }).unwrap();

      //         console.log("🔍 Verify result:", verifyRes);

      //         if (verifyRes?.data) {
      //             alert("✅ Payment verified successfully!");
      //             dispatch(resetBookingState());
      //         } else {
      //             alert("❌ Payment verification failed.");
      //         }
      //     } catch (error) {
      //         console.error("Verification error:", error);
      //         alert("Verification error");
      //     } finally {
      //         setLoading(false);
      //     }
      // }
    } catch (error) {
      console.log("Payment init error:", error);
      alert("Payment initialization failed.");
    }
  };

  return (
    <div>
      <button
        disabled={createPaymentLoading}
        onClick={handlePayment}
        className='rounded-lg bg-green-600 px-4 py-2 text-white'
      >
        {createPaymentLoading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default BookingPayment;
