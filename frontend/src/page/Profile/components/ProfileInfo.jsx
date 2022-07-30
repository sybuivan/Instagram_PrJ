import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useMemo } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';
import { FiMoreHorizontal, FiSettings } from 'react-icons/fi';
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
  avatarIcon: {
    position: 'absolute!important',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    fontSize: '3rem!important',
  },
});
function ProfileInfo({
  onOpenModal,
  onHiddenModal,
  listPosted,
  infoUser,
  isFollowere,
  isFollowing,
  avatar,
  onChangeAvatar,
  onSaveAvatar,
  isPrivate,
}) {
  const classes = useStyles();
  console.log(isPrivate);
  const { user, follows } = infoUser;
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
  const avatarMemo = useMemo(
    () => (
      <Box sx={{ mr: 10, position: 'relative' }}>
        <Avatar
          alt="Remy Sharp"
          src={
            avatar
              ? avatar.preview
              : `${process.env.REACT_APP_BASE_URL}${user?.avatar}`
          }
          sx={{ width: '18rem', height: '18rem' }}
        />
        {isPrivate && (
          <>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              className={classes.avatarIcon}
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => onChangeAvatar(e)}
              />
              <BsFillCameraFill />
            </IconButton>
            {avatar && (
              <Box className={classes.avatarIcon} sx={{ top: '70%' }}>
                <Button variant="contained" onClick={() => onSaveAvatar()}>
                  Save
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    ),
    [avatar, user, isPrivate]
  );
  return (
    <>
      <Grid container sx={{ alignItems: 'center' }}>
        <Grid item xs={4} sx={{ padding: '5rem 0' }}>
          {avatarMemo}
        </Grid>
        <Grid item xs={5}>
          <Box>
            <Box className={classes.flex}>
              <Typography variant="h4">{user.userName}</Typography>
              {isPrivate ? (
                <>
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
                </>
              ) : (
                <>
                  <Button variant="outlined" sx={{ fontSize: '1.4rem' }}>
                    Message
                  </Button>
                  <IconButton sx={{ '& svg': { fontSize: '1.8rem' } }}>
                    <FiMoreHorizontal />
                  </IconButton>
                </>
              )}
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
                  {follows[0]?.followere?.length || 0}
                </Typography>{' '}
                followers
              </Box>
              <Box
                sx={{ fontSize: '1.8rem', cursor: 'pointer' }}
                onClick={() => handleOpenModal('FOLLOWING')}
              >
                <Typography variant="span">
                  {follows[0]?.following?.length || 0}
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
              followeres={follows[0]?.followere}
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
              followings={follows[0]?.following}
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
