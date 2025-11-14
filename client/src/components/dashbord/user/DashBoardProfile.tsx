"use client";
import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { Field, Form, Formik } from "formik";
import Button from "../../ui/Button";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import { useGetUserProfileQuery } from "@/redux/services/user/user/user.api";

const DashboardProfile = () => {
  const [editFullName, setEditFullName] = useState<boolean>(false);
  const [editPhoneNumber, setEditPhoneNumber] = useState<boolean>(false);
  const [editAddress, setEditAddress] = useState<boolean>(false);

  const { data: userprofile, isLoading: userProfileLoading } = useGetUserProfileQuery()

  console.log("use profile: ", userprofile);

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

  if (userProfileLoading) return "Loading profile"
  return (
    <DashboardLayout
      headerProps={{
        headerText: "Profile",
        paragraph: "View & update your profile",
        linkText: "Book your session",
        href: "/",
      }}
    >
      <section className='w-full rounded-lg border-[1px] border-[#F8F8F8] bg-white px-5 py-7 shadow sm:p-10'>
        {/* user data  */}
        <div className='mb-10 flex items-center gap-4 border-b-[1px] border-[#F1F1F1] pb-7'>
          <div className='flex h-[74px] w-[74px] items-center justify-center rounded-full bg-black text-[31px] font-semibold text-white sm:h-[94px] sm:w-[94px] sm:text-[40px] uppercase'>
            {userprofile?.user && (userprofile?.user.first_name ? <span>{userprofile?.user.first_name?.slice(0, 1)}{userprofile?.user.last_name?.slice(0, 1)}</span> : <span>{userprofile?.user.email?.slice(0, 1)}{userprofile?.user.email?.slice(1, 2)}</span>)}
          </div>
          <div className="">
            <h1 className={`mb-2 text-[24px] sm:w-[300px] w-[200px] truncate font-semibold ${userprofile?.user?.first_name ? "capitalize" : ""}`}>
              {
                userprofile?.user?.first_name ? `${userprofile?.user?.first_name} ${userprofile?.user?.last_name}` : userprofile?.user?.email
              }

            </h1>
            <p className='mb-1 font-medium sm:w-[300px] w-[200px] text-sm truncate text-[#414141] sm:text-[16px]'>
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
          <h4 className='mb-5 font-semibold capitalize'>
            personal information
          </h4>

          <div className='flex items-center gap-2'>
            {
              <Formik
                initialValues={{
                  name: "jane doe",
                  email: "jandoe@gmail.com",
                  phone: "+234 812 345 6789",
                  address: "Lagos, Nigeria",
                }}
                onSubmit={values => {
                  console.log(values);
                }}
              >
                {() => (
                  <Form className='flex w-full flex-col gap-10 text-black'>
                    <div className='flex w-full flex-col items-center justify-between gap-10 sm:flex-row'>
                      <div className='relative flex w-full flex-col gap-3'>
                        <label className='text-sm font-medium text-black'>
                          Full name
                        </label>
                        <Field
                          name='name'
                          type='text'
                          className='border-b-[1px] border-black pb-2 capitalize outline-0 transition-all ease-in-out focus:border-b-2'
                          placeholder='Enter full name'
                          disabled={!editFullName}
                        />
                        <div className='absolute top-8 right-2'>
                          <button
                            type='button'
                            onClick={() => setEditFullName(!editFullName)}
                            className='text-sm font-medium text-black underline'
                          >
                            {editFullName ? "Save" : "Edit"}
                          </button>
                        </div>
                      </div>
                      <div className='flex w-full flex-col gap-3'>
                        <label className='text-sm font-medium text-black'>
                          Email Address
                        </label>
                        <Field
                          name='email'
                          disabled
                          type='email'
                          className='disabled border-b-[1px] border-black pb-2 outline-0 transition-all ease-in-out focus:border-b-2'
                          placeholder='Enter email address'
                        />
                      </div>
                    </div>
                    <div className='flex w-full flex-col items-center justify-between gap-10 sm:flex-row'>
                      <div className='relative flex w-full flex-col gap-3'>
                        <label className='text-sm font-medium text-black'>
                          Phone number
                        </label>
                        <Field
                          name='phone'
                          type='text'
                          className='border-b-[1px] border-black pb-2 outline-0 transition-all ease-in-out focus:border-b-2'
                          placeholder='Enter phone number'
                          disabled={!editPhoneNumber}
                        />
                        <div className='absolute top-8 right-2'>
                          <button
                            type='button'
                            onClick={() => setEditPhoneNumber(!editPhoneNumber)}
                            className='text-sm font-medium text-black underline'
                          >
                            {editPhoneNumber ? "Save" : "Edit"}
                          </button>
                        </div>
                      </div>
                      <div className='relative flex w-full flex-col gap-3'>
                        <label className='text-sm font-medium text-black'>
                          Address
                        </label>
                        <Field
                          name='address'
                          type='text'
                          className='border-b-[1px] border-black pb-2 outline-0 transition-all ease-in-out focus:border-b-2'
                          placeholder='Enter delivery address'
                          disabled={!editAddress}
                        />
                        <div className='absolute top-8 right-2'>
                          <button
                            type='button'
                            onClick={() => setEditAddress(!editAddress)}
                            className='text-sm font-medium text-black underline'
                          >
                            {editAddress ? "Save" : "Edit"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            }
          </div>
        </div>

        {/* Settings  */}
        <div>
          <h4 className='mb-5 font-semibold capitalize'>Profile Settings</h4>

          <div className='flex items-center gap-2'>
            {
              <Formik
                initialValues={{
                  current_password: "************************",
                  new_password: "",
                }}
                onSubmit={values => {
                  console.log(values);
                }}
              >
                {({ values, isSubmitting }) => (
                  <Form className='flex w-full flex-col gap-10 text-black'>
                    <div className='flex w-full flex-col items-center justify-between gap-10 sm:flex-row'>
                      <div className='relative flex w-full flex-col gap-3'>
                        <label className='text-sm font-medium text-black'>
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
                        <label className='text-sm font-medium text-black'>
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
                        text='Change password'
                        onClick={() => console.log(values)}
                        icon={<RedirectArrowWhite />}
                        disabled={!values.new_password || isSubmitting}
                        iconPosition='right'
                        className='w-[224px]'
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
