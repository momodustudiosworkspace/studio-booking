"use client";
import { Field, Form, Formik } from "formik";
import React from "react";
import Button from "../ui/Button";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";

const ContactForm = (): React.JSX.Element => {
  return (
    <Formik
      initialValues={{
        fname: "",
        lname: "",
        email: "",
        message: "",
      }}
      onSubmit={values => console.log(values)}
    >
      {({ values }) => (
        <Form className='flex w-full flex-col gap-10'>
          <div className='flex flex-col gap-10 sm:flex-row sm:justify-between'>
            <div className='flex w-full flex-col gap-3 font-medium text-black'>
              <label>First Name</label>
              <Field
                name='fname'
                className='border-b-[1px] border-black pb-2 outline-0 transition-all ease-in-out focus:border-b-2'
                placeholder='Enter first name'
              />
            </div>
            <div className='flex w-full flex-col gap-3 font-medium text-black'>
              <label>Last Name</label>
              <Field
                name='lname'
                className='border-b-[1px] border-black pb-2 outline-0 transition-all ease-in-out focus:border-b-2'
                placeholder='Enter last name'
              />
            </div>
          </div>
          <div className='flex flex-col gap-3 font-medium text-black'>
            <label>Email</label>
            <Field
              name='email'
              type='email'
              className='border-b-[1px] border-black pb-2 outline-0 transition-all ease-in-out focus:border-b-2'
              placeholder='Enter email address'
            />
          </div>
          <div className='flex flex-col gap-3 font-medium text-black'>
            <label>Message</label>
            <Field
              as='textarea'
              name='message'
              className='border-b-[1px] border-black pb-2 outline-0 transition-all ease-in-out focus:border-b-2'
              placeholder='Enter message'
            />
          </div>

          <div className='flex w-full justify-end'>
            <Button
              text='Send message'
              onClick={() => console.log(values)}
              icon={<RedirectArrowWhite />}
              iconPosition='right'
              className='w-auto'
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
