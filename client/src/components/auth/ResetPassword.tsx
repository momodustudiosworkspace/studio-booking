"use client";
import React from "react";
import AuthForm from "./AuthForm";
import { Field, Form, Formik } from "formik";
import Button from "../ui/Button";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import { useRouter } from "next/navigation";

const ResetPassword = (): React.JSX.Element => {
  const router = useRouter();
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
        onSubmit={values => console.log(values)}
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
              <Button
                text='Change Password'
                onClick={() => {
                  console.log(values);
                  router.push("/auth");
                }}
                icon={<RedirectArrowWhite />}
                iconPosition='right'
                className='w-[205px]'
                size='md'
                disabled={!values.password || !values.password_2}
              />
            </div>
          </Form>
        )}
      </Formik>
    </AuthForm>
  );
};

export default ResetPassword;
