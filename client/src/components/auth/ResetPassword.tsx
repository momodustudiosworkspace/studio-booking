"use client";
import React from "react";
import AuthForm from "./AuthForm";
import { Field, Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useUpDatePasswordMutation } from "@/redux/services/user/auth/auth.api";
import { toast } from "react-toastify";
import { AuthToast } from "../toast/ToastMessage";

const ResetPassword = (): React.JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const getUserEmail = searchParams.get("email");
  const [upDatePassword, { isLoading }] = useUpDatePasswordMutation();
  return (
    <AuthForm
      headerText='create new password'
      paragraphText={`create a new password for your account`}
      authForm={false}
    >
      <Formik
        initialValues={{
          password: "",
          password_2: "",
        }}
        onSubmit={async values => {
          try {
            const response = await upDatePassword({
              email: getUserEmail || "",
              password: values.password,
            }).unwrap();

            if (response.status === 200) {
              toast.success(AuthToast, {
                data: {
                  title: "Password Reset",
                  content: `${response.message || "Password change successful"}`,
                },
                ariaLabel: "OTP successful",
                icon: false,
                theme: "colored",
              });

              router.push(`/auth?email=${getUserEmail}`);
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ values }) => (
          <Form className='mt-20 flex w-full flex-col gap-10 text-white sm:text-black'>
            <div className='flex flex-col gap-3'>
              <label className='text-sm font-medium text-white sm:text-black'>
                Password
              </label>
              <Field
                name='password'
                type='password'
                className='border-b-[1px] border-white pb-2 outline-0 transition-all ease-in-out focus:border-b-2 sm:border-black'
                placeholder='New password'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <label className='text-sm font-medium text-white sm:text-black'>
                {" "}
                Confirm Password
              </label>
              <Field
                name='password_2'
                type='password'
                className='border-b-[1px] border-white pb-2 outline-0 transition-all ease-in-out focus:border-b-2 sm:border-black'
                placeholder='Retry password'
              />
            </div>

            <div className='flex w-full justify-end'>

              <button type="submit" className='mb-10 gap-2 items-center rounded-md border border-transparent bg-linear-to-r bg-black flex px-2 py-2 text-center font-semibold text-white' disabled={!values.password || !values.password_2} onClick={() => console.log(values)
              }>
                Proceed{isLoading && <div className='h-4 w-4 animate-spin rounded-full border-4 border-white border-t-transparent'></div>}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </AuthForm>
  );
};

export default ResetPassword;
