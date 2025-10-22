'use client'
import React, { useRef, useState } from 'react'
import { BaseIcons } from '@/assets/icons/BaseIcons'
import ChooseBookingSession from './ChooseBookingSession'
import { useRouter } from 'next/navigation'
import Button from '../ui/Button'
import RedirectArrowWhite from '@/assets/icons/RedirectArrowWhite'
import ReserveSlot from './ReserveSlot'
import BookingsPreview from './BookingsPreview'
import BookingsLocation from './BookingsLocation'
import PageMessage from '../PageMessage'

const Bookings = (): React.JSX.Element => {
    const [bookingStep, setBookingStep] = useState<number>(0)

    const proceedBtnRef = useRef<HTMLButtonElement>(null);

    const [reserveSlot, setReserveSlot] = useState<{ date: Date | null, time: Date | null }>(
        {
            date: null,
            time: null
        }
    )
    const [location, setLocation] = useState<{ state: string, address: string }>(
        {
            state: '',
            address: ''
        }
    )
    const router = useRouter()
    const BOOKING_STEPS: {
        id: number,
        component: React.ReactNode;
        header: string;
        paragraph: string
    }[] = [
            {
                id: 1,
                component: <ChooseBookingSession />,
                header: 'Choose Your Session',
                paragraph: 'You can customize details in the next steps'
            },
            {
                id: 2,
                component: <ReserveSlot
                    proceedBtnRef={proceedBtnRef}
                    setReserveSlot={(values) => setReserveSlot({...values})}
                />,
                header: 'reserve a slot',
                paragraph: 'We’ll hold your slot while you complete checkout'
            },
            {
                id: 3,
                component: <BookingsLocation 
                    proceedBtnRef={proceedBtnRef}
                    setbookingsLocation={(values) => setLocation({ ...values })}
                />,
                header: 'reserve a slot',
                paragraph: 'We’ll hold your slot while you complete checkout'
            },
            {
                id: 4,
                component: <BookingsPreview
                    proceedBtnRef={proceedBtnRef}
                    setbookingsPreview={(values) => setLocation({ ...values })}
                />,
                header: 'preview',
                paragraph: 'We’ll hold your slot while you complete checkout'
            },
            {
                id: 5,
                component: <PageMessage
                    status={'success'}
                    messageHeader={'Booking completed'}
                    messageParagraph={'You can visit your dashbord to view all bookings'}
                    btnText={'Go to dashboard'}
                    href={'/dashboard'}
                />,
                header: '',
                paragraph: ''
            },
        ]
    const handleBookingStepsProceed = () => {
        setBookingStep(prev => prev + 1)
        
    }


    return (
        <section className='px-5 flex justify-center items-center'>
            <div className='sm:w-[460px] w-full'>
            <button className='bg-[#FAFAFA] h-10 w-10 rounded-full flex justify-center items-center' onClick={() => {
                if (bookingStep === 0) {
                    return router.push('/web')
                }
                setBookingStep(prev => prev - 1)
            }}>
                <BaseIcons value='arrow-left-black' />
            </button>
            <div className="flex flex-col gap-2 mt-10">
                <h1 className="text-[28px] font-extrabold capitalize">{BOOKING_STEPS[bookingStep]?.header}</h1>
                <div className='flex items-center gap-1'>
                    <p>{BOOKING_STEPS[bookingStep]?.paragraph}</p>
                </div>
            </div>
            {bookingStep < 2 ? '' : bookingStep === 3 && reserveSlot?.date ? reserveSlot.date.toLocaleString() : ''}
            {location.state && location.state}

                <div className='flex justify-center items-center w-full mt-14 mb-10'>

                {
                    BOOKING_STEPS[bookingStep]?.component
                }
                </div>
                {bookingStep !== 4 && <div className='w-full flex justify-end'>
                <Button
                    ref= {proceedBtnRef}
                    text={'Proceed'}
                    onClick={handleBookingStepsProceed}
                    icon={< RedirectArrowWhite />}
                        iconPosition="right" className='w-[125px]' size='md'
                />
                </div>}
            </div>


        </section>
    )
}

export default Bookings