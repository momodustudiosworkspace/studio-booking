"use client"
import React, { useState } from 'react'
import DashboardLayout from './DashboardLayout'
import { DashboardIcons } from '@/assets/icons/DashboardIcons'
import LinkButton from '../ui/LinkButton'
import RedirectArrowWhite from '@/assets/icons/RedirectArrowWhite'

const DashboardBookings = () => {

    const [currentTab, setCurrentTab]=useState<number>(1)

    const TABS = [
        {
            label: "All",
            index:1
        },
        {
            label: "upcoming",
            index: 2
        },
        {
            label: "past",
            index: 3
        },
    ]

    const ALL_DATA = [
        {
            id:1,
            title: "potrait session MS1234",
            location: "momodu studios, victoria island, lagos",
            data: "sat, sept 13, 2025",
            time: "2:00pm",
            amount: "120,000",
            status: 2,
        },
        {
            id:2,
            title: "potrait session MS1234",
            location: "momodu studios, victoria island, lagos",
            data: "sat, sept 13, 2025",
            time: "2:00pm",
            amount: "120,000",
            status: 3,
        },
        {
            id:3,
            title: "potrait session MS1234",
            location: "momodu studios, victoria island, lagos",
            data: "sat, sept 13, 2025",
            time: "2:00pm",
            amount: "120,000",
            status: 0,
        },
        {
            id:4,
            title: "potrait session MS1234",
            location: "momodu studios, victoria island, lagos",
            data: "sat, sept 13, 2025",
            time: "2:00pm",
            amount: "120,000",
            status: 1,
        },
    ]
    const ALL_PENDING_DATA = [
        {
            id:1,
            title: "potrait session MS1234",
            location: "momodu studios, victoria island, lagos",
            data: "sat, sept 13, 2025",
            time: "2:00pm",
            amount: "120,000",
            status: 2,
        },
        {
            id:2,
            title: "potrait session MS1234",
            location: "momodu studios, victoria island, lagos",
            data: "sat, sept 13, 2025",
            time: "2:00pm",
            amount: "120,000",
            status: 2,
        },
        {
            id:3,
            title: "potrait session MS1234",
            location: "momodu studios, victoria island, lagos",
            data: "sat, sept 13, 2025",
            time: "2:00pm",
            amount: "120,000",
            status: 2,
        },
        {
            id:4,
            title: "potrait session MS1234",
            location: "momodu studios, victoria island, lagos",
            data: "sat, sept 13, 2025",
            time: "2:00pm",
            amount: "120,000",
            status: 2,
        },
    ]
    const ALL_PAST_DATA = [
        {
            id:1,
            title: "potrait session MS1234",
            location: "momodu studios, victoria island, lagos",
            data: "sat, sept 13, 2025",
            time: "2:00pm",
            amount: "120,000",
            status: 3,
        },
        {
            id:2,
            title: "potrait session MS1234",
            location: "momodu studios, victoria island, lagos",
            data: "sat, sept 13, 2025",
            time: "2:00pm",
            amount: "120,000",
            status: 3,
        },
        {
            id:3,
            title: "potrait session MS1234",
            location: "momodu studios, victoria island, lagos",
            data: "sat, sept 13, 2025",
            time: "2:00pm",
            amount: "120,000",
            status: 3,
        },
        {
            id:4,
            title: "potrait session MS1234",
            location: "momodu studios, victoria island, lagos",
            data: "sat, sept 13, 2025",
            time: "2:00pm",
            amount: "120,000",
            status: 3,
        },
    ]
    

    // payment complete
  return (
      <DashboardLayout headerProps={
          {
              headerText: 'my bookings',
              paragraph: 'view, manage and download everything in one place',
              linkText: 'Book your session',
              href: '/'
          }
      }>
          
          <div className='relative flex gap-10 items-center'>
              {TABS.map((tab) => {
                  return <button key={tab?.index} className={`${currentTab === tab.index ? "border-b-[3px] border-black font-semibold" : ""} font-medium capitalize pb-1`} onClick={()=>setCurrentTab(tab.index)}>{tab.label}</button>
              })}
          </div>

          {
              currentTab === 1 && <div className='flex flex-col gap-4'>
                  {ALL_DATA.map((all) => {
                      const statusStyle = all.status === 0 ? "bg-red-200 text-red-500" : all.status === 1 ? "bg-[#0362001A] text-[#036200]" : all.status === 2 ? "bg-blue-300 text-blue-600" : all.status === 3 ? "bg-[#E595001A] text-[#E59500]":""
                      const status = all.status === 0 ? "cancelled" : all.status === 1 ? "completed" : all.status === 2 ? "upcoming" : all.status === 3 ? "past" :""
                      return <div key={all.id} className='flex items-center bg-white justify-between rounded-md shadow p-4'>
                         {/* Booking Details  */}
                          <div className='flex items-center shrink-0 w-[500px] gap-4'>
                              <div className={`h-[48px] w-[48px] flex items-center justify-center bg-[#828282] rounded-md`}>
                                  <DashboardIcons value='camera-solid-black' />
                              </div>
                              <div>
                                  <div className='flex gap-4 mb-1'>
                                      <h3 className='capitalize font-semibold'>{all.title}</h3>
                                      <span className={`${statusStyle} text-xs rounded-full px-2 py-1 flex items-center justify-center capitalize font-semibold`}>{status}</span>
                                  </div>
                                  <p>{all.location}</p>
                             </div>
                          </div>
                          {/* Booking date  */}
                          <div className='flex items-center gap-2 w-[200px]'>
                              <div className={`h-[38px] w-[38px] flex items-center justify-center bg-[#FAFAFA] rounded-full`}>
                                  <DashboardIcons value='calendar-grid-outlined-black' />
                              </div>
                              <div>
                                  <div className='flex gap-2 mb-1'>
                                      <h3 className='capitalize font-semibold'>{all.data}</h3>
                                  </div>
                                  <p>{all.time}</p>
                              </div>
                          </div>
                          {/* Booking price  */}
                          <div className='flex items-center gap-2 w-[200px]'>
                              <div className={`h-[38px] w-[38px] flex items-center justify-center bg-[#FAFAFA] rounded-full`}>
                                  <DashboardIcons value='dollar-sign-outlined-black' />
                              </div>
                              <div>
                                  <div className='flex gap-2 mb-1'>
                                      <h3 className='capitalize font-semibold'>{all.amount}</h3>
                                  </div>
                                  <p>{all.status === 0 ? "cancelled" :  "completed" }</p>
                              </div>
                          </div>
                          {/* View booking details  */}
                          <div className='flex items-center  gap-2 justify-center'>
                              <LinkButton
                                  href={`/dashboard/photo-studio/bookings/${all.id}`}
                                  size="md"
                                  text={'View'}
                                  icon={<RedirectArrowWhite />}
                                  iconPosition="right"
                                  className="w-auto"
                              />
                          </div>
                      </div>
                  })}
              </div>
          }
          {
              currentTab === 2 && <div className='flex flex-col gap-4'>
                  {ALL_PENDING_DATA.map((all) => {
                      const statusStyle = all.status === 0 ? "bg-red-200 text-red-500" : all.status === 1 ? "bg-[#0362001A] text-[#036200]" : all.status === 2 ? "bg-blue-300 text-blue-600" : all.status === 3 ? "bg-[#E595001A] text-[#E59500]":""
                      const status = all.status === 0 ? "cancelled" : all.status === 1 ? "completed" : all.status === 2 ? "upcoming" : all.status === 3 ? "past" :""
                      return <div key={all.id} className='flex items-center bg-white justify-between rounded-md shadow p-4'>
                         {/* Booking Details  */}
                          <div className='flex items-center shrink-0 w-[500px] gap-4'>
                              <div className={`h-[48px] w-[48px] flex items-center justify-center bg-[#828282] rounded-md`}>
                                  <DashboardIcons value='camera-solid-black' />
                              </div>
                              <div>
                                  <div className='flex gap-4 mb-1'>
                                      <h3 className='capitalize font-semibold'>{all.title}</h3>
                                      <span className={`${statusStyle} text-xs rounded-full px-2 py-1 flex items-center justify-center capitalize font-semibold`}>{status}</span>
                                  </div>
                                  <p>{all.location}</p>
                             </div>
                          </div>
                          {/* Booking date  */}
                          <div className='flex items-center gap-2 w-[200px]'>
                              <div className={`h-[38px] w-[38px] flex items-center justify-center bg-[#FAFAFA] rounded-full`}>
                                  <DashboardIcons value='calendar-grid-outlined-black' />
                              </div>
                              <div>
                                  <div className='flex gap-2 mb-1'>
                                      <h3 className='capitalize font-semibold'>{all.data}</h3>
                                  </div>
                                  <p>{all.time}</p>
                              </div>
                          </div>
                          {/* Booking price  */}
                          <div className='flex items-center gap-2 w-[200px]'>
                              <div className={`h-[38px] w-[38px] flex items-center justify-center bg-[#FAFAFA] rounded-full`}>
                                  <DashboardIcons value='dollar-sign-outlined-black' />
                              </div>
                              <div>
                                  <div className='flex gap-2 mb-1'>
                                      <h3 className='capitalize font-semibold'>{all.amount}</h3>
                                  </div>
                                  <p>{all.status === 0 ? "cancelled" :  "completed" }</p>
                              </div>
                          </div>
                          {/* View booking details  */}
                          <div className='flex items-center  gap-2 justify-center'>
                              <LinkButton
                                  href={`/dashboard/photo-studio/bookings/${all.id}`}
                                  size="md"
                                  text={'View'}
                                  icon={<RedirectArrowWhite />}
                                  iconPosition="right"
                                  className="w-auto"
                              />
                          </div>
                      </div>
                  })}
              </div>
          }
          {
              currentTab === 3 && <div className='flex flex-col gap-4'>
                  {ALL_PAST_DATA.map((all) => {
                      const statusStyle = all.status === 0 ? "bg-red-200 text-red-500" : all.status === 1 ? "bg-[#0362001A] text-[#036200]" : all.status === 2 ? "bg-blue-300 text-blue-600" : all.status === 3 ? "bg-[#E595001A] text-[#E59500]":""
                      const status = all.status === 0 ? "cancelled" : all.status === 1 ? "completed" : all.status === 2 ? "upcoming" : all.status === 3 ? "past" :""
                      return <div key={all.id} className='flex items-center bg-white justify-between rounded-md shadow p-4'>
                         {/* Booking Details  */}
                          <div className='flex items-center shrink-0 w-[500px] gap-4'>
                              <div className={`h-[48px] w-[48px] flex items-center justify-center bg-[#828282] rounded-md`}>
                                  <DashboardIcons value='camera-solid-black' />
                              </div>
                              <div>
                                  <div className='flex gap-4 mb-1'>
                                      <h3 className='capitalize font-semibold'>{all.title}</h3>
                                      <span className={`${statusStyle} text-xs rounded-full px-2 py-1 flex items-center justify-center capitalize font-semibold`}>{status}</span>
                                  </div>
                                  <p>{all.location}</p>
                             </div>
                          </div>
                          {/* Booking date  */}
                          <div className='flex items-center gap-2 w-[200px]'>
                              <div className={`h-[38px] w-[38px] flex items-center justify-center bg-[#FAFAFA] rounded-full`}>
                                  <DashboardIcons value='calendar-grid-outlined-black' />
                              </div>
                              <div>
                                  <div className='flex gap-2 mb-1'>
                                      <h3 className='capitalize font-semibold'>{all.data}</h3>
                                  </div>
                                  <p>{all.time}</p>
                              </div>
                          </div>
                          {/* Booking price  */}
                          <div className='flex items-center gap-2 w-[200px]'>
                              <div className={`h-[38px] w-[38px] flex items-center justify-center bg-[#FAFAFA] rounded-full`}>
                                  <DashboardIcons value='dollar-sign-outlined-black' />
                              </div>
                              <div>
                                  <div className='flex gap-2 mb-1'>
                                      <h3 className='capitalize font-semibold'>{all.amount}</h3>
                                  </div>
                                  <p>{all.status === 0 ? "cancelled" :  "completed" }</p>
                              </div>
                          </div>
                          {/* View booking details  */}
                          <div className='flex items-center  gap-2 justify-center'>
                              <LinkButton
                                  href={`/dashboard/photo-studio/bookings/${all.id}`}
                                  size="md"
                                  text={'View'}
                                  icon={<RedirectArrowWhite />}
                                  iconPosition="right"
                                  className="w-auto"
                              />
                          </div>
                      </div>
                  })}
              </div>
          }
          
      </DashboardLayout>
  )
}

export default DashboardBookings