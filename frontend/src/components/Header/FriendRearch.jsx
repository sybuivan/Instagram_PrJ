import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { images } from '../../constants';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      background: '#efefef',
      cursor: 'pointer',
      transition: 'all 0.3s',
      borderRadius: '0 0 0.4rem 0.4rem',
    },
  },
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
const FriendRearch = ({ people }) => {
  const classes = useStyles();
  return (
    <ListItem alignItems="center" className={classes.root}>
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={images.USER_FK} />
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
              {people.fullName}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

FriendRearch.propTypes = {};

export default FriendRearch;
