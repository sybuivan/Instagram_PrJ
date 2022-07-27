import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import Content from './components/Content';
import { postApi } from '../../api';
import { getUserName } from '../../utils';
import { setLoading, hiddenLoading } from './homeSlice';

const Home = () => {
  const isLogin = useSelector((state) => state.auth.current);
  const dispatch = useDispatch();
  const [listPost, setListPost] = useState([]);
  const [status, setStatus] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        dispatch(setLoading());
        const { newList } = await postApi.getPostAllFriend(getUserName());
        setListPost(newList);
        setStatus(true);
        dispatch(hiddenLoading());
      } catch (error) {
      } finally {
        // dispatch(hiddenLoading());
      }
    })();
  }, []);
  if (!isLogin) {
    return <Navigate to="/accounts/login" replace={true} />;
  }
  return <>{status && <Content listPost={listPost} />}</>;
};

Home.propTypes = {};

export default Home;
