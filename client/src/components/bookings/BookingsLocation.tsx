"use client";
import { BaseIcons, IconsType } from "@/assets/icons/BaseIcons";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { bookingLocationType } from "@/redux/slices/bookingSlice";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";

interface BookingsLocationProps {
  proceedBtnRef: React.RefObject<HTMLButtonElement | null>;

}

const BookingsLocation = ({
  proceedBtnRef,

}: BookingsLocationProps): React.JSX.Element => {
  const bookingLocation = useAppSelector((state) => state.booking.location)
  const dispatch = useAppDispatch()
  const hiddenSubmitRef = useRef<HTMLButtonElement>(null);
  const [selectedbookingsLocation, setSelectedbookingsLocation] = useState<
    number | null
    >(null);


  const BOOKING_SESSIONS: {
    title: string;
    icon: IconsType;
    id: number | null;
  }[] = [
    {
      title: "Studio",
      icon: "studio-black",
      id: 1,
    },
    {
      title: "Choose Location",
      icon: "marker-black",
      id: 2,
    },
  ];

  useEffect(() => {
    if (!proceedBtnRef.current || !hiddenSubmitRef.current) return;

    // proceedBtnRef.current.onclick = () => {
    //   hiddenSubmitRef.current?.click();

    //   console.log("Clicked");

    // };
    console.log('Clicked');

  }, [proceedBtnRef]);

  return (
    <div className='w-full sm:w-[450px]'>
      <div className='mb-10 grid h-[128px] w-full grid-cols-2 gap-x-5 gap-y-5 overflow-y-scroll rounded-lg bg-[#f3f3f3] p-5'>
        {BOOKING_SESSIONS.map((session, key) => (
          <button
            key={key}
            className={`${selectedbookingsLocation === session.id ? "border-2 border-black" : ""} flex h-[86px] w-[100%] flex-col items-center justify-center gap-2 rounded-lg bg-white text-sm`}
            onClick={() => {
              console.log(selectedbookingsLocation);
              setSelectedbookingsLocation(session.id);
            }}
          >
            <BaseIcons value={session?.icon} />
            <span className=''>{session?.title}</span>
          </button>
        ))}
      </div>
      {selectedbookingsLocation === 2 && (
        <Formik
          initialValues={{
            state: bookingLocation?.state || "",
            address: bookingLocation?.address || "",
          }}
          onSubmit={values => {
            console.log("values are:", values);


            dispatch(bookingLocationType({ location: values }))


          }}
        >
          <Form className='flex flex-col gap-10 text-black'>
            {/* Date field */}
            <div className='flex flex-col gap-3'>
              <label className='text-sm font-medium text-black'>
                Select state
              </label>
              <Field
                name='state'
                as='select'
                className='border-b-[1px] border-black pb-2 text-sm outline-0 transition-all ease-in-out focus:border-b-2'
              >
                <option value=''>Select state</option>
                <option value='abuja'>Abuja</option>
                <option value='lagos'>Lagos</option>
              </Field>
            </div>

            {/* Time field */}
            <div className='flex flex-col gap-3'>
              <label className='text-sm font-medium text-black'>Address</label>
              <Field
                name='address'
                type='text'
                className='border-b-[1px] border-black pb-2 outline-0 transition-all ease-in-out focus:border-b-2'
              />
            </div>

            {/* Hidden button that actually triggers Formik submit */}
            <button
              type='submit'
              ref={hiddenSubmitRef}
              className='hidden'
              onClick={() => {

              }}
            ></button>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default BookingsLocation;
