import { createSlice } from '@reduxjs/toolkit';

const initialNotificationState = {
  notification: {
    text: '',
    isShown: false,
    type: '',
    duration: 0,
  },
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialNotificationState,
  reducers: {
    showNotification(state, { payload }) {
      const text =
        payload.text || (payload.type === 'error' ? 'Something went wrong!' : 'Success!');
      state.notification = { isShown: true, ...payload, text };
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice.reducer;
