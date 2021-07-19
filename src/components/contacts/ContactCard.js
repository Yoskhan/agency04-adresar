import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { updateContactById } from '../../store/contacts-actions';

import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    paddingTop: 0,
    paddingBottom: 0,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ContactCard = ({ contact, orderBy }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const onDetailsClickHandler = (id) => {
    history.push('/kontakt/detalji/' + id);
  };

  const addToFavoriteHandler = (contact) => {
    const newContact = { ...contact };
    newContact.isFavorite = !newContact.isFavorite;
    dispatch(updateContactById(newContact.key, newContact, orderBy));
  };

  return (
    <Box p={2}>
      <Card className={classes.root} elevation={1}>
        <CardHeader
          title={`${contact.name} ${contact.lastname}`}
          avatar={<Avatar>{contact.name[0].toUpperCase()}</Avatar>}
          action={
            <IconButton
              aria-label="add to favorites"
              onClick={() => addToFavoriteHandler(contact)}
            >
              <StarIcon style={contact.isFavorite === true ? { color: 'gold' } : null} />
            </IconButton>
          }
        />
        <Box display="flex" justifyContent="flex-start">
          <CardContent>
            <Typography component="h2">
              {contact.type}: {contact.contact}
            </Typography>
          </CardContent>
        </Box>
        <Box display="flex" justifyContent="center" mb={2}>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={(e) => onDetailsClickHandler(contact.key)}
            >
              Details
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
};

export default ContactCard;
