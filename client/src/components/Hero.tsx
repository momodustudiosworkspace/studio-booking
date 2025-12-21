import Image from "next/image";
import React from "react";
import GroupIcons from "./GroupIcons";
import Link from "next/link";

const Hero = () => {
  return (
    <div className='relative overflow-hidden bg-black pt-32 sm:pt-72 lg:pb-20'>
      <div className='pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48'>
        <div className='relative mx-auto max-w-7xl sm:static sm:px-6 lg:px-8'>
          <div className='sm:max-w-lg px-4 sm:px-0'>
            <h1 className='text-4xl font-bold tracking-tight text-white capitalize sm:text-6xl'>
              Every moment is data saved in memory — .
            </h1>
            <p className='mt-4 text-xl text-gray-500'>
              Automating media production and delivery for users, brands and
              creatives. Manage & organize your journey
            </p>
          </div>
          <div className="px-4 sm:px-0 sm:h-auto h-[700px]">
            <div className='mt-10'>
              {/* Decorative image grid */}
              <div
                aria-hidden='true'
                className='pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl'
              >
                <div className='absolute transform pt-52 sm:top-0 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:translate-x-8 lg:-translate-y-1/2 lg:pt-0'>
                  <div className='flex items-center sm:space-x-6 space-x-3 lg:space-x-8'>
                    <div className='grid shrink-0 grid-cols-1 sm:gap-y-6 gap-y-3 lg:gap-y-8'>
                      <div className='sm:h-64 w-[165px] sm:w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100'>
                        <Image
                          width={100}
                          height={100}
                          alt=''
                          src='https://res.cloudinary.com/duwxmrkgd/image/upload/MomoduMedia-3_9_bw0jne'
                          className='size-full object-cover'
                        />
                      </div>
                      <div className='sm:h-64 w-[165px] sm:w-44 overflow-hidden rounded-lg'>
                        <Image
                          width={100}
                          height={100}
                          alt=''
                          // src='https://res.cloudinary.com/duwxmrkgd/image/upload/Momodumedia-8_39_ctgwdb'
                          src='https://res.cloudinary.com/duwxmrkgd/image/upload/Momodumedia-8_38_m8nade'
                          className='size-full object-cover'
                        />
                      </div>
                    </div>
                    <div className='grid shrink-0 grid-cols-1 sm:gap-y-6 gap-y-3 lg:gap-y-8'>
                      <div className='sm:h-64 w-[165px] sm:w-44 overflow-hidden rounded-lg'>
                        <Image
                          width={100}
                          height={100}
                          alt=''
                          // src='https://res.cloudinary.com/duwxmrkgd/image/upload/Momodumedia-4_50_qx5khz' 
                          src='https://res.cloudinary.com/duwxmrkgd/image/upload/Momodumedia_5_bbjmrb' 
                          className='size-full object-cover'
                        />
                      </div>
                      <div className='sm:h-64 w-[165px] shadow-2xl sm:w-44 overflow-hidden rounded-lg'>
                        <Image
                          width={100}
                          height={100}
                          alt=''
                          src='https://res.cloudinary.com/duwxmrkgd/image/upload/Momodumedia-24_8_susol3.jpg'
                          className='size-full object-cover'
                        />
                      </div>
                      <div className='sm:h-64 w-[165px] sm:w-44 overflow-hidden rounded-lg'>
                        <Image
                          width={100}
                          height={100}
                          alt=''
                          src='https://res.cloudinary.com/duwxmrkgd/image/upload/Momodumedia-57_1_yo8jib'
                          className='size-full object-cover'
                        />
                      </div>
                    </div>
                    <div className='sm:grid shrink-0 hidden grid-cols-1 gap-y-6 lg:gap-y-8'>
                      <div className='sm:h-64 w-[165px] sm:w-44 overflow-hidden rounded-lg'>
                        <Image
                          width={100}
                          height={100}
                          alt=''
                          // src='https://res.cloudinary.com/duwxmrkgd/image/upload/Momodumedia-16_38_jalmxa' 
                          src='https://res.cloudinary.com/duwxmrkgd/image/upload/Momodumedia-52-2_nvh9iv'
                          className='size-full object-cover'
                        />
                      </div>
                      <div className='sm:h-64 w-[165px] sm:w-44 overflow-hidden rounded-lg'>
                        <Image
                          width={100}
                          height={100}
                          alt=''
                          src='https://res.cloudinary.com/duwxmrkgd/image/upload/Momodumedia-14_23_medsl7'
                          className='size-full object-cover'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <Link
                  href='/dashboard/profile-settings'
                  className='mb-10  hidden sm:inline-block rounded-md border border-transparent bg-white px-8 py-3 text-center font-semibold text-black hover:bg-white/25'
                >
                  Organize your journey
                </Link>
                <Link
                  href='/bookings'
                  className='mb-10 inline-block rounded-md border border-transparent bg-linear-to-r from-[#ff80b5] to-[#9089fc] px-8 py-3 text-center font-semibold text-white hover:bg-white/25'
                >
                  Book session now
                </Link>

              </div>
              <div className='flex items-center gap-4'>
                <p className='text-[20px] font-semibold text-white'>
                  Over +2,500 users{" "}
                </p>
                <GroupIcons />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
