import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    favoriteContacts: [],
    contactsCount: 0,
    contactDetail: {},
    limit: 5,
  },
  reducers: {
    setContacts(state, action) {
      state.contacts = action.payload;
    },
    createNewContact(state, action) {
      state.contacts = action.payload;
    },
    setContactDetails(state, action) {
      state.contactDetail = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload.limit;
    },
  },
});

export const contactsActions = contactsSlice.actions;

export default contactsSlice;
