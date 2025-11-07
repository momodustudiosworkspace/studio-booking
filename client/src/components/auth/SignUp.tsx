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

interface SignUpProps {
  signin: boolean;
  setSignin: (value: boolean) => void;
}
const SignUp = ({ signin, setSignin }: SignUpProps): React.JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

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
          fname: "",
          lname: "",
          email: "",
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

            if (res?.ok && searchParams && redirectTo) {
              // Redirect back
              return router.push(redirectTo);
            }

            if (!res.ok) {
              // toast.error(data.error || data.message || "Registration failed");
              toast.error(AuthToast, {
                data: {
                  title: "Registration failed",
                  content: `${data.error || data.message || "Registration failed"}`,
                },
                ariaLabel: "Something went wrong",
                icon: false,
                theme: "colored",
              });
              return;
            }
            toast.success(AuthToast, {
              data: {
                title: "Registration successful",
                content: `${data.message || "Registration successful"}`,
              },
              ariaLabel: "Registration successful",
              icon: false,
              theme: "colored",
            });
            router.push("/auth/verify-email");
          } catch (error) {
            console.log("error: ", error);
            toast(`Error : ${error}`);
          }
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className='flex w-full flex-col gap-10'>
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
