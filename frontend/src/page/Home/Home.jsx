import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Navigate, Outlet, useNavigate, useParams } from 'react-router';
import Content from './components/Content';
import { commentsApi, followApi, postApi, userApi } from '../../api';
import { getUserId, getUserName } from '../../utils';
import { setLoading, hiddenLoading } from './homeSlice';
import { BasicModal, ModalChooseItem } from '../../components';

const Home = () => {
  const isLogin = useSelector((state) => state.auth.current);
  const dispatch = useDispatch();
  const [listPost, setListPost] = useState([]);
  const [listUserSuggets, setListUserSuggets] = useState([]);
  const [friends, setFriends] = useState([]);
  const [status, setStatus] = useState(false);
  const { idPost } = useParams();
  console.log(!!idPost);

  useEffect(() => {
    (async () => {
      try {
        dispatch(setLoading());
        const { listUserSuggets } = await userApi.getSuggetionsForUser();
        const { friends } = await followApi.getFriendsMe(getUserName());
        getListPost();
        setListUserSuggets(
          listUserSuggets.map((user) => {
            return {
              ...user,
              isFollow: false,
            };
          })
        );
        setFriends(friends[0].following);

        setStatus(true);
        dispatch(hiddenLoading());
      } catch (error) {
      } finally {
        // dispatch(hiddenLoading());
      }
    })();
  }, []);

  const getListPost = async () => {
    const { newList } = await postApi.getPostAllFriend(getUserName());
    setListPost(newList);
  };

  const handleOnClickFollow = async (id) => {
    const formData = new FormData();
    formData.append('user', getUserId());
    formData.append('idFriend', id);
    const user = await followApi.addFriend({
      user: getUserId(),
      idFriend: id,
    });
    const newListUser = [...listUserSuggets];
    const index = newListUser.findIndex((item) => item.id === id);
    newListUser[index].isFollow = true;
    setListUserSuggets(newListUser);
    try {
    } catch (error) {}
  };

  const handleOnPostComments = async (data) => {
    try {
      const commnet = await commentsApi.createComment(data);
      getListPost();
    } catch (error) {}
  };
  if (!isLogin) {
    return <Navigate to="/accounts/login" replace={true} />;
  }
  return (
    <>
      {status && (
        <Content
          friends={friends}
          listPost={listPost}
          listUserSuggets={listUserSuggets}
          onClickFollow={handleOnClickFollow}
          onClickUnFollow={handleOnClickFollow}
          onPostComments={handleOnPostComments}
        />
      )}
      {!!idPost && <Outlet />}
    </>
  );
};

Home.propTypes = {};

export default Home;
