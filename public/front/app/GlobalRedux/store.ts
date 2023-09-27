'use client';

import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./features/auth/authSlice";
import globalReducer from "./features/global/globalSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch