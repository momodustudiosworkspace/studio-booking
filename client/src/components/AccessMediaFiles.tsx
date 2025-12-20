"use client"
import Image from "next/image";
import React from "react";

const AccessMediaFiles = () => {
  return (
    <div className='bg-black py-24 sm:py-32'>
      <div className='mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='text-center text-base/7 font-semibold text-gray-400'>
          Access media files from anywhere.
        </h2>
        <p className='mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-white capitalize sm:text-5xl'>
          Moments are vital, data is insight.
        </p>


        <div className='mt-10 flex items-center sm:flex-row flex-col sm:gap-40 gap-10 sm:mt-16'>


          <Image
            width={350}
            height={100}
            quality={100}
            alt=''
            src='https://res.cloudinary.com/duwxmrkgd/image/upload/data-insight_dpyfpl'
            className='rounded-2xl shadow-2xl'
          />



          <div className='relative lg:row-span-2 h-[650px]'>
            <div className='absolute inset-px rounded-lg bg-black max-lg:rounded-b-4xl lg:rounded-r-4xl' />
            <div className='relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]'>
              <div className='px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0'>
                <p className='mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center'>
                  Automated Studio Session
                </p>
                <p className='mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center'>
                  Stay informed with automated notifications for bookings,
                  payments, and session reminders.
                </p>
              </div>
              <div className='relative min-h-120 w-full grow'>
                <div className='absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl outline outline-white/10'>
                  <div className='flex bg-black outline outline-white/5'>
                    <div className='-mb-px flex text-sm/6 font-medium text-gray-400'>
                      <div className='border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white'>
                        Booking Notifications
                      </div>
                      <div className='border-r border-gray-600/10 px-4 py-2'>
                        Payment
                      </div>
                    </div>
                  </div>
                  <div className='px-6 pt-6 pb-14'>
                    {/* Your code example */}
                    <div>
                      <ul>
                        <li className='mb-2 rounded-xl bg-white p-4 text-black'>
                          <h5 className='text-sm font-bold'>
                            Booking session successful!
                          </h5>
                          <p className='text-xs'>
                            Your studio session has been booked for Fri 20, Dec
                            2025 at 2pm
                          </p>
                        </li>
                        <li className='rounded-xl bg-white p-4 text-black'>
                          <h5 className='text-sm font-bold'>
                            Payment received
                          </h5>
                          <p className='text-xs'>
                            You have successful paid $150.00 for your studio
                            session
                          </p>
                        </li>
                        <li className='mt-2 rounded-xl bg-white p-4 text-black'>
                          <h5 className='text-sm font-bold'>
                            Reminder: Studio session tomorrow
                          </h5>
                          <p className='text-xs'>
                            This is a reminder for your studio session scheduled
                            for tomorrow at 2pm
                          </p>
                        </li>
                        <li className='mt-2 rounded-xl bg-white p-4 text-black'>
                          <h5 className='text-sm font-bold'>
                            Studio session completed
                          </h5>
                          <p className='text-xs'>
                            Your studio session on Fri 20, Dec 2025 has been
                            completed. Thank you!
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-b-4xl lg:rounded-r-4xl' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessMediaFiles;
