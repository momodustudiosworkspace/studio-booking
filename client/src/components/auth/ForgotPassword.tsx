"use client";
import React from "react";
import AuthForm from "./AuthForm";
import { Field, Form, Formik } from "formik";
import Button from "../ui/Button";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import { useRouter } from "next/navigation";

const ForgotPassword = (): React.JSX.Element => {
  const router = useRouter();
  return (
    <AuthForm
      headerText='Forgot password'
      paragraphText={`Let’s help you get it back. enter the email account registered to your account `}
      authForm={false}
    >
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={values => console.log(values)}
      >
        {({ values, isSubmitting }) => (
          <Form className='mt-20 flex w-full flex-col gap-10'>
            <div className='flex flex-col gap-3 font-medium text-white sm:text-black'>
              <label className='text-sm font-medium capitalize'>
                registered email address
              </label>
              <Field
                name='email'
                type='text'
                className='border-b-[1px] border-white bg-transparent pb-2 outline-0 transition-all ease-in-out focus:border-b-2 sm:border-black'
                placeholder='Enter email address'
              />
            </div>

            <div className='flex w-full justify-end'>
              <Button
                text='Proceed'
                onClick={() => {
                  router.push("/auth/otp");
                  console.log(values);
                }}
                icon={<RedirectArrowWhite />}
                disabled={values.email.length < 5 || isSubmitting}
                iconPosition='right'
                className='w-[125px]'
                size='md'
              />
            </div>
          </Form>
        )}
      </Formik>
    </AuthForm>
  );
};

export default ForgotPassword;
