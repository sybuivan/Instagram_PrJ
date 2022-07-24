import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Typography,
  Grid,
} from '@mui/material';
import { images } from '../../../constants';
import { FiSettings } from 'react-icons/fi';

import { makeStyles } from '@mui/styles';
import TabChoose from './TabChoose';
const useStyles = makeStyles({
  root: {
    margin: '2rem 0',
    borderBottom: '0.1rem solid var(--border-gray)',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
function ProfileInfo({ onOpenFollowere, onOpenFollowing, listPosted, user }) {
  const { listPost, total } = listPosted;
  console.log(listPosted.listPost, listPost);
  const classes = useStyles();
  const handleOpenFollowere = () => {
    onOpenFollowere();
  };
  const handleOpenFollowing = () => {
    onOpenFollowing();
  };
  return (
    <>
      <Grid container sx={{ alignItems: 'center' }}>
        <Grid item xs={4} sx={{ padding: '5rem 0' }}>
          <Box sx={{ mr: 10 }}>
            <Avatar
              alt="Remy Sharp"
              src={user.avatar || images.USER_FK}
              sx={{ width: '15rem', height: '15rem' }}
            />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box>
            <Box className={classes.flex}>
              <Typography variant="h4">{user.userName}</Typography>
              <Button
                sx={{
                  border: '1px solid var(--border-gray)',
                  margin: '0 2rem',
                  color: 'var(--color-text)',
                  fontSize: '1.3rem',
                }}
              >
                Edit profile
              </Button>
              <IconButton>
                <FiSettings />
              </IconButton>
            </Box>
            <Box className={classes.flex} sx={{ padding: '3.5rem 0' }}>
              <Box sx={{ fontSize: '1.8rem' }}>
                <Typography variant="span">{total}</Typography> posts
              </Box>
              <Box
                sx={{ fontSize: '1.8rem', cursor: 'pointer' }}
                onClick={handleOpenFollowere}
              >
                <Typography variant="span">2</Typography> followers
              </Box>
              <Box
                sx={{ fontSize: '1.8rem', cursor: 'pointer' }}
                onClick={handleOpenFollowing}
              >
                <Typography variant="span">4</Typography> Following
              </Box>
            </Box>
            <Box>
              <Typography variant="h4">{user.fullName}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <TabChoose listPost={listPost} />
    </>
  );
}

ProfileInfo.propTypes = {};

export default ProfileInfo;
