"use client";

import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import AuthForm from "@/components/auth/AuthForm";
// import { signIn } from "next-auth/react";
// import { toast } from "react-toastify";
import Button from "@/components/ui/Button";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { AuthToast } from "@/components/toast/ToastMessage";

export default function Page(): React.JSX.Element {
  const [signin, setSignin] = useState<boolean>(true);
  const navigate = useRouter();
  return (
    <section className='h-full w-full'>
      <AuthForm
        headerText='Welcome back Admin! Sign In to manage bookings'
        paragraphText={``}
        signin={signin}
        adminAuth={true}
        setSignin={() => setSignin(!signin)}
      >
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async values => {
            console.log(values);

            // try {
            //   const res = await signIn("credentials", {
            //     redirect: false,
            //     email: values.email,
            //     password: values.password,
            //   });

            //   if (!res?.ok) {
            //     // toast.error(data.error || data.message || "Registration failed");
            //     toast.error(AuthToast, {
            //       data: {
            //         title: "Sign in failed",
            //         content: `${res?.error || "Login failed"}`,
            //       },
            //       ariaLabel: "Something went wrong",
            //       icon: false,
            //       theme: "colored",
            //     });
            //     return;
            //   }

            //   navigate.push('/admin/dashboard')

            // } catch (error) {
            //   toast.error(AuthToast, {
            //     data: {
            //       title: "Sign in failed",
            //       content: `${error || "Login failed, try again later"}`,
            //     },
            //     ariaLabel: "Something went wrong",
            //     icon: false,
            //     theme: "colored",
            //   });
            // }

            navigate.push("/admin/dashboard");
          }}
        >
          {({ values, isSubmitting }) => (
            <Form className='mt-14 flex w-full flex-col gap-10 text-white sm:text-black'>
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
    </section>
  );
}
