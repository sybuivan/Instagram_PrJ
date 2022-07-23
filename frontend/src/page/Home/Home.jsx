import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Content from './components/Content';

const Home = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.current);
  useEffect(() => {
    if (!isLogin) {
      navigate('/accounts/login');
    }
  }, []);
  const memoContent = useMemo(() => <Content />, []);
  return <>{memoContent}</>;
};

Home.propTypes = {};

export default Home;
