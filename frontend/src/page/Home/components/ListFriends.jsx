import {
  List,
  ListItem,
  ListItemAvatar,
  Paper,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { images } from '../../../constants';
const useStyles = makeStyles({
  item: {
    display: 'inherit!important',
    width: '8.6rem!important',
    margin: '1.2rem 2.8rem 1.2rem 0',
    cursor: 'pointer',
    padding: '0!important',
    '&:first-child': {
      marginLeft: '2.8rem',
    },
  },
  avatar: {
    width: '8.6rem',
    height: '8.6rem',
    borderRadius: '100%',
    marginBottom: '1rem',
  },
  name: {
    fontSize: '1.4rem',
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    lineHeight: '2rem',
    color: 'var(--color-text)',
    fontWeight: '500',
  },
});
const ListFriends = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const friends = useSelector((state) => state.home.listUserFriends);
  return (
    <Paper sx={{ mb: 2, overflow: 'auto' }}>
      <List sx={{ display: 'flex' }}>
        {friends.length > 0 ? (
          <>
            {friends.map((people) => (
              <ListItem
                key={people._id}
                className={classes.item}
                onClick={() => navigate(`/${people.userName}`)}
              >
                <ListItemAvatar sx={{ width: '100%' }}>
                  <Box
                    component="img"
                    alt={people.userName}
                    src={`${process.env.REACT_APP_BASE_URL}${people.avatar}`}
                    className={classes.avatar}
                  />
                  <Typography
                    variant="span"
                    align="center"
                    className={classes.name}
                  >
                    {people.userName}
                  </Typography>
                </ListItemAvatar>
              </ListItem>
            ))}
          </>
        ) : (
          <h2>No Friends</h2>
        )}
      </List>
    </Paper>
  );
};

ListFriends.propTypes = {};

export default ListFriends;
