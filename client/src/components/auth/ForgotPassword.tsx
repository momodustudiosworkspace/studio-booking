"use client";
import React from "react";
import AuthForm from "./AuthForm";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useSendOtpMutation } from "@/redux/services/user/auth/auth.api";
import { toast } from "react-toastify";
import { AuthToast } from "../toast/ToastMessage";
import Link from "next/link";

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
                  title: "OTP sent successful",
                  content: `${response.message || "OTP valid"}`,
                },
                ariaLabel: "OTP successful",
                icon: false,
                theme: "colored",
              });
              return router.push(`/auth/otp?email=${values.email}`);
            }
          } catch (error: any) {
            return toast.error(AuthToast, {
              data: {
                title: "OTP sent failed",
                content: `${error?.data?.message || "Something went wrong"}`,
              },
              ariaLabel: "User not found!",
              icon: false,
              theme: "colored",
            });
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

            <div className='flex w-full items-center justify-between'>
              <Link href='/auth' className='underline'>
                Back to Login
              </Link>

              <button type="submit" className='mb-10 gap-2 items-center rounded-md border border-transparent bg-linear-to-r bg-black flex px-2 py-2 text-center font-semibold text-white' disabled={values.email.length < 5 || isSubmitting || isLoading} onClick={() => console.log(values)
              }>
                Proceed {isLoading && <div className='h-4 w-4 animate-spin rounded-full border-4 border-white border-t-transparent'></div>}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </AuthForm>
  );
};

export default ForgotPassword;
