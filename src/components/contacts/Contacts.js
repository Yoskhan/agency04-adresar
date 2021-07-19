import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { getContacts } from '../../store/contacts-actions';

import ContactCard from './ContactCard';

import {
  Box,
  Container,
  Grid,
  Card,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  Paper,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import { contactsActions } from '../../store/contacts-slice';

const Contacts = () => {
  const limit = useSelector((state) => state.contacts.limit);
  const [pageNumber, setPageNumber] = useState(1);
  const [orderByLastname, setOrderByLastname] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [filteredContacts, setFilteredContacts] = useState([]);

  const currentUser = useSelector((state) => state.auth.currentUser);
  const { contacts } = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(
      getContacts({
        orderBy: orderByLastname ? 'lastname' : 'createdAt',
      })
    );
  }, [dispatch, orderByLastname]);

  useEffect(() => {
    //Save some filter methods before checking if we are on Favorites route
    //to minimize duplicate code
    let filteredContacts = contacts.filter((contact) => {
      const regexp = new RegExp(searchTerm, 'gi');
      return (
        regexp.test(contact.name) ||
        regexp.test(contact.lastname) ||
        regexp.test(contact.contact)
      );
    });

    //Just ignoring filter method for favorite contacts if we are no on that route

    if (history.location.pathname === '/adresar/omiljeni') {
      setFilteredContacts(
        filteredContacts
          .filter((contact) => contact.isFavorite)
          .slice((pageNumber - 1) * limit, pageNumber * limit)
      );
    } else {
      setFilteredContacts(
        filteredContacts.slice((pageNumber - 1) * limit, pageNumber * limit)
      );
    }
  }, [contacts, limit, pageNumber, searchTerm, history.location.pathname]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPageNumber(newPage);
  };

  const handleOrder = () => {
    setOrderByLastname(!orderByLastname);
  };

  const handleLimit = (e) => {
    dispatch(contactsActions.setLimit({ limit: parseInt(e.target.value) }));
    setPageNumber(1);
  };

  const renderContacts = (contact) => {
    return (
      <Grid item xs={4} key={contact.key}>
        <ContactCard contact={contact} key={contact.key} orderBy={orderByLastname} />
      </Grid>
    );
  };

  return (
    <Container>
      <Box maxWidth="10rem" display="flex" justifyContent="center" mt={2}>
        <Paper>
          <Box p={2}>
            <Typography variant="subtitle1">Logged in as: </Typography>
            <Typography variant="subtitle1" color="primary">
              {' '}
              {currentUser?.email}
            </Typography>
          </Box>
        </Paper>
      </Box>
      <Box my={6}>
        <Grid container alignItems="center" justifyContent="flex-end">
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Box display="flex" justifyContent="center">
              <TextField
                variant="outlined"
                label="Search contacts"
                fullWidth
                onInput={handleSearchChange}
              />
            </Box>
          </Grid>
          <Grid item xs={2} display="flex">
            <Box display="flex" flexDirection="column" alignItems="center">
              <FormHelperText>Sort by</FormHelperText>
              <Button
                size="small"
                onClick={handleOrder}
                variant="contained"
                color={orderByLastname ? 'secondary' : 'default'}
              >
                Lastname
              </Button>
            </Box>
          </Grid>
          <Grid item xs={2} display="flex">
            <Box
              justifyItems="center"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Select
                value={limit}
                onChange={handleLimit}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
              <FormHelperText>Contacts per page</FormHelperText>
            </Box>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Card variant="outlined">
            <Box>
              <Grid container>{filteredContacts?.map(renderContacts)}</Grid>
            </Box>
            <Box display="flex" justifyContent="center" my={1}>
              <Box>
                <Pagination
                  count={Math.round(contacts.length / limit)}
                  page={pageNumber}
                  onChange={handlePageChange}
                />
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default Contacts;
