"use client";

import BookingCardNotification from "./cards/BookingCardNotification";

const DashboardNotifications = () => {
  const NOTIFICATIONS = [
    {
      id: 1,
      message: "you’re booked! potrait session confirmed",
      date: "sat, sep 13,2025",
      type: 1,
    },
    {
      id: 2,
      message: "order MS1234 payment successful",
      date: "sat, sep 13,2025",
      type: 2,
    },
    {
      id: 3,
      message: "your photos are ready",
      date: "sat, sep 13,2025",
      type: 3,
    },
    {
      id: 4,
      message: "new message from momodu studios",
      date: "sat, sep 13,2025",
      type: 4,
      body: "Lorem ipsum dolor sit amet consectetur. Nulla et montes dui pellentesque orci habitasse euismod tellus tellus. Neque non consectetur eu congue proin purus dui ",
    },
  ];
  return (
    <div className='flex flex-col gap-3'>
      {NOTIFICATIONS.map(notification => {
        return (
          <BookingCardNotification
            key={notification.id}
            message={notification.message}
            date={notification.date}
            type={notification.type}
            id={notification.id}
            body={notification?.body}
          />
        );
      })}
    </div>
  );
};

export default DashboardNotifications;
