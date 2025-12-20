import React from "react";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";

const BetterWorkFlow = () => {
  return (
    <div className='relative isolate overflow-hidden bg-black px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0'>
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <svg
          aria-hidden='true'
          className='absolute top-0 left-[max(50%,25rem)] h-256 w-512 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-800'
        >
          <defs>
            <pattern
              x='50%'
              y={-1}
              id='e813992c-7d03-4cc4-a2bd-151760b470a0'
              width={200}
              height={200}
              patternUnits='userSpaceOnUse'
            >
              <path d='M100 200V.5M.5 .5H200' fill='none' />
            </pattern>
          </defs>
          <svg x='50%' y={-1} className='overflow-visible fill-gray-800/50'>
            <path
              d='M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z'
              strokeWidth={0}
            />
          </svg>
          <rect
            fill='url(#e813992c-7d03-4cc4-a2bd-151760b470a0)'
            width='100%'
            height='100%'
            strokeWidth={0}
          />
        </svg>
      </div>
      <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10'>
        <div className='lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
          <div className='lg:pr-4'>
            <div className='lg:max-w-lg'>
              <p className='text-base/7 font-semibold text-white'>
                Studio Journey
              </p>
              <h1 className='mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl'>
                A better studio session experience
              </h1>
              <p className='mt-6 text-xl/8 text-gray-300'>
                Streamline your studio sessions with our all-in-one platform
                designed to enhance productivity and collaboration.
              </p>
            </div>
          </div>
        </div>
        <div className='-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden'>
          <Image
            width={500}
            height={100}
            quality={100}
            // priority={true}
            alt=''
            src='https://res.cloudinary.com/duwxmrkgd/image/upload/Screenshot_2025-12-20_at_23.19.09_uygkpg'
            className='w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-228'
          />
        </div>
        <div className='lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
          <div className='lg:pr-4'>
            <div className='max-w-xl text-base/7 text-gray-400 lg:max-w-lg'>
              <p>
                Our platform offers a seamless workflow that integrates
                scheduling, client management, and media delivery, allowing you
                to focus on what matters most – capturing unforgettable moments.
              </p>
              <ul role='list' className='mt-8 space-y-8 text-gray-400'>
                <li className='flex gap-x-3'>
                  <CloudArrowUpIcon
                    aria-hidden='true'
                    className='mt-1 size-5 flex-none text-white'
                  />
                  <span>
                    <strong className='pr-2 font-semibold text-white'>
                      Cloud storage and sharing:
                    </strong>
                    Store and share your media files securely in the cloud,
                    accessible from anywhere at any time.
                  </span>
                </li>
                <li className='flex gap-x-3'>
                  <LockClosedIcon
                    aria-hidden='true'
                    className='mt-1 size-5 flex-none text-white'
                  />
                  <span>
                    <strong className='pr-2 font-semibold text-white'>
                      Advanced security features.
                    </strong>
                    Protect your data with industry-leading security measures,
                    ensuring your clients&apos; privacy and trust.
                  </span>
                </li>
                <li className='flex gap-x-3'>
                  <ServerIcon
                    aria-hidden='true'
                    className='mt-1 size-5 flex-none text-white'
                  />
                  <span>
                    <strong className='font-semibold text-white'>
                      Database backups.
                    </strong>
                    Enjoy peace of mind with automated backups, safeguarding
                    your valuable media and client information.
                  </span>
                </li>
              </ul>
              <p className='mt-8'>
                Elevate your studio sessions with our intuitive platform,
                designed to simplify your workflow and enhance your creative
                process.
              </p>
              <h2 className='mt-16 text-2xl font-bold tracking-tight text-white'>
                Ready to get started?
              </h2>
              <p className='mt-6'>
                Join countless clients, photographers and media production teams
                who have transformed their workflow with our platform. Sign up
                today and experience the difference!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BetterWorkFlow;
