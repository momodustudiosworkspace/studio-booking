import nairaSymbol from "@/utils/symbols";
import { Field, Form, Formik } from "formik";
import React from "react";

interface BookingCardAnalyticsProps {
  title: string;
  count: number | 0;
  text: string;
  dataType: number;
}
const BookingCardAnalytics = ({
  title,
  count,
  text,
  dataType

}: BookingCardAnalyticsProps) => {

  return (
    <div className='h-[125px] w-full rounded-md bg-white p-5 shadow'>

      <small className='font-medium capitalize'>{title}</small>
      <div className="flex items-center gap-3">
        <h1 className='text-[30px] font-bold'>{dataType === 1 && nairaSymbol()}{count.toLocaleString()}</h1>
        {dataType === 1 && <Formik initialValues={{
          filter_date: ""
        }}
          onSubmit={values => {
            console.log(values);

          }

          }>
          <Form>
            <Field
              name='state'
              as='select'
              className='border-b-[1px] border-black pb-2 text-sm outline-0 transition-all ease-in-out focus:border-b-2'
            >
              <option value=''>This month</option>
              <option value='october'>October</option>
              <option value='september'>September</option>
            </Field></Form></Formik>}
      </div>
      <div className='text-sm font-semibold'>
        {text}
      </div>
    </div>
  );
};

export default BookingCardAnalytics;
