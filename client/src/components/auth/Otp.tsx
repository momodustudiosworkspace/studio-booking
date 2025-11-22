"use client";
import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { Form, Formik } from "formik";
import Button from "../ui/Button";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import { useRouter, useSearchParams } from "next/navigation";
import OTPInput from "react-otp-input";
import { useVerifyOtpMutation } from "@/redux/services/user/auth/auth.api";
import { toast } from "react-toastify";
import { AuthToast } from "../toast/ToastMessage";

const Otp = (): React.JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const getUserEmail = searchParams.get("email");
  const [otp, setOtp] = useState("");

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation()

  const Title = (): React.JSX.Element => {
    return (
      <span>
        Enter 5 digit code sent to{" "}
        <span className='font-medium'>{getUserEmail}</span>
      </span>
    );
  };
  return (
    <AuthForm
      headerText='Enter your code'
      paragraphText={<Title />}
      authForm={false}
    >
      <Formik
        initialValues={{
          otp: "",
          email: getUserEmail,
        }}
        onSubmit={async values => {
          try {
            const response = await verifyOtp(values).unwrap()

            if (response.status === 200) {

              router.push(`/auth/create-new-password?email=${getUserEmail}`);
            }
          } catch (error) {
            console.log(error);
            const { message } = error as { message: string }
            toast.error(AuthToast, {
              data: {
                title: "Verification failed",
                content: `${message || "Invalid opt"}`,
              },
              ariaLabel: "Something went wrong",
              icon: false,
              theme: "colored",
            });
          }
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className='mt-20 flex w-full flex-col gap-10 sm:items-start'>
            {/* <div className='flex flex-col gap-3 text-white font-medium'>
                            <label className='text-sm font-medium capitalize'></label>
                            <Field name='email' type='text' className='border-b-[1px] outline-0 border-white bg-transparent focus:border-b-2 transition-all ease-in-out pb-2' placeholder="Enter email address" />
                        </div> */}

            <OTPInput
              value={otp}
              onChange={otp => {
                setOtp(otp);
                setFieldValue("otp", otp);
              }}
              numInputs={5}
              inputType='tel'
              shouldAutoFocus
              renderSeparator={null}
              renderInput={props => (
                <input
                  {...props}
                  className='mb-5 border border-black text-[28px] focus:outline-black'
                />
              )}
              containerStyle='flex justify-center sm:gap-10 gap-3'
              inputStyle={{
                width: "56px",
                height: "70px",
                borderRadius: "10px",
                fontWeight: "bold",
                fontFamily: "Inter, sans-serif",
              }}
            />

            <div className='flex w-full justify-end'>
              <Button
                text='Verify OTP'
                onClick={() => {

                  console.log(values);
                }}
                icon={<RedirectArrowWhite />}
                disabled={values.otp.length < 5 || isSubmitting}
                iconPosition='right'
                className='w-[145px]'
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

export default Otp;
