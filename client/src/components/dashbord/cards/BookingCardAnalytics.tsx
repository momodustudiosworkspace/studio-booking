import { DashboardIcons, IconsType } from '@/assets/icons/DashboardIcons'
import Link from 'next/link';
import React from 'react'


interface BookingCardAnalyticsProps {
    icon: IconsType;
    title: string;
    count: number;
    linkText: string;
    href?: string | undefined
}
const BookingCardAnalytics = ({ icon,
    title,
    count,
    linkText,
    href }: BookingCardAnalyticsProps) => {
    return (
        <div className='w-full h-[188px] p-5 rounded-md bg-white shadow'>
            <div className='h-[40px] w-[40px] mb-5 flex justify-center items-center bg-[#FAFAFA] rounded-full'>
                <DashboardIcons value={icon} />
            </div>
            <small className='capitalize font-medium'>{title}</small>
            <h1 className='text-[30px] font-bold'>{count}</h1>
            <div className='text-sm font-semibold'>
                {href ?
                    <div className='flex items-center gap-1'>
                        <Link href={href}>{linkText}</Link>
                        <DashboardIcons value='arrow-diagonal-right-black' />
                    </div>

                :linkText}

            </div>
        </div>
    )
}

export default BookingCardAnalytics