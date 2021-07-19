import PrivateRoute from './utils/PrivateRoute';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Contacts from './contacts/Contacts';
import AddContact from './contacts/AddContact';
import EditContact from './contacts/EditContact';
import ContactDetails from './contacts/ContactDetails';
import Layout from '../components/Layout/Layout';

import { useSnackbar } from 'notistack';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { auth } from '../firebase';
import { authActions } from '../store/auth-slice';

import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const { currentUser, isUserLoading } = useSelector(({ auth }) => auth);
  const notification = useSelector(({ notification }) => notification.notification);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (notification.isShown) {
      enqueueSnackbar(notification.text, {
        variant: notification.type,
        autoHideDuration: notification.duration || 3000,
      });
    }
  }, [notification, enqueueSnackbar]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(
        authActions.setUserOnSignup({
          currentUser: user,
        })
      );
      dispatch(authActions.setIsUserLoading());
      return unsubscribe;
    });
  }, [dispatch]);

  return (
    <>
      <Layout>
        {!isUserLoading && (
          <Switch>
            <Route exact path="/">
              {currentUser ? <Redirect to="/adresar" /> : <Redirect to="/login" />}
            </Route>
            <PrivateRoute exact path="/adresar" component={Contacts} />
            <PrivateRoute exact path="/adresar/omiljeni" component={Contacts} />
            <PrivateRoute exact path="/kontakt" component={AddContact} />
            <PrivateRoute exact path="/kontakt/detalji/:id" component={ContactDetails} />
            <PrivateRoute
              exact
              path="/kontakt/detalji/:id/edit"
              component={EditContact}
            />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        )}
      </Layout>
    </>
  );
};

export default App;
