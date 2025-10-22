"use client"
import React, { useState } from 'react'
import DashboardLayout from './DashboardLayout'
import { Field, Form, Formik } from 'formik'
import Button from '../ui/Button'
import RedirectArrowWhite from '@/assets/icons/RedirectArrowWhite'

const DashboardProfile = () => {

    const [editFullName, setEditFullName] = useState<boolean>(false)
    const [editPhoneNumber, setEditPhoneNumber] = useState<boolean>(false)
    const [editLocation, setEditLocation] = useState<boolean>(false)
    const BOOKING_DATA = [
        {
            title: "total sessions",
            count: 8
        },
        {
            title: "upcoming sessions",
            count: 2
        },
        {
            title: "completed shoots",
            count: 6
        },
        {
            title: "pending sessions",
            count: 1
        },
    ]
    return (
        <DashboardLayout headerProps={
            {
                headerText: 'Profile',
                paragraph: 'Lorem ipsum dolor sit amet consectetur.',
                linkText: 'Book your session',
                href: '/'
            }
        }>
            <section className='w-full bg-white rounded-lg shadow border-[1px] border-[#F8F8F8] sm:p-10 px-5 py-7'>
                {/* user data  */}
                <div className='flex items-center gap-4 border-b-[1px] pb-7 border-[#F1F1F1] mb-10'>
                    <div className='sm:w-[94px] sm:h-[94px] w-[74px] h-[74px] sm:text-[40px] text-[31px] font-semibold rounded-full flex items-center justify-center text-white bg-black'>
                        JD
                    </div>
                    <div>
                        <h1 className='text-[24px] capitalize font-semibold mb-2'>jane doe</h1>
                        <p className='sm:text-[16px] text-[#414141] font-medium mb-1'>janedoe@gmail.com</p>
                        <p className='sm:text-[16px] text-[#414141] font-medium'>+234 812 345 6789</p>
                    </div>
                </div>


                {/* Session Overview  */}
                <div className='mb-14'>
                    <h4 className='font-semibold capitalize mb-5'>session overview</h4>

                    <div className='flex sm:flex-row flex-col items-center gap-2'>{
                        BOOKING_DATA.map((booking) => {
                            return <div key={booking.title} className='w-full sm:h-[104px] px-5 py-5 rounded-lg bg-[#FAFAFA]'>
                                <p className='capitalize sm:text-[14px] font-medium'>{booking.title}</p>
                                <h1 className='font-bold text-[40px]'>{booking.count}</h1>
                            </div>
                        })}</div>
                </div>

                {/* Personal information  */}
                <div className='mb-14'>
                    <h4 className='font-semibold capitalize mb-5'>personal information</h4>

                    <div className='flex items-center gap-2'>{
                        <Formik initialValues={{
                            name: 'jane doe',
                            email: 'jandoe@gmail.com',
                            phone: '+234 812 345 6789',
                            location: 'Lagos, Nigeria'
                        }} onSubmit={(values) => {

                            console.log(values);
                        }
                        }>
                            {() => (
                                <Form className='flex flex-col gap-10 w-full text-black'>
                                    <div className='flex sm:flex-row flex-col items-center justify-between gap-10 w-full'>
                                        <div className='relative flex flex-col gap-3 w-full'>
                                            <label className='text-sm font-medium text-black'>Full name</label>
                                            <Field name='name' type='text' className='border-b-[1px] capitalize outline-0 border-black focus:border-b-2 transition-all ease-in-out pb-2' placeholder="Enter full name" disabled={!editFullName} />
                                            <div className='absolute right-2 top-8'>
                                                <button type='button' onClick={() => setEditFullName(!editFullName)} className='underline text-sm font-medium text-black'>{editFullName ? 'Save' : 'Edit'}</button>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-3 w-full'>
                                            <label className='text-sm font-medium text-black'>Email Address</label>
                                            <Field name='email' disabled type='email' className='border-b-[1px] disabled outline-0 border-black focus:border-b-2 transition-all ease-in-out pb-2' placeholder="Enter email address" />

                                        </div>
                                    </div>
                                    <div className='flex sm:flex-row flex-col items-center justify-between gap-10 w-full'>
                                        <div className='relative flex flex-col gap-3  w-full'>
                                            <label className='text-sm font-medium text-black'>Phone number</label>
                                            <Field name='phone' type='text' className='border-b-[1px] outline-0 border-black focus:border-b-2 transition-all ease-in-out pb-2' placeholder="Enter phone number" disabled={!editPhoneNumber} />
                                            <div className='absolute right-2 top-8'>
                                                <button type='button' onClick={() => setEditPhoneNumber(!editPhoneNumber)} className='underline text-sm font-medium text-black'>{editPhoneNumber ? 'Save' : 'Edit'}</button>
                                            </div>
                                        </div>
                                        <div className='relative flex flex-col gap-3  w-full'>
                                            <label className='text-sm font-medium text-black'>Location</label>
                                            <Field name='location' type='text' className='border-b-[1px] outline-0 border-black focus:border-b-2 transition-all ease-in-out pb-2' placeholder="Enter delivery address" disabled={!editLocation} />
                                            <div className='absolute right-2 top-8'>
                                                <button type='button' onClick={() => setEditLocation(!editLocation)} className='underline text-sm font-medium text-black'>{editLocation ? 'Save' : 'Edit'}</button>
                                            </div>
                                        </div>


                                    </div>



                                </Form>
                            )}
                        </Formik>
                    }</div>
                </div>

                {/* Settings  */}
                <div>
                    <h4 className='font-semibold capitalize mb-5'>Profile Settings</h4>

                    <div className='flex items-center gap-2'>{
                        <Formik initialValues={{
                            current_password: "************************",
                            new_password: ""
                        }} onSubmit={(values) => {

                            console.log(values);
                        }
                        }>
                            {({ values, isSubmitting }) => (
                                <Form className='flex flex-col gap-10 w-full text-black'>
                                    <div className='flex sm:flex-row flex-col items-center justify-between gap-10 w-full'>
                                        <div className='relative flex flex-col gap-3 w-full'>
                                            <label className='text-sm font-medium text-black'>Current password</label>
                                            <Field name='current_password' type='text' className='border-b-[1px] capitalize outline-0 border-black focus:border-b-2 transition-all ease-in-out pb-2' placeholder="" disabled />

                                        </div>
                                        <div className='flex flex-col gap-3 w-full'>
                                            <label className='text-sm font-medium text-black'>New password</label>
                                            <Field name='new_password' type='password' className='border-b-[1px] disabled outline-0 border-black focus:border-b-2 transition-all ease-in-out pb-2' placeholder="Enter new password" />

                                        </div>
                                    </div>
                                    <div className='w-full flex justify-end -mt-3'>
                                        <Button text='Change password' onClick={() => console.log(values)
                                        } icon={< RedirectArrowWhite />} disabled={!values.new_password || isSubmitting}
                                            iconPosition="right" className='w-[224px]' size='md' />
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    }</div>
                </div>

            </section>
        </DashboardLayout>
    )
}

export default DashboardProfile