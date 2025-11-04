import React from "react";
import { BaseIcons } from "@/assets/icons/BaseIcons";
import Link from "next/link";
import { signIn } from "next-auth/react";
import LogoBlack from "@/assets/LogoBlack";
import Image from "next/image";
import { HomeIcons } from "@/assets/icons/home/HomeIcons";

interface AuthFormProps {
  children: React.ReactNode;
  headerText: string;
  imgUrl?: string;
  paragraphText: string | React.ReactNode;
  authForm?: boolean;
  signin?: boolean | undefined;
  adminAuth?: boolean;
  setSignin?: (value: boolean) => void;
}
const AuthForm = ({
  children,
  signin,
  setSignin,
  headerText,
  paragraphText,
  imgUrl,
  adminAuth = false,
  authForm = true,
}: AuthFormProps): React.JSX.Element => {



  return (
    <div className='mt-10 h-full w-full text-white sm:mt-0 sm:flex sm:text-black'>
      <div className={`relative hidden h-full w-[50%] ${adminAuth && "bg-black flex flex-col justify-center items-center"} sm:flex`}>

        <div className='absolute h-full w-full'></div>

        {/* User auth  */}
        {!adminAuth && !imgUrl && <Image
          src={imgUrl ? imgUrl : "/auth/auth-image.jpg"}
          alt=''
          width={200}
          height={100}
          className='h-full w-full object-cover object-left'
          quality={100}
        />}
        {

          // Admin auth 
          adminAuth && <div className="flex flex-col sm:w-[599px] gap-20">

            <BaseIcons value='logo-white' />
            <div className="relative bg-[#434242] rounded-2xl sm:w-[599px] sm:h-[520px]">
              <div className="flex items-end justify-end w-full h-full">
                <HomeIcons value="landing-page" />
              </div>
            </div>
            <div>
              <p className="text-white text-[34px]">Track bookings, sales, and analyze studio session data—all in one place.</p>
            </div>
          </div>
        }
      </div>

      <div className='flex w-full flex-col sm:w-[50%] sm:items-center sm:justify-center'>
        <div className='w-full sm:w-[450px]'>
          <div className='flex w-[170px] sm:hidden'>
            <Link href={"/"}>
              {" "}
              <BaseIcons value='logo-white' />
            </Link>
          </div>
          {!adminAuth && <div className='hidden w-[170px] sm:flex'>
            <LogoBlack desktop={true} />
          </div>
          }

          <div className='mt-20 flex flex-col gap-2'>
            <h1 className='text-[28px] font-extrabold'>{headerText}</h1>
            {!adminAuth && <div className='flex items-center gap-1'>
              <p>{paragraphText}</p>
              {setSignin && (
                <button
                  className={`bg-transparent text-white underline hover:cursor-pointer sm:text-black`}
                  onClick={() => setSignin?.(!signin)}
                >
                  {signin ? "Sign Up" : "Log In"}
                </button>
              )}
            </div>}
          </div>

          {/* Google auth button  */}
          {authForm && !adminAuth && (
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
