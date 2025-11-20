"use client";
import React from "react";
import AuthForm from "./AuthForm";
import { Field, Form, Formik } from "formik";
import Button from "../ui/Button";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { AuthToast } from "../toast/ToastMessage";
import { signIn } from "next-auth/react";

interface SignUpProps {
  signin: boolean;
  setSignin: (value: boolean) => void;
}
const SignUp = ({ signin, setSignin }: SignUpProps): React.JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const email = searchParams.get("email");

  return (
    <AuthForm
      headerText='Create your account'
      paragraphText='Already have an account?'
      signin={signin}
      imgUrl=''
      setSignin={() => setSignin(!signin)}
    >
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: email ?? "",
          password: "",
          password_confirm: "",
          agree: false,
        }}
        onSubmit={async values => {
          try {
            const res = await fetch("/api/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            });
            const data = await res.json();

            if (!res.ok) {
              // toast.error(data.error || data.message || "Registration failed");
              return toast.error(AuthToast, {
                data: {
                  title: "Registration failed",
                  content: `${data.error || data.message || "Registration failed"}`,
                },
                ariaLabel: "Something went wrong",
                icon: false,
                theme: "colored",
              });
            }

            if (res?.ok && redirectTo) {
              toast.success(AuthToast, {
                data: {
                  title: "Registration successful",
                  content: `${data.message || "Registration successful"}`,
                },
                ariaLabel: "Registration successful",
                icon: false,
                theme: "colored",
              });
              // Now automatically log the user in
              await signIn("credentials", {
                email: values?.email,
                password: values?.password,
                redirect: false,
              });
              // Redirect back
              return router.push(redirectTo);
            }

            return router.push(`/auth/verify-email?email=${values.email}`);
          } catch (error) {
            console.log("error: ", error);
            toast(`Error : ${error}`);
          }
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className='flex w-full flex-col gap-10'>
            <div className='flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex w-full flex-col gap-3 font-medium text-white sm:text-black'>
                <label className='text-sm font-medium'>First name</label>
                <Field
                  name='first_name'
                  type='text'
                  className='border-b-[1px] border-white bg-transparent pb-2 outline-0 transition-all ease-in-out focus:border-b-2 sm:border-black'
                  placeholder='Enter first name'
                />
              </div>
              <div className='flex w-full flex-col gap-3 font-medium text-white sm:text-black'>
                <label className='text-sm font-medium'>Last name</label>
                <Field
                  name='last_name'
                  type='text'
                  className='border-b-[1px] border-white bg-transparent pb-2 outline-0 transition-all ease-in-out focus:border-b-2 sm:border-black'
                  placeholder='Enter last name'
                />
              </div>
            </div>

            <div className='flex flex-col gap-3 font-medium text-white sm:text-black'>
              <label className='text-sm font-medium'>Email Address</label>
              <Field
                name='email'
                type='email'
                className='border-b-[1px] border-white bg-transparent pb-2 outline-0 transition-all ease-in-out focus:border-b-2 sm:border-black'
                placeholder='Enter email address'
              />
            </div>
            <div className='flex flex-col gap-3 font-medium text-white sm:text-black'>
              <label className='text-sm font-medium'>Password</label>
              <Field
                name='password'
                type='password'
                className='border-b-[1px] border-white bg-transparent pb-2 outline-0 transition-all ease-in-out focus:border-b-2 sm:border-black'
                placeholder='Enter password'
              />
            </div>
            <div className='mb-4 flex flex-col gap-3 font-medium text-white sm:text-black'>
              <label className='text-sm font-medium'>Confirm Password</label>
              <Field
                name='password_confirm'
                type='password'
                className='border-b-[1px] border-white bg-transparent pb-2 outline-0 transition-all ease-in-out focus:border-b-2 sm:border-black'
                placeholder='Confirm password'
              />
            </div>

            <div className='flex items-start gap-1'>
              <Field type='checkbox' name='agree' id='agree' />
              <span className='-mt-1 text-sm font-normal'>
                By Signing Up, you agree to momodu studios’{" "}
                <Link href={"/auth"} className='font-semibold underline'>
                  Terms of service{" "}
                </Link>{" "}
                and{" "}
                <Link href={"/auth"} className='font-semibold underline'>
                  Privacy Policy
                </Link>
              </span>
            </div>

            <div className='flex w-full justify-end'>
              <Button
                text='Sign Up'
                onClick={() => console.log(values)}
                icon={<RedirectArrowWhite />}
                disabled={!values.agree || isSubmitting}
                iconPosition='right'
                className='w-[124px]'
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

export default SignUp;
