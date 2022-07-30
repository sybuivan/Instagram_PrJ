import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import Content from './components/Content';
import { followApi, postApi, userApi } from '../../api';
import { getUserId, getUserName } from '../../utils';
import { setLoading, hiddenLoading } from './homeSlice';

const Home = () => {
  const isLogin = useSelector((state) => state.auth.current);
  const dispatch = useDispatch();
  const [listPost, setListPost] = useState([]);
  const [listUserSuggets, setListUserSuggets] = useState([]);
  const [status, setStatus] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        dispatch(setLoading());
        const { newList } = await postApi.getPostAllFriend(getUserName());
        const { listUserSuggets } = await userApi.getSuggetionsForUser();
        setListPost(newList);
        setListUserSuggets(
          listUserSuggets.map((user) => {
            return {
              ...user,
              isFollow: false,
            };
          })
        );

        setStatus(true);
        dispatch(hiddenLoading());
      } catch (error) {
      } finally {
        // dispatch(hiddenLoading());
      }
    })();
  }, []);

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
  if (!isLogin) {
    return <Navigate to="/accounts/login" replace={true} />;
  }
  return (
    <>
      {status && (
        <Content
          listPost={listPost}
          listUserSuggets={listUserSuggets}
          onClickFollow={handleOnClickFollow}
          onClickUnFollow={handleOnClickFollow}
        />
      )}
    </>
  );
};

Home.propTypes = {};

export default Home;
