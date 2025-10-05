import React from 'react'
import { BaseIcons } from '@/assets/icons/BaseIcons';
import Link from 'next/link';
import { signIn } from 'next-auth/react';


interface AuthFormProps {
    children: React.ReactNode;
    headerText: string;
    paragraphText: string | React.ReactNode;
    authForm?: boolean;
    signin?: boolean | undefined;
    setSignin?: (value: boolean) => void
}
const AuthForm = ({ children, signin, setSignin, headerText, paragraphText, authForm = true }: AuthFormProps): React.JSX.Element => {
    return (
        <div className='text-white mt-10 h-full w-full'>

            <div className='w-[170px]'>
                <Link href={'/'}> <BaseIcons value='logo-white' /></Link>
            </div>

            <div className="flex flex-col gap-2 mt-20">
                <h1 className="text-[28px] font-extrabold">{headerText}</h1>
                <div className='flex items-center gap-1'>
                    <p>{paragraphText}</p>
                    {setSignin && <button className={`bg-transparent text-white underline`} onClick={() => setSignin?.(!signin)}>{signin ? 'Sign Up' : 'Log In'}</button>
                    }
                </div>
            </div>


            {/* Google auth button  */}
            {authForm && <> <button onClick={() => signIn("google", {
                callbackUrl: "/dashboard",
            })} className='bg-[#FAFAFA] rounded-full w-full flex items-center justify-center h-12 gap-2 text-[14px] my-10'><BaseIcons value='google' /> <span className='font-semibold text-black'>Sign {signin ? 'in' : 'up'} with Google</span></button>

                <div className='flex items-center justify-between gap-1 mb-10'>
                    <div className='h-[0.5px] bg-gray-300 w-[150px]'></div>
                    <p className='text-md'>or</p>
                    <div className='h-[0.5px] bg-gray-300 w-[150px]'></div>
                </div></>}
            <div className='mb-5 mt-10'>
                {children}
            </div>

        </div>
    )
}

export default AuthForm