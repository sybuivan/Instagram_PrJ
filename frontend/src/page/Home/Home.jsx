import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router';
import { commentsApi } from '../../api';
import { getUserId, getUserName } from '../../utils';
import Content from './components/Content';
import {
  fetchGetInfor,
  fetchPostFriends,
  fetchUserFriends,
  fetchUserSuggets,
  hiddenLoading,
  setLoading,
} from './homeSlice';

const Home = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  const { idPost } = useParams();

  useEffect(() => {
    (async () => {
      try {
        dispatch(setLoading());
        dispatch(fetchUserSuggets(getUserId()));
        dispatch(fetchUserFriends(getUserName()));
        dispatch(fetchPostFriends(getUserName()));
        dispatch(fetchGetInfor(getUserId()));

        setStatus(true);
        dispatch(hiddenLoading());
      } catch (error) {
      } finally {
        // dispatch(hiddenLoading());
      }
    })();
  }, []);

  const handleOnPostComments = async (data) => {
    try {
      const commnet = await commentsApi.createComment(data);
      dispatch(fetchPostFriends(getUserName()));
    } catch (error) {}
  };

  return (
    <>
      {status && <Content onPostComments={handleOnPostComments} />}
      {!!idPost && <Outlet />}
    </>
  );
};

Home.propTypes = {};

export default Home;
