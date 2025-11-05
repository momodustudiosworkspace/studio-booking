import Booking from "../models/booking.models";

/**
 * Checks if a given timeslot is available for booking
 */
export const isSlotAvailable = async ({
  date,
  startTime,
  // endTime,
  studioRoom = "A",
}: {
  date: Date;
  startTime: Date;
  // endTime: Date;
  studioRoom?: string;
}) => {
  // Find any existing booking that overlaps with the requested slot
  const conflict = await Booking.findOne({
    studioRoom,
    date: { $eq: date },
    $or: [
      {
        startTime: { $eq: startTime },
        // endTime: { $gt: startTime },
      },
    ],
    status: { $ne: "cancelled" }, // ignore cancelled sessions
  });

  return !conflict; // true = slot is free
};