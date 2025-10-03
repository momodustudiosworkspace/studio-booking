"use client"
import React from 'react'
import AuthForm from './AuthForm'
import { Field, Form, Formik } from 'formik'
import Button from '../ui/Button'
import RedirectArrowWhite from '@/assets/icons/RedirectArrowWhite'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


interface SignUpProps {
    signin: boolean;
    setSignin: (value: boolean) => void
}
const SignUp = ({ signin, setSignin }: SignUpProps) => {
    const router = useRouter()
    return (
        <AuthForm headerText='Create your account' paragraphText='Already have an account?' signin={signin} setSignin={() => setSignin(!signin)}>
            <Formik initialValues={{
                fname: '',
                lname: '',
                email: '',
                password: '',
                agree: false
            }} onSubmit={values => {

                console.log(values)
                router.push('/auth/verify-email')
            }
            }>
                {({ values, isSubmitting }) => (
                    <Form className='flex flex-col gap-10'>

                        <div className='flex flex-col gap-3 text-white font-medium'>
                            <label className='text-sm font-medium'>Email Address</label>
                            <Field name='email' type='email' className='border-b-[1px] outline-0 border-white bg-transparent focus:border-b-2 transition-all ease-in-out pb-2' placeholder="Enter email address" />
                        </div>
                        <div className='flex mb-8 flex-col gap-3 text-white font-medium'>
                            <label className='text-sm font-medium'>Password</label>
                            <Field name='password' type='password' className='border-b-[1px] outline-0 border-white bg-transparent focus:border-b-2 transition-all ease-in-out pb-2' placeholder="Enter email address" />
                        </div>

                        <div className='flex items-start gap-1'>
                            <Field type="checkbox" name="agree" id="agree" />
                            <span className='text-sm font-normal -mt-1'>By Signing Up, you agree to momodu studios’ <Link href={'/auth'} className='font-semibold underline'>Terms of service </Link> and <Link href={'/auth'} className='font-semibold underline'>Privacy Policy</Link></span>
                        </div>

                        <div className='w-full flex justify-end'>
                            <Button text='Sign Up' onClick={() => console.log(values)
                            } icon={< RedirectArrowWhite />} disabled={!values.agree || isSubmitting}
                                iconPosition="right" className='w-[124px]' size='md' />
                        </div>
                    </Form>
                )}
            </Formik>
        </AuthForm>
    )
}

export default SignUp