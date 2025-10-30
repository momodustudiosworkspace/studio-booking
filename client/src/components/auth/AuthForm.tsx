import React from "react";
import { BaseIcons } from "@/assets/icons/BaseIcons";
import Link from "next/link";
import { signIn } from "next-auth/react";
import LogoBlack from "@/assets/LogoBlack";
import Image from "next/image";

interface AuthFormProps {
  children: React.ReactNode;
  headerText: string;
  paragraphText: string | React.ReactNode;
  authForm?: boolean;
  signin?: boolean | undefined;
  setSignin?: (value: boolean) => void;
}
const AuthForm = ({
  children,
  signin,
  setSignin,
  headerText,
  paragraphText,
  authForm = true,
}: AuthFormProps): React.JSX.Element => {



  return (
    <div className='mt-10 h-full w-full text-white sm:mt-0 sm:flex sm:text-black'>
      <div className='relative hidden h-full w-[50%] sm:flex'>
        <div className='absolute h-full w-full'></div>
        <Image
          src='/auth/auth-image.jpg'
          alt=''
          width={200}
          height={100}
          className='hifull w-full object-cover object-left'
          quality={100}
        />
      </div>

      <div className='flex w-full flex-col sm:w-[50%] sm:items-center sm:justify-center'>
        <div className='w-full sm:w-[450px]'>
          <div className='flex w-[170px] sm:hidden'>
            <Link href={"/"}>
              {" "}
              <BaseIcons value='logo-white' />
            </Link>
          </div>
          <div className='hidden w-[170px] sm:flex'>
            <LogoBlack desktop={true} />
          </div>

          <div className='mt-20 flex flex-col gap-2'>
            <h1 className='text-[28px] font-extrabold'>{headerText}</h1>
            <div className='flex items-center gap-1'>
              <p>{paragraphText}</p>
              {setSignin && (
                <button
                  className={`bg-transparent text-white underline hover:cursor-pointer sm:text-black`}
                  onClick={() => setSignin?.(!signin)}
                >
                  {signin ? "Sign Up" : "Log In"}
                </button>
              )}
            </div>
          </div>

          {/* Google auth button  */}
          {authForm && (
            <>
              {" "}
              <button
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "/dashboard",
                  })
                }
                className='my-10 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#FAFAFA] text-[14px] hover:cursor-pointer'
              >
                <BaseIcons value='google' />{" "}
                <span className='font-semibold text-black'>
                  Sign {signin ? "in" : "up"} with Google
                </span>
              </button>
              <div className='mb-10 flex items-center justify-between gap-1'>
                <div className='h-[0.5px] w-[150px] bg-gray-300 sm:bg-black'></div>
                <p className='text-md'>or</p>
                <div className='h-[0.5px] w-[150px] bg-gray-300 sm:bg-black'></div>
              </div>
            </>
          )}
          <div className='mt-10 mb-5 w-full items-center sm:mt-0 sm:flex sm:items-start'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
