import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
// import { RootState } from '../store';

export interface AuthState {
  isLoggedIn: boolean;
  token: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<AuthState>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    setToken: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
    },
    userLogOut: () => {
      return initialState;
    },
  },
});

export const { userLogin, userLogOut, setToken } = authSlice.actions;
export const selectUserIsLoggedIn = (state: RootState): boolean =>
  state.auth.isLoggedIn;
export default authSlice.reducer;
// export const selectBusinessId = (state: RootState): number | null =>
//   state.business.business_id ?? null;
// export const selectUserIsLoggedIn = (state: RootState): boolean =>
//   state.business.userIsLoggedIn;
