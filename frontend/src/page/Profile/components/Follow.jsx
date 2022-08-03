import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router';

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
  console.log(people);
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/${people.userName}`);
  };
  return (
    <ListItem>
      <ListItemAvatar onClick={handleNavigation}>
        <Avatar
          alt={people.userName}
          src={`${process.env.REACT_APP_BASE_URL}${people?.avatar}`}
          sx={{ cursor: 'pointer' }}
        />
      </ListItemAvatar>
      <ListItemText
        onClick={handleNavigation}
        primary={people.userName}
        sx={{
          '& span': {
            fontSize: '1.3rem',
            fontWeight: '600',
            cursor: 'pointer',
          },
        }}
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

function Follow({ onClose, title, followings, followeres, listUser }) {
  const classes = useStyles();
  console.log('listUser', listUser);
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
          {followings && (
            <>
              {followings.map((people) => (
                <People people={people} type="FOLLOWING" key={people._id} />
              ))}
            </>
          )}

          {followeres && (
            <>
              {followeres.map(() => (
                <People type="FOLLOWERE" />
              ))}
            </>
          )}
          {listUser && (
            <>
              {listUser.map((item) => (
                <People
                  type="LIKES"
                  people={item.user_id}
                  key={item.user_id.id}
                />
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
