import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { createNewUser } from '../../store/contacts-actions';
import { useSelector } from 'react-redux';

import { Formik, Form } from 'formik';
import {
  Container,
  Button,
  Box,
  Grid,
  TextField,
  Card,
  CardHeader,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from '@material-ui/core';

import * as yup from 'yup';

const AddContact = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  let formSchema = {
    name: '',
    lastname: '',
    date: '', // if date is defiend as '' yup will throw a invalid date error
    type: 'Mobile',
    contact: '',
    isFavorite: false,
  };

  var validationSchema = yup.object().shape({
    name: yup.string().required('Name is required').max(100),
    lastname: yup.string().required('Lastname is required').max(300),
    date: yup.date().nullable().required('Date is required.'),
    type: yup.string().required('Select type of contact.'),
    contact: yup.string().required('Contact is required.'),
  });

  return (
    <Container component="main" maxWidth="xs" margin={5}>
      <Formik
        initialValues={formSchema}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const newValues = {
            ...values,
            name: values['name'][0].toUpperCase() + values['name'].slice(1),
            lastname: values['lastname'][0].toUpperCase() + values['lastname'].slice(1),
            createdBy: currentUser?.email,
            date: values['date'],
            createdAt: new Date().toISOString(),
            isFavorite: false,
            type: values['type'],
          };

          dispatch(createNewUser(newValues));
          resetForm();
          history.push('/');
        }}
      >
        {(props) => (
          <Box mt={5}>
            <Card elevation={3}>
              <Box px={5} py={3}>
                <CardHeader title="Add a new contact"></CardHeader>
                <Form width={5}>
                  <Grid container spacing={4}>
                    <Grid item xs={6}>
                      <Box my={2}>
                        <TextField
                          fullWidth
                          id="name"
                          name="name"
                          label="First Name"
                          value={props.values.name}
                          onChange={props.handleChange}
                          error={props.touched.name && Boolean(props.errors.name)}
                          helperText={props.touched.name && props.errors.name}
                          onBlur={props.handleBlur}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box my={2}>
                        <TextField
                          fullWidth
                          id="lastname"
                          name="lastname"
                          label="Last Name"
                          value={props.values.lastname}
                          onChange={props.handleChange}
                          error={props.touched.lastname && Boolean(props.errors.lastname)}
                          helperText={props.touched.lastname && props.errors.lastname}
                          onBlur={props.handleBlur}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box>
                        <TextField
                          id="date"
                          label="Birthday"
                          type="date"
                          fullWidth
                          value={props.values.date}
                          onChange={(e) => props.setFieldValue('date', e.target.value)}
                          error={props.touched.date && Boolean(props.errors.date)}
                          helperText={props.touched.date && props.errors.date}
                          onBlur={props.handleBlur}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl component="fieldset" control={<FormControlLabel />}>
                        <FormLabel component="legend">Type of Contact</FormLabel>
                        <RadioGroup
                          name="type"
                          row
                          value={props.values.type}
                          onChange={(e) => props.setFieldValue('type', e.target.value)}
                        >
                          <FormControlLabel
                            value="Mobile"
                            control={<Radio />}
                            label="Mobile"
                          />
                          <FormControlLabel
                            value="Phone"
                            control={<Radio />}
                            label="Phone"
                          />
                          <FormControlLabel
                            value="Email"
                            control={<Radio />}
                            label="Email"
                          />
                          <FormControlLabel
                            value="Pager"
                            control={<Radio />}
                            label="Pager"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Enter contact"
                        variant="outlined"
                        fullWidth
                        id="contact"
                        name="contact"
                        value={props.values.contact}
                        onChange={props.handleChange}
                        error={props.touched.contact && Boolean(props.errors.contact)}
                        helperText={props.touched.contact && props.errors.contact}
                        onBlur={props.handleBlur}
                      />
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                      <Box>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                        >
                          Submit
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={3}></Grid>
                  </Grid>
                </Form>
              </Box>
            </Card>
          </Box>
        )}
      </Formik>
    </Container>
  );
};

export default AddContact;
