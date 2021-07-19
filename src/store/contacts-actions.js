import { contactsActions } from './contacts-slice';
import { notificationActions } from './notification-slice';
import { auth } from '../firebase';
import { db } from '../firebase';

export const createNewUser = (newContact) => {
  return async (dispatch) => {
    let contactsRef = db.ref('users/' + auth?.currentUser?.uid + '/contacts');

    contactsRef
      .push(newContact)
      .then((data) => {
        dispatch(
          notificationActions.showNotification({
            text: 'User has been successfully added.',
            type: 'success',
          })
        );
      })
      .catch((error) => {
        dispatch(
          notificationActions.showNotification({
            text: error?.message,
            type: 'error',
          })
        );
      });
  };
};

export const getContacts = (params) => {
  return async (dispatch) => {
    // .orderByValue()
    // .startAt('3')
    // .limitToFirst(3)
    let contactsRef = db.ref('users/' + auth?.currentUser?.uid + '/contacts');
    contactsRef
      .orderByChild(params.orderBy)
      .once('value', (snapshot) => {
        let contacts = [];

        snapshot.forEach((childSnapshot) => {
          let key = childSnapshot.key;
          let data = childSnapshot.val();

          let dataObject = {
            key: key,
            contact: data.contact,
            createdBy: data.createdBy,
            isFavorite: data.isFavorite,
            lastname: data.lastname,
            name: data.name,
            type: data.type,
          };

          contacts.push(dataObject);
        });
        if (params.orderBy === 'lastname') {
          dispatch(contactsActions.setContacts(contacts));
        } else {
          dispatch(contactsActions.setContacts(contacts.reverse()));
        }
      })
      .catch((error) => {
        dispatch(
          notificationActions.showNotification({
            text: error?.message,
            type: 'error',
          })
        );
      });
  };
};

export const getContactById = (id) => {
  let contactsRef = db.ref('users/' + auth?.currentUser?.uid + '/contacts');

  return async (dispatch) => {
    let contact;

    contactsRef
      .child(id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          contact = snapshot.val();
          dispatch(contactsActions.setContactDetails(contact));
        } else {
          dispatch(
            notificationActions.showNotification({
              text: '',
              type: 'error',
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          notificationActions.showNotification({
            text: error?.message,
            type: 'error',
          })
        );
      });
  };
};

export const deleteContactById = (id) => {
  let contactsRef = db.ref('users/' + auth?.currentUser?.uid + '/contacts');

  return async (dispatch) => {
    contactsRef
      .child(id)
      .remove()
      .then((snapshot) => {
        dispatch(
          notificationActions.showNotification({
            text: 'User has been successfully deleted.',
            type: 'success',
          })
        );
      })
      .catch((error) => {
        dispatch(
          notificationActions.showNotification({
            text: error?.message,
            type: 'error',
          })
        );
      });
  };
};

export const updateContactById = (id, contact, orderBy) => {
  let contactsRef = db.ref('users/' + auth?.currentUser?.uid + '/contacts');

  return async (dispatch) => {
    contactsRef
      .child(id)
      .update(contact)
      .then((snapshot, context) => {
        dispatch(getContacts({ orderBy: orderBy ? 'lastname' : 'createdAt' }));

        dispatch(
          notificationActions.showNotification({
            text: 'Succesfully updated user.',
            type: 'success',
          })
        );
      })
      .catch((error) => {
        dispatch(
          notificationActions.showNotification({
            text: error?.message,
            type: 'error',
          })
        );
      });
  };
};
