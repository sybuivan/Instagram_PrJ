import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { images } from '../constants';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  name: {
    '& .css-10hburv-MuiTypography-root': {
      fontSize: '1.4rem',
      color: 'var(--color-text)',
      fontWeight: '600',
    },
    '& .css-83ijpv-MuiTypography-root': {
      fontSize: '1.2rem',
      color: 'var(--color-text)',
    },
  },
  listItem: {
    display: 'inline-block!important',
    width: 'inherit!important',
    paddingRight: '0!important',
    paddingLeft: '0!important',
    '& svg': {
      fontSize: '2.5rem',
      fontWeight: '600',
    },
  },
});
const FriendItem = ({
  people,
  onClickFollow,
  onClickUnFollow,
  onClickShowModal,
}) => {
  const classes = useStyles();
  console.log('people', people);
  const handleOnClickFollow = () => {
    console.log('onClickFollow', !!onClickFollow);

    onClickFollow(people.name);
  };
  const handleOnClickUnFollow = () => {
    if (!onClickUnFollow) return;
    onClickUnFollow(people.name);
    onClickShowModal();
  };
  return (
    <ListItem alignItems="center">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={images.USER_FK} />
      </ListItemAvatar>
      <ListItemText
        className={classes.name}
        primary={people.name}
        secondary={
          <React.Fragment>
            <Typography
              sx={{
                display: 'inline',
                fontSize: '1.2rem',
                color: 'var(--color-8e8e8e)',
              }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {people.byName}
            </Typography>
          </React.Fragment>
        }
      />

      {people.isFollow ? (
        <Typography
          variant="span"
          sx={{
            color: 'var(--color-text)',
            fontSize: '1.2rem',
            fontWeight: '600',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={handleOnClickUnFollow}
        >
          Following
        </Typography>
      ) : (
        <Typography
          variant="span"
          sx={{
            color: 'var(--color-blue)',
            fontSize: '1.2rem',
            fontWeight: '600',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={handleOnClickFollow}
        >
          Follow
        </Typography>
      )}
    </ListItem>
  );
};

FriendItem.propTypes = {};

export default FriendItem;
