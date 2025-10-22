"use client";

import { BookingsIcons } from "@/assets/icons/bookings/BookingsIcons";
import nairaSymbol from "@/utils/symbols";
import { Form, Formik } from "formik";
import React, { useEffect, useRef } from "react";

interface bookingsPreviewProps {
  proceedBtnRef: React.RefObject<HTMLButtonElement | null>;
  setbookingsPreview: (values: { state: string; address: string }) => void;
}

const BookingsPreview = ({
  proceedBtnRef,
}: bookingsPreviewProps): React.JSX.Element => {
  const hiddenSubmitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!proceedBtnRef.current || !hiddenSubmitRef.current) return;

    proceedBtnRef.current.onclick = () => {
      hiddenSubmitRef.current?.click();
    };
  }, [proceedBtnRef]);

  return (
    <div className='w-full'>
      <Formik
        initialValues={{
          state: "",
          address: "",
        }}
        onSubmit={values => {
          console.log(values);
        }}
      >
        <Form className='flex w-full flex-col gap-10 text-black sm:w-[490px]'>
          {/* shoot details  */}
          <div className='rounded-xl bg-[#FAFAFA] p-6'>
            <h3 className='mb-5 font-semibold capitalize'>shoot details </h3>
            <div className='flex flex-col gap-5'>
              <div className='flex items-center gap-2'>
                <BookingsIcons value='person-solid-black' />
                <p className='text-[14px] font-medium text-[#414141] capitalize'>
                  wedding shoot
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <BookingsIcons value='phone-solid-black' />
                <p className='text-[14px] font-medium text-[#414141] capitalize'>
                  +234 908 124 4447
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <BookingsIcons value='marker-solid-black' />
                <p className='text-[14px] font-medium text-[#414141] capitalize'>
                  2464 Royal Ln. Mesa, New Jersey 45463
                </p>
              </div>
            </div>
          </div>
          <div className='rounded-xl bg-[#FAFAFA] p-6'>
            <h3 className='mb-5 font-semibold capitalize'>pricing details</h3>
            <div className='flex flex-col gap-5'>
              <div className='flex items-center justify-between'>
                <p className='text-[16px] font-medium text-[#414141] capitalize'>
                  price
                </p>
                <p className='text-[16px] font-semibold text-[#414141] capitalize'>
                  {nairaSymbol()}200,000
                </p>
              </div>
              <div className='flex items-center justify-between'>
                <p className='text-[16px] font-medium text-[#414141] capitalize'>
                  VAT
                </p>
                <p className='text-[16px] font-semibold text-[#414141] capitalize'>
                  {nairaSymbol()}200,000
                </p>
              </div>
              <div className='flex w-full flex-col items-start justify-between gap-2 sm:flex-row sm:items-center'>
                <p className='w-full text-[18px] font-medium text-[#414141] capitalize'>
                  add discount code
                </p>
                <div className='relative w-full'>
                  <input
                    type='text'
                    placeholder='Enter code'
                    className='h-[37px] w-full border-b-[1px] border-white bg-white px-2 text-[14px] outline-0 transition-all ease-in-out focus:border-b-2 sm:w-[224px] sm:border-black'
                  />
                  <button className='absolute top-2 right-1 text-[14px] font-semibold capitalize underline'>
                    confirm
                  </button>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <p className='text-[16px] font-semibold text-[#414141] capitalize'>
                  total
                </p>
                <p className='text-[16px] font-semibold text-[#414141] capitalize'>
                  {nairaSymbol()}200,000
                </p>
              </div>
            </div>
          </div>

          {/* Hidden button that actually triggers Formik submit */}
          <button
            type='submit'
            ref={hiddenSubmitRef}
            className='hidden'
          ></button>
        </Form>
      </Formik>
    </div>
  );
};

export default BookingsPreview;
