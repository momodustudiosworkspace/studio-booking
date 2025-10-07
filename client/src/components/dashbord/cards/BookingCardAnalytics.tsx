import { DashboardIcons, IconsType } from '@/assets/icons/DashboardIcons'
import Link from 'next/link';
import React from 'react'


interface BookingCardAnalyticsProps {
    icon: IconsType;
    title: string;
    count: number | 0;
    linkText: string;
    status: string;
    href?: string | undefined
}
const BookingCardAnalytics = ({ icon,
    title,
    count,
    linkText,
    status,
    href }: BookingCardAnalyticsProps) => {

    const bgStatus = status === "completed" ? "bg-green-300" : status === "cancelled" ? "bg-red-500" : status === "upcoming" ? "bg-blue-300" : "bg-[#FAFAFA]"
    return (
        <div className='w-full h-[188px] p-5 rounded-md bg-white shadow'>
            <div className={`${bgStatus} h-[40px] w-[40px] mb-5 flex justify-center items-center  rounded-full`}>
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