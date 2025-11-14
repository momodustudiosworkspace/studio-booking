"use client";
import React from "react";
import AuthForm from "./AuthForm";
import { Field, Form, Formik } from "formik";
import Button from "../ui/Button";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyOtpMutation } from "@/redux/services/user/auth/auth.api";
import { VerifyOtpTypesRequest } from "@/types/otp.types";
import { toast } from "react-toastify";
import { AuthToast } from "../toast/ToastMessage";

const VerifyEmail = (): React.JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [verifyOtp, { isLoading, isSuccess, }] = useVerifyOtpMutation()
  return (
    <AuthForm
      headerText='Verify email'
      paragraphText={`Enter 6 digit code sent to ${email}`}
      authForm={false}
    >
      <Formik
        initialValues={{
          otp: "",
          email: email
        }}
        onSubmit={async (values: VerifyOtpTypesRequest) => {
          try {
            if (values) {
              const response = await verifyOtp(values).unwrap()
              console.log(response);
              console.log("isSuccess: ", isSuccess);
              router.push(`/auth?email=${email}`)
              console.log("response: ", response);

              // if (!response) {
              //   toast.error(AuthToast, {
              //     data: {
              //       title: "Registration failed",
              //       content: `${response.message || "Invalid opt"}`,
              //     },
              //     ariaLabel: "Something went wrong",
              //     icon: false,
              //     theme: "colored",
              //   });
              // }
            }


          } catch (error: any) {
            console.log(error);
            toast.error(AuthToast, {
              data: {
                title: "Verification failed",
                content: `${error?.data.message || "Invalid opt"}`,
              },
              ariaLabel: "Something went wrong",
              icon: false,
              theme: "colored",
            });
          }
        }}
      >
        {({ values }) => (
          <Form className='flex w-full flex-col gap-10'>
            <div className='flex flex-col gap-3 font-medium text-white sm:text-black'>
              <label className='text-sm font-medium'>OTP</label>
              <Field
                name='otp'
                type='text'
                className='border-b-[1px] border-white bg-transparent pb-2 outline-0 transition-all ease-in-out focus:border-b-2 sm:border-black'
                placeholder='Enter OTP'
                maxLength={6} 
              />
            </div>

            <div className='flex w-full justify-end'>
              <Button
                text='Proceed'
                onClick={() => {
                  console.log("submitted otp");

                }}
                icon={<RedirectArrowWhite />}
                disabled={values.otp.length < 6 || isLoading}
                iconPosition='right'
                className='w-[115px]'
                loading={isLoading}
                size='md'
              />
            </div>
          </Form>
        )}
      </Formik>
    </AuthForm>
  );
};

export default VerifyEmail;
