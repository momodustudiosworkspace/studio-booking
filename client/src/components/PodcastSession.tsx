"use client";
import React from "react";

const PodcastSession = () => {
  return (
    <div className='relative isolate overflow-hidden bg-gradient-to-b from-black to-black px-6 pb-14 pt-20  sm:py-32 lg:overflow-visible lg:px-0'>
      {/* <div className="bg-black"> */}

      <div className='relative isolate px-6 lg:px-8'>
        <div
          aria-hidden='true'
          className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className='relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-white to-white opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75'
          />
        </div>
        <div className='mx-auto max-w-2xl pb-32'>
          <div className='mb-8 sm:flex sm:justify-center'>
            <div className='relative rounded-full px-3 py-1 text-center text-sm/6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20'>
              Announcing our next podcast session.{" "}
            </div>
          </div>
          <div className='mb-8 flex justify-center rounded-xl'>
            <a
              href='https://www.youtube.com/@momodustudios'
              className='flex items-center text-sm/6 font-semibold text-white'
            >
              <svg
                style={{
                  color: "red",
                  background: "white",
                  borderRadius: "20px",
                  width: "60px",
                  height: "50px",
                }}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='size-6'
              >
                <path
                  fillRule='evenodd'
                  d='M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z'
                  clipRule='evenodd'
                />
              </svg>
              <p className='pl-3 text-white'>Watch on Youtube!</p>
            </a>
          </div>

          <div className='text-center'>
            <h1 className='text-3xl font-semibold tracking-tight text-balance text-white sm:text-7xl'>
              Elevate Your Podcast Sessions
            </h1>
            <p className='mt-8 font-medium text-pretty text-gray-400 sm:text-xl/8'>
              Join us for an immersive podcast experience where creativity meets
              technology. Our state-of-the-art studio is designed to bring your
              voice to life with crystal-clear sound quality and
              professional-grade equipment.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <a
                href='/auth'
                className='rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black shadow-xs hover:bg-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-none'
              >
                Get started
              </a>
              <a href='#' className='text-sm/6 font-semibold text-white'>
                Learn more <span aria-hidden='true'>→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden='true'
          className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className='relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-white to-white opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75'
          />
        </div>
      </div>
    </div>
  );
};

export default PodcastSession;
