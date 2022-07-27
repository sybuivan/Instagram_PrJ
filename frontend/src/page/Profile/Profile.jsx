import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { followApi, postApi } from '../../api';
import {
  hiddenLoading,
  hiddenModal,
  setLoading,
  showModal,
} from '../Home/homeSlice';
import { ProfileInfo } from './components';

const Profile = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [listPosted, setListPosted] = useState([]);
  const [user, setUser] = useState([]);
  const [status, setStatus] = useState(false);
  const handleOnOpenModal = (type) => {
    dispatch(showModal(type));
  };

  const handleOnClickHideModal = (type) => {
    dispatch(hiddenModal(type));
  };
  const isShowModal = useSelector((state) => state.home.modal);
  const isLoading = useSelector((state) => state.home.loading);
  console.log(isLoading);
  useEffect(() => {
    (async () => {
      try {
        dispatch(setLoading());
        const { newList } = await postApi.getPostAll(
          location.pathname.replace('/', '')
        );
        const { follows, user } = await followApi.getFollowUser();
        setUser({ follows, user });
        setListPosted(newList);
        setStatus(true);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(hiddenLoading());
      }
    })();
  }, []);
  console.log('user', user);
  return (
    <>
      {status && (
        <ProfileInfo
          onOpenModal={handleOnOpenModal}
          listPosted={listPosted}
          infoUser={user}
          isFollowere={isShowModal.FOLLOWERE}
          isFollowing={isShowModal.FOLLOWING}
          onHiddenModal={handleOnClickHideModal}
        />
      )}
    </>
  );
};

Profile.propTypes = {};

export default Profile;
