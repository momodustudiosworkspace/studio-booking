"use client"
import React from 'react'
import AuthForm from './AuthForm'
import { Field, Form, Formik } from 'formik'
import Button from '../ui/Button'
import RedirectArrowWhite from '@/assets/icons/RedirectArrowWhite'
import { useRouter } from 'next/navigation'



const ResetPassword = () => {
     const router = useRouter()
    return (
        <AuthForm headerText='create new password' paragraphText={`create a new password for your account`} authForm={false} >
            <Formik initialValues={{
                password: '',
                password_2: '',
            }} onSubmit={values => console.log(values)
            }>
                {({ values, }) => (
                    <Form className='flex flex-col gap-10 text-white'>

                        <div className='flex flex-col gap-3'>
                            <label className='text-sm font-medium text-white'>Password</label>
                            <Field name='password' type='password' className='border-b-[1px] outline-0 border-white focus:border-b-2 transition-all ease-in-out pb-2' placeholder="Enter email address" />
                        </div>
                        <div className='flex  flex-col gap-3'>
                            <label className='text-sm font-medium text-white'> Confirm Password</label>
                            <Field name='password_2' type='password' className='border-b-[1px] outline-0 border-white focus:border-b-2 transition-all ease-in-out pb-2' placeholder="Enter email address" />
                        </div>
                      
                        <div className='w-full flex justify-end'>
                            <Button text='Change Password' onClick={() => {
                                console.log(values)
                                router.push('/auth')
                            }
                            } icon={< RedirectArrowWhite />}
                                iconPosition="right" className='w-[205px]' size='md' disabled={!values.password || !values.password_2} />
                        </div>
                    </Form>
                )}
            </Formik>
        </AuthForm>
    )
}

export default ResetPassword