"use client";
import React, { useEffect, useState } from "react";
import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  parseISO,
  isSameDay,
  startOfToday,
  isBefore,
  getMonth,
  getYear,
} from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import { BaseIcons } from "@/assets/icons/BaseIcons";
import { MONTHS } from "@/data";
import { setBookingDateTime } from "@/redux/slices/bookingSlice";
import { useAppDispatch } from "@/hooks/hooks";

type AvailableSlot = {
  date: string; // e.g., "2025-10-28"
  times: string[]; // e.g., ["09:00", "11:00"]
};

const years = Array.from(
  { length: 16 }, // total of 16 years
  (_, i) => 2020 + i // starts at 2020, ends at 2035
);

const CustomHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) => (
  <div className='flex items-center justify-center gap-2'>
    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
      <BaseIcons value='arrow-left-black' />
    </button>
    <select
      value={getYear(date)}
      onChange={({ target: { value } }) => changeYear(+value)}
      className='rounded-lg border-[1px] px-2 py-1 outline-none'
    >
      {years.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>

    <select
      value={MONTHS[getMonth(date)]}
      onChange={({ target: { value } }) =>
        changeMonth(MONTHS.indexOf(value as (typeof MONTHS)[number]))
      }
      className='rounded-lg border-[1px] px-2 py-1 outline-none'
    >
      {MONTHS.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>

    <button
      onClick={increaseMonth}
      disabled={nextMonthButtonDisabled}
      className='rotate-180'
    >
      <BaseIcons value='arrow-left-black' />
    </button>
  </div>
);

interface BookingsCalendarProps {
  selectedBookingDate: string | null;
  selectedBookingStartTime: string | null;
  setOnProceed: React.Dispatch<React.SetStateAction<(() => void) | null>>;
}

const BookingCalendar = ({
  selectedBookingDate,
  selectedBookingStartTime,
  setOnProceed,
}: BookingsCalendarProps) => {
  const dispatch = useAppDispatch();
  // 🧠 Dummy backend-like data (will be replaced by RTK Query later)
  const [availableSlots] = useState<AvailableSlot[]>([
    {
      date: "2025-10-29",
      times: ["09:00", "11:00", "14:00", "16:00", "16:00", "16:00", "16:00"],
    }, // 4 bookings (full)
    { date: "2025-11-28", times: ["09:00", "11:00", "14:00"] },
    { date: "2025-11-30", times: ["10:00", "12:00", "16:00", "16:00"] },
    { date: "2025-11-11", times: ["08:00", "10:00", "15:00"] },
    { date: "2025-11-30", times: ["08:00", "10:00", "12:00", "14:00"] }, // full
    { date: "2025-12-05", times: ["09:00", "11:00"] },
  ]);

  // Initialize with Redux date (convert from string to Date)
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    selectedBookingDate ? new Date(selectedBookingDate) : null
  );
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(
    selectedBookingStartTime || null
  );

  // ✅ Disable logic
  const isDayDisabled = (date: Date) => {
    const today = startOfToday();
    if (isBefore(date, today)) return true; // past dates disabled

    const slot = availableSlots.find(s => isSameDay(parseISO(s.date), date));

    // fully booked if 4 or more times
    if (slot && slot.times.length >= 10) return true;

    return false;
  };

  // ✅ Update available times when user selects a date
  useEffect(() => {
    if (!selectedDate) {
      setAvailableTimes([]);
      return;
    }

    // if (selectedDate && selectedTime) {
    //     dispatch(setBookingDateTime({ date: selectedDate, startTime: selectedTime }));
    // }

    const slot = availableSlots.find(s =>
      isSameDay(parseISO(s.date), selectedDate)
    );

    setAvailableTimes(slot?.times || []);

    console.log("selectedBookingStartTime: ", selectedBookingStartTime);

    if (selectedBookingStartTime) {
      const time = new Date(selectedBookingStartTime).toLocaleTimeString(
        "en-NG",
        {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Africa/Lagos",
        }
      );
      return setSelectedTime(time);
    }
    setSelectedTime(null);
  }, [selectedDate, availableSlots, selectedBookingStartTime]);

  useEffect(() => {
    // Register this child’s custom proceed handler
    setOnProceed(() => () => {
      dispatch(
        setBookingDateTime({
          date: selectedDate?.toDateString() || null,
          startTime: selectedTime,
        })
      );
    });

    // Cleanup when leaving this step
    return () => setOnProceed(null);
  }, [setOnProceed, selectedDate, selectedTime, dispatch]);

  return (
    <div className='flex w-full flex-col items-center gap-8 sm:w-[650px] sm:flex-row'>
      {/* Date Picker */}
      <div className='flex flex-col'>
        <h2 className='mb-3 text-lg font-bold text-black'>
          Select available date
        </h2>

        <div className='rounded-xl border border-black p-3 shadow-md transition-shadow duration-200 hover:shadow-lg [&_.react-datepicker]:w-full [&_.react-datepicker]:max-w-full [&_.react-datepicker__day]:flex-1 [&_.react-datepicker__day]:!text-center [&_.react-datepicker__day--disabled]:!text-gray-300 [&_.react-datepicker__day--disabled]:!line-through [&_.react-datepicker__day--selected]:!bg-black [&_.react-datepicker__day--selected]:!text-white [&_.react-datepicker__day:hover]:!bg-black [&_.react-datepicker__day:hover]:!text-white [&_.react-datepicker__header]:!bg-black [&_.react-datepicker__header]:!text-white [&_.react-datepicker__month]:w-full [&_.react-datepicker__month]:max-w-full [&_.react-datepicker__month-container]:w-full [&_.react-datepicker__month-container]:max-w-full [&_.react-datepicker__week]:flex [&_.react-datepicker__week]:!w-full [&_.react-datepicker__week]:!justify-between'>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            filterDate={date => !isDayDisabled(date)} // disables past & full days
            inline
            renderCustomHeader={CustomHeader}
            locale={enUS}
            calendarStartDay={1} // Start week on Monday
            placeholderText='Select an available date'
            minDate={new Date(2025, 0, 1)} // allow all months forward
            showMonthDropdown
            showYearDropdown
            dropdownMode='select'
            className='w-full rounded-lg border border-black bg-black px-3 py-2 text-center text-white'
          />
        </div>
      </div>

      {/* display date and time selected  */}
      <div>
        {/* Time Picker Section */}
        {selectedDate && (
          <div className='flex w-full flex-col'>
            <h3 className='text-md mb-3 font-semibold text-black'>
              Select available Times
            </h3>
            {availableTimes.length > 0 ? (
              <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
                {availableTimes.map((time, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTime(time)}
                    className={`rounded-lg border px-4 py-2 transition-all duration-150 ${
                      selectedTime === time
                        ? "border-black bg-black text-white"
                        : "border-gray-400 bg-white text-black hover:border-black"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            ) : (
              <p className='text-gray-500'>No available times for this date.</p>
            )}
          </div>
        )}

        {/* Selected Summary */}
        {selectedTime && (
          <div className='mt-2'>
            <p className='font-medium text-black'>
              You selected:
              <span className='ml-2 font-semibold text-black underline'>
                {selectedDate?.toDateString()} at{" "}
                {selectedTime || selectedBookingStartTime}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;
