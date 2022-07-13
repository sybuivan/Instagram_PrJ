import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import LoginForm from './components/LoginForm';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { resetTimeout } from '../../utils';

const useStyles = makeStyles({
  root: {
    padding: '3rem 0',
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
    padding: '2.3rem 7.7rem',
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
const Login = () => {
  const classes = useStyles();
  const timeoutRef = useRef(null);
  const [position, setPosition] = useState(0);
  const slider = [
    'https://www.instagram.com/static/images/homepage/screenshots/screenshot2.png/4d62acb667fb.png',
    'https://www.instagram.com/static/images/homepage/screenshots/screenshot3.png/94edb770accf.png',
    'https://www.instagram.com/static/images/homepage/screenshots/screenshot4.png/a4fd825e3d49.png',
  ];
  useEffect(() => {
    resetTimeout(timeoutRef);
    timeoutRef.current = setTimeout(
      () =>
        setPosition((prevIndex) =>
          prevIndex === slider.length - 1 ? 0 : prevIndex + 1
        ),
    3000
    );
    return () => {
      resetTimeout(timeoutRef);
    };
  }, [position]);

  return (
    <Box className={classes.root}>
      <Container
        maxWidth="md"
        sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}
      >
        <Box className={classes.boxImages}>
          {slider.map((slide, index) => (
            <Box
              component="img"
              src={slide}
              key={index}
              className={position === index ? classes.active : ''}
            />
          ))}
        </Box>
        <Box>
          <LoginForm />

          <Box className={classes.boxTitle}>
            <Typography variant="span">
              Don't have an account? <Link to="/">Sign up</Link>
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
      </Container>
    </Box>
  );
};

Login.propTypes = {};

export default Login;
