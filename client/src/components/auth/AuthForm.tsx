import React from 'react'
import { BaseIcons } from '@/assets/icons/BaseIcons';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import LogoBlack from '@/assets/LogoBlack';
import Image from 'next/image';


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
        <div className='sm:text-black text-white sm:mt-0 mt-10 h-full w-full sm:flex'>

            <div className="hidden relative sm:flex w-[50%] h-full">
                <div className="absolute  h-full w-full"></div>
                <Image src="/auth/auth-image.jpg" alt="" width={200} height={100} className="object-cover object-left w-full hifull" quality={100} />
            </div>


            <div className='flex sm:w-[50%] w-full sm:justify-center sm:items-center flex-col'>
                <div className='w-full sm:w-[450px]'>
                    <div className='sm:hidden flex w-[170px]'>
                        <Link href={'/'}> <BaseIcons value='logo-white' /></Link>
                    </div>
                    <div className='hidden  sm:flex w-[170px]'>
                        <LogoBlack desktop={true} />
                    </div>

                    <div className="flex flex-col gap-2 mt-20">
                        <h1 className="text-[28px] font-extrabold">{headerText}</h1>
                        <div className='flex items-center gap-1'>
                            <p>{paragraphText}</p>
                            {setSignin && <button className={`bg-transparent hover:cursor-pointer sm:text-black text-white underline`} onClick={() => setSignin?.(!signin)}>{signin ? 'Sign Up' : 'Log In'}</button>
                            }
                        </div>
                    </div>


                    {/* Google auth button  */}
                    {authForm && <> <button onClick={() => signIn("google", {
                        callbackUrl: "/dashboard",
                    })} className='bg-[#FAFAFA] hover:cursor-pointer rounded-full w-full flex items-center justify-center h-12 gap-2 text-[14px] my-10'><BaseIcons value='google' /> <span className='font-semibold text-black'>Sign {signin ? 'in' : 'up'} with Google</span></button>

                        <div className='flex items-center justify-between gap-1 mb-10'>
                            <div className='h-[0.5px] sm:bg-black bg-gray-300 w-[150px]'></div>
                            <p className='text-md'>or</p>
                            <div className='h-[0.5px] sm:bg-black bg-gray-300 w-[150px]'></div>
                        </div></>}
                    <div className='mb-5 w-full sm:mt-0 mt-10 sm:flex sm:items-start items-center '>
                        {children}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AuthForm