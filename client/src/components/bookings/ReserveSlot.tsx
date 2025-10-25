"use client";
import React from "react";
import BookingCalendar from "./BookingCalendar";

interface ReserveSlotProps {
  proceedBtnRef: React.RefObject<HTMLButtonElement | null>;
}

const ReserveSlot = ({
  // proceedBtnRef,

}: ReserveSlotProps): React.JSX.Element => {
  // const hiddenSubmitRef = useRef<HTMLButtonElement>(null);

  // useEffect(() => {
  //   if (!proceedBtnRef.current || !hiddenSubmitRef.current) return;

  //   proceedBtnRef.current.onclick = () => {
  //     hiddenSubmitRef.current?.click();
  //   };
  // }, [proceedBtnRef]);

  return (
    <div className="sm:w-[800px]">
      <BookingCalendar />
    </div>
  );
};

export default ReserveSlot;
