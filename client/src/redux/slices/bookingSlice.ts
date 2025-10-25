import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
// import { RootState } from '../store';


interface BookingLocationOptions{
        state?: string;
        address?:string
}
export interface BookingState {
    assignedTo?: number,
    bookingStep?: number | null,
    sessionType?: number | null,
    date?: Date,
    startTime?: Date,
    endTime?: Date,
    studioRoom?: "A" | "B",
    status?: "pending" | "confirmed" | "completed" | "cancelled",
    notes?: string,
    location?: BookingLocationOptions | null,
    paymentReference?: string,
    cancelReason?: string,
}

const initialState: BookingState = {
    assignedTo: 0,
    bookingStep:0,
    sessionType: 0,
    date: new Date,
    startTime: new Date,
    endTime: new Date,
    studioRoom: "A",
    status: "pending",
    notes: "",
    paymentReference: "",
    location:  {
        state: "abuja",
        address:"C1, Melita plaza, Gimbiya street, Garki, Abuja."
        
    },
    cancelReason: "",
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        bookingSessionType: (state, action: PayloadAction<BookingState>) => {
            state.sessionType = action.payload.sessionType || null
            state.date = new Date
        },
        bookingLocationType: (state, action : PayloadAction<BookingState>) => {
            state.location = action.payload.location || null
        },
        bookingSteps: (state, action : PayloadAction<BookingState>) => {
            state.bookingStep = action.payload.bookingStep || null
        }

    },
});

export const {
    bookingSessionType,
    bookingLocationType,
    bookingSteps
} = bookingSlice.actions;
export const selectBookingSessionType = (state: RootState): number | null | undefined =>
    state.booking.sessionType;
export const selectbookingLocation = (state: RootState): BookingLocationOptions | null | undefined =>
    state.booking.location ;
export const selectbookingSteps = (state: RootState): number | null | undefined =>
    state.booking.bookingStep;
export default bookingSlice.reducer;
// export const selectBusinessId = (state: RootState): number | null =>
//   state.business.business_id ?? null;
// export const selectUserIsLoggedIn = (state: RootState): boolean =>
//   state.business.userIsLoggedIn;
