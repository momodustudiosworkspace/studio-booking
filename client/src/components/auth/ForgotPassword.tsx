"use client"
import React from 'react'
import AuthForm from './AuthForm'
import { Field, Form, Formik } from 'formik'
import Button from '../ui/Button'
import RedirectArrowWhite from '@/assets/icons/RedirectArrowWhite'
import { useRouter } from 'next/navigation'


const ForgotPassword = (): React.JSX.Element => {

    const router = useRouter()
    return (
        <AuthForm headerText='Forgot password' paragraphText={`Let’s help you get it back. enter the email account registered to your account `} authForm={false}>
            <Formik initialValues={{
                email: '',

            }} onSubmit={values => console.log(values)
            }>
                {({ values, isSubmitting }) => (
                    <Form className='flex flex-col w-full gap-10 mt-20'>

                        <div className='flex flex-col gap-3 text-white sm:text-black font-medium'>
                            <label className='text-sm font-medium capitalize'>registered email address</label>
                            <Field name='email' type='text' className='border-b-[1px] outline-0 sm:border-black border-white bg-transparent focus:border-b-2 transition-all ease-in-out pb-2' placeholder="Enter email address" />
                        </div>


                        <div className='w-full flex justify-end'>
                            <Button text='Proceed' onClick={() => {
                                router.push('/auth/otp')
                                console.log(values)
                            }
                            } icon={< RedirectArrowWhite />} disabled={values.email.length < 5 || isSubmitting}
                                iconPosition="right" className='w-[125px]' size='md' />
                        </div>
                    </Form>
                )}
            </Formik>
        </AuthForm>
    )
}

export default ForgotPassword