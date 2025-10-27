import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
// import { RootState } from '../store';


interface BookingLocationOptions {
    state?: string;
    address?: string
}
export interface BookingState {
    assignedTo?: number,
    bookingStep?: number | null,
    sessionType?: number | null,
    date?: string | null,
    startTime?: Date | null,
    // endTime?: Date | null,
    studioRoom?: "A" | "B",
    status?: "pending" | "confirmed" | "completed" | "cancelled",
    notes?: string,
    location?: BookingLocationOptions | null,
    paymentReference?: string,
    cancelReason?: string,
}

const initialState: BookingState = {
    assignedTo: 0,
    bookingStep: 0,
    sessionType: 0,
    date: "",
    startTime: null,
    // endTime: new Date,
    studioRoom: "A",
    status: "pending",
    notes: "",
    paymentReference: "",
    location: {
        state: "abuja",
        address: "C1, Melita plaza, Gimbiya street, Garki, Abuja."

    },
    cancelReason: "",
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setBookingSessionType: (state, action: PayloadAction<BookingState>) => {
            state.sessionType = action.payload.sessionType || null
            state.date = new Date().toISOString()
        },
        setBookingLocationType: (state, action: PayloadAction<BookingState>) => {
            state.location = action.payload.location || null
        },
        setBookingSteps: (state, action: PayloadAction<BookingState>) => {
            state.bookingStep = action.payload.bookingStep || null
        },
        setBookingDateTime: (
  state,
  action: PayloadAction<{ date: string | null; startTime: string | null }>
) => {
  const { date, startTime } = action.payload;

  if (date && startTime) {
    // 🧠 Construct full datetime in local timezone
    const fullDateTime = new Date(
      `${date} ${startTime}`
    );

    // ✅ Store clean ISO formats for MongoDB
    // state.date = new Date(date.toISOString()).toISOString() || null;       // e.g. "2025-10-30T00:00:00.000Z"
    state.date = new Date(date).toDateString() || null;       // e.g. "2025-10-30T00:00:00.000Z"
    state.startTime = fullDateTime || null;                   // e.g. "2025-10-30T09:00:00.000Z"
    // state.startTime = fullDateTime.toISOString() || null;                   // e.g. "2025-10-30T09:00:00.000Z"
  }
}
    },
});

export const {
    setBookingSessionType,
    setBookingLocationType,
    setBookingSteps,
    setBookingDateTime
} = bookingSlice.actions;
export const selectBookingSessionType = (state: RootState): number | null | undefined =>
    state.booking.sessionType;
export const selectbookingLocation = (state: RootState): BookingLocationOptions | null | undefined =>
    state.booking.location;
export const selectbookingSteps = (state: RootState): number | null | undefined =>
    state.booking.bookingStep;
export default bookingSlice.reducer;
// export const selectBusinessId = (state: RootState): number | null =>
//   state.business.business_id ?? null;
// export const selectUserIsLoggedIn = (state: RootState): boolean =>
//   state.business.userIsLoggedIn;
