import { AuthToast } from "@/components/toast/ToastMessage";
import { useCreateBookingSessionMutation } from "@/redux/services/admin/session-and-packages/adminSessionAndPackages.api";
import { Field, Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";
// import { ChevronDownIcon } from '@heroicons/react/16/solid'

interface SessionFormProps {
  setOpen: (open: boolean) => void;
}
const SessionForm = ({ setOpen }: SessionFormProps) => {
  const [createBookingSession, { isLoading }] =
    useCreateBookingSessionMutation();
  return (
    <div className='isolate px-6 lg:px-8'>
      <div
        aria-hidden='true'
        className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
      ></div>
      <div className='mx-auto'>
        {/* <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-2xl">Create new session</h2> */}
        <p className='mt-2 mb-5 text-black'></p>
      </div>
      <Formik
        initialValues={{
          session_title: "",
        }}
        onSubmit={async values => {
          //   console.log(values);

          try {
            await createBookingSession(values).unwrap();

            // if (!res?.status || res?.status !== 200) {
            //   // toast.error(data.error || data.message || "Registration failed");
            //  return toast.error(AuthToast, {
            //     data: {
            //       title: "Couldn't create session",
            //       content: `${ "Creating session failed, try again later"}`,
            //     },
            //     ariaLabel: "Something went wrong",
            //     icon: false,
            //     theme: "colored",
            //   });

            // }

            // if (res?.status === 200) {
            setOpen(false);
            return toast.success("Session created successfully");
            // }
          } catch (error) {
            console.log(error);

            return toast.error(AuthToast, {
              data: {
                title: "Couldn't create session",
                content: `${" Creating session failed, try again later"}`,
              },
              ariaLabel: "Something went wrong",
              icon: false,
              theme: "colored",
            });
          }
          return;
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className='flex w-full flex-col gap-10 text-white sm:text-black'>
            <div className='flex flex-col gap-3'>
              <label className='text-sm font-medium text-white sm:text-black'>
                {/* Session title */}
              </label>
              <Field
                name='session_title'
                type='text'
                className='border-b-[1px] border-white pb-2 outline-0 transition-all ease-in-out focus:border-b-2 sm:border-black'
                placeholder='Enter session title'
              />
            </div>

            {/* <div className='flex w-full justify-end'>
                        <Button
                          text='Log In'
                          onClick={() => console.log(values)}
                          icon={<RedirectArrowWhite />}
                          iconPosition='right'
                          className='w-[110px]'
                          size='md'
                          loading={isSubmitting}
                          disabled={isSubmitting}
                        />
                      </div> */}
            <div className='flex justify-end gap-3'>
              <button
                type='button'
                className='flex gap-2 rounded-md bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                onClick={() => setOpen(false)}
              >
                <span> x </span>
                <span>Close</span>
              </button>
              <button
                type='submit'
                disabled={isSubmitting || !values.session_title || isLoading}
                className={`block w-full rounded-md ${!values.session_title ? "cursor-not-allowed opacity-50" : "hover:opacity-90"} bg-green-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-green-700/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300`}
              >
                Create Session
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SessionForm;
