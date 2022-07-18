import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Outlet, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { Header } from '../../components';
import Content from './components/Content';

const Home = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.current);
  useEffect(() => {
    if (!isLogin) {
      navigate('/accounts/login');
    }
  }, []);
  return (
    <div>
      <Content />
    </div>
  );
};

Home.propTypes = {};

export default Home;
