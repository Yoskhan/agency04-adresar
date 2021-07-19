import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';

import { getContactById, deleteContactById } from '../../store/contacts-actions';

import {
  Card,
  Box,
  Container,
  Grid,
  CardHeader,
  Typography,
  CardContent,
  Button,
} from '@material-ui/core';

const ContactDetails = (contact) => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  const contactDetails = useSelector((state) => state.contacts.contactDetail);

  useEffect(() => {
    dispatch(getContactById(params.id));
  }, [dispatch, params.id]);

  const handleDelete = () => {
    dispatch(deleteContactById(params.id));
    history.push('/adresar');
  };

  const handleEdit = () => {
    history.push('/kontakt/detalji/' + params.id + '/edit');
  };

  return (
    <Container component="main" maxWidth="xs" margin={5}>
      <Box mt={5}>
        <Card>
          <Box>
            <CardHeader title={`${contactDetails.name} ${contactDetails.lastname}`} />
          </Box>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Contact: {contactDetails.contact}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Type: {contactDetails.type}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Birthday: {contactDetails.date}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Created By: {contactDetails.createdBy}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ContactDetails;
