import Image from "next/image";
import Link from "next/link";
import React from "react";

const JoinStudioCommunity = () => {
  return (
    <div className='bg-gradient-to-b'>
      <div className='mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8'>
        <div className='relative isolate overflow-hidden bg-black px-6 pt-16 after:pointer-events-none after:absolute after:inset-0 after:inset-ring after:inset-ring-white/10 sm:rounded-3xl sm:px-16 after:sm:rounded-3xl md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0'>
          <svg
            viewBox='0 0 1024 1024'
            aria-hidden='true'
            className='absolute top-1/2 left-1/2 -z-10 size-256 -translate-y-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0'
          >
            <circle
              r={512}
              cx={512}
              cy={512}
              fill='url(#759c1415-0410-454c-8f7c-9a820de03641)'
              fillOpacity='0.7'
            />
            <defs>
              <radialGradient id='759c1415-0410-454c-8f7c-9a820de03641'>
                <stop stopColor='#7775D6' />
                <stop offset={1} stopColor='#E935C1' />
              </radialGradient>
            </defs>
          </svg>
          <div className='mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left'>
            <h2 className='text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl'>
              Join our Studio Community Today
            </h2>
            <p className='mt-6 text-lg/8 text-pretty text-gray-300'>
              Become a part of a vibrant community of creators and innovators.
              Connect, collaborate, and grow with like-minded individuals who
              share your passion for excellence in studio production.
            </p>
            <div className='mt-5 flex -space-x-2 overflow-hidden'>
              <Image
                width={100}
                height={100}
                src='https://res.cloudinary.com/duwxmrkgd/image/upload/Momodumedia_5_bbjmrb'
                alt=''
                className='inline-block size-10 rounded-full ring-2 ring-gray-900 outline -outline-offset-1 outline-white/10'
              />
              <Image
                width={100}
                height={100}
                src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                alt=''
                className='inline-block size-10 rounded-full ring-2 ring-gray-900 outline -outline-offset-1 outline-white/10'
              />
              <Image
                width={100}
                height={100}
                src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
                alt=''
                className='inline-block size-10 rounded-full ring-2 ring-gray-900 outline -outline-offset-1 outline-white/10'
              />
              <Image
                width={100}
                height={100}
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                alt=''
                className='inline-block size-10 rounded-full ring-2 ring-gray-900 outline -outline-offset-1 outline-white/10'
              />
              <p className='mt-2 ml-3 font-semibold text-white'>
                over +2,500 members
              </p>
            </div>
            <div className='mt-5 flex items-center justify-center gap-x-6 lg:justify-start'>
              <Link
                href='/auth'
                className='rounded-md bg-gray-700 px-3.5 py-2.5 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
              >
                {" "}
                Join Now
              </Link>
              <Link
                href='#'
                className='text-sm/6 font-semibold text-white hover:text-gray-100'
              >
                Learn more
                <span aria-hidden='true'>→</span>
              </Link>
            </div>
          </div>
          <div className='relative mt-16 h-80 lg:mt-8'>
            <Image
              alt='App screenshot'
              src='https://res.cloudinary.com/duwxmrkgd/image/upload/Screenshot_2025-12-20_at_23.18.03_lukmgu'
              width={1824}
              height={1080}
              className='absolute top-0 left-0 w-228 max-w-none rounded-md bg-white/5 ring-1 ring-white/10'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinStudioCommunity;
