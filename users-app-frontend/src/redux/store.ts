import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice.ts';
import userReducer from './userSlice.ts';

export const store = configureStore({
  reducer: {
    users: userReducer,
    session: sessionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
