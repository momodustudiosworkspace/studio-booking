import { DashboardIcons, IconsType } from '@/assets/icons/DashboardIcons'
import Link from 'next/link';
import React from 'react'


interface BookingCardQuickAtionProps {
    icon: IconsType;
    title: string;
    linkText: string;
    href: string 
}
const BookingCardQuickAtion = ({ icon,
    title,
    href }: BookingCardQuickAtionProps) => {
    return (
        <Link href={href} className='w-full py-6 flex justify-center gap-3 items-center rounded-md bg-white shadow'>
            <div className='h-[40px] w-[40px] flex justify-center items-center bg-[#FAFAFA] rounded-full'>
                <DashboardIcons value={icon} />
            </div> 
            <p className='text-sm font-semibold'>
                {title}

            </p>
        </Link>
    )
}

export default BookingCardQuickAtion