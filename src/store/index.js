import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import notificationReducer from './notification-slice';

import authSlice from './auth-slice';
import contactsSlice from './contacts-slice';

const store = configureStore({
  notification: notificationReducer,
  reducer: {
    contacts: contactsSlice.reducer,
    auth: authSlice.reducer,
    notification: notificationReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
