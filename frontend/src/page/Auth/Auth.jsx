import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { Outlet } from 'react-router';
import { makeStyles } from '@mui/styles';
import { resetTimeout } from '../../utils';
import { images } from '../../constants';

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
      right: '9.4rem',
      top: '2.6rem',
      opacity: 0,
    },
  },
  active: { opacity: '1!important', transition: 'ease 1000ms' },
});
const Auth = () => {
  const classes = useStyles();
  const timeoutRef = useRef(null);
  const [position, setPosition] = useState(0);
  useEffect(() => {
    resetTimeout(timeoutRef);
    timeoutRef.current = setTimeout(
      () =>
        setPosition((prevIndex) =>
          prevIndex === images.SLIDER.length - 1 ? 0 : prevIndex + 1
        ),
      3000
    );
    return () => {
      resetTimeout(timeoutRef);
    };
  }, [position]);
  
  return (
    <Box className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={4}>
          <Box className={classes.boxImages}>
            {images.SLIDER.map((slide, index) => (
              <Box
                component="img"
                src={slide}
                key={index}
                className={position === index ? classes.active : ''}
              />
            ))}
          </Box>
        </Grid>
        <Grid item md={4}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Auth;
