"use client";
import { useInviteStaffMutation } from "@/redux/services/admin/staff-management/adminStaffManagement.api";
import { AuthToast } from "@/components/toast/ToastMessage";
import { Field, Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";

interface StaffFormProps {
  setOpen: (open: boolean) => void;
}

// Validation schema
// const staffValidationSchema = Yup.object().shape({
//   first_name: Yup.string()
//     .required("First name is required")
//     .min(2, "First name must be at least 2 characters"),
//   last_name: Yup.string()
//     .required("Last name is required")
//     .min(2, "Last name must be at least 2 characters"),
//   email: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),
//   role: Yup.string()
//     .oneOf(["engineer", "photographer", "producer", "manager", "admin"], "Invalid role")
//     .required("Role is required"),
// });

interface StaffFormProps {
  setOpen: (open: boolean) => void;
}
const StaffForm = ({ setOpen }: StaffFormProps) => {
  const [inviteStaff, { isLoading }] = useInviteStaffMutation();

  return (
    <div className='isolate lg:px-8'>
      <div
        aria-hidden='true'
        className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
      ></div>
      <div className='mx-auto'>
        <p className='mt-2 mb-5 text-black'></p>
      </div>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          role: "engineer",
        }}
        // validationSchema={staffValidationSchema}
        onSubmit={async values => {
          try {
            const response = await inviteStaff({
              ...values,
              role: values.role as
                | "engineer"
                | "photographer"
                | "producer"
                | "manager"
                | "admin",
            }).unwrap();

            setOpen(false);
            return toast.success(
              response.message || "Staff invitation sent successfully"
            );
          } catch (error: any) {
            console.log("Error inviting staff:", error);

            return toast.error(AuthToast, {
              data: {
                title: "Couldn't invite staff",
                content: `${error?.data?.message || "Inviting staff failed, try again later"}`,
              },
              ariaLabel: "Something went wrong",
              icon: false,
              theme: "colored",
            });
          }
        }}
      >
        {({ values, isSubmitting, errors, touched }) => (
          <Form className='flex w-full flex-col gap-10 text-black'>
            {/* First Name */}
            <div className='flex flex-col gap-3'>
              <label className='text-sm font-medium text-black'>
                First Name *
              </label>
              <Field
                name='first_name'
                type='text'
                className={`border-b-[1px] border-black pb-2 outline-0 transition-all ease-in-out focus:border-b-2 ${
                  errors.first_name && touched.first_name
                    ? "border-red-500"
                    : ""
                }`}
                placeholder='Enter first name'
              />
              {errors.first_name && touched.first_name && (
                <span className='text-xs text-red-500'>
                  {errors.first_name}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className='flex flex-col gap-3'>
              <label className='text-sm font-medium text-black'>
                Last Name *
              </label>
              <Field
                name='last_name'
                type='text'
                className={`border-b-[1px] pb-2 outline-0 transition-all ease-in-out focus:border-b-2 sm:border-black ${
                  errors.last_name && touched.last_name ? "border-red-500" : ""
                }`}
                placeholder='Enter last name'
              />
              {errors.last_name && touched.last_name && (
                <span className='text-xs text-red-500'>{errors.last_name}</span>
              )}
            </div>

            {/* Email */}
            <div className='flex flex-col gap-3'>
              <label className='text-sm font-medium text-black'>
                Email Address *
              </label>
              <Field
                name='email'
                type='email'
                className={`border-b-[1px] pb-2 outline-0 transition-all ease-in-out focus:border-b-2 sm:border-black ${
                  errors.email && touched.email ? "border-red-500" : ""
                }`}
                placeholder='Enter email address'
              />
              {errors.email && touched.email && (
                <span className='text-xs text-red-500'>{errors.email}</span>
              )}
            </div>

            {/* Role */}
            <div className='flex flex-col gap-3'>
              <label className='text-sm font-medium text-black'>
                Staff Role *
              </label>
              <Field
                as='select'
                name='role'
                className={`border-b-[1px] pb-2 outline-0 transition-all ease-in-out focus:border-b-2 sm:border-black ${
                  errors.role && touched.role ? "border-red-500" : ""
                } bg-white text-black`}
              >
                <option value='engineer'>Engineer</option>
                <option value='photographer'>Photographer</option>
                <option value='producer'>Producer</option>
                <option value='manager'>Manager</option>
                <option value='admin'>Admin</option>
              </Field>
              {errors.role && touched.role && (
                <span className='text-xs text-red-500'>{errors.role}</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className='flex gap-3 sm:justify-end'>
              <button
                type='button'
                className='flex gap-2 rounded-md bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                onClick={() => setOpen(false)}
              >
                <span>✕</span>
                <span>Close</span>
              </button>
              <button
                type='submit'
                disabled={
                  isSubmitting ||
                  !values.first_name ||
                  !values.last_name ||
                  !values.email ||
                  !values.role ||
                  isLoading
                }
                className={`block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  !values.first_name ||
                  !values.last_name ||
                  !values.email ||
                  !values.role
                    ? "cursor-not-allowed bg-green-700/50"
                    : "bg-green-700 hover:bg-green-700/70"
                }`}
              >
                {isLoading ? "Sending invitation..." : "Send Invitation"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StaffForm;
