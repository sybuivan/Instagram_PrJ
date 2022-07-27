import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { followApi, postApi, userApi } from '../../api';
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
  const [avatar, setAvatar] = useState(null);
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
  const handleOnChangeAvatar = (e) => {
    const avatar = e.target.files[0];
    avatar.preview = URL.createObjectURL(avatar);
    setAvatar(avatar);
  };
  const handleOnSaveAvatar = async () => {
    const formData = new FormData();
    formData.append('avatar', avatar, avatar.name);
    try {
      await userApi.editAvatar(formData);
    } catch (error) {}
  };
  return (
    <>
      {status && (
        <ProfileInfo
          onOpenModal={handleOnOpenModal}
          listPosted={listPosted}
          infoUser={user}
          avatar={avatar}
          onChangeAvatar={handleOnChangeAvatar}
          isFollowere={isShowModal.FOLLOWERE}
          isFollowing={isShowModal.FOLLOWING}
          onHiddenModal={handleOnClickHideModal}
          onSaveAvatar={handleOnSaveAvatar}
        />
      )}
    </>
  );
};

Profile.propTypes = {};

export default Profile;
