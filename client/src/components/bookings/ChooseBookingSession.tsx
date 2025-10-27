import { BaseIcons, IconsType } from "@/assets/icons/BaseIcons";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setBookingSessionType } from "@/redux/slices/bookingSlice";
import React, { useState } from "react";


const ChooseBookingSession = (): React.JSX.Element => {
  const bookingSession = useAppSelector((state) => state.booking.sessionType)
  const dispatch = useAppDispatch()
  const [selectedSession, setSelectedSession] = useState<number | null>(bookingSession || null);


  const BOOKING_SESSIONS: {
    title: string;
    icon: IconsType;
    id: number | null;
  }[] = [
    {
      title: "Wedding",
      icon: "wedding-black",
      id: 1,
    },
    {
      title: "Portrait",
      icon: "person-black",
      id: 2,
    },
    {
      title: "Events",
      icon: "events-black",
      id: 3,
    },
    {
      title: "Product",
      icon: "shirt-black",
      id: 4,
    },
    {
      title: "Family",
      icon: "people-black",
      id: 5,
    },
    {
      title: "Lifestyle",
      icon: "lifestyle-black",
      id: 6,
    },
  ];
  return (
    <div className='grid h-[400px] sm:w-[450px] w-full grid-cols-2 gap-x-5 gap-y-5 overflow-y-scroll rounded-lg bg-[#f3f3f3] p-5'>
      {BOOKING_SESSIONS.map((session, key) => (
        <button
          key={key}
          className={`${selectedSession === session.id ? "border-2 border-black" : ""} flex h-[86px] w-[100%] flex-col items-center justify-center gap-2 rounded-lg bg-white text-sm`}
          onClick={() => {
            console.log(selectedSession);
            setSelectedSession(session.id);
            dispatch(setBookingSessionType({ sessionType: session.id, date: new Date().toDateString() }))
          }}
        >
          <BaseIcons value={session?.icon} />
          <span className=''>{session?.title}</span>
        </button>
      ))}
    </div>
  );
};

export default ChooseBookingSession;
