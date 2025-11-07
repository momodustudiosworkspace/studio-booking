"use client";
import payStackInline from "@/config/paystackConfig";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useCreatePaymentMutation, } from "@/redux/services/payment/payments.api";
import { resetBookingState } from "@/redux/slices/bookingSlice";
import { CreatePaymentRequest } from "@/types/payment.types";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface BookingPaymentProps{
    setBookingStep: (value: number) => void;
    setPaymentCompleted: (value: string) => void

}
const BookingPayment = ({ setBookingStep, setPaymentCompleted }: BookingPaymentProps ) => {
    const { data: session } = useSession();
    const booking = useAppSelector((state) => state.booking);
    const dispatch = useAppDispatch();

    const [createPayment, { isLoading: createPaymentLoading }] = useCreatePaymentMutation();
   
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(createPaymentLoading);
        try {
          

            payStackInline.newTransaction({
                key: "pk_test_b62520cb727dcbf49136dd5403536139a32054a7",
                amount: 10000, // you can use booking.package?.price
                email: session?.user.email || "",
                onSuccess: async ({id, reference, message}) => {
                    console.log(id, reference, message);
                    setPaymentCompleted(message)
                    setBookingStep(6)


                    const payload: CreatePaymentRequest = {
                        bookingId: booking.bookingId || null,
                        amount: booking.package?.price || null, // you can use booking.package?.price
                        email: session?.user.email || null,
                        reference: reference,
                        status: "success"
                    };

                    const response = await createPayment(payload).unwrap();
                    const { message : resMsg, data } = response
                    console.log(resMsg, data);
                    
                    dispatch(resetBookingState());
                }
            })

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
            console.error("Payment init error:", error);
            alert("Payment initialization failed.");
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                disabled={loading}
                onClick={handlePayment}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </div>
    );
};

export default BookingPayment;
