import { useGetCalendarBookingsQuery } from "@/redux/services/user/booking/booking.api";
import { Calendar } from "@heroui/calendar";
import { today, getLocalTimeZone, CalendarDate, } from "@internationalized/date";
import { getMonth, getYear } from "date-fns";
import { useState } from "react";


interface BookingsCalendarProps {
    selectedBookingDate: string | null;
    selectedBookingStartTime: string | null;
    setOnProceed: React.Dispatch<React.SetStateAction<(() => void) | null>>;
    setBookingTimeSelected: (value: boolean) => void;
}

const BookingsCalendar = ({

}: BookingsCalendarProps) => {
    const currentData = today(getLocalTimeZone());
    const [focusedDate, setFocusedDate] = useState<CalendarDate | null>(currentData);
    const [value, setValue] = useState(currentData);


    const [visibleMonth,] = useState({
        year: getYear(new Date()),
        month: getMonth(new Date()),
    });

    const { data: availableSlots = [], isFetching } =
        useGetCalendarBookingsQuery(visibleMonth);

    console.log({
        year: getYear(new Date()),
        month: getMonth(new Date()),
    });



    console.log("availableSlots: ", availableSlots);
    if (isFetching) return <div>Loading...</div>
    return (
        <Calendar
            showMonthAndYearPickers aria-label="Date (Show Month and Year Picker)"
            defaultValue={today(getLocalTimeZone())}
            minValue={today(getLocalTimeZone())}
            focusedValue={focusedDate}
            value={value}
            onFocusChange={setFocusedDate}
            firstDayOfWeek="sun"
            onChange={(value) => {
                setValue(value);
                console.log(value, "changes");

            }}
            pageBehavior="single"

            calendarWidth={"100%"}
            classNames={{
                cell: `h-14 flex justify-center items-center`,
                cellButton: `data-[selected=true]:bg-white data-[selected=true]:text-black`,
                gridHeader: `grid w-full`,
                gridHeaderCell: `w-14 h-[30px] mt-2 flex mr-2`,
                gridBodyRow: "grid grid-cols-7 w-full",
                grid: "table-fixed",
                gridHeaderRow: "grid grid-cols-7 w-full ",
            }}
        />

    );
}

export default BookingsCalendar;
