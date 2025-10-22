"use client"
import React, { useState } from 'react'
import DashboardLayout from './DashboardLayout'
import BookingCard from './cards/BookingCard'

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
            date: "sat, sept 13, 2025",
            time: "2:00pm",
            amount: "120,000",
            status: 2,
        },
        {
            id:2,
            title: "potrait session MS1234",
            location: "momodu studios, victoria island, lagos",
            date: "sat, sept 13, 2025",
            time: "2:00pm",
            amount: "120,000",
            status: 3,
        },
        {
            id:3,
            title: "potrait session MS1234",
            location: "momodu studios, victoria island, lagos",
            date: "sat, sept 13, 2025",
            time: "2:00pm",
            amount: "120,000",
            status: 0,
        },
        {
            id:4,
            title: "potrait session MS1234",
            location: "momodu studios, victoria island, lagos",
            date: "sat, sept 13, 2025",
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
            date: "sat, sept 13, 2025",
            time: "2:00pm",
            amount: "120,000",
            status: 2,
        },
        {
            id:2,
            title: "potrait session MS1234",
            location: "momodu studios, victoria island, lagos",
            date: "sat, sept 13, 2025",
            time: "2:00pm",
            amount: "120,000",
            status: 2,
        },
        {
            id:3,
            title: "potrait session MS1234",
            location: "momodu studios, victoria island, lagos",
            date: "sat, sept 13, 2025",
            time: "2:00pm",
            amount: "120,000",
            status: 2,
        },
        {
            id:4,
            title: "potrait session MS1234",
            location: "momodu studios, victoria island, lagos",
            date: "sat, sept 13, 2025",
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
            date: "sat, sept 13, 2025",
            time: "2:00pm",
            amount: "120,000",
            status: 3,
        },
        {
            id:2,
            title: "potrait session MS1234",
            location: "momodu studios, victoria island, lagos",
            date: "sat, sept 13, 2025",
            time: "2:00pm",
            amount: "120,000",
            status: 3,
        },
        {
            id:3,
            title: "potrait session MS1234",
            location: "momodu studios, victoria island, lagos",
            date: "sat, sept 13, 2025",
            time: "2:00pm",
            amount: "120,000",
            status: 3,
        },
        {
            id:4,
            title: "potrait session MS1234",
            location: "momodu studios, victoria island, lagos",
            date: "sat, sept 13, 2025",
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
          <section className='w-full'>

              <div className='relative flex gap-10 items-center mb-5'>
              {TABS.map((tab) => {
                  return <button key={tab?.index} className={`${currentTab === tab.index ? "border-b-[3px] border-black font-semibold" : ""} font-medium text-sm capitalize pb-1`} onClick={() => setCurrentTab(tab.index)}>{tab.label}</button>
              })}
          </div>

          {
              currentTab === 1 && <div className='flex flex-col gap-4'>
                  {ALL_DATA.map((all) => {
                      return <BookingCard key={all.id} id={all.id} title={all.title} location={all.location} date={all.date} time={all.time} amount={all.amount} status={all.status} />
                  })}
              </div>
          }
          {
              currentTab === 2 && <div className='flex flex-col gap-4'>
                  {ALL_PENDING_DATA.map((all) => {
                      return <BookingCard key={all.id} id={all.id} title={all.title} location={all.location} date={all.date} time={all.time} amount={all.amount} status={all.status} />
                  })}
              </div>
          }
          {
              currentTab === 3 && <div className='flex flex-col gap-4'>
                  {ALL_PAST_DATA.map((all) => {
                      return <BookingCard key={all.id} id={all.id} title={all.title} location={all.location} date={all.date} time={all.time} amount={all.amount} status={all.status} />
                  })}
              </div>
          }
          </section>
      </DashboardLayout>
  )
}

export default DashboardBookings