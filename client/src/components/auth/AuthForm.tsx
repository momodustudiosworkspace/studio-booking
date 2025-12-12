import React from "react";
import { BaseIcons } from "@/assets/icons/BaseIcons";
import Link from "next/link";
import { signIn } from "next-auth/react";
import LogoBlack from "@/assets/LogoBlack";
import Image from "next/image";
import { HomeIcons } from "@/assets/icons/home/HomeIcons";
import { useSearchParams } from "next/navigation";

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
  // imgUrl,
  adminAuth = false,
  authForm = true,
}: AuthFormProps): React.JSX.Element => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const callBackUrl = redirectTo ? redirectTo : "/dashboard";
  // const { data: session } = useSession();

  // if (session) {
  //   console.log(session.user.accessToken);

  // }

  return (
    <div className='mt-10 h-full w-full text-white sm:mt-0 sm:flex sm:text-black'>
      <div
        className={`relative hidden h-full w-[50%] ${adminAuth && "flex flex-col items-center justify-center bg-black"} sm:flex`}
      >
        <div className='absolute h-full w-full'></div>

        {/* User auth  */}
        {!adminAuth && (
          // <Image
          //   src={imgUrl ? imgUrl : "/auth/auth-image.jpg"}
          //   alt=''
          //   width={200}
          //   height={100}
          //   className='h-full w-full object-cover object-left'
          //   quality={100}
          // />
          <div className="w-full h-full bg-black">
            <div
              aria-hidden='true'
              className='pointer-events-none lg:absolute lg:inset-y-0 lg:w-full lg:max-w-7xl'
            >
              <div className='absolute transform pt-52 sm:top-0  sm:translate-x-8 lg:top-1/2 lg:left-28 lg:translate-x-8 lg:-translate-y-1/2 lg:pt-0'>
                <div className='flex items-center space-x-6 lg:space-x-8'>
                  <div className='grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                    <div className='h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100'>
                      <Image
                        width={100}
                        height={100}
                        alt=''
                        src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg'
                        className='size-full object-cover'
                      />
                    </div>
                    {/* <div className='h-64 w-44 overflow-hidden rounded-lg'>
                      <Image
                        width={100}
                        height={100}
                        alt=''
                        src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg'
                        className='size-full object-cover'
                      />
                    </div> */}
                  </div>
                  <div className='grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                    {/* <div className='h-64 w-44 overflow-hidden rounded-lg'>
                      <Image
                        width={100}
                        height={100}
                        alt=''
                        src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg'
                        className='size-full object-cover'
                      />
                    </div> */}
                    <div className='h-64 w-44 overflow-hidden rounded-lg'>
                      <Image
                        width={100}
                        height={100}
                        alt=''
                        src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg'
                        className='size-full object-cover'
                      />
                    </div>
                    <div className='h-64 w-44 overflow-hidden rounded-lg'>
                      <Image
                        width={100}
                        height={100}
                        alt=''
                        src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg'
                        className='size-full object-cover'
                      />
                    </div>
                  </div>
                  <div className='grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                    <div className='h-64 w-44 overflow-hidden rounded-lg'>
                      <Image
                        width={100}
                        height={100}
                        alt=''
                        src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg'
                        className='size-full object-cover'
                      />
                    </div>
                    {/* <div className='h-64 w-44 overflow-hidden rounded-lg'>
                      <Image
                        width={100}
                        height={100}
                        alt=''
                        src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg'
                        className='size-full object-cover'
                      />
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-20 left-1/2 max-w-md">
                <h3 className="text-white">Manage all of your media data in one place.</h3>
              </div>
            </div>
          </div>
        )}
        {
          // Admin auth
          adminAuth && (
            <div className='flex flex-col gap-20 sm:w-[599px]'>
              <BaseIcons value='logo-white' />
              <div className='relative rounded-2xl bg-[#434242] sm:h-[520px] sm:w-[599px]'>
                <div className='flex h-full w-full items-end justify-end'>
                  <HomeIcons value='landing-page' />
                </div>
              </div>
              <div>
                <p className='text-[34px] text-white'>
                  Track bookings, sales, and analyze studio session data—all in
                  one place.
                </p>
              </div>
            </div>
          )
        }
      </div>

      <div className='flex w-full flex-col sm:w-[50%] sm:items-center sm:justify-center'>
        <div className='w-full sm:w-[450px]'>
          {/* Logo mobile */}
          <div className='flex w-[170px] sm:hidden'>
            <Link href={"/web"}>
              {" "}
              <BaseIcons value='logo-white' />
            </Link>
          </div>
          {!adminAuth && (
            <div className='hidden w-[170px] sm:flex'>
              <LogoBlack desktop={true} />
            </div>
          )}

          <div className='mt-20 flex flex-col gap-2'>
            <h1 className='text-[28px] font-extrabold'>{headerText}</h1>
            {!adminAuth && (
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
            )}
          </div>

          {/* Google auth button  */}
          {authForm && !adminAuth && (
            <>
              {" "}
              <button
                onClick={() =>
                  signIn("google", {
                    callbackUrl: callBackUrl,
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
