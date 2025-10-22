"use client";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef } from "react";

interface ReserveSlotProps {
  proceedBtnRef: React.RefObject<HTMLButtonElement | null>;
  setReserveSlot: (values: { date: Date | null; time: Date | null }) => void;
}

const ReserveSlot = ({
  proceedBtnRef,
  setReserveSlot,
}: ReserveSlotProps): React.JSX.Element => {
  const hiddenSubmitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!proceedBtnRef.current || !hiddenSubmitRef.current) return;

    proceedBtnRef.current.onclick = () => {
      hiddenSubmitRef.current?.click();
    };
  }, [proceedBtnRef]);

  return (
    <Formik
      initialValues={{
        date: "",
        time: "",
      }}
      onSubmit={values => {
        setReserveSlot({
          date: values.date ? new Date(values.date) : null,
          time: values.time ? new Date(`1970-01-01T${values.time}:00`) : null,
        });
      }}
    >
      <Form className='flex w-full flex-col gap-10 text-black'>
        {/* Date field */}
        <div className='flex flex-col gap-3'>
          <label className='text-sm font-medium text-black'>Date</label>
          <Field
            name='date'
            type='date'
            className='border-b-[1px] border-black pb-2 outline-0 transition-all ease-in-out focus:border-b-2'
          />
        </div>

        {/* Time field */}
        <div className='flex flex-col gap-3'>
          <label className='text-sm font-medium text-black'>Time</label>
          <Field
            name='time'
            type='time'
            className='border-b-[1px] border-black pb-2 outline-0 transition-all ease-in-out focus:border-b-2'
          />
        </div>

        {/* Hidden button that actually triggers Formik submit */}
        <button type='submit' ref={hiddenSubmitRef} className='hidden'></button>
      </Form>
    </Formik>
  );
};

export default ReserveSlot;
