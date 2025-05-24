import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionState } from '../models/interface';

// Initial state for user session
const initialState: SessionState = {
  username: '',
  loginTime: '',
};

// Redux slice for session management
export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    // Set session data (username and login time)
    setSession: (state, action: PayloadAction<{ username: string }>) => {
      console.log('[sessionSlice] Setting session for:', action.payload.username);
      state.username = action.payload.username;
      state.loginTime = new Date().toLocaleString();
    },
    // Clear session data
    clearSession: (state) => {
      console.log('[sessionSlice] Clearing session');
      state.username = '';
      state.loginTime = '';
    },
  },
});

// Selector to get session state from the store
export const selectSession = (state: { session: SessionState }) => state.session;
export const { setSession, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
