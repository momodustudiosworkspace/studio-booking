import { DashboardIcons, IconsType } from '@/assets/icons/dashboard/DashboardIcons'
import RedirectArrowWhite from '@/assets/icons/RedirectArrowWhite';
import LinkButton from '@/components/ui/LinkButton'
import React from 'react'


interface BookingCardNotificationProps {
    message: string;
    date: string;
    type: number;
    body?: string | undefined;
    id: number;
}
const BookingCardNotification = ({
    message,
    date,
    type,
    body,
    id }: BookingCardNotificationProps) => {

    const iconType = type === 1 ? "booking-confirmed-outlined-black" : type === 2 ? "wallet-outlined-black" : type === 3 ? "photo-added-outlined-black" : type === 4 ? "chat-outlined-black" : "" as IconsType

    const linkText = type === 1 ? 'View booking' : type === 3 ? "view photos " : type === 4 ? "reply" : ""
    return (
        <div className='w-full px-2 py-4 rounded-md bg-white border-[1px] border-[#EEEEEE]'>
            <div className='h-[40px] w-[40px] flex justify-center items-center bg-[#FAFAFA] mb-2 rounded-full'>
                <DashboardIcons value={iconType} />
            </div>
            <small className='capitalize font-semibold'>{message}</small>
            <h1 className='text-sm text-[#454543] mb-4'>{date} | Momodu studios</h1>
            {body && <div className='text-[#454543] bg-[#F7F7F9] mb-4 p-2 rounded-md text-[12px]'>
                {body}</div>}
            <div className='text-sm font-semibold'>
                {type !== 2 &&
                    <div className='flex items-center gap-1'>
                        <LinkButton
                            href={`/${id}`}
                            size="sm"
                            text={`${linkText}`}
                            icon={<RedirectArrowWhite />}
                            iconPosition="right"
                            className="w-auto"
                        />
                        {/* <DashboardIcons value='arrow-diagonal-right-black' /> */}
                    </div>

                }

            </div>
           
        </div>
    )
}

export default BookingCardNotification