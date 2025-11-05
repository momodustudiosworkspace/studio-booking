import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";
import auth from "./slices/authSlice";
import booking from "./slices/bookingSlice";
import { baseApi } from "./services/api";

// Combine all reducers
const rootReducer = combineReducers({
  auth: auth,
  booking: booking,
  [baseApi.reducerPath]: baseApi.reducer, // 👈 add API reducer
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  // whitelist: ['auth'], // ✅ persist only auth, not api
};

// Wrap root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Needed for redux-persist
    }).concat(baseApi.middleware),
  //  devTools: process.env.NODE_ENV !== 'production', // ✅ Enable only in dev
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
