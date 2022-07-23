import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BasicModal } from '../../components';
import Followers from './components/Followers';
import ProfileInfo from './components/ProfileInfo';
import TabChoose from './components/TabChoose';
import { showModal, hiddenModal } from '../Home/homeSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const handleOnOpenFollowing = () => {
    dispatch(showModal('FOLLOWING'));
  };
  const handleOnOpenFollowere = () => {
    dispatch(showModal('FOLLOWERE'));
  };
  const handleClickHideModal = () => {
    dispatch(hiddenModal('FOLLOWERE'));
  };
  const isShowModal = useSelector((state) => state.home.modal);
  console.log(isShowModal.FOLLOWERE);
  return (
    <>
      <ProfileInfo
        onOpenFollowing={handleOnOpenFollowing}
        onOpenFollowere={handleOnOpenFollowere}
      />
      <TabChoose />
      {isShowModal.FOLLOWERE && (
        <BasicModal
          component={<Followers onClose={handleClickHideModal} />}
          showModal={isShowModal.FOLLOWERE}
          onClickHideModal={handleClickHideModal}
        />
      )}
    </>
  );
};

Profile.propTypes = {};

export default Profile;
