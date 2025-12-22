"use client";
import React, { useCallback, useEffect, useState } from "react";
import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  // parseISO,
  // isSameDay,
  startOfToday,
  isBefore,
  getMonth,
  getYear,
  format,
} from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import { BaseIcons } from "@/assets/icons/BaseIcons";
import { MONTHS } from "@/data";
import { setBookingDateTime } from "@/redux/slices/bookingSlice";
import { useAppDispatch } from "@/hooks/hooks";
import { useGetCalendarBookingsQuery } from "@/redux/services/user/booking/booking.api";

// type AvailableSlot = {
//   date: string; // e.g., "2025-10-28"
//   times: string[]; // e.g., ["09:00", "11:00"]
// };

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
  setBookingTimeSelected: (value: boolean) => void;
}

type CalendarSlot = {
  date: string; // "2025-12-30"
  times: string[]; // booked times
  isFull: boolean;
};

const DAILY_TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
];

const BookingCalendar = ({
  selectedBookingDate,
  selectedBookingStartTime,
  setOnProceed,
  setBookingTimeSelected
}: BookingsCalendarProps) => {
  const dispatch = useAppDispatch();

  const [visibleMonth, setVisibleMonth] = useState({
    year: getYear(new Date()),
    month: getMonth(new Date()),
  });

  const { data: availableSlots = [], isFetching } =
    useGetCalendarBookingsQuery(visibleMonth);

  console.log("availableSlots: ", availableSlots);

  // Initialize with Redux date (convert from string to Date)
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    selectedBookingDate ? new Date(selectedBookingDate) : null
  );

  const [selectedTime, setSelectedTime] = useState<string | null>(
    selectedBookingStartTime || null
  );

  const bookedSlotsByDate = React.useMemo(() => {
    const map = new Map<string, CalendarSlot>();

    availableSlots.forEach(slot => {
      map.set(slot.date, slot);
    });

    return map;
  }, [availableSlots]);

  // ✅ DERIVED — NO STATE
  const availableTimes = React.useMemo(() => {
    if (!selectedDate) return [];

    const dateKey = format(selectedDate, "yyyy-MM-dd");
    const slot = bookedSlotsByDate.get(dateKey || "");

    // ❌ Fully booked
    if (slot?.isFull) return [];

    // 🟢 No bookings → all slots available
    if (!slot) return DAILY_TIME_SLOTS;

    // 🟡 Remove booked times
    return DAILY_TIME_SLOTS.filter(time => !slot.times.includes(time));
  }, [selectedDate, bookedSlotsByDate]);

  const isDayDisabled = useCallback(
    (date: Date) => {
      if (isBefore(date, startOfToday())) return true;

      const dateKey = format(date, "yyyy-MM-dd");
      return bookedSlotsByDate.get(dateKey || "")?.isFull ?? false;
    },
    [bookedSlotsByDate]
  );

  useEffect(() => {
    if (selectedDate || isFetching) return;

    const today = startOfToday();
    if (!isDayDisabled(today)) {
      setSelectedDate(today);
    }
  }, [selectedDate, isFetching, isDayDisabled]);

  // ✅ Update available times when user selects a date
  useEffect(() => {
    if (!selectedBookingStartTime) {
      setSelectedTime(null);
      return;
    }

    const time = new Date(selectedBookingStartTime).toLocaleTimeString(
      "en-NG",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Africa/Lagos",
      }
    );

    setSelectedTime(time);
  }, [selectedBookingStartTime]);

  // Register this child’s custom proceed handler
  useEffect(() => {
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


  useEffect(() => {
    if (selectedTime) {
      setBookingTimeSelected(true);
    }
  }, [selectedTime, setBookingTimeSelected])
  return (
    <div className='flex w-full flex-col items-center gap-8 sm:w-[650px] sm:flex-row'>
      {/* Date Picker */}
      <div className='flex flex-col'>
        <h2 className='mb-3 text-lg font-bold text-white'>
          Select available date
        </h2>

        {isFetching ? (
          <p className='text-white'>Fetching booking calendar...</p>
        ) : (
          <div className='rounded-xl border border-gray-300 p-3 [&_.react-datepicker]:w-full [&_.react-datepicker]:border-0 [&_.react-datepicker]:bg-transparent [&_.react-datepicker__day]:flex [&_.react-datepicker__day]:items-center [&_.react-datepicker__day]:justify-center [&_.react-datepicker__day]:rounded-md [&_.react-datepicker__day]:border [&_.react-datepicker__day]:border-gray-300 [&_.react-datepicker__day]:text-white [&_.react-datepicker__day]:transition-colors [&_.react-datepicker__day--disabled]:bg-transparent [&_.react-datepicker__day--disabled]:text-gray-400 [&_.react-datepicker__day--disabled]:line-through [&_.react-datepicker__day--selected]:border-black [&_.react-datepicker__day--selected]:bg-black [&_.react-datepicker__day--selected]:text-white [&_.react-datepicker__day:hover:not(.react-datepicker__day--disabled)]:bg-gray-800 [&_.react-datepicker__day:hover:not(.react-datepicker__day--disabled)]:text-white [&_.react-datepicker__header]:border-b [&_.react-datepicker__header]:border-gray-300 [&_.react-datepicker__header]:bg-transparent [&_.react-datepicker__header]:text-black [&_.react-datepicker__month]:w-full [&_.react-datepicker__month-container]:w-full [&_.react-datepicker__week]:flex [&_.react-datepicker__week]:justify-between'>
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              filterDate={date => !isDayDisabled(date)} // disables past & full days
              inline
              onMonthChange={date =>
                setVisibleMonth({
                  year: getYear(date),
                  month: getMonth(date),
                })
              }
              renderCustomHeader={CustomHeader}
              locale={enUS}
              calendarStartDay={1} // Start week on Monday
              placeholderText='Select an available date'
              minDate={new Date(2025, 0, 1)} // allow all months forward
              showMonthDropdown
              showYearDropdown
              dropdownMode='select'
              // className='w-full rounded-lg border border-white bg-black px-3 py-2 text-center text-white'
            />
          </div>
        )}
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
                        ? "border-white bg-black text-white"
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
          <div className='mt-5'>
            <p className='font-medium text-white'>
              You selected:
              <span className='ml-2 font-semibold text-white underline'>
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
