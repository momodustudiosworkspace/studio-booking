"use client";
import React from "react";
import DashboardLayout from "./DashboardLayout";
import { Field, Form, Formik } from "formik";
import Button from "../../ui/Button";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "@/redux/services/user/user/user.api";
import { signOut, useSession } from "next-auth/react";
import { UpdateUserProfileRequest } from "@/types/user.types";
import { useUpDatePasswordMutation } from "@/redux/services/user/auth/auth.api";
import { toast } from "react-toastify";
import { AuthToast } from "@/components/toast/ToastMessage";
import { useAppDispatch } from "@/hooks/hooks";
import { userLogOut } from "@/redux/slices/authSlice";

const DashboardProfile = () => {
  // const [editFullName, setEditFullName] = useState<boolean>(false);
  // const [editPhoneNumber, setEditPhoneNumber] = useState<boolean>(false);
  // const [editAddress, setEditAddress] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { data: session } = useSession()

  const { data: userprofile, isLoading: userProfileLoading } =
    useGetUserProfileQuery();

  const [updateUserProfile, { isLoading }] =
    useUpdateUserProfileMutation();


  const [upDatePassword] = useUpDatePasswordMutation();


  console.log("use profile: ", userprofile);

  console.log("Sesion: ", session);

  const BOOKING_DATA = [
    {
      title: "total sessions",
      count: userprofile?.stats?.totalBookings,
    },
    {
      title: "completed sessions",
      count: userprofile?.stats?.totalCompleted,
    },
    {
      title: "pending sessions",
      count: userprofile?.stats?.totalPending,
    },
    {
      title: "cancelled sessions",
      count: userprofile?.stats?.totalCancelled,
    },
  ];

  if (userProfileLoading) return "Loading profile";


  const handleSubmit = async (
    values: UpdateUserProfileRequest,

  ) => {
    try {
      const response = await updateUserProfile(values).unwrap();

      console.log("Updated user:", response.user);
      alert(response.message);

    } catch (error: any) {
      console.error("Update failed:", error);
      alert(error?.data?.message || "Update failed");
    } finally {

    }
  };
  return (
    <DashboardLayout
      headerProps={{
        headerText: "Profile",
        paragraph: "View & update your profile",
        linkText: "Book your session",
        href: "/bookings",
      }}
    >
      <section className='w-full rounded-lg border-[1px] border-[#F8F8F8] bg-white px-5 py-7 shadow sm:p-10'>
        {/* user data  */}
        <div className='mb-10 flex items-center gap-4 border-b-[1px] border-[#F1F1F1] pb-7'>
          <div className='flex h-[74px] w-[74px] items-center justify-center rounded-full bg-black text-[31px] font-semibold text-white uppercase sm:h-[94px] sm:w-[94px] sm:text-[40px]'>
            {userprofile?.user &&
              (userprofile?.user.first_name ? (
                <span>
                  {userprofile?.user.first_name?.slice(0, 1)}
                  {userprofile?.user.last_name?.slice(0, 1)}
                </span>
              ) : (
                <span>
                  {userprofile?.user.email?.slice(0, 1)}
                  {userprofile?.user.email?.slice(1, 2)}
                </span>
              ))}
          </div>
          <div className=''>
            <h1
              className={`mb-2 w-[200px] truncate text-[24px] font-semibold sm:w-[300px] ${userprofile?.user?.first_name ? "capitalize" : ""}`}
            >
              {userprofile?.user?.first_name
                ? `${userprofile?.user?.first_name} ${userprofile?.user?.last_name}`
                : userprofile?.user?.email}
            </h1>
            <p className='mb-1 w-[200px] truncate text-sm font-medium text-[#414141] sm:w-[300px] sm:text-[16px]'>
              {userprofile?.user?.email}
            </p>
            <p className='font-medium text-[#414141] sm:text-[16px]'>
              +234 812 345 6789
            </p>
          </div>
        </div>

        {/* Session Overview  */}
        <div className='mb-14'>
          <h4 className='mb-5 font-semibold capitalize'>session overview</h4>

          <div className='flex flex-col items-center gap-2 sm:flex-row'>
            {BOOKING_DATA.map(booking => {
              return (
                <div
                  key={booking.title}
                  className='w-full rounded-lg bg-[#FAFAFA] px-5 py-5 sm:h-[104px]'
                >
                  <p className='font-medium capitalize sm:text-[14px]'>
                    {booking.title}
                  </p>
                  <h1 className='text-[40px] font-bold'>{booking.count}</h1>
                </div>
              );
            })}
          </div>
        </div>

        {/* Personal information  */}
        <div className='mb-14'>
          <h4 className='mb-5 text-lg font-semibold capitalize'>
            personal information
          </h4>

          <div className='flex items-center gap-2'>
            {
              <Formik
                initialValues={{
                  email: userprofile?.user.email,
                  first_name: userprofile?.user.first_name || "",
                  last_name: userprofile?.user.last_name || "",
                  phoneNumber: userprofile?.user.phoneNumber || "",
                  address: userprofile?.user.address || "Update delivery address",
                }}
                onSubmit={async values => {
                  await handleSubmit(values)
                  console.log(values);
                }}
              >
                {values => (
                  <Form className='flex w-full flex-col gap-10 text-black sm:gap-20'>
                    <div className='flex w-full flex-col items-center justify-between gap-10 sm:flex-row'>
                      <div className='relative flex w-full flex-col gap-3'>
                        <label className='text-sm font-semibold text-black'>
                          First Name
                        </label>
                        <Field
                          name='first_name'
                          type='text'
                          className='border-b-[1px] border-black pb-2 capitalize outline-0 transition-all ease-in-out focus:border-b-2'
                          placeholder='Enter first name'
                          // disabled={!editFullName}
                        />
                        <div className='absolute top-8 right-2'>
                          {/* <button
                            type='button'
                            onClick={() => setEditFullName(!editFullName)}
                            className='text-sm font-medium text-black underline'
                          >
                            {editFullName ? "Save" : "Edit"}
                          </button> */}
                        </div>
                      </div>
                      <div className='relative flex w-full flex-col gap-3'>
                        <label className='text-sm font-semibold text-black'>
                          Last Name
                        </label>
                        <Field
                          name='last_name'
                          type='text'
                          className='border-b-[1px] border-black pb-2 capitalize outline-0 transition-all ease-in-out focus:border-b-2'
                          placeholder='Enter last name'
                          // disabled={!editFullName}
                        />
                        <div className='absolute top-8 right-2'>
                          {/* <button
                            type='button'
                            onClick={() => setEditFullName(!editFullName)}
                            className='text-sm font-medium text-black underline'
                          >
                            {editFullName ? "Save" : "Edit"}
                          </button> */}
                        </div>
                      </div>
                    </div>
                    <div className='flex w-full flex-col items-center justify-between gap-10 sm:flex-row'>
                      <div className='flex w-full flex-col gap-3'>
                        <label className='text-sm font-semibold text-black'>
                          Email Address
                        </label>
                        <Field
                          name='email'
                          disabled
                          type='email'
                          className='disabled border-b-[1px] border-black pb-2 outline-0 transition-all ease-in-out text-gray-600 focus:border-b-2'
                          placeholder='Enter email address'
                        />
                      </div>
                      <div className='relative flex w-full flex-col gap-3'>
                        <label className='text-sm font-semibold text-black'>
                          Phone number
                        </label>
                        <Field
                          name='phoneNumber'
                          type='text'
                          className='border-b-[1px] border-black pb-2 outline-0 transition-all ease-in-out focus:border-b-2'
                          placeholder='Enter phone number'
                          // disabled={!editPhoneNumber}
                        />
                        <div className='absolute top-8 right-2'>
                          {/* <button
                            type='button'
                            onClick={() => setEditPhoneNumber(!editPhoneNumber)}
                            className='text-sm font-medium text-black underline'
                          >
                            {editPhoneNumber ? "Save" : "Edit"}
                          </button> */}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className='relative flex w-full flex-col gap-3'>
                        <label className='text-sm font-semibold text-black'>
                          Address
                        </label>
                        <Field
                          name='address'
                          type='text'
                          className='border-b-[1px] border-black pb-2 outline-0 transition-all ease-in-out focus:border-b-2'
                          placeholder='Enter delivery address'
                          // disabled={!editAddress}
                        />
                        <div className='absolute top-8 right-2'>
                          {/* <button
                            type='button'
                            onClick={() => setEditAddress(!editAddress)}
                            className='text-sm font-medium text-black underline'
                          >
                            {editAddress ? "Save" : "Edit"}
                          </button> */}
                        </div>
                      </div>
                    </div>
                    <div className='-mt-3 flex w-full justify-end'>
                      <Button
                        text='Save changes'
                        onClick={() => console.log(values)}
                        icon={<RedirectArrowWhite />}
                        disabled={isLoading}
                        iconPosition='right'
                        className='w-[170px]'
                        size='md'
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            }
          </div>
        </div>

        {/* Settings  */}
        <div>
          <h4 className='mb-5 text-lg font-semibold capitalize'>
            Profile Settings
          </h4>

          <div className='flex items-center gap-2'>
            {
              <Formik
                initialValues={{
                  current_password: "************************",
                  new_password: "",
                }}
                onSubmit={async values => {
                  console.log(values);
                  try {
                    const response = await upDatePassword({
                      email: session?.user.email || "",
                      password: values.new_password,
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


                      dispatch(userLogOut());

                      signOut({ callbackUrl: "/auth" });

                    }
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                {({ values, isSubmitting }) => (
                  <Form className='flex w-full flex-col gap-10 text-black'>
                    <div className='flex w-full flex-col items-center justify-between gap-10 sm:flex-row'>
                      <div className='relative flex w-full flex-col gap-3'>
                        <label className='text-sm font-semibold text-black'>
                          Current password
                        </label>
                        <Field
                          name='current_password'
                          type='text'
                          className='border-b-[1px] border-black pb-2 capitalize outline-0 transition-all ease-in-out focus:border-b-2'
                          placeholder=''
                          disabled
                        />
                      </div>
                      <div className='flex w-full flex-col gap-3'>
                        <label className='text-sm font-semibold text-black'>
                          New password
                        </label>
                        <Field
                          name='new_password'
                          type='password'
                          className='disabled border-b-[1px] border-black pb-2 outline-0 transition-all ease-in-out focus:border-b-2'
                          placeholder='Enter new password'
                        />
                      </div>
                    </div>
                    <div className='-mt-3 flex w-full justify-end'>
                      <Button
                        text='Update password'
                        onClick={() => console.log(values)}
                        icon={<RedirectArrowWhite />}
                        disabled={!values.new_password || isSubmitting}
                        iconPosition='right'
                        className='w-[202px]'
                        size='md'
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            }
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DashboardProfile;
