import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerAccount } from '../authSlice';
import RegisterForm from './RegisterForm';

const useStyles = makeStyles({
  root: {
    padding: '3rem 0',
  },
  formWrapper: {
    width: '35rem',
  },
  boxImages: {
    background:
      'url(https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png)',
    height: '58rem',
    width: '100%',
    position: 'relative',
    whiteSpace: 'nowrap',
    '& img': {
      width: '25rem',
      position: 'absolute',
      right: '7.4rem',
      top: '2.6rem',
      opacity: 0,
    },
  },
  active: { opacity: '1!important', transition: 'ease 1000ms' },
  boxTitle: {
    border: '1px solid var(--border-gray)',
    padding: '2.3rem 0',
    textAlign: 'center',
    '& span': { fontSize: '1.4rem' },
    '& a': {
      color: 'var(--color-blue)',
      fontWeight: '600',
    },
  },
  formBottom: {
    '& span': {
      fontSize: '1.6rem',
      display: 'block',
      padding: '2rem 0',
    },
    '& img': {
      width: '13.6rem',
      height: '4rem',
      marginRight: '1rem',
    },
  },
});
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const initialValues = {
    email: '',
    fullName: '',
    userName: '',
    password: '',
  };

  const handleOnSubmit = async (data) => {
    try {
      // call api register
      const resultAction = await dispatch(registerAccount(data));

      unwrapResult(resultAction);
      navigate('/accounts/login');
    } catch (error) {}
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.formWrapper}>
        <RegisterForm initialValues={initialValues} onSubmit={handleOnSubmit} />

        <Box className={classes.boxTitle}>
          <Typography variant="span">
            Have an account? <Link to="/accounts/login">Login</Link>
          </Typography>
        </Box>

        <Box className={classes.formBottom}>
          <Typography variant="span" align="center">
            Get the app
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
            />
            <Box
              component="img"
              src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
