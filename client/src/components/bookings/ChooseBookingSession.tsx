import { useAppDispatch } from "@/hooks/hooks";
import { useGetSessionsQuery } from "@/redux/services/user/booking/sessions.api";
import { setBookingSessionType } from "@/redux/slices/bookingSlice";
import { ISession } from "@/types/session.types";
import React, { useState } from "react";

interface ChooseBookingSessionProps {
  bookingSession: string | null | undefined;
  setBookingStep: (step: number) => void;
}
const ChooseBookingSession = ({
  bookingSession,
  setBookingStep,
}: ChooseBookingSessionProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const [selectedSession, setSelectedSession] = useState<string | null>(
    bookingSession || null
  );

  const { data, isLoading } = useGetSessionsQuery();

  const BOOKING_SESSIONS: ISession[] = data?.data || [];

  return (
    <div className='grid h-[400px] w-full grid-cols-2 gap-x-5 gap-y-5 overflow-y-scroll rounded-lg bg-[#f3f3f3] p-5 sm:w-[450px]'>
      {isLoading
        ? "Loading..."
        : BOOKING_SESSIONS.map((session, key) => (
            <button
              key={key}
              className={`${selectedSession === session._id ? "border-2 border-black" : ""} flex h-[86px] w-[100%] flex-col items-center justify-center gap-2 rounded-lg bg-white text-sm`}
              onClick={() => {
                console.log(selectedSession);
                setSelectedSession(session._id);
                dispatch(
                  setBookingSessionType({
                    sessionType: session._id,
                    sessionTitle: session.title,
                    date: new Date().toDateString(),
                  })
                );
                setBookingStep(1);
              }}
            >
              <span className='capitalize'>{session?.title}</span>
            </button>
          ))}
    </div>
  );
};

export default ChooseBookingSession;
