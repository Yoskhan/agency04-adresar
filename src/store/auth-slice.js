import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    isLoading: false,
    err: null,
    isUserLoading: true,
  },
  reducers: {
    setUserOnSignup(state, action) {
      state.currentUser = action.payload.currentUser;
    },
    turnOnLoading(state) {
      state.isLoading = true;
    },
    turnOffLoading(state) {
      state.isLoading = false;
    },
    setError(state, action) {
      state.err = action.payload.error.message;
    },
    setIsUserLoading(state) {
      state.isUserLoading = false;
    },
    getCurrentUser(state) {
      return state.currentUser;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
