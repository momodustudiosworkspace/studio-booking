"use client"
import React from 'react'
import AuthForm from './AuthForm'
import { Field, Form, Formik } from 'formik'
import Button from '../ui/Button'
import RedirectArrowWhite from '@/assets/icons/RedirectArrowWhite'
import { useRouter } from 'next/navigation'


const VerifyEmail = (): React.JSX.Element => {
    const router = useRouter()
    return (
        <AuthForm headerText='verify email' paragraphText={`enter 4 digit code sent to user23@gmail.com`} authForm={false}>
            <Formik initialValues={{
                otp: '',

            }} onSubmit={values => console.log(values)
            }>
                {({ values, isSubmitting }) => (
                    <Form className='flex flex-col w-full gap-10'>

                        <div className='flex flex-col gap-3 sm:text-black text-white font-medium'>
                            <label className='text-sm font-medium'>OTP</label>
                            <Field name='otp' type='text' className='border-b-[1px] outline-0 border-white sm:border-black bg-transparent focus:border-b-2 transition-all ease-in-out pb-2' placeholder="Enter OTP" />
                        </div>


                        <div className='w-full flex justify-end'>
                            <Button text='Proceed' onClick={() => {
                                router.push('/auth')
                            }
                            } icon={< RedirectArrowWhite />} disabled={values.otp.length < 5 || isSubmitting}
                                iconPosition="right" className='w-[115px]' size='md' />
                        </div>
                    </Form>
                )}
            </Formik>
        </AuthForm>
    )
}

export default VerifyEmail