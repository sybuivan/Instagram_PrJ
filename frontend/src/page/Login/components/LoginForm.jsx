import React from 'react';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { AiFillFacebook } from 'react-icons/ai';
import { images } from '../../../constants';
import { InputField, PasswordField } from '../../../form-control';

const useStyles = makeStyles({
  loginForm: {
    width: '35rem',
    border: '1px solid var(--border-gray)',
    padding: '1.8rem 1rem',
    marginBottom: '1rem',
  },
  logo: {
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '2rem 0 ',
  },
  boxForm: {
    display: 'flex',
    justifyContent: 'center',
  },
  line: {
    backgroundColor: 'var(--border-gray)',
    width: '45%',
    height: '0.2rem',
    position: 'relative',
    top: '0.4rem',
  },
  boxButton: {
    display: 'block',
    width: '100%',
    border: 'none',
    padding: '2.3rem 0',
    backgroundColor: 'transparent',
    '& span': {
      color: '#385185',
      cursor: 'pointer',
      '& svg': {
        marginRight: '0.5rem',
        fontSize: '1.7rem',
        position: 'relative',
        top: '0.4rem',
      },
    },
  },
  link: {
    display: 'block',
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#00376b',
  },
});
const LoginForm = () => {
  const classes = useStyles();
  return (
    <Box className={classes.loginForm}>
      <Box component="img" src={images.LOGO} className={classes.logo} />

      <Box className={classes.boxForm}>
        <Box sx={{ width: '25rem' }}>
          <InputField placeholder="Phone number, username, or email" />
          <PasswordField placeholder="Password" />
          <Box sx={{ marginBottom: '1.5rem' }}>
            <Button variant="contained" sx={{ width: '100%' }}>
              Login
            </Button>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box className={classes.line}></Box>
            <Box>OR</Box>
            <Box className={classes.line}></Box>
          </Box>

          <Box>
            <Box component="button" className={classes.boxButton}>
              <Box component="span">
                <AiFillFacebook />
                Login with facebook
              </Box>
            </Box>
            <Link to="/" className={classes.link}>
              Forgot password?
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
