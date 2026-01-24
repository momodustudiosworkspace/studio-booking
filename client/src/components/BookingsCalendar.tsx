import { Calendar } from "@heroui/react";
// import { today, getLocalTimeZone } from "@internationalized/date";

const BookingsCalendar = () => {
    return (
        <Calendar
            aria-label="Date (Min Date Value)"
        // defaultValue={today(getLocalTimeZone())}
        // minValue={today(getLocalTimeZone())}
        />
    );
}

export default BookingsCalendar;
