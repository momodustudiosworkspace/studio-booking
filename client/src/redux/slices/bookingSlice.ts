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
    sessionType?: string | null,
    date?: string | null;        // stored as ISO or toDateString()
    startTime?: string | null;     // stored as Date object
    package?: {
        title: string,
        price: number
    } | null,
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
    sessionType: "",
    date: "",
    startTime: null,
    package: {
        title: "",
        price: 0
    },
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
                // Combine into ISO format
                const fullDateTime = new Date(`${date} ${startTime}`);

                state.date = date; // e.g. "2025-12-05"
                state.startTime = fullDateTime.toISOString(); // e.g. "2025-12-05T09:00:00.000Z"
            }
        }
        ,
        setBookingPackage: (state, action: PayloadAction<BookingState>) => {
            state.package = action.payload.package || null
        },
    },
});

export const {
    setBookingSessionType,
    setBookingLocationType,
    setBookingSteps,
    setBookingDateTime,
    setBookingPackage
} = bookingSlice.actions;
export const selectBookingSessionType = (state: RootState): string | null | undefined =>
    state.booking.sessionType;
export const selectbookingLocation = (state: RootState): BookingLocationOptions | null | undefined =>
    state.booking.location;
export const selectbookingSteps = (state: RootState): number | null | undefined =>
    state.booking.bookingStep;
export const selectbooking = (state: RootState): BookingState =>
    state.booking;
export default bookingSlice.reducer;
// export const selectBusinessId = (state: RootState): number | null =>
//   state.business.business_id ?? null;
// export const selectUserIsLoggedIn = (state: RootState): boolean =>
//   state.business.userIsLoggedIn;
