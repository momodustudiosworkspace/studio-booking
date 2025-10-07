"use client"
import React, { useState } from 'react'
import DashboardLayout from './DashboardLayout'
import { DashboardIcons } from '@/assets/icons/DashboardIcons'
import DashboardHeader from './DashboardHeader'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { redirect } from 'next/navigation'
import LinkButton from '../ui/LinkButton'
import RedirectArrowWhite from '@/assets/icons/RedirectArrowWhite'
import DashboardBookingPhotoSelection from './DashboardBookingPhotoSelection'

const DashboardBookingDetails = () => {

    const [totalSelectedPhotos, setTotalSelectedPhotos]= useState<number>(0)

    // Set a condition for the link:
    // if upcoming, clinets can cancel if completed clients can rebook and get discount

    // if client is late based on bookign time and checkin time let the checking timeline be red 
    const timeLineLevel = 6


    const BOOKING_TIMELINE = [
        {
            id: 1,
            text: "booking",
            date: "wednesday october 12th, 2025 at 3:00pm",
        },
        {
            id: 2,
            text: "Checking",
            date: "wednesday october 12th, 2025 at 3:00pm",
        },
        {
            id: 3,
            text: "session",
            date: "wednesday october 12th, 2025 at 3:00pm",
        },
        {
            id: 4,
            text: "session completed",
            date: "wednesday october 12th, 2025 at 3:00pm",
        },
        {
            id: 5,
            text: "photo selection",
            date: "wednesday october 12th, 2025 at 3:00pm",
        },
        {
            id: 6,
            text: "final delivery",
            date: "wednesday october 12th, 2025 at 3:00pm",
        },

    ]


    return (
        <div className='-mt-24'>
            <button className='h-[32px] w-[32px] bg-white rounded-full flex items-center justify-center' onClick={
                () => {
                    redirect("/dashboard/bookings")

                }
            }>
                <DashboardIcons value='arrow-left-outlined-black' />
            </button>

            <DashboardLayout headerProps={
                {
                    headerText: 'potrait session- ms1234',
                    badge: 'Upcoming',
                    badgeStatus: 1,
                    badgeClass: '',
                    paragraph: 'sat, sept 13,2025 | Momodu studios, victoria island, Lagos',
                    linkText: 'Reschedule',
                    href: '/'
                }
            }>
                <div className='flex gap-2'>

                    {/* Timeline  */}
                    <div className='h-[610px] p-4 bg-white rounded-lg w-[50%] shadow'>
                        <DashboardHeader headerText={'timeline'} paragraph={"track every step from booking to delivery"} />

                        <div className='max-h-[510px] overflow-y-scroll'>
                            <VerticalTimeline lineColor='#DFDFDF'>
                                {BOOKING_TIMELINE.map((timeLine) => {
                                    const timeLineBg = timeLine.id <= 3 ? "rgb(76, 175, 80)" : "#FAFAFA"
                                    const timeLineTextColor = timeLine.id <= 3 ? "#fff" : "black"
                                    return <VerticalTimelineElement key={timeLine.id}
                                        className="vertical-timeline-element--work"
                                        contentStyle={{ background: `${timeLineBg}`, color: `${timeLineTextColor}` }}
                                        contentArrowStyle={{ borderRight: `7px solid  ${timeLineBg}` }}
                                        // date="2011 - present"
                                        iconStyle={{ background: `${timeLineBg}`, color: `${timeLineTextColor}` }}
                                        icon={<DashboardIcons value="check-solid-black" />}

                                    >
                                        <h3 className="vertical-timeline-element-title capitalize font-bold">Studio {timeLine.text}</h3>
                                        <p className='capitalize'>
                                            {timeLine.date}
                                        </p>
                                    </VerticalTimelineElement>
                                })}

                            </VerticalTimeline>
                        </div>
                    </div>

                    {/* Details  */}
                    <div className='h-[610px] p-4 bg-white rounded-lg w-[50%] shadow'>
                        <DashboardHeader headerText={'booking summary'} paragraph={"your session at a glance "} />
                        <div className='w-full mt-10 flex flex-col gap-7'>
                            <div className='w-full flex items-center capitalize justify-between'>
                                <p className='font-bold '>service</p>
                                <p className='font-medium'>Personal shoot</p>
                            </div>
                            <div className='w-full flex items-center capitalize justify-between'>
                                <p className='font-bold '>date & time</p>
                                <p className='font-medium'>Personal shoot</p>
                            </div>
                            <div className='w-full flex items-center capitalize justify-between'>
                                <p className='font-bold '>location</p>
                                <p className='font-medium'>momodu studios</p>
                            </div>
                            <div className='w-full flex items-center capitalize justify-between'>
                                <p className='font-bold '>photographer</p>
                                <p className='font-medium'>ekong emmanuel</p>
                            </div>
                            <div className='bg-[#FAFAFA] rounded-md py-5 px-4 flex flex-col gap-7'>
                                <div className='w-full flex items-center capitalize justify-between'>
                                    <p className='font-bold '>total</p>
                                    <p className='font-medium'>n500,000.00</p>
                                </div>
                                <div className='w-full flex items-center capitalize justify-between'>
                                    <p className='font-bold '>paid</p>
                                    <p className='font-medium'>n500,000.00</p>
                                </div>

                                <div className='w-full flex items-center capitalize justify-between'>
                                    <p className='font-bold '>balance</p>
                                    <p className='font-medium'>n0.00</p>
                                </div>
                            </div>
                            <div>
                                <LinkButton
                                    href={`/dashboard/photo-studio/bookings/2`}
                                    size="md"
                                    text={'Message studio'}
                                    icon={<RedirectArrowWhite />}
                                    iconPosition="right"
                                    className="w-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Photo selection and download  */}
                <div className='bg-white rounded-lg py-5 px-5'>
                    <div className='flex items-center justify-between mb-10'>
                        <DashboardHeader headerText={`${timeLineLevel < 6 ? 'proof gallery' : 'final images'}`} paragraph={`${timeLineLevel < 6 ? 'select images to be edited from your studio session' : 'your images from your session is ready'}`} />

                        {timeLineLevel >= 6 ? <div className='shrink-0'>
                            <LinkButton
                                href={`/dashboard/photo-studio/bookings/2`}
                                size="md"
                                text={'Download all'}
                                icon={<RedirectArrowWhite />}
                                iconPosition="right"
                                className="w-auto"
                            />
                        </div> : <div className='shrink-0'>
                            <p> Select <span className='font-semibold'>4</span> pictures </p>
                                <p>Total selected: <span className='font-semibold'>{totalSelectedPhotos}</span></p></div>}
                    </div>
                    <div className='max-h-[800px] w-full overflow-y-scroll pt-5'>
                        <DashboardBookingPhotoSelection setTotalSelectedPhotos={setTotalSelectedPhotos} /> 
                    </div>
                    <div className='mt-10 flex items-center gap-3'>

                        <LinkButton
                            href={`/dashboard/photo-studio/bookings/2`}
                            size="md"
                            text={'Message studio'}
                            icon={<RedirectArrowWhite />}
                            iconPosition="right"
                            className="w-auto"
                        />
                        {timeLineLevel >= 6 && <div>

                            <LinkButton
                                href={`/dashboard/photo-studio/bookings/2`}
                                size="md"
                                text={'Feedback'}
                                variant='outline'
                                iconPosition="right"
                                className="w-auto"
                            />
                        </div>}
                    </div>
                </div>

            </DashboardLayout>
        </div>
    )
}

export default DashboardBookingDetails