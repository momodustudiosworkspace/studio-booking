"use client";
import React from "react";
import AuthForm from "./AuthForm";
import { Field, Form, Formik } from "formik";
import Button from "../ui/Button";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { AuthToast } from "../toast/ToastMessage";
import { useRouter, useSearchParams } from "next/navigation";

interface SignProps {
  signin: boolean;
  setSignin: (value: boolean) => void;
}
const SignIn = ({ signin, setSignin }: SignProps): React.JSX.Element => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo")
  const navigate = useRouter()


  return (
    <AuthForm
      headerText='Log in to your account'
      paragraphText={`Don't have an account?`}
      signin={signin}
      imgUrl=""
      setSignin={() => setSignin(!signin)}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async values => {

          try {
            const res = await signIn("credentials", {
              redirect: false,
              email: values.email,
              password: values.password,
            });

            if (!res?.ok) {
              // toast.error(data.error || data.message || "Registration failed");
              toast.error(AuthToast, {
                data: {
                  title: "Sign in failed",
                  content: `${res?.error || "Login failed"}`,
                },
                ariaLabel: "Something went wrong",
                icon: false,
                theme: "colored",
              });
              return;
            }

            if (res?.ok && searchParams && redirectTo) {
              // Redirect back
              navigate.push(redirectTo);
            }

            else {
              navigate.push('/dashboard')
            }

          } catch (error) {
            toast.error(AuthToast, {
              data: {
                title: "Sign in failed",
                content: `${error || "Login failed, try again later"}`,
              },
              ariaLabel: "Something went wrong",
              icon: false,
              theme: "colored",
            });
          }



        }}
      >
        {({ values, isSubmitting }) => (
          <Form className='flex w-full flex-col gap-10 text-white sm:text-black'>
            <div className='flex flex-col gap-3'>
              <label className='text-sm font-medium text-white sm:text-black'>
                Email Address
              </label>
              <Field
                name='email'
                type='email'
                className='border-b-[1px] border-white pb-2 outline-0 transition-all ease-in-out focus:border-b-2 sm:border-black'
                placeholder='Enter email address'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <label className='text-sm font-medium text-white sm:text-black'>
                Password
              </label>
              <Field
                name='password'
                type='password'
                className='border-b-[1px] border-white pb-2 outline-0 transition-all ease-in-out focus:border-b-2 sm:border-black'
                placeholder='Enter email address'
              />
            </div>

            <div className='mb-8 flex w-full justify-end sm:mb-0'>
              <Link
                href={"/auth/forgot-password"}
                className='text-white underline sm:text-black'
              >
                Forgot password?
              </Link>
            </div>

            <div className='flex w-full justify-end'>
              <Button
                text='Log In'
                onClick={() => console.log(values)}
                icon={<RedirectArrowWhite />}
                iconPosition='right'
                className='w-[110px]'
                size='md'
                loading={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </AuthForm>
  );
};

export default SignIn;
