import React from 'react';
import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  List,
  Button,
} from '@mui/material';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { images } from '../../../constants';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: '40rem',
    width: '40rem',
    height: '30rem',
    overflowY: 'hidden',
  },
  boxHead: {
    position: 'relative',
    padding: '1.5rem 0',
    borderBottom: '1px solid var(--border-gray)',
    '& h4': {
      textAlign: 'center',
    },
  },
  iconClose: {
    position: 'absolute!important',
    top: '1rem',
    right: '0.5rem',
    fontSize: '2rem!important',
  },
});
function People({ people, type }) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={images.USER_FK} />
      </ListItemAvatar>
      <ListItemText
        primary={people.userName}
        sx={{ '& span': { fontSize: '1.3rem', fontWeight: '600' } }}
        secondary={
          <React.Fragment>
            <Typography
              sx={{
                display: 'block',
                fontSize: '1.2rem',
                color: 'var(--color-8e8e8e)',
                pt: 0.3,
              }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {people.fullName}
            </Typography>
          </React.Fragment>
        }
      />
      <Button
        sx={{
          border: '1px solid var(--border-gray)',
          color: 'var(--color-text)',
        }}
      >
        {type}
      </Button>
    </ListItem>
  );
}

function Follow({ onClose, title, followings, followeres }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Box className={classes.boxHead}>
        <Typography variant="h4">{title}</Typography>
        <IconButton
          className={classes.iconClose}
          onClick={() => {
            if (followings) {
              onClose('FOLLOWING');
            } else {
              onClose('FOLLOWERE');
            }
          }}
        >
          <AiOutlineCloseCircle />
        </IconButton>
      </Box>
      <Box sx={{ height: '100%' }}>
        <List sx={{ overflowY: 'scroll', height: '100%' }}>
          {followings ? (
            <>
              {followings.map((people) => (
                <People people={people} type="FOLLOWING" />
              ))}
            </>
          ) : (
            <Typography variant="h4" sx={{ textAlign: 'center', pt: 3 }}>
              No people followeres
            </Typography>
          )}
          {followeres && (
            <>
              {followeres.map(() => (
                <People type="FOLLOWERE" />
              ))}
            </>
          )}
        </List>
      </Box>
    </Paper>
  );
}

Follow.propTypes = {};

export default Follow;