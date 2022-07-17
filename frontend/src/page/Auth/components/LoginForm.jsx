import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AiFillFacebook } from 'react-icons/ai';
import { images } from '../../../constants';
import { InputField, PasswordField } from '../../../form-control';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  loginForm: {
    width: 'calc(100% - 2rem)',
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
  userDefault: {
    width: '15rem',
    borderRadius: '100%',
  },
  continueButton: {
    textTransform: 'none!important',
    marginBottom: '1.2rem!important',
    fontSize: '1.3rem!important',
  },
  boxContinue: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& span': {
      fontSize: '1.4rem',
      '& span': {
        fontWeight: '600',
        cursor: 'pointer',
        color: 'var(--color-blue)',
      },
    },
  },
});
const LoginForm = ({ initialValues, onSubmit }) => {
  const infoLogin = useSelector((state) => state.auth.current);
  const [isLogin, setIsLogin] = useState(!!infoLogin);

  const schema = yup.object().shape({
    account: yup.string().required('Please enter username and try again.'),
    password: yup
      .string()
      .required('Please enter passwork and try again.')
      .min(8),
  });
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const handleOnSubmit = async (data) => {
    if (!onSubmit) return;
    onSubmit(data);
  };
  return (
    <Box className={classes.loginForm}>
      <Box component="img" src={images.LOGO} className={classes.logo} />
      {!!isLogin ? (
        <Box>
          <Box
            src={images.USER_DEFAULT}
            component="img"
            className={`${classes.userDefault} ${classes.logo}`}
          />
          <Box className={classes.boxContinue}>
            <Button variant="contained" className={classes.continueButton}>
              Continue as {infoLogin.account}
            </Button>
            <Typography variant="span">
              Not {infoLogin.account}?
              <Typography variant="span" onClick={() => setIsLogin(false)}>
                Switch accounts
              </Typography>
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box className={classes.boxForm}>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Box sx={{ width: '25rem' }}>
              <InputField
                placeholder="Phone number, username, or email"
                control={control}
                name="account"
                errors={errors}
              />
              <PasswordField
                placeholder="Password"
                control={control}
                name="password"
                errors={errors}
              />
              <Box sx={{ marginBottom: '1.5rem' }}>
                <Button
                  variant="contained"
                  sx={{ width: '100%' }}
                  type="submit"
                >
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
          </form>
        </Box>
      )}
    </Box>
  );
};

export default LoginForm;
