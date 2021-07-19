import classes from './MainHeader.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../store/auth-actions';
import { CssBaseline } from '@material-ui/core';

const MainHeader = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout(history));
  };

  return (
    <header className={classes.header}>
      <CssBaseline />
      <Link to="/" className={classes.link}>
        <h2>Agency04-adresar</h2>
      </Link>
      {currentUser && (
        <nav className={classes.nav}>
          <ul className={classes.ul}>
            <li className={classes.listItem}>
              <Link to="/adresar/omiljeni" className={classes.link}>
                Favorites
              </Link>
            </li>
            <li className={classes.listItem}>
              <Link to="/kontakt" className={classes.link}>
                + Add Contact
              </Link>
            </li>
            <li className={classes.listItem}>
              <Link to="/" className={classes.link} onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default MainHeader;
