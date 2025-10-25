"use client";
import React, { useState, useCallback, useMemo } from "react";
import { Calendar, Views, dateFnsLocalizer, DateLocalizer, Event, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, isBefore } from "date-fns";
import { enUS } from "date-fns/locale/en-US"
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
    "en-US": enUS,
};

// ✅ Create the date-fns localizer
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

interface BookingCalendarProps {
    localizer?: DateLocalizer;
}

const BookingCalendar = ({ localizer: propLocalizer }: BookingCalendarProps) => {
    const [date, setDate] = useState(new Date())
    const [view, setView] = useState<View>('month')

    // disable Sundays and past days
    const isDisabledDay = (date: Date) => {
        const today = new Date();
        const isSunday = getDay(date) === 0; // 0 = Sunday
        return isBefore(date, today) || isSunday;
    };
    const [events, setEvents] = useState<Event[]>([
        {
            title: "Morning Session",
            start: new Date(2025, 9, 23, 9, 0),
            end: new Date(2025, 9, 23, 10, 0),
        },
        {
            title: "Team Meeting",
            start: new Date(2025, 9, 23, 13, 0),
            end: new Date(2025, 9, 23, 14, 0),
        },
    ]);

    const onNavigate = useCallback((newDate: Date) => {
        setDate(newDate)
    }, [])

    const onView = useCallback((newView: View) => {
        setView(newView)
    }, [])

    const handleSelectSlot = useCallback(
        ({ start, end }: { start: Date; end: Date }) => {
            if (isDisabledDay(start)) {
                alert("You cannot book on this day.");
                return;
            }

            const title = window.prompt("Enter booking title");
            if (title) {
                setEvents((prev) => [...prev, { start, end, title }]);
            }
        },
        []
    );

    const handleSelectEvent = useCallback((event: Event) => {
        window.alert(`Event: ${event.title}`);
    }, []);

    const { defaultDate, scrollToTime } = useMemo(
        () => ({
            defaultDate: new Date(2025, 9, 23),
            scrollToTime: new Date(1970, 1, 1, 6),
        }),
        []
    );

    return (
        <div className="h-[600px] w-full bg-white p-4 rounded-xl shadow">
            <Calendar
                selectable
                localizer={propLocalizer ?? localizer}
                events={events}
                defaultDate={defaultDate}
                startAccessor="start"
                endAccessor="end"
                views={[Views.MONTH, Views.DAY,]} // Enable month, week, day, and agenda views
                defaultView={Views.AGENDA} // Optionally set a default view
                scrollToTime={scrollToTime}
                step={30}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                onNavigate={onNavigate}
                onView={onView}
                view={view}
                date={date}
                popup
                dayPropGetter={(date) => {
                    const isSunday = getDay(date) === 0;
                    if (isSunday) {
                        return {
                            style: {
                                backgroundColor: "gray",
                                color: "#9ca3af",
                                pointerEvents: "none", // disable click
                            },
                        };
                    }
                    return {};
                }}
            />
        </div>
    );
};

export default BookingCalendar;
