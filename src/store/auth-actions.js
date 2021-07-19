import { authActions } from './auth-slice';
import { auth } from '../firebase';

export const signup = (email, password, history) => {
  return async (dispatch) => {
    dispatch(authActions.turnOnLoading());

    try {
      dispatch(authActions.setError({ error: '' }));
      await auth.createUserWithEmailAndPassword(email, password);

      dispatch(authActions.turnOffLoading());
      history.push('/adresar');
    } catch (err) {
      dispatch(authActions.setError({ error: err }));
      dispatch(authActions.turnOffLoading());
    }
  };
};

export const login = (email, password, history) => {
  return async (dispatch) => {
    //Try catch for double email
    dispatch(authActions.turnOnLoading());

    try {
      dispatch(authActions.setError({ error: '' }));
      await auth.signInWithEmailAndPassword(email, password);

      dispatch(authActions.turnOffLoading());
      history.push('/adresar');
    } catch (err) {
      dispatch(authActions.setError({ error: err }));
      dispatch(authActions.turnOffLoading());
    }
  };
};

export const logout = (history) => {
  return async (dispatch) => {
    //Try catch for double email
    try {
      await auth.signOut();

      history.push('/login');
    } catch (err) {
      dispatch(authActions.setError({ error: err }));
    }
  };
};
