import { BaseIcons, IconsType } from '@/assets/icons/BaseIcons';
import React, { useState } from 'react'

const ChooseBookingSession = () => {

    const [selectedSession, setSelectedSession] = useState<number | null>(null)

    const BOOKING_SESSIONS: {
        title: string;
        icon: IconsType,
        id:number | null
    }[]= [
        {
            title: 'Wedding',
            icon: 'wedding-black',
            id:1
        },
        {
            title: 'Portrait',
            icon: 'person-black',
            id:2
        },
        {
            title: 'Events',
            icon: 'events-black',
            id:3
        },
        {
            title: 'Product',
            icon: 'shirt-black',
            id:4
        },
        {
            title: 'Family',
            icon: 'people-black',
            id:5
        },
        {
            title: 'Lifestyle',
            icon: 'lifestyle-black',
            id:6
        },
      
    ]
  return (
      <div className='bg-[#f3f3f3] h-[400px] w-full grid grid-cols-2 gap-x-5 gap-y-5 p-5 rounded-lg overflow-y-scroll'>
          {BOOKING_SESSIONS.map((session, key) => (
              <button key={key} className={`${selectedSession === session.id ? 'border-2 border-black' : ''} bg-white  text-sm rounded-lg h-[86px] flex flex-col items-center justify-center gap-2 w-[100%]`}
                  onClick={() =>
                  {
                      console.log(selectedSession);
                      setSelectedSession(session.id)
                      
                  }
              }>
                  <BaseIcons value={session?.icon} /> 
                  <span className=''>{session?.title}</span>
              </button>
          ))}
      </div>
  )
}

export default ChooseBookingSession