import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UsersState } from '../models/interface.ts';
import { getAllUsers } from '../services/userService.ts';

// Async thunk for fetching users from backend
export const getUsers = createAsyncThunk('users/fetch', async (page: number, thunkAPI) => {
  const state: any = thunkAPI.getState();
  const username = state.session?.username;
  const users = await getAllUsers(page, username);

  return users;
});

// Initial state for users slice
const initialState: UsersState = {
  externalUsers: [],
  localUsers: [],
  page: 1,
  flagloadMorePage: false,
};

// Redux slice for users management
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Clear external users array
    clearExternalUsers(state) {
      console.log('[usersSlice] Clearing external users');
      state.externalUsers = [];
    },
    // Increment page for "load more"
    loadMorePage(state) {
      state.page += 1;
      console.log('[usersSlice] Load more page:', state.page);
    },
    // Reset page to 1 for "show less"
    showLessPage(state) {
      state.page = 1;
      console.log('[usersSlice] Show less, reset page to 1');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      if (action.payload === null) {
        console.warn('[usersSlice] No users returned from backend');
        return;
      }
      state.flagloadMorePage = action.payload.externalUsers.length !== 0;
      if (state.page === 1) {
        state.externalUsers = action.payload.externalUsers;
      } else {
        state.externalUsers = state.externalUsers.concat(action.payload.externalUsers);
      }
      state.localUsers = action.payload.localUsers;
    });
  },
});

// Selectors for users state
export const selectExternalUsers = (state: { users: UsersState }) => state.users.externalUsers;
export const selectLocalUsers = (state: { users: UsersState }) => state.users.localUsers;
export const selectUsers = (state: { users: UsersState }) =>
  state.users.localUsers.concat(state.users.externalUsers || []);
export const selectPage = (state: { users: UsersState }) => state.users.page;
export const selectFlagLoadMorePage = (state: { users: UsersState }) =>
  state.users.flagloadMorePage;

export const { clearExternalUsers, loadMorePage, showLessPage } = usersSlice.actions;
export default usersSlice.reducer;
