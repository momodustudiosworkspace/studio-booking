import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import LinkButton from "@/components/ui/LinkButton";
import Image from "next/image";
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
    <div className='flex min-h-[297px] w-full flex-col gap-3 rounded-md bg-white p-4 shadow sm:w-[290px]'>
      <Image
        src='/home/hero-section-one.png'
        alt='/'
        width={300}
        height={151}
        className='h-[200px] w-full rounded-md object-cover object-center sm:h-[151px]'
      />
      <div>
        <h1 className='font-bold'>{title}</h1>
        <small>{paragraph}</small>
      </div>
      <LinkButton
        href={href}
        size='md'
        text={"View package"}
        icon={<RedirectArrowWhite />}
        iconPosition='right'
        className='w-[170px]'
      />
    </div>
  );
};

export default BookingCardService;
