"use client"
import React from 'react'
import AuthForm from './AuthForm'
import { Field, Form, Formik } from 'formik'
import Button from '../ui/Button'
import RedirectArrowWhite from '@/assets/icons/RedirectArrowWhite'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'
import { AuthToast } from '../toast/ToastMessage'

interface SignProps {
    signin: boolean;
    setSignin: (value: boolean) => void
}
const SignIn = ({ signin, setSignin }: SignProps): React.JSX.Element => {

    return (
        <AuthForm headerText='Log in to your account' paragraphText={`Don't have an account?`} signin={signin} setSignin={() => setSignin(!signin)}>
            <Formik initialValues={{
                fname: '',
                lname: '',
                email: '',
                password: ''
            }} onSubmit={async (values) => {


                const res = await signIn('credentials', {
                    redirect: false,
                    email: values.email,
                    password: values.password,
                });

                if (!res?.ok) {
                    console.log("!res.ok: ", res);

                }
                if (res?.error) {
                    // console.log(res?.error);
                    console.log('res: ', res?.error);
                    // showToastNotification(
                    //     {
                    //         header: 'Error',
                    //         body: `Invalid credentials`,
                    //     },
                    //     <KeyIcon />
                    // );
                } else {
                    // router.push('/dashboard');
                    // router.push('/');
                    console.log(res);
                }
            }
            }>
                {({ values, }) => (
                    <Form className='flex flex-col gap-10 text-white'>

                        <div className='flex flex-col gap-3'>
                            <label className='text-sm font-medium text-white'>Email Address</label>
                            <Field name='email' type='email' className='border-b-[1px] outline-0 border-white focus:border-b-2 transition-all ease-in-out pb-2' placeholder="Enter email address" />
                        </div>
                        <div className='flex  flex-col gap-3'>
                            <label className='text-sm font-medium text-white'>Password</label>
                            <Field name='password' type='password' className='border-b-[1px] outline-0 border-white focus:border-b-2 transition-all ease-in-out pb-2' placeholder="Enter email address" />
                        </div>

                        <div className='w-full flex mb-8 justify-end'>
                            <Link href={'/auth/forgot-password'} className='underline text-white'>Forgot password?</Link>
                        </div>


                        <div className='w-full flex justify-end'>
                            <Button text='Log In' onClick={() => console.log(values)
                            } icon={< RedirectArrowWhite />}
                                iconPosition="right" className='w-[110px]' size='md' />
                        </div>
                    </Form>
                )}
            </Formik>
        </AuthForm>
    )
}

export default SignIn