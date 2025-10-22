import React from 'react'
import DashboardLayout from './DashboardLayout'
import { IconsType } from '@/assets/icons/dashboard/DashboardIcons'
import BookingCardAnalytics from './cards/BookingCardAnalytics'
import DashboardHeader from './DashboardHeader'
import BookingCardQuickAtion from './cards/BookingCardQuickAction'
import BookingCardService from './cards/BookingCardService'

const DashBoardOverview = () => {

    const BOOKING_ANALYTICS_CARDS = [
        {
            icon: 'camera-outlined-black' as IconsType,
            title: 'total bookings',
            count: 50,
            linkText: 'view bookings',
            href: '/',
            status: 'total'
        },
        {
            icon: 'calendar-check-outlined-black' as IconsType,
            title: 'completed bookings ',
            count: 50,
            linkText: 'view images',
            href: '/',
            status: 'completed'
        },
        {
            icon: 'camera-outlined-black' as IconsType,
            title: 'upcoming session',
            count: 3,
            linkText: 'next session: 5th june 2025',
            status: 'upcoming'
            
        },
        {
            icon: 'camera-outlined-black' as IconsType,
            title: 'Cancelled bookings',
            count: 2,
            linkText: 'view all',
            href: '/',
            status: 'cancelled'
        },
    ]
    const BOOKING_QUICK_LINKS_CARDS = [
        {
            icon: 'camera-outlined-black' as IconsType,
            title: 'Book a session',
            count: 50,
            linkText: 'Book a session',
            href: '/',
        },
        {
            icon: 'calendar-check-outlined-black' as IconsType,
            title: 'Request a quote',
            count: 50,
            linkText: 'Request a quote',
            href: '/',
        },
        {
            icon: 'camera-outlined-black' as IconsType,
            title: 'Message studio',
            count: 3,
            linkText: 'next session: 5th june 2025',
            href: '/',
        },
    ]
    const BOOKING_SERVICES_CARDS = [
        {
            title: 'Wedding & engagements',
            paragraph: 'Lorem ipsum dolor sit amet consectetur.',
            href:'/'
        },
        {
            title: 'Wedding & engagements',
            paragraph: 'Lorem ipsum dolor sit amet consectetur.',
            href:'/'
        },
        {
            title: 'Wedding & engagements',
            paragraph: 'Lorem ipsum dolor sit amet consectetur.',
            href:'/'
        },
        {
            title: 'Wedding & engagements',
            paragraph: 'Lorem ipsum dolor sit amet consectetur.',
            href:'/'
        },
        {
            title: 'Wedding & engagements',
            paragraph: 'Lorem ipsum dolor sit amet consectetur.',
            href:'/'
        },
        {
            title: 'Wedding & engagements',
            paragraph: 'Lorem ipsum dolor sit amet consectetur.',
            href:'/'
        },
       
    ]
    return (
        <DashboardLayout headerProps={
            {
                headerText: 'welcome back, emmanuel',
                paragraph: 'Book in minutes, manage everything from scheduling to delivery',
                linkText: 'Book your session',
                href: '/'
            }
        }>
            <section className='w-full'>

                {/* Booking analytics  */}
                <div className='flex sm:flex-row flex-col gap-4 items-center mb-14 w-full'>
                    {BOOKING_ANALYTICS_CARDS.map((card, key)=>{
                        return <BookingCardAnalytics key={key} status={card.status} icon={card.icon} title={card.title} count={card.count} linkText={card.linkText} href={card?.href} />
                    })}
                </div>

                {/* Quick links  */}
                <div className='flex flex-col gap-4'>
                    <DashboardHeader headerText="quick actions" paragraph="Lorem ipsum dolor sit amet consectetur."/>
                    <div className='flex sm:flex-row flex-col gap-4 items-center mb-14'>
                        {BOOKING_QUICK_LINKS_CARDS.map((card, key) => {
                            return <BookingCardQuickAtion key={key} icon={card.icon} title={card.title} linkText={card.linkText} href={card?.href} />
                        })}
                    </div>
                </div>

                {/* Services  */}
                <div className='flex flex-col gap-4'>
                    <DashboardHeader headerText="our services" paragraph="Pick a session type you’ll love for us to cover"/>
                    <div className='grid sm:grid-cols-4 grid-cols-1 gap-y-4 mb-14'>
                        {BOOKING_SERVICES_CARDS.map((card, key) => {
                            return <BookingCardService key={key} title={card.title} paragraph={card.paragraph} href={card?.href} />
                        })}
                    </div>
                </div>
            </section>
        </DashboardLayout>
    )
}

export default DashBoardOverview