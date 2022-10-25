import React, { useState } from 'react';
import { Box, List, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FriendItem } from '../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { getUserId } from '../../../utils';
import { followApi } from '../../../api';
import { followUser, unFollowUser } from '../homeSlice';
const Suggestions = ({
  onClickShowModal,
  onClickFollow,
  onClickUnFollow,
  userFollow,
}) => {
  const listUserSuggets = useSelector((state) => state.home.listUserSuggets);
  const friends = useSelector((state) => state.home.listUserFriends);
  const dispatch = useDispatch();
  const handleOnClickFollow = async (id) => {
    const formData = new FormData();
    formData.append('user', getUserId());
    formData.append('idFriend', id);

    try {
      await followApi.addFriend({
        user: getUserId(),
        idFriend: id,
      });
      dispatch(
        followUser({
          idFriend: id,
        })
      );
    } catch (error) {}
  };

  const handleOnClickUnFollow = async (id) => {
    console.log(id);
    try {
      await followApi.unFollowUser({
        idFollow: friends[0]._id,
        idMember: id,
        idUser: getUserId(),
      });
      dispatch(
        unFollowUser({
          idFriend: id,
        })
      );
    } catch (error) {}
  };
  return (
    <>
      {listUserSuggets.length > 0 && (
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: 'var(--color-8e8e8e)', fontWeight: '600' }}
            >
              Suggestions For You
            </Typography>
            <Link
              to="/"
              style={{
                color: 'var(--color-text)',
                fontSize: '1.3rem',
                fontWeight: '600',
              }}
            >
              See All
            </Link>
          </Box>
          <List>
            {listUserSuggets.map((people) => (
              <>
                <FriendItem
                  onClickFollow={handleOnClickFollow}
                  onClickUnFollow={handleOnClickUnFollow}
                  onClickShowModal={onClickShowModal}
                  people={people}
                  key={people.name}
                />
              </>
            ))}
          </List>
        </Box>
      )}
    </>
  );
};

Suggestions.propTypes = {};

export default Suggestions;
