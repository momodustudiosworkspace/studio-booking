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
import { setBookingSteps } from "@/redux/slices/bookingSlice";
import BookingCalendar from "./BookingCalendar";
import { useCreateBookingMutation } from "@/redux/services/booking/booking.api";
import { toast } from "react-toastify";
import { AuthToast } from "../toast/ToastMessage";
import { useSession } from "next-auth/react";
import LinkButton from "../ui/LinkButton";
import BookingPackages from "./BookingPackages";

const Bookings = (): React.JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const { data: session } = useSession()

  const selectbookingStep = useAppSelector((state => state.booking.bookingStep))
  const bookingData = useAppSelector((state => state.booking))
  const bookingSession = useAppSelector((state) => state.booking.sessionType)

  const [bookingStep, setBookingStep] = useState<number>(selectbookingStep || 0);
  const [onProceed, setOnProceed] = useState<(() => void) | null>(null);
  const [createBooking, { isLoading, isSuccess, isError, error }] = useCreateBookingMutation();

  const proceedBtnRef = useRef<HTMLButtonElement>(null);






  // const [reserveSlot, setReserveSlot] = useState<{
  //   date: Date | null;
  //   time: Date | null;
  // }>({
  //   date: null,
  //   time: null,
  // });




  // Booking Steps 
  const BOOKING_STEPS: {
    id: number;
    component: React.ReactNode;
    header: string;
    paragraph: string;
  }[] = [
    {
      id: 1,
      component: <ChooseBookingSession bookingSession={bookingData.sessionType} />,
      header: "Choose Your Session",
      paragraph: "You can customize details in the next steps",
    },
    {
      id: 2,
      component: (
          <BookingPackages
            bookingPackage={bookingData.package}
            setOnProceed={setOnProceed}
          // setReserveSlot={values => setReserveSlot({ ...values })}
          />
        ),
        header: `Select from ${bookingSession} packages`,
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
          sesstionType={bookingData.sessionType}
          proceedBtnRef={proceedBtnRef}

        />
      ),
      header: "preview",
      paragraph: "We’ll hold your slot while you complete checkout",
    },
    {
      id: 6,
      component: (
        <PageMessage
          status={"success"}
          messageHeader={"Booking completed"}
          messageParagraph={"You can visit your dashbord to view all bookings"}
          btnText={"Go to dashboard"}
          href={"/dashboard"}
        />
      ),
      header: "",
      paragraph: "",
    },
    ];




  const handleBookingStepsProceed = async () => {
    if (!proceedBtnRef.current) {
      return console.log("Clicked not working");

    };

    if (bookingStep === 4) {

      console.log("Submit bookings");

      return await handlBookingSubmit()
    }
    proceedBtnRef.current.onclick = () => {
      // hiddenSubmitRef.current?.click();

      console.log("Clicked");

    };


    setBookingStep(prev => prev + 1)

    console.log("handleBookingStepsProceed");




  };

  // Submit booking 
  const handlBookingSubmit = async () => {
    try {
      // 👇 Clean & prepare payload
      const payload = {
        // userId: bookingData.userId, // or get from auth slice if available
        date: bookingData.date || null,
        startTime: bookingData.startTime || null,
        studioRoom: bookingData.studioRoom || null,
        sessionType: bookingData.sessionType || null,
        price: 25000,
  // notes: bookingData.notes,
      };

      // 🔥 Send to backend
      const response = await createBooking(payload).unwrap();


      if (isError) {

        return toast.error(AuthToast, {
          data: {
            title: "Error booking",
            content: `${(error as any)?.data?.message || "Login failed"}`,
          },
          ariaLabel: "Something went wrong",
          icon: false,
          theme: "colored",
        });
      }

      console.log("✅ Booking created:", response);

      return alert("Booking created successfully!");

    } catch (err: any) {
      setBookingStep(prev => prev)
      return toast.error(AuthToast, {
        data: {
          title: "Booking failed",
          content: `${err?.data?.message || "User not logged in"}`,
        },
        ariaLabel: "Something went wrong",
        icon: false,
        theme: "colored",
      });
    }
  }

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


  useEffect(() => { dispatch(setBookingSteps({ bookingStep: bookingStep })) }, [bookingStep, dispatch])
  return (
    <section className='flex items-center justify-center px-5 min-h-screen'>
      <div className='w-full flex justify-center'>
        <div className="w-full flex justify-center">


          <div className='mt-20 mb-10 flex flex-col gap-4'>
            <button
              className='flex h-10 w-10 items-center justify-center rounded-full bg-[#FAFAFA]'
              onClick={() => {
                if (bookingStep === 0) {
                  return router.push("/web");
                }
                setBookingStep(prev => prev - 1);
              }}
            >
              <BaseIcons value='arrow-left-black' />
            </button>
            <div className='mt-5 flex flex-col gap-2'>
              {isSuccess && <p className="text-green-600">Booking successfully created!</p>}
              <h1 className='text-[28px] font-extrabold capitalize'>
                {BOOKING_STEPS[bookingStep]?.header}
              </h1>
              <div className='flex items-center gap-1'>
                <p>{BOOKING_STEPS[bookingStep]?.paragraph}</p>
              </div>
            </div>
            {bookingStep}


            {/* {bookingStep !== null && bookingStep < 2
              ? ""
              : bookingStep === 3 && reserveSlot?.date
                ? reserveSlot.date.toLocaleString()
                : ""} */}

            {BOOKING_STEPS[bookingStep]?.component}
            {bookingStep !== 5 && (
              <div className='flex w-full mt-4 justify-end'>
                {!session && bookingStep === 4 ? <LinkButton
                  href='/auth?redirectTo=/bookings'


                  size='md'
                  text='Login to book'
                  icon={<RedirectArrowWhite />}
                  iconPosition='right'
                  className='w-auto shrink-0'
                /> : <Button
                  ref={proceedBtnRef}
                    text={'Proceed'}
                  onClick={handleBookingStepsProceed}
                  icon={<RedirectArrowWhite />}
                  iconPosition='right'
                  className='w-[125px]'
                  size='md'
                  loading={isLoading}
                />}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Bookings;
