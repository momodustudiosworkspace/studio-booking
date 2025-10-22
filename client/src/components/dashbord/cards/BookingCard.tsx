import { DashboardIcons } from '@/assets/icons/dashboard/DashboardIcons'
import RedirectArrowWhite from '@/assets/icons/RedirectArrowWhite';
import LinkButton from '@/components/ui/LinkButton';
import React from 'react'


interface BookingCardProps{
    id: number;
        title: string;
    location: string;
    date: string;
    time: string;
    amount: string;
    status: number;
    
        }
const BookingCard = ({ id, title, location, date, time, amount, status }: BookingCardProps) => {
    const statusStyle = status === 0 ? "bg-red-200 text-red-500" : status === 1 ? "bg-[#0362001A] text-[#036200]" : status === 2 ? "bg-blue-300 text-blue-600" : status === 3 ? "bg-[#E595001A] text-[#E59500]" : ""
    const statusText =  status === 0 ? "cancelled" : status === 1 ? "completed" : status === 2 ? "upcoming" : status === 3 ? "past" : ""
  return (
      <div key={id} className='flex sm:flex-row flex-col sm:items-center sm:gap-0 gap-3 bg-white justify-between rounded-md shadow p-4'>
          {/* Booking Details  */}
          <div className='flex sm:items-center shrink-0 sm:w-[500px] gap-4'>
              <div className={`h-[48px] w-[48px] flex items-center justify-center bg-[#828282] rounded-md`}>
                  <DashboardIcons value='camera-solid-black' />
              </div>
              <div>
                  <div className='flex gap-4 sm:mb-1'>
                      <h3 className='capitalize font-semibold sm:text-[16px] text-[14px]'>{title}</h3>
                      <span className={`${statusStyle} text-xs rounded-full px-2 py-1 flex items-center justify-center capitalize font-semibold`}>{statusText}</span>
                  </div>
                  <p className='sm:text-[16px] text-[14px]'>{location}</p>
              </div>
          </div>
          {/* Booking date  */}
          <div className='flex items-center gap-2 sm:w-[200px]'>
              <div className={`h-[38px] w-[38px] flex items-center justify-center bg-[#FAFAFA] rounded-full`}>
                  <DashboardIcons value='calendar-grid-outlined-black' />
              </div>
              <div>
                  <div className='flex gap-2 mb-1'>
                      <h3 className='capitalize font-semibold'>{date}</h3>
                  </div>
                  <p className='sm:text-[16px] text-[14px]'>{time}</p>
              </div>
          </div>
          {/* Booking price  */}
          <div className='flex items-center gap-2 sm:w-[200px]'>
              <div className={`h-[38px] w-[38px] flex items-center justify-center bg-[#FAFAFA] rounded-full`}>
                  <DashboardIcons value='dollar-sign-outlined-black' />
              </div>
              <div>
                  <div className='flex gap-2 mb-1'>
                      <h3 className='capitalize font-semibold'>{amount}</h3>
                  </div>
                  <p className='sm:text-[16px] text-[14px]'>{status === 0 ? "cancelled" : "completed"}</p>
              </div>
          </div>
          {/* View booking details  */}
          <div className='flex sm:items-center  gap-2 sm:justify-center'>
              <LinkButton
                  href={`/dashboard/photo-studio/bookings/${id}`}
                  size="md"
                  text={'View'}
                  icon={<RedirectArrowWhite />}
                  iconPosition="right"
                  className="w-auto"
              />
          </div>
      </div>
  )
}

export default BookingCard