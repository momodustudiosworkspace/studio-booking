"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BaseIcons } from "@/assets/icons/BaseIcons";
import ChooseBookingSession from "./ChooseBookingSession";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import BookingsPreview from "./BookingsPreview";
import BookingsLocation from "./BookingsLocation";
import PageMessage from "../PageMessage";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  // resetBookingState,
  setBookingSteps,
  setBookingId,
} from "@/redux/slices/bookingSlice";
import BookingCalendar from "./BookingCalendar";
import { toast } from "react-toastify";
import { AuthToast } from "../toast/ToastMessage";
import { useSession } from "next-auth/react";
import LinkButton from "../ui/LinkButton";
import BookingPackages from "./BookingPackages";
import BookingPayment from "./BookingPayment";
import { BookingTypeResponse } from "@/types/booking.types";
import {
  useCreateBookingMutation,
  useUpdateBookingMutation,
} from "@/redux/services/user/booking/booking.api";

const Bookings = (): React.JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  console.log("session: ", session?.user.email);

  const bookingData = useAppSelector(state => state.booking);

  const [bookingStep, setBookingStep] = useState<number>(
    bookingData.bookingStep || 0
  );
  const [onProceed, setOnProceed] = useState<(() => void) | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState<string>("");
  const [createBooking, { isLoading: createBookingLoading, error, isError }] =
    useCreateBookingMutation();
  const [updateBooking, { isLoading: updateBookingLoading }] =
    useUpdateBookingMutation();

  const proceedBtnRef = useRef<HTMLButtonElement>(null);

  // Booking Steps
  const BOOKING_STEPS: {
    id: number;
    component: React.ReactNode;
    header: string;
    paragraph: string;
  }[] = [
    {
      id: 1,
      component: (
        <ChooseBookingSession
          bookingSession={bookingData.sessionType}
          setBookingStep={setBookingStep}
        />
      ),
      header: "Choose Your Session",
      paragraph: "You can customize details in the next steps",
    },
    {
      id: 2,
      component: (
        <BookingPackages
          bookingPackage={{
            title: bookingData.package?.title || null,
            price: bookingData.package?.price || null,
            sessionId: bookingData.sessionType || null,
          }}
          setBookingStep={setBookingStep}
          // setReserveSlot={values => setReserveSlot({ ...values })}
        />
      ),
      header: `Select from ${bookingData.sessionTitle} packages`,
      paragraph: "We’ll hold your slot while you complete checkout",
    },
    {
      id: 3,
      component: (
        <BookingCalendar
          selectedBookingDate={bookingData.date || null}
          selectedBookingStartTime={bookingData.startTime || null}
          setOnProceed={setOnProceed}
        />
      ),
      header: "reserve a slot",
      paragraph: "We’ll hold your slot while you complete checkout",
    },
    {
      id: 4,
      component: (
        <BookingsLocation
          selectedBookingLocation={bookingData.location}
          selectedDefaultLocation={bookingData.defaultLocation || null}
          setOnProceed={setOnProceed}
        />
      ),
      header: "Choose location",
      paragraph: "We’ll hold your slot while you complete checkout",
    },
    {
      id: 5,
      component: (
        <BookingsPreview
          location={bookingData.location}
          price={bookingData.package?.price}
          sessionTitle={bookingData.sessionTitle}
          proceedBtnRef={proceedBtnRef}
        />
      ),
      header: "preview",
      paragraph: "We’ll hold your slot while you complete checkout",
    },
    {
      id: 6,
      component: (
        <BookingPayment
          setPaymentCompleted={value => setPaymentCompleted(value)}
          setBookingStep={value => setBookingStep(value)}
          // id={boo}
          // location={bookingData.location}
          // price={bookingData.package?.price}
          // sesstionType={bookingData.sessionType}
          // proceedBtnRef={proceedBtnRef}
        />
      ),
      header: "Payment",
      paragraph: "Complete payment to secure booking session.",
    },
    {
      id: 7,
      component: (
        <PageMessage
          status={paymentCompleted ? "success" : "error"}
          messageHeader={
            paymentCompleted && bookingStep === 6
              ? "Booking completed"
              : "Booking failed"
          }
          // Pass error message from server
          messageParagraph={
            paymentCompleted && bookingStep === 6
              ? "You can visit your dashbord to view all bookings"
              : "There was an issue completing your booking."
          }
          btnText={
            paymentCompleted && bookingStep === 6 ? "Go to dashboard" : ""
          }
          href={paymentCompleted && bookingStep === 6 ? "/dashboard" : ""}
        />
      ),
      header: "",
      paragraph: "",
    },
  ];

  const handleBookingStepsProceed = async () => {
    if (!proceedBtnRef.current) {
      return console.log("Clicked not working");
    }

    if (bookingStep === 4) {
      console.log("Submit bookings");

      return await handleBookingSubmit();
    }
    proceedBtnRef.current.onclick = () => {
      console.log("Clicked");
    };

    setBookingStep(prev => prev + 1);

    console.log("handleBookingStepsProceed");
  };

  // Submit booking
  const handleBookingSubmit = async () => {
    try {
      // 👇 Clean & prepare payload
      const payload = {
        // userId: bookingData.userId, // or get from auth slice if available
        date: bookingData.date || null,
        startTime: bookingData.startTime || null,
        studioRoom: bookingData.studioRoom || null,
        sessionType: bookingData.sessionType || null,
        price: bookingData.package?.price || null,
        location: bookingData.location || null,
        sessionTitle: bookingData.sessionTitle || null,
        // notes: bookingData.notes,
      };

      let response: BookingTypeResponse;

      if (bookingData.bookingId) {
        response = await updateBooking({
          id: bookingData.bookingId,
          booking: {
            ...payload,
            _id: bookingData.bookingId,
            user: bookingData.bookingId || null,
          },
        }).unwrap();
      } else {
        // 🔥 Send to backend
        response = await createBooking(payload).unwrap();
      }
      const { booking } = response;

      if (booking._id) {
        toast.success(AuthToast, {
          data: {
            title: "Booking Successfull",
            content: `${response.message || "Booking reserved!"}`,
          },
          ariaLabel: "Booking session secured",
          icon: false,
          theme: "colored",
        });
        dispatch(
          setBookingId({
            bookingId: booking._id,
            package: {
              price: booking?.price || null,
              title: booking.sessionType || null,
            },
          })
        );
        return setBookingStep(prev => prev + 1);
      }

      console.log("Response: ", response.booking);
    } catch (err: any) {
      setBookingStep(prev => prev);
      if (isError) {
        return toast.error(AuthToast, {
          data: {
            title: "Error booking",
            content: `${(error as any)?.data?.message || "Booking failed"}`,
          },
          ariaLabel: "Something went wrong",
          icon: false,
          theme: "colored",
        });
      }
      return toast.error(AuthToast, {
        data: {
          title: "Booking failed",
          content: `${err?.data?.message || "Failed to complete booking"}`,
        },
        ariaLabel: "Something went wrong",
        icon: false,
        theme: "colored",
      });
    }
  };

  // When proceed button is clicked, call the child handler first, then step forward
  const handleProceedClick = useCallback(async () => {
    // if (onProceed && bookingStep > 3) {
    //   console.log("submitting form");

    //   await handlBookingSubmit()
    // }
    if (onProceed) {
      onProceed(); // Call child-specific logic
    } else {
      // fallback
      console.log("No child handler registered");
    }
  }, [onProceed]);

  useEffect(() => {
    const btn = proceedBtnRef.current;
    if (!btn) return;
    btn.addEventListener("click", handleProceedClick);

    return () => btn.removeEventListener("click", handleProceedClick);
  }, [handleProceedClick]);

  useEffect(() => {
    if (bookingStep < 6) {
      dispatch(setBookingSteps({ bookingStep: bookingStep }));
    }
  }, [bookingStep, dispatch]);

  return (
    <section className='flex min-h-screen items-center justify-center px-5'>
      <div className='flex w-full justify-center'>
        <div className='flex w-full justify-center'>
          <div className='mt-20 mb-10 flex flex-col gap-4'>
            {bookingStep !== 6 && (
              <button
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-[#FAFAFA] ${bookingStep === 1 && "mt-32"}`}
                onClick={() => {
                  if (bookingStep === 0) {
                    return router.push("/web");
                  }
                  setBookingStep(prev => prev - 1);
                }}
              >
                <BaseIcons value='arrow-left-black' />
              </button>
            )}
            <div className='mt-5 flex flex-col gap-2 text-white'>
              <h1 className='text-[28px] font-extrabold capitalize'>
                {BOOKING_STEPS[bookingStep]?.header}
              </h1>
              <div className='flex items-center gap-1'>
                <p>{BOOKING_STEPS[bookingStep]?.paragraph}</p>
              </div>
            </div>

            {/* {bookingStep !== null && bookingStep < 2
              ? ""
              : bookingStep === 3 && reserveSlot?.date
                ? reserveSlot.date.toLocaleString()
                : ""} */}

            {BOOKING_STEPS[bookingStep]?.component}

            {bookingStep >= 2 && (
              <div className='mt-4 flex w-full justify-end'>
                {!session?.user.email && bookingStep > 3 ? (
                  <LinkButton
                    href='/auth?redirectTo=bookings'
                    size='md'
                    text='Login to book'
                    icon={<RedirectArrowWhite />}
                    iconPosition='right'
                    className='w-auto shrink-0'
                  />
                ) : (
                  <Button
                    ref={proceedBtnRef}
                    text={"Proceed"}
                    onClick={handleBookingStepsProceed}
                    icon={<RedirectArrowWhite />}
                    iconPosition='right'
                    className='w-[125px]'
                    size='md'
                    loading={createBookingLoading || updateBookingLoading}
                    disabled={createBookingLoading || updateBookingLoading}
                  />
                )}
              </div>
            )}
            {paymentCompleted !== "Approved" && bookingStep > 6 && (
              <div className='flex w-full justify-center'>
                <Button
                  text='Retry booking'
                  onClick={() => setBookingStep(prev => prev - 1)}
                  icon={<RedirectArrowWhite />}
                  // disabled={!values.agree || isSubmitting}
                  iconPosition='right'
                  className='w-[180px]'
                  size='md'
                  // loading={isSubmitting}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bookings;
