"use client";
import React, { useEffect, useRef, useState } from "react";
import { BaseIcons } from "@/assets/icons/BaseIcons";
import ChooseBookingSession from "./ChooseBookingSession";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import ReserveSlot from "./ReserveSlot";
import BookingsPreview from "./BookingsPreview";
import BookingsLocation from "./BookingsLocation";
import PageMessage from "../PageMessage";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { bookingSteps } from "@/redux/slices/bookingSlice";

const Bookings = (): React.JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const selectbookingStep = useAppSelector((state => state.booking.bookingStep))
  const [bookingStep, setBookingStep] = useState<number>(selectbookingStep || 0);
  const proceedBtnRef = useRef<HTMLButtonElement>(null);




  // const [reserveSlot, setReserveSlot] = useState<{
  //   date: Date | null;
  //   time: Date | null;
  // }>({
  //   date: null,
  //   time: null,
  // });



  const BOOKING_STEPS: {
    id: number;
    component: React.ReactNode;
    header: string;
    paragraph: string;
  }[] = [
    {
      id: 1,
      component: <ChooseBookingSession />,
      header: "Choose Your Session",
      paragraph: "You can customize details in the next steps",
    },
    {
      id: 2,
      component: (
        <ReserveSlot
          proceedBtnRef={proceedBtnRef}
          // setReserveSlot={values => setReserveSlot({ ...values })}
        />
      ),
      header: "reserve a slot",
      paragraph: "We’ll hold your slot while you complete checkout",
    },
    {
      id: 3,
      component: (
        <BookingsLocation
          proceedBtnRef={proceedBtnRef}

        />
      ),
      header: "Choose location",
      paragraph: "We’ll hold your slot while you complete checkout",
    },
    {
      id: 4,
      component: (
        <BookingsPreview
          proceedBtnRef={proceedBtnRef}

        />
      ),
      header: "preview",
      paragraph: "We’ll hold your slot while you complete checkout",
    },
    {
      id: 5,
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
    proceedBtnRef.current.onclick = () => {
      // hiddenSubmitRef.current?.click();

      console.log("Clicked");

    };
    setBookingStep(prev => prev + 1)

  };

  useEffect(() => { dispatch(bookingSteps({ bookingStep: bookingStep })) }, [bookingStep, dispatch])
  return (
    <section className='flex items-center justify-center px-5 min-h-screen'>
      <div className='w-full flex justify-center'>
        <div className="w-full flex justify-center">


          <div className='mt-14 mb-10 flex flex-col gap-4'>
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
            {bookingStep !== 4 && (
              <div className='flex w-full mt-4 justify-end'>
                <Button
                  ref={proceedBtnRef}
                  text={"Proceed"}
                  onClick={handleBookingStepsProceed}
                  icon={<RedirectArrowWhite />}
                  iconPosition='right'
                  className='w-[125px]'
                  size='md'
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
