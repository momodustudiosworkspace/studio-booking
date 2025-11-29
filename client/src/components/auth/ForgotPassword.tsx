"use client";
import React from "react";
import AuthForm from "./AuthForm";
import { Field, Form, Formik } from "formik";
import Button from "../ui/Button";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import { useRouter } from "next/navigation";
import { useSendOtpMutation } from "@/redux/services/user/auth/auth.api";
import { toast } from "react-toastify";
import { AuthToast } from "../toast/ToastMessage";

const ForgotPassword = (): React.JSX.Element => {
  const router = useRouter();
  const [sendOtp, { isLoading }] = useSendOtpMutation();
  return (
    <AuthForm
      headerText='Forgot password'
      paragraphText={`Let’s help you get it back. enter the email account registered to your account `}
      authForm={false}
    >
      <Formik
        initialValues={{
          email: "",
          purpose: "password_reset",
        }}
        onSubmit={async values => {
          try {
            const response = await sendOtp(values).unwrap();

            if (response.status === 200) {
              toast.success(AuthToast, {
                data: {
                  title: "OTP successful",
                  content: `${response.message || "OTP valid"}`,
                },
                ariaLabel: "OTP successful",
                icon: false,
                theme: "colored",
              });
              router.push(`/auth/otp?email=${values.email}`);
            }
          } catch (error) {
            console.log(error);
          }
        }}
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
                  console.log(values);
                }}
                icon={<RedirectArrowWhite />}
                disabled={values.email.length < 5 || isSubmitting || isLoading}
                iconPosition='right'
                loading={isLoading}
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
