import RedirectArrowWhite from '@/assets/icons/RedirectArrowWhite';
import LinkButton from '@/components/ui/LinkButton';
import Image from 'next/image';
import React from 'react'


interface BookingCardServiceprops{
    title: string;
    paragraph: string;
    href: string
}
const BookingCardService = ({title,paragraph,href}: BookingCardServiceprops) => {
  return (
      <div className='w-[335px] p-4 h-[297px] flex flex-col gap-3 bg-white shadow rounded-md'>
          <Image
              src="/home/hero-section-one.png"
              alt="/"
              width={300}
              height={151}
              className="w-full h-[151px] object-cover object-center rounded-md"
          />
          <div>
              <h1 className='font-bold'>{title}</h1>
              <small>{paragraph}</small>
         </div>
          <LinkButton
              href={href}
              size="md"
              text={'View package'}
              icon={<RedirectArrowWhite />}
              iconPosition="right"
              className="w-[170px]"
          />
    </div>
  )
}

export default BookingCardService