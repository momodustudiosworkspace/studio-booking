"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";

import { useAppDispatch } from "@/hooks/hooks";
import { useGetSessionsQuery } from "@/redux/services/user/booking/sessions.api";
import { setBookingSessionType } from "@/redux/slices/bookingSlice";
import { ISession } from "@/types/session.types";

interface ChooseBookingSessionProps {
  bookingSession: string | null | undefined;
  setBookingStep: (step: number) => void;
}

const emblaOptions: EmblaOptionsType = {
  align: "start",
  containScroll: "trimSnaps",
};

const ChooseBookingSession = ({
  bookingSession,
  setBookingStep,
}: ChooseBookingSessionProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetSessionsQuery();

  const BOOKING_SESSIONS = useMemo(() => data?.data || [], [data?.data]);

  const [selectedSession, setSelectedSession] = useState<string | null>(
    bookingSession ?? null
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

  // Sync selected slide with Embla
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    const session = BOOKING_SESSIONS[index];
    if (session) {
      setSelectedSession(session._id);
    }
  }, [emblaApi, BOOKING_SESSIONS]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const handleSelect = (session: ISession, index: number) => {
    setSelectedSession(session._id);

    dispatch(
      setBookingSessionType({
        sessionType: session._id,
        sessionTitle: session.title,
        date: new Date().toDateString(),
      })
    );

    emblaApi?.scrollTo(index);
    setBookingStep(1);
  };



  return (
    <div className='w-[350px] rounded-lg sm:w-[750px]'>

      {isLoading && <p className="text-white">Loading sessions...</p>}
      {data?.data.length === 0 && !isLoading && (<p className="text-white">No sessions available.</p>)}
      {/* Main Carousel */}
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex gap-5'>
          {BOOKING_SESSIONS.map((session, index) => (
            <div key={session._id} className='min-w-[80%] sm:min-w-[40%]'>
              <button
                onClick={() => handleSelect(session, index)}
                className={`group relative h-[380px] w-full overflow-hidden rounded-lg transition ${
                  selectedSession === session._id
                    ? "ring-2 ring-black"
                    : "ring-1 ring-transparent"
                }`}
              >
                {/* Background Image */}
                <div
                  className='absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110'
                  style={{
                    backgroundImage: `url("${session.imageUrl}")`,
                  }}
                />

                {/* Dark Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80 transition-opacity duration-500 ease-in-out group-hover:from-black/60 group-hover:via-black/70 group-hover:to-black/90' />

                {/* Content */}
                <div className='relative z-10 flex h-full flex-col justify-between p-6 text-white transition-all duration-500 ease-in-out group-hover:items-center group-hover:text-center'>
                  {/* Title */}
                  <h3 className='text-2xl leading-tight font-bold capitalize transition-transform duration-500 ease-in-out group-hover:translate-y-2'>
                    {session.title}
                  </h3>

                  {/* Tagline */}
                  <p className='mt-2 translate-y-4 text-xs opacity-80 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100'>
                    Book your session
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Thumbs / Indicators */}
      {/* <div className='mt-4 flex justify-center gap-2'>
        {BOOKING_SESSIONS.map((session, index) => (
          <button
            key={session._id}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 w-2 rounded-full transition ${
              selectedSession === session._id ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div> */}
    </div>
  );
};

export default ChooseBookingSession;
