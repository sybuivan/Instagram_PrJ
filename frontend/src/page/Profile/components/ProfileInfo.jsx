import React, { useMemo } from 'react';
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
import { Followers, TabChoose } from '.';
import { BasicModal } from '../../../components';
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
function ProfileInfo({
  onOpenModal,
  onHiddenModal,
  listPosted,
  infoUser,
  isFollowere,
  isFollowing,
}) {
  const { user, follow } = infoUser;

  const classes = useStyles();
  const handleOpenModal = (type) => {
    onOpenModal(type);
  };
  const handleHiddenModal = (type) => {
    onHiddenModal(type);
  };
  const memoTabChoose = useMemo(
    () => <TabChoose listPost={listPosted} />,
    [listPosted]
  );
  console.log(user?.avatar);
  return (
    <>
      <Grid container sx={{ alignItems: 'center' }}>
        <Grid item xs={4} sx={{ padding: '5rem 0' }}>
          <Box sx={{ mr: 10 }}>
            <Avatar
              alt="Remy Sharp"
              src={`${process.env.REACT_APP_BASE_URL}/${user?.avatar}`}
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
                <Typography variant="span">{listPosted.length}</Typography>{' '}
                posts
              </Box>
              <Box
                sx={{ fontSize: '1.8rem', cursor: 'pointer' }}
                onClick={() => handleOpenModal('FOLLOWERE')}
              >
                <Typography variant="span">
                  {follow?.followere?.length || 0}
                </Typography>{' '}
                followers
              </Box>
              <Box
                sx={{ fontSize: '1.8rem', cursor: 'pointer' }}
                onClick={() => handleOpenModal('FOLLOWING')}
              >
                <Typography variant="span">
                  {follow?.following?.length || 0}
                </Typography>{' '}
                Following
              </Box>
            </Box>
            <Box>
              <Typography variant="h4">{user.fullName}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {memoTabChoose}
      {isFollowere && (
        <BasicModal
          component={
            <Followers
              onClose={onHiddenModal}
              title="Followere"
              followeres={follow?.followere}
            />
          }
          showModal={isFollowere}
          onClickHideModal={handleHiddenModal}
          type="FOLLOWERE"
        />
      )}
      {isFollowing && (
        <BasicModal
          component={
            <Followers
              onClose={onHiddenModal}
              title="Followings"
              followings={follow?.following}
            />
          }
          showModal={isFollowing}
          onClickHideModal={handleHiddenModal}
          type="FOLLOWING"
        />
      )}
    </>
  );
}

ProfileInfo.propTypes = {};

export default ProfileInfo;
