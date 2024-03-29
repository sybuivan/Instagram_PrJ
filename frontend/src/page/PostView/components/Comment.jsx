import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router';
import { getUserId } from '../../../utils';
import { MoreHorizontal, OutlineHeart } from '../../../components/Icons';

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
    flex: 'inherit!important',
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
  avatar: {
    cursor: 'pointer',
    position: 'relative',

    '&:hover ': {
      '& > $boxFriendInfo': {
        display: 'block',
      },
    },
  },
  padding: {
    position: 'absolute',
    content: '',
    width: '10rem',
    backgroundColor: 'transparent',
    height: '2rem',
    top: '3.5rem',
    left: 0,
    right: 0,
    zIndex: 10,
  },
  boxFriendInfo: {
    position: 'absolute',
    top: '5rem',
    display: 'none',
  },
});
function Comment({
  comments,
  onDeleteComment,
  onEditComment,
  onShowModalOption,
}) {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleOnShowMoreModalComment = () => {
    onShowModalOption(comments._id);
  };

  return (
    <div>
      <ListItem alignItems="flex-start" className={classes.infoItem}>
        <ListItemAvatar
          className={classes.avatar}
          onClick={() => navigate(`/${comments.user_id.userName}`)}
        >
          <Avatar
            alt="Remy Sharp"
            src={`${process.env.REACT_APP_BASE_URL}${comments.user_id.avatar}`}
          />
        </ListItemAvatar>
        <ListItemText
          className={classes.name}
          primary={comments.user_id.userName}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline', mr: 2 }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {comments.createdAt}
              </Typography>
              {getUserId() === comments.user_id.id && (
                <IconButton onClick={handleOnShowMoreModalComment}>
                  <MoreHorizontal />
                </IconButton>
              )}
            </React.Fragment>
          }
        />
        <Box sx={{ ml: '2rem', mt: '0.4rem', flex: 5 }}>
          <Typography sx={{ fontSize: '1.4rem' }}>
            {comments.comment}
          </Typography>
        </Box>
        <Box sx={{ ml: '2rem', mt: '0.4rem', flex: 0 }}>
          <IconButton>
            <OutlineHeart />
          </IconButton>
        </Box>
      </ListItem>
    </div>
  );
}

Comment.propTypes = {};

export default Comment;
