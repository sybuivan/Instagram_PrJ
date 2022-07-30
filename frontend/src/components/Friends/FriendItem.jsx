import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { images } from '../../constants';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router';

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
  const handleOnClickFollow = () => {
    onClickFollow(people.id);
  };
  const handleOnClickUnFollow = () => {
    if (!onClickUnFollow) return;
    onClickUnFollow(people.id);
    onClickShowModal();
  };
  const navigate = useNavigate();
  return (
    <ListItem alignItems="center">
      <ListItemAvatar onClick={() => navigate(`${people.name}`)}>
        <Avatar
          alt="Remy Sharp"
          src={`${process.env.REACT_APP_BASE_URL}/${people.avatar}`}
        />
      </ListItemAvatar>
      <ListItemText
        className={classes.name}
        primary={people.userName}
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
              Suggested for you
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
