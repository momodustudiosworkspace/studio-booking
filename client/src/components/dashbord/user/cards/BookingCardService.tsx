"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BookingCardServiceprops {
  title: string;
  paragraph: string;
  href: string;
}
const BookingCardService = ({
  title,
  paragraph,
  href,
}: BookingCardServiceprops) => {
  return (
    <div className='flex min-h-[297px] w-full flex-col gap-3 rounded-md shadow sm:w-[290px]'>
      <Image
        src='/home/hero-section-one.png'
        alt='/'
        width={300}
        height={151}
        className='h-[200px] w-full rounded-md object-cover object-center sm:h-[151px]'
      />
      <div className='text-white'>
        <h1 className='font-bold'>{title}</h1>
        <small>{paragraph}</small>
      </div>
      <Link
        href={href}
        className='w-[70px] rounded bg-white py-1 text-center text-sm font-medium text-black'
      >
        Explore
      </Link>
      {/* <LinkButton
        href={href}
        size='md'
        text={"View package"}
        icon={<RedirectArrowWhite />}
        iconPosition='right'
        className='w-[170px]'
      /> */}
    </div>
  );
};

export default BookingCardService;
