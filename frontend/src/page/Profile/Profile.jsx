/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { followApi, postApi, userApi } from '../../api';
import { getUserId, getUserName } from '../../utils';
import {
  hiddenLoading,
  hiddenModal,
  setLoading,
  showModal,
} from '../Home/homeSlice';
import { ProfileInfo } from './components';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [listPosted, setListPosted] = useState([]);
  const friends = useSelector((state) => state.home.listUserFriends);
  const [user, setUser] = useState([]);
  const [status, setStatus] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const { userName } = useParams();
  console.log(userName);
  const handleOnOpenModal = (type) => {
    dispatch(showModal(type));
  };

  const handleOnClickHideModal = (type) => {
    dispatch(hiddenModal(type));
  };
  const isShowModal = useSelector((state) => state.home.modal);

  useEffect(() => {
    (async () => {
      try {
        dispatch(setLoading());
        const { newList } = await postApi.getPostAll(userName);
        const { follows, user, follow_with_me } = await followApi.getFollowUser(
          userName
        );
        console.log(follows, user);
        setUser({ follows, user, follow_with_me });
        setListPosted(newList);
        setStatus(true);
        dispatch(hiddenModal('FOLLOWING'));
      } catch (error) {
        navigate('/not-found');
      } finally {
        dispatch(hiddenLoading());
      }
    })();
  }, [location.pathname.replace('/', '')]);
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

  // handleUnfollowUser
  const handleUnfollowUser = async (idMember) => {
    try {
      await followApi.unFollowUser({
        idFollow: friends[0]._id,
        idMember: idMember,
        idUser: getUserId(),
      });
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
          unfollowUser={handleUnfollowUser}
          isFollowere={isShowModal.FOLLOWERE}
          isFollowing={isShowModal.FOLLOWING}
          onHiddenModal={handleOnClickHideModal}
          onSaveAvatar={handleOnSaveAvatar}
          isPrivate={userName === getUserName()}
        />
      )}
    </>
  );
};

Profile.propTypes = {};

export default Profile;
